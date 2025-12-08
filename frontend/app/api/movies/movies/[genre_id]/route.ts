import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, context: any) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";

    const { genre_id } = await context.params

    try {
        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/movies/${genre_id}?page=${page}`,
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