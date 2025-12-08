'use client'
import { Suspense } from "react";
import RecommandationsMovies from "@/components/Recommandations"

export default function Recommandations() {

    return(
        <main className="max-w-5xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6">Recommandations</h1>
            <Suspense fallback={<p>Chargement...</p>}>
                <RecommandationsMovies />
            </Suspense>
        </main>
    )
}