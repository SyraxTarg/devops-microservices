from typing import Optional
from sqlalchemy.orm import Session
from models.preference_model import Preference

def add_preference(db: Session, preference: Preference) -> None:
    """Add a new preference to the database."""
    db.add(preference)

def commit_preference(db: Session) -> None:
    """Commit the current transaction related to preferences."""
    db.commit()

def refresh_preference(db: Session, preference: Preference) -> None:
    """Refresh the state of a preference from the database."""
    db.refresh(preference)

def get_preferences_by_user(db: Session, user_id: int) -> list[Preference]:
    """Get a user's preferences"""
    return db.query(Preference).filter(Preference.user_id == user_id).all()

def delete_preference(db: Session, preference: Preference) -> None:
    """Delete a preference from db"""
    return db.delete(preference)

def get_preference_by_id_by_user(db: Session, user_id: int, genre_id: int) -> Preference:
    """Get a user's preferences"""
    return db.query(Preference).filter(Preference.user_id == user_id).filter(Preference.genre_id == genre_id).first()