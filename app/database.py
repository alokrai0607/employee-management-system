from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:0303@localhost/employee_db"

#used to create an SQLAlchemy Engine object,
#  which serves as the core interface to the database.
engine = create_engine(SQLALCHEMY_DATABASE_URL)

#used to associate or bind the Session with a specific engin
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
