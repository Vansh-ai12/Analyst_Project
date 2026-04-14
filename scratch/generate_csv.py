import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

# Generate random data
n_rows = 150
regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East']
products = ['UltraTab Pro', 'Vision Pro Max', 'SmartWatch X', 'AudioPods Elite', 'GamerRig X1']
categories = ['Electronics', 'Accessories', 'Computing']

data = {
    'InvoiceRef': [f'INV-{1000 + i}' for i in range(n_rows)],
    'Timestamp': [(datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365))).strftime('%Y-%m-%d') for i in range(n_rows)],
    'Territory': [np.random.choice(regions) for _ in range(n_rows)],
    'ItemName': [np.random.choice(products) for _ in range(n_rows)],
    'Quantity': np.random.randint(1, 10, size=n_rows),
    'UnitPrice': np.round(np.random.uniform(50, 1500, size=n_rows), 2),
    'MarketingCost': np.round(np.random.uniform(5, 50, size=n_rows), 2),
    'CustomerRating': np.random.randint(1, 6, size=n_rows)
}

df = pd.DataFrame(data)
# Add calculated GrossIncome
df['GrossIncome'] = np.round(df['Quantity'] * df['UnitPrice'], 2)

# Save to CSV
output_path = 'test_random_data.csv'
df.to_csv(output_path, index=False)
print(f"Random test CSV created at: {output_path}")
