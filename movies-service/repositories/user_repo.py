from typing import Optional
from sqlalchemy.orm import Session
from models.user_model import User

def get_user_by_name(db: Session, username: str) -> Optional[User]:
    """Retrieve a user by their name."""
    return db.query(User).filter(User.username == username).first()

def add_user(db: Session, user: User) -> None:
    """Add a new user to the database."""
    db.add(user)

def commit_user(db: Session) -> None:
    """Commit the current transaction related to users."""
    db.commit()

def refresh_user(db: Session, user: User) -> None:
    """Refresh the state of a user from the database."""
    db.refresh(user)