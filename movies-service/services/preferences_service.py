from typing import Optional
from sqlalchemy.orm import Session
from models.preference_model import Preference
from repositories import preference_repo


def add_preference(db: Session, user_id: int, genre_id: int, genre_name: str) -> bool:
    """Add a new preference to the database."""

    new_preference = Preference(
        user_id=user_id,
        genre_id=genre_id,
        genre_name=genre_name
    )

    preference_repo.add_preference(db, new_preference)
    preference_repo.commit_preference(db)

    return True

async def get_preferences_by_user(db: Session, user_id: int)->list[Preference]:
    """Get a users preferences"""
    return preference_repo.get_preferences_by_user(db, user_id)

def remove_preference(db: Session, genre_id: int, user_id: int)-> bool:
    """Remove a users preference"""
    preference = preference_repo.get_preference_by_id_by_user(db, user_id, genre_id)
    if not preference:
        return True

    preference_repo.delete_preference(db, preference)
    preference_repo.commit_preference(db)

    return True