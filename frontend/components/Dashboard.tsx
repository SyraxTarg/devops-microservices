'use client'

import { useEffect, useState } from 'react'
import Pagination from './Pagination'
import { useRouter, useSearchParams } from "next/navigation";

interface Genre {
    id: number
    name: string
}


interface Movie {
    title: string
    synopsis: string
    image_path: string
    release_date: string
    popularity: number
    avg_rate: number
    vote_number: number
    original_language: string
    genres: Genre[]
}

export default function DashboardMovies() {
    const [genres, setGenres] = useState<Genre[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [popularMoviesPage, setPopularMoviesPage] = useState<number>(1)
    const [genreFilter, setGenreFilter] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePagination = (page: number) => {
        setPopularMoviesPage(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("popularpage", page.toString());
        router.replace(`?${params.toString()}`);
    };

    const handleGenreFilter = (genre_id: number) => {
        const newGenre = genre_id === genreFilter ? null : genre_id;
        setGenreFilter(newGenre);

        const params = new URLSearchParams(searchParams.toString());
        if (newGenre === null) {
            params.delete("genre");
        } else {
            params.set("genre", newGenre.toString());
        }
        router.replace(`?${params.toString()}`);
        handlePagination(1)
    };

    const loadGenres = async () => {
        try {
            const res = await fetch('/api/movies/genres')
            if (!res.ok) throw new Error('fetch failed')
            const data = await res.json()
            setGenres(data)
            setLoading(false)
        } catch {
            setError('Impossible de charger les genres')
            setLoading(false)
        }
    }

    const loadPopularMovies = async () => {
        try {
            const res = await fetch(`/api/movies/movies/popular?page=${popularMoviesPage}`)
            if (!res.ok) throw new Error('fetch failed')
            const data = await res.json()
            setPopularMovies(data)
            setLoading(false)
        } catch {
            setError('Impossible de charger les films populaires')
            setLoading(false)
        }
    }

    const loadMoviesByGenre = async (genre_id: number | null) => {
        try {
            const res = await fetch(`/api/movies/movies/${genre_id}?page=${popularMoviesPage}`)
            if (!res.ok) throw new Error('fetch failed')
            const data = await res.json()
            setPopularMovies(data)
            setLoading(false)
        } catch {
            setError('Impossible de charger les films par genre')
            setLoading(false)
        }
    }

    useEffect(() => {
        loadGenres()
    }, [])

    useEffect(() => {
        if (genreFilter === null) {
            loadPopularMovies();
        } else {
            loadMoviesByGenre(genreFilter);
        }
    }, [popularMoviesPage, genreFilter]);



    return(
        <main className="max-w-5xl mx-auto py-10 px-6 space-y-8">

            {/* Genres */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Genres</h2>

                <div className="flex flex-wrap gap-3">
                    {genres.map(g => (
                        <button
                            key={g.id}
                            onClick={() => handleGenreFilter(g.id)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors
                                ${genreFilter === g.id ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            {g.name}
                        </button>

                    ))}
                </div>
            </section>

            {/* Films populaires */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Films populaires</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {popularMovies.map(movie => (
                        <div
                            key={movie.title}
                            className="bg-white rounded-xl shadow-md p-3 flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow w-full"
                        >

                            {/* Image format fixe */}
                            <div className="w-full aspect-[2/3] overflow-hidden rounded-md bg-gray-200">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.image_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Titre */}
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                {movie.title}
                            </h3>

                            {/* Synopsis */}
                            <p className="text-xs text-gray-600 line-clamp-2">
                                {movie.synopsis || "Pas de résumé"}
                            </p>

                            {/* Date + note */}
                            <p className="text-xs text-gray-700">
                                <span className="font-medium">{movie.release_date}</span> — ⭐ {movie.avg_rate}/10
                            </p>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1">
                                {movie.genres.map(gen => (
                                    <span
                                        key={gen.id}
                                        className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-[2px] rounded-full"
                                    >
                                        {gen.name}
                                    </span>
                                ))}
                            </div>

                            {/* Langue */}
                            <p className="text-[10px] text-gray-500 uppercase">
                                {movie.original_language}
                            </p>
                        </div>
                    ))}

                </div>
                <Pagination currentPage={popularMoviesPage} onPageChange={(page) => handlePagination(page)} />
            </section>

        </main>


    )
}