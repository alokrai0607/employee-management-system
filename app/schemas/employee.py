from pydantic import BaseModel, Field

class EmployeeBase(BaseModel):
    emp_name: str = Field(..., max_length=100, pattern="^[a-zA-Z ]+$")
    emp_dep: str = Field(..., max_length=100, pattern="^[a-zA-Z ]+$")
    emp_salary: int = Field(..., gt=0)
    emp_contact: str = Field(..., max_length=10, min_length=10, pattern="^[0-9]{10}$")

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(EmployeeBase):
    pass

class EmployeePartialUpdate(BaseModel):
    emp_name: str = Field(None, max_length=100, pattern="^[a-zA-Z ]+$")
    emp_dep: str = Field(None, max_length=100, pattern="^[a-zA-Z ]+$")
    emp_salary: int = Field(None)
    emp_contact: str = Field(None, max_length=10, min_length=10, pattern="^[0-9]{10}$")

class EmployeeInDB(EmployeeBase):
    emp_id: int

    class Config:
        orm_mode = True
