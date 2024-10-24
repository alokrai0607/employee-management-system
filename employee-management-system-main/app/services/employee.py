from sqlalchemy.orm import Session
from app.repository import employee as employee_repo
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeePartialUpdate


def get_all_employees(db: Session):
    return employee_repo.get_employees(db)

def get_degrees_of_employee(db: Session, emp_id: int):
    return employee_repo.get_degrees_by_employee_id(db, emp_id)

def get_employee_by_id(db: Session, emp_id: int):
    return employee_repo.get_employee(db, emp_id)

def create_new_employee(db: Session, employee: EmployeeCreate):
    return employee_repo.create_employee(db, employee)

def update_existing_employee(db: Session, emp_id: int, employee: EmployeeUpdate):
    return employee_repo.update_employee(db, emp_id, employee)

def delete_employee_by_id(db: Session, emp_id: int):
    return employee_repo.delete_employee(db, emp_id)

def partially_update_employee(db: Session, emp_id: int, employee: EmployeePartialUpdate):
    db_employee = employee_repo.get_employee(db, emp_id)
    if not db_employee:
        return None

    update_data = employee.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)

    db.commit()
    db.refresh(db_employee)
    return db_employee
