from repositories.fetchers import get

async def get_movies(path: str)-> dict:
    movies =  get(path)
    return {"status": "200", "movies": movies.get("results")}
