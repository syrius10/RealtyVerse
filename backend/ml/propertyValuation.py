import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load dataset
data = pd.read_csv('property_data.csv')  # Ensure you have a dataset available

# Preprocessing
X = data[['feature1', 'feature2', 'feature3']]  # Replace with actual features
y = data['price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

@app.route('/predict', methods=['POST'])
def predict():
    content = request.json
    features = np.array([content['feature1'], content['feature2'], content['feature3']]).reshape(1, -1)  # Replace with actual features
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    return jsonify({'predicted_price': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)