from sqlalchemy.orm import Session
from app.models.employee import Employee, Degree
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeePartialUpdate
from sqlalchemy.orm import Session


def get_employees(db: Session):
    return db.query(Employee).all()

def get_employee(db: Session, emp_id: int):
    return db.query(Employee).filter(Employee.emp_id == emp_id).first()

def get_degrees_by_employee_id(db: Session, emp_id: int):
    return db.query(Degree).filter(Degree.emp_id == emp_id).all()

def create_employee(db: Session, employee: EmployeeCreate):
    db_employee = Employee(
        emp_name=employee.emp_name,
        emp_dep=employee.emp_dep,
        emp_salary=employee.emp_salary,
        emp_contact=employee.emp_contact
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    for degree in employee.degrees:
        create_degree(db, degree, db_employee.emp_id)

    return db_employee

def update_employee(db: Session, emp_id: int, employee: EmployeeUpdate):
    db_employee = db.query(Employee).filter(Employee.emp_id == emp_id).first()
    if not db_employee:
        return None
    db_employee.emp_name = employee.emp_name
    db_employee.emp_dep = employee.emp_dep
    db_employee.emp_salary = employee.emp_salary
    db_employee.emp_contact = employee.emp_contact
    db.commit()
    db.refresh(db_employee)
    return db_employee

def partially_update_employee(db: Session, emp_id: int, employee: EmployeePartialUpdate):
    db_employee = db.query(Employee).filter(Employee.emp_id == emp_id).first()
    if not db_employee:
        return None

    update_data = employee.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)

    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, emp_id: int):
    db_employee = db.query(Employee).filter(Employee.emp_id == emp_id).first()
    if not db_employee:
        return None
    db.delete(db_employee)
    db.commit()
    return db_employee

#For degree section
def create_degree(db: Session, degree: Degree, emp_id: int):
    db_degree = Degree(
        degree_name=degree.degree_name,
        degree_year=degree.degree_year,
        degree_percentage=degree.degree_percentage,
        emp_id=emp_id
    )
    db.add(db_degree)
    db.commit()
    db.refresh(db_degree)
    return db_degree


