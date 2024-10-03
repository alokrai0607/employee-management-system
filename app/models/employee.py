from sqlalchemy import Column, Integer, String
from app.database import Base

class Employee(Base):
    __tablename__ = 'employees'

    emp_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    emp_name = Column(String(100), nullable=False)
    emp_dep = Column(String(100), nullable=False)
    emp_salary = Column(Integer, nullable=False)
    emp_contact = Column(String(10), nullable=False)
