"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    if (pathname === "/") return null

    const linkStyle = (path: string) => ({
        textDecoration: pathname === path ? "underline" : "none",
        fontWeight: pathname === path ? "bold" : "normal",
        opacity: pathname === path ? 1 : 0.8,
    })

    return (
        <nav style={{
            padding: "1rem",
            background: "rgba(0,0,255,0.8)",
            color: "white",
            display: "flex",
            gap: "1.5rem",
            fontSize: "1.1rem"
        }}>
            <Link href="/dashboard" style={linkStyle("/dashboard")}>Accueil</Link>
            <Link href="/movies" style={linkStyle("/movies")}>Films</Link>
            <Link href="/movies/recommandations" style={linkStyle("/movies/recommandations")}>Recommandations</Link>
        </nav>
    )
}
