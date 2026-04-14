import os
import json
import io
import pandas as pd
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from groq import Groq

# Load GROQ API Key from txt file
def get_groq_key():
    try:
        with open("../GROQ_API_KEY.txt", "r") as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading API key: {e}")
        return None

GROQ_API_KEY = get_groq_key()
client = Groq(api_key=GROQ_API_KEY)

app = FastAPI(title="Om Project Analytics API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global store for the latest analyzed data
current_analysis = {
    "kpiData": None,
    "monthlyRevenue": None,
    "salesByRegion": None,
    "topProducts": None,
    "insights": []
}

class DataInput(BaseModel):
    context: str
    data_points: Optional[dict] = None

class InsightResponse(BaseModel):
    id: Any
    title: str
    description: str
    value: Any
    type: str
    badge: str
    badgeColor: str
    icon: str

@app.get("/")
async def root():
    return {"message": "Analytics Server is running"}

@app.get("/current-data")
async def get_current_data():
    return current_analysis

@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    global current_analysis
    
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
    
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    # Prepare context for AI
    columns = list(df.columns)
    sample_data = df.head(10).to_dict(orient='records')
    stats = df.describe().to_dict()
    
    prompt = f"""
    You are an expert data scientist and business analyst. 
    I have a CSV file with columns: {columns}
    Here is a sample of the data: {json.dumps(sample_data)}
    And basic stats: {json.dumps(stats)}
    
    Based on this data, generate a complete analytical dashboard report in JSON format.
    The report MUST include:
    1. kpiData: Object with totalRevenue (number), revenueChange (number), profitMargin (number), marginChange (number), totalOrders (number), ordersChange (number), avgOrderValue (number), and aovChange (number).
    2. profitabilityData: Object with 'labels' (months/dates), 'revenue' (list of values), and 'cost' (list of values).
    3. salesByRegion: Object with 'labels' (regions list) and 'data' (percentage/value list).
    4. customerTrends: Object with 'labels' (time periods), 'newCustomers' (list), and 'returning' (list).
    5. topProducts: List of objects with 'name', 'units', 'margin', and 'revenue'.
    6. insights: List of 6 objects, each with (id, title, description, value, type, badge, badgeColor, icon).
    7. aiAdvice: List of 3 strings, each being a specific, high-level business recommendation based on the current data (e.g. 'Diversify marketing in Asia Pacific' or 'Review pricing for high-cost products').
    
    IMPORTANT RULES FOR INSIGHTS:
    - If a metric (like Revenue or Margin) is DOWN based on stats, the insight MUST reflect a decline.
    - For negative trends: use badgeColor 'red', type 'warning', and icon 'alert-triangle' or 'trending-down'.
    - For positive trends: use badgeColor 'green', type 'positive', and icon 'trending-up'.
    - DO NOT hallucinate positive growth if the numbers are low or declining. Be accurate and objective.
    - Use realistic percentage changes based on the 'stats' provided.
    
    Return ONLY a valid, single JSON object.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a professional analyst. Respond with raw JSON only. Ensure keys match EXACTLY: kpiData, profitabilityData, salesByRegion, customerTrends, topProducts, insights."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        analysis = json.loads(completion.choices[0].message.content)
        current_analysis.update(analysis)
        return analysis
    except Exception as e:
        print(f"Error analyzing CSV: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-insights", response_model=List[InsightResponse])
async def generate_insights(input_data: DataInput):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ API Key not found")

    prompt = f"""
    Analyze the following data and provide 6 actionable insights as a JSON list.
    Context: {input_data.context}
    Data: {json.dumps(input_data.data_points)}
    Return ONLY a JSON list of objects (or an object with an 'insights' key) with fields: id, title, description, value, type, badge, badgeColor, icon.
    Make sure 'id' and 'value' are strings.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful analyst that outputs only JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        data = json.loads(content)
        if isinstance(data, dict) and "insights" in data:
            return data["insights"]
        if isinstance(data, list):
            return data
        return []
    except Exception as e:
        print(f"Groq API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
