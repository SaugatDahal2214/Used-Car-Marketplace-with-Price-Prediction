import sys
import pandas as pd
import joblib

# Load the trained model
model = joblib.load('regressor2.pkl')

# Parse input data from command line arguments
input_data_str = sys.argv[1]

# Attempt to parse input data as JSON
try:
    input_data = eval(input_data_str)
except SyntaxError:
    # Handle the case where input data is not valid JSON
    # Remove the surrounding single quotes and replace double quotes with single quotes
    input_data_str = input_data_str.strip("'").replace('"', "'")
    # Construct the dictionary from the string
    input_data = dict(item.split(":") for item in input_data_str.strip("{}").split(","))

# Convert the dictionary keys to remove single quotes
input_data = {key.strip("'"): value.strip("'") for key, value in input_data.items()}

# Convert the dictionary values to appropriate types (int or float)
for key, value in input_data.items():
    try:
        input_data[key] = int(value)
    except ValueError:
        try:
            input_data[key] = float(value)
        except ValueError:
            pass  # Value remains as string

# Convert the dictionary to a DataFrame
input_data_df = pd.DataFrame([input_data])

# Make predictions
predictions = model.predict(input_data_df)

# Print predictions (this will be captured by Node.js)
print(predictions.tolist())
