from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from database.db import Base

class Preference(Base):
    __tablename__="preference"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    genre_id = Column(Integer)
    genre_name = Column(String)

    user = relationship("User", back_populates="preferences")