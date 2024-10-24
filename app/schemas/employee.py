from pydantic import BaseModel, Field
from typing import List


# Degree Schemas
class DegreeBase(BaseModel):
    degree_name: str = Field(..., max_length=100, description="Name of the degree")
    degree_year: int = Field(..., gt=0, description="Year of completion of the degree")
    degree_percentage: int = Field(..., gt=0, le=100, description="Percentage scored in the degree")

class DegreeCreate(DegreeBase):
    degree_id: int = Field(None, description="ID of the degree (optional during creation)")

    class Config:
        # For Pydantic v1, use orm_mode; for Pydantic v2, use from_attributes
        from_attributes = True  # Enable ORM mapping for Pydantic v2

class DegreeInDB(DegreeBase):
    degree_id: int

    class Config:
        from_attributes = True  # Enable ORM mapping for Pydantic v2


# Employee Schemas
class EmployeeBase(BaseModel):
    emp_name: str = Field(..., max_length=100, pattern="^[a-zA-Z ]+$", description="Employee's full name")
    emp_dep: str = Field(..., max_length=100, pattern="^[a-zA-Z ]+$", description="Department of the employee")
    emp_salary: int = Field(..., gt=0, description="Salary of the employee")
    emp_contact: str = Field(..., max_length=10, min_length=10, pattern="^[0-9]{10}$", description="Contact number of the employee")

class EmployeeCreate(EmployeeBase):
    emp_id: int = Field(None, description="ID of the employee (optional during creation)")
    degrees: List[DegreeCreate] = Field([], description="List of degrees associated with the employee")

    class Config:
        from_attributes = True  # Enable ORM mapping for Pydantic v2

class EmployeeUpdate(EmployeeBase):
    degrees: List[DegreeCreate] = Field([], description="List of degrees associated with the employee")

    class Config:
        from_attributes = True  # Enable ORM mapping for Pydantic v2

class EmployeePartialUpdate(BaseModel):
    emp_name: str = Field(None, max_length=100, pattern="^[a-zA-Z ]+$", description="Optional update for employee name")
    emp_dep: str = Field(None, max_length=100, pattern="^[a-zA-Z ]+$", description="Optional update for employee department")
    emp_salary: int = Field(None, description="Optional update for employee salary")
    emp_contact: str = Field(None, max_length=10, min_length=10, pattern="^[0-9]{10}$", description="Optional update for employee contact number")

    class Config:
        from_attributes = True  # Enable ORM mapping for Pydantic v2

class EmployeeInDB(EmployeeBase):
    emp_id: int
    degrees: List[DegreeInDB] = Field([], description="List of degrees associated with the employee")

    class Config:
        from_attributes = True  # Enable ORM mapping for Pydantic v2
