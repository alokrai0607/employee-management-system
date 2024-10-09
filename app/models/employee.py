from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Employee(Base):
    __tablename__ = 'employees'

    emp_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    emp_name = Column(String(100), nullable=False)
    emp_dep = Column(String(100), nullable=False)
    emp_salary = Column(Integer, nullable=False)
    emp_contact = Column(String(10), nullable=False)

    # Establish a relationship with Degree table
    degrees = relationship("Degree", back_populates="employee", cascade="all, delete-orphan")

class Degree(Base):
    __tablename__ = 'degrees'

    degree_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    degree_name = Column(String(100), nullable=False)
    degree_year = Column(Integer, nullable=False)
    degree_percentage = Column(Integer, nullable=False)
    emp_id = Column(Integer, ForeignKey('employees.emp_id'))

    # Establish a relationship back to the Employee table
    employee = relationship("Employee", back_populates="degrees")
