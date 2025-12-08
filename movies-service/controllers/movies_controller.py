from sqlalchemy.orm import Session
from services import movies_service, genres_service, preferences_service
from schemas.response.genre_response import Genre
from schemas.response.movie_response import Movie
from fastapi import HTTPException

async def get_popular_movies(page: int)->list[Movie]:
    all_movies = await movies_service.get_movies(f"/movie/popular?language=fr&page={page}")

    movies = []
    all_genres = await genres_service.get_genres("/genre/movie/list?language=fr")
    for movie in all_movies.get("movies"):
        genres = []

        for genre_id in movie.get("genre_ids"):
            genre = await genres_service.get_genre(all_genres, genre_id)
            genres.append(
                Genre(
                    id=genre.get("id"),
                    name=genre.get("name")
                )
            )

        movies.append(
            Movie(
                title=movie.get("title"),
                synopsis=movie.get("overview"),
                image_path=movie.get("poster_path"),
                release_date=movie.get("release_date"),
                popularity=movie.get("popularity"),
                avg_rate=movie.get("vote_average"),
                vote_number=movie.get("vote_count"),
                original_language=movie.get("original_language"),
                genres=genres
            )
        )

    return movies


async def get_movies_by_user_preferences(db: Session, page: int, user_id: int)->list[Movie]:
    user_preferences = await preferences_service.get_preferences_by_user(db, user_id)
    preferences = [str(pref.genre_id) for pref in user_preferences]

    all_movies = await movies_service.get_movies(f"/discover/movie?include_adult=false&include_video=false&language=fr&page={page}&sort_by=popularity.desc&with_genres={"|".join(preferences)}")
    movies = []
    all_genres = await genres_service.get_genres("/genre/movie/list?language=fr")
    for movie in all_movies.get("movies"):
        genres = []

        for genre_id in movie.get("genre_ids"):
            genre = await genres_service.get_genre(all_genres, genre_id)
            genres.append(
                Genre(
                    id=genre.get("id"),
                    name=genre.get("name")
                )
            )

        movies.append(
            Movie(
                title=movie.get("title"),
                synopsis=movie.get("overview"),
                image_path=movie.get("poster_path"),
                release_date=movie.get("release_date"),
                popularity=movie.get("popularity"),
                avg_rate=movie.get("vote_average"),
                vote_number=movie.get("vote_count"),
                original_language=movie.get("original_language"),
                genres=genres
            )
        )

    return movies


async def get_movies_by_genre(page: int, genre_id: int)->list[Movie]:

    all_genres = await genres_service.get_genres("/genre/movie/list?language=fr")
    genre_ids = [genre["id"] for genre in all_genres["genres"]]
    if genre_id not in genre_ids:
        raise HTTPException(status_code=404, detail="Le genre n'existe pas")

    all_movies = await movies_service.get_movies(f"/discover/movie?include_adult=false&include_video=false&language=fr&page={page}&sort_by=popularity.desc&with_genres={genre_id}")
    movies = []
    for movie in all_movies.get("movies"):
        genres = []

        for genre_id in movie.get("genre_ids"):
            genre = await genres_service.get_genre(all_genres, genre_id)
            genres.append(
                Genre(
                    id=genre.get("id"),
                    name=genre.get("name")
                )
            )

        movies.append(
            Movie(
                title=movie.get("title"),
                synopsis=movie.get("overview"),
                image_path=movie.get("poster_path"),
                release_date=movie.get("release_date"),
                popularity=movie.get("popularity"),
                avg_rate=movie.get("vote_average"),
                vote_number=movie.get("vote_count"),
                original_language=movie.get("original_language"),
                genres=genres
            )
        )

    return movies