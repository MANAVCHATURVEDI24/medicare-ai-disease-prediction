from fastapi import FastAPI
from app.routes.prediction import router as prediction_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Healthcare AI",
    version="1.0.0",
    description="Disease Prediction using Lab Reports"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(prediction_router)


@app.get("/")
def root():
    return {
        "message": "Healthcare AI API is running"
    }