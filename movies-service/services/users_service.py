from typing import Optional
from sqlalchemy.orm import Session
from models.user_model import User
from repositories import user_repo

def get_user_by_name(db: Session, username: str) -> Optional[User]:
    """Retrieve a user by their name."""
    return user_repo.get_user_by_name(db, username)

def add_user(db: Session, username) -> User:
    """Add a new user to the database."""
    new_user = User(
        username=username
    )
    user_repo.add_user(db, new_user)
    user_repo.commit_user(db)

    return get_user_by_name(db, username)
