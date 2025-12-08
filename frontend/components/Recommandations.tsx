'use client'

import { useEffect, useState } from 'react'
import Pagination from './Pagination'
import { useRouter, useSearchParams } from "next/navigation";

interface Genre {
    id: number
    name: string
}


interface Preference {
    id: number
    user_id: number
    genre_id: number
    genre_name: string
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

export default function RecommandationsMovies() {
    const [genres, setGenres] = useState<Genre[]>([])
    const [preferences, setPreferences] = useState<Preference[] | []>([])
    const [movies, setMovies] = useState<Movie[] | []>([])
    const [moviesPage, setMoviesPage] = useState<number>(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePagination = (page: number) => {
        setMoviesPage(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.replace(`?${params.toString()}`);
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

    const loadPreferences = async () => {
        try {
            const res = await fetch('/api/movies/preferences')
            if (!res.ok) throw new Error('fetch failed')
            const data = await res.json()
            setPreferences(data)
            setLoading(false)
        } catch {
            setError('Impossible de charger les préférences')
            setLoading(false)
        }
    }

    const loadRecommandations = async () => {
        try {
            const res = await fetch(`/api/movies/movies/recommandations?page=${moviesPage}`)
            if (!res.ok) throw new Error('fetch failed')
            const data = await res.json()
            setMovies(data)
            setLoading(false)
        } catch {
            setError('Impossible de charger les recommandations')
            setLoading(false)
        }
    }

    const deletePreference = async (genre_id: number) => {
        try {
            const res = await fetch(`/api/movies/preferences/${genre_id}?page=${moviesPage}`,
                { method: "DELETE" }
            )
            if (!res.ok) throw new Error('delete failed')
            const data = await res.json()
            loadPreferences()
            loadRecommandations()
            setLoading(false)
        } catch {
            setError('Impossible de supprimer la préférence')
            setLoading(false)
        }
    }

    useEffect(() => {
        loadGenres(),
            loadPreferences()
    }, [])

    useEffect(() => {
        loadRecommandations()
    }, [moviesPage])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const selectedId = formData.get('genres')
        const genreObj = genres.find(g => g.id.toString() === selectedId)
        if (genreObj) {
            const res = await fetch('/api/movies/preferences', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    genre_id: genreObj.id,
                    genre_name: genreObj.name
                })
            })

            if (res.ok) {
                loadPreferences()
                loadRecommandations()
            } else {
                alert('Erreur lors de la création')
            }
        }
    }

    if (loading) return <p className="p-6 text-gray-600">Chargement…</p>
    if (error) return <p className="p-6 text-red-600">{error}</p>

    return (
        <main className="max-w-5xl mx-auto py-10 px-6 space-y-8">
            <form onSubmit={handleSubmit}>
                <select name="genres" id="genres" className="border rounded p-2 mr-2">
                    {genres.map(g => (
                        <option value={g.id} key={g.id}>{g.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                >
                    Ajouter la préférence
                </button>
            </form>


            {/* Genres */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Genres</h2>

                <div className="flex flex-wrap gap-3">
                    {preferences.map(p => (
                        <button
                            key={p.id}
                            onClick={() => deletePreference(p.genre_id)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors bg-blue-500 text-white hover:bg-red-600 cursor-pointer`}
                        >
                            {p.genre_name}
                        </button>
                    ))}

                </div>
            </section>

            {/* Films populaires */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Films populaires</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {movies.map(movie => (
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
                <Pagination currentPage={moviesPage} onPageChange={(page) => handlePagination(page)} />
            </section>

        </main>
    )
}
