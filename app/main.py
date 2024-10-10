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
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)



#                   .\venv\Scripts\Activate.ps1 

#                   python -m uvicorn app.main:app --reload

#                   http://127.0.0.1:8000/docs
