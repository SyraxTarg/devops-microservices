from services import preferences_service
from schemas.requests.preference_request import Preference
from schemas.response.preference_response import Preference as PreferenceResponse
from sqlalchemy.orm import Session

async def post_preference(db: Session, user_id: int, preference: Preference)->bool:
    try:
        return preferences_service.add_preference(
            db,
            user_id,
            preference.genre_id,
            preference.genre_name
        )
    except:
        return False

async def remove_preference(db: Session, user_id: int, genre_id: int)-> bool:
    try:
        return preferences_service.remove_preference(
            db,
            genre_id,
            user_id
        )
    except:
        return False

async def get_preferences_by_user(db: Session, user_id: int)->list[Preference]:
    user_preferences = await preferences_service.get_preferences_by_user(db, user_id)

    preferences = []

    for preference in user_preferences:
        preferences.append(
            PreferenceResponse(
                id=preference.id,
                user_id=user_id,
                genre_id=preference.genre_id,
                genre_name=preference.genre_name
            )
        )

    return preferences