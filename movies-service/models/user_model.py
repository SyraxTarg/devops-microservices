from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database.db import Base

class User(Base):
    
    __tablename__="user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)

    preferences = relationship("Preference", back_populates="user")