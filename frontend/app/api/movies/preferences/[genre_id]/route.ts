import { cookies } from 'next/headers'


export async function DELETE(request: Request, context: any) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return Response.json({ detail: 'unauthorized' }, { status: 401 })
    }

    try {
        const { genre_id } = await context.params

        const r = await fetch(
            `${process.env.MOVIE_SERVICE_URL || 'http://localhost:8082/api/v1'}/preferences/${genre_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        const json = await r.json().catch(() => ({}))
        return Response.json(json, { status: r.status })
    } catch {
        return Response.json({ detail: 'preference deletion failed' }, { status: 500 })
    }
}

