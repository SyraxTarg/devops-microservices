'use client'
import { Suspense } from 'react'
import DashboardMovies from '@/components/Dashboard'



export default function Movies() {

    return(
        <main className="max-w-5xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6">Films</h1>
            <Suspense fallback={<p>Chargement...</p>}>
                <DashboardMovies />
            </Suspense>
        </main>
    )
}