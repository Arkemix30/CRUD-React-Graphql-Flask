from os import environ 
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base
# Getting URI from .ENV
dburi= environ.get('DATA_BASE_URI')
engine = create_engine(f'postgresql+psycopg2://{dburi}', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))


Base = declarative_base()
Base.query = db_session.query_property()
Base.bind = engine  


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)