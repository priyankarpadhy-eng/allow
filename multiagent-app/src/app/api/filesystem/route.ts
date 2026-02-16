import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
    try {
        const { path, content } = await req.json()

        if (!path || content === undefined) {
            return NextResponse.json({ error: 'Missing path or content' }, { status: 400 })
        }

        // Clean path to be relative
        const relativePath = path.startsWith('/') ? path.slice(1) : path
        const fullPath = join(process.cwd(), relativePath)

        await writeFile(fullPath, content, 'utf-8')

        console.log(`[Filesystem API] Wrote to ${fullPath}`)
        return NextResponse.json({ success: true, path: fullPath })
    } catch (e: any) {
        console.error('[Filesystem API] Error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
