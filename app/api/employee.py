from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeInDB, EmployeePartialUpdate
from app.services import employee as employee_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/employees", response_model=EmployeeInDB)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return employee_service.create_new_employee(db, employee)

@router.get("/employees", response_model=List[EmployeeInDB])
def get_employees(db: Session = Depends(get_db)):
    return employee_service.get_all_employees(db)

@router.get("/employees/{emp_id}", response_model=EmployeeInDB)
def get_employee(emp_id: int, db: Session = Depends(get_db)):
    db_employee = employee_service.get_employee_by_id(db, emp_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@router.patch("/employees/{emp_id}", response_model=EmployeeInDB)
def partial_update_employee(emp_id: int, employee: EmployeePartialUpdate, db: Session = Depends(get_db)):
    db_employee = employee_service.get_employee_by_id(db, emp_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    update_data = employee.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)

    db.commit()
    db.refresh(db_employee)

    return db_employee

@router.put("/employees/{emp_id}", response_model=EmployeeInDB)
def update_employee(emp_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    db_employee = employee_service.update_existing_employee(db, emp_id, employee)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee


@router.delete("/employees/{emp_id}", response_model=EmployeeInDB)
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    db_employee = employee_service.delete_employee_by_id(db, emp_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee
