import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    try {
        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/genres/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const json = await r.json().catch(() => ({}))
        return Response.json(json, { status: r.status })
    } catch {
        return Response.json({ detail: 'movie service unreachable' }, { status: 503 })
    }
}