"""
Author: Tapan Mahata
Email: mahatatapan2000@gmail.com

Description:
    This script implements a FastApi application for second hand car price prediction.
    It uses a Random Forest Regressor to predict the price of a car.
    The application is containerized and can be deployed on any cloud platform.
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import joblib

app = FastAPI()

# Allow CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("model/random_forest_model.joblib", "rb") as f:
    model = joblib.load(f)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/predict")
def predict(
    car_name: str = Query(...),
    year: int = Query(...),
    distance: int = Query(...),
    owner: int = Query(...),
    fuel: str = Query(...),
    location: str = Query(...),
    drive: str = Query(...),
    type: str = Query(...)
):
    # Prepare input for model (order must match training)
    car_features = np.array([
        car_name, year, distance, owner, fuel, location, drive, type
    ]).reshape(1, -1)
    prediction = model.predict(car_features)
    return {"prediction": int(prediction[0])}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)