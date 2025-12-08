import { cookies } from 'next/headers'


export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    try {
        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/preferences`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log(r)
        const json = await r.json().catch(() => ({}))
        return Response.json(json, { status: r.status })
    } catch {
        return Response.json({ detail: 'movies service unreachable' }, { status: 503 })
    }
}


export async function POST(request: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()

        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/preferences`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        )

        const json = await r.json().catch(() => ({}))
        return Response.json(json, { status: r.status })
    } catch {
        return Response.json({ detail: 'preference creation failed' }, { status: 500 })
    }
}


export async function DELETE(request: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()

        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/preferences`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        )

        const json = await r.json().catch(() => ({}))
        return Response.json(json, { status: r.status })
    } catch {
        return Response.json({ detail: 'preference creation failed' }, { status: 500 })
    }
}

