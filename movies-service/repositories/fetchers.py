import os
import requests

API_URL = os.getenv("MOVIE_API_URL")
TOKEN = os.getenv("API_TOKEN")

def get(path: str):

    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "accept": "application/json"
    }

    r = requests.get(
        url=f"{API_URL}{path}",
        headers=headers
    )

    return r.json()