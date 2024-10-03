from fastapi import FastAPI
from app.api import employee
from app.database import engine
from app.models import employee as employee_model
from fastapi.middleware.cors import CORSMiddleware

employee_model.Base.metadata.create_all(bind=engine)


app = FastAPI(title="Employee Management System")


app.include_router(employee.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for testing purposes)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


#python -m uvicorn app.main:app --reload
# http://127.0.0.1:8000/docs
