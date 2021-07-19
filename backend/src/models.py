from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql+psycopg2://arkemix:Ligiayfogy30!@localhost:5432/test', convert_unicode=True)
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