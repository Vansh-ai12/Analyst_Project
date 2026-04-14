import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set random seed
np.random.seed(99)

# Generate Low Performance data
n_rows = 100
regions = ['Europe', 'Asia Pacific'] # Limited regions
products = ['AudioPods Elite', 'GamerRig X1'] # Cheaper/fewer products

data = {
    'InvoiceRef': [f'LOW-{2000 + i}' for i in range(n_rows)],
    'Timestamp': [(datetime(2024, 1, 1) + timedelta(days=np.random.randint(0, 90))).strftime('%Y-%m-%d') for i in range(n_rows)],
    'Territory': [np.random.choice(regions) for _ in range(n_rows)],
    'ItemName': [np.random.choice(products) for _ in range(n_rows)],
    'Quantity': np.random.randint(1, 3, size=n_rows), # Lower quantity
    'UnitPrice': np.round(np.random.uniform(20, 300, size=n_rows), 2), # Lower prices
    'MarketingCost': np.round(np.random.uniform(50, 100, size=n_rows), 2), # Higher marketing (low margin)
    'CustomerRating': np.random.randint(1, 4, size=n_rows) # Lower ratings
}

df = pd.DataFrame(data)
df['GrossIncome'] = np.round(df['Quantity'] * df['UnitPrice'], 2)

# Save to CSV
output_path = 'test_q1_down_report.csv'
df.to_csv(output_path, index=False)
print(f"Low performance test CSV created at: {output_path}")
