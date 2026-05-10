
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# LOAD MODEL
# -----------------------------
model = joblib.load("xgboost_final_model.pkl")

app = FastAPI(title="Income Prediction API (XGBoost)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # development için
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# INPUT SCHEMA
# -----------------------------
class InputData(BaseModel):
    age: int
    fnlwgt: int
    education_num: int
    capital_gain: int
    capital_loss: int
    hours_per_week: int
    workclass: str
    education: str
    marital_status: str
    occupation: str
    relationship: str
    race: str
    sex: str
    native_country: str

# -----------------------------
# ROOT ENDPOINT
# -----------------------------
@app.get("/")
def home():
    return {"message": "XGBoost Model API is running"}

# -----------------------------
# PREDICTION ENDPOINT
# -----------------------------
@app.post("/predict")
def predict(data: InputData):

    # convert input to dataframe
    input_df = pd.DataFrame([data.dict()])

    # prediction
    pred = model.predict(input_df)[0]

    # result mapping
    result = ">50K" if pred == 1 else "<=50K"

    return {
        "prediction": int(pred),
        "income_class": result
    }



# conda activate adult_ml
# uvicorn main:app --reload



## bu kodu kullan api calistirirken

# BUNUN SONUCU 1 
# {
#   "age": 35,
#   "fnlwgt": 200000,
#   "education_num": 13,
#   "capital_gain": 0,
#   "capital_loss": 0,
#   "hours_per_week": 40,
#   "workclass": "Private",
#   "education": "Bachelors",
#   "marital_status": "Married-civ-spouse",
#   "occupation": "Tech-support",
#   "relationship": "Husband",
#   "race": "White",
#   "sex": "Male",
#   "native_country": "United-States"
# }


### BUNUN SONCUCU 0 
# {
#   "age": 68,
#   "workclass": "Federal-gov",
#   "fnlwgt": 422013,
#   "education": "HS-grad",
#   "education_num": 9,
#   "marital_status": "Divorced",
#   "occupation": "Prof-specialty",
#   "relationship": "Not-in-family",
#   "race": "White",
#   "sex": "Female",
#   "capital_gain": 0,
#   "capital_loss": 3683,
#   "hours_per_week": 40,
#   "native_country": "United-States"
# }


# npx create-react-app@latest adult_income_frontend

#cd adult_income_frontend
# npm start

# npm install axios

# npm install -D tailwindcss postcss autoprefixer
# npx tailwindcss init -p
