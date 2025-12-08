import os
import jwt
from fastapi import Header, HTTPException, Depends
from database.db import get_db
from services import users_service
from models.user_model import User



def get_connected_user(
    authorization: str = Header(None),
    db = Depends(get_db)
):
    """returns the connected user"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required")

    try:
        if authorization:
            parts = authorization.split()
            if len(parts) != 2 or parts[0].lower() != "bearer":
                raise HTTPException(status_code=401, detail="Invalid Authorization header format")

            token = parts[1]
        else:
            raise HTTPException(status_code=401, detail="No token provided")
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid Token")

        if not users_service.get_user_by_name(db, username):
            users_service.add_user(db, username)


        return users_service.get_user_by_name(db, username)

    except jwt.PyJWTError as e :
        raise HTTPException(status_code=401, detail="Invalid or expired token") from e
