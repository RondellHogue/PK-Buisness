import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // The Blob store is configured as private, so upload with private access.
    const blob = await put(`logos/${Date.now()}-${file.name}`, file, {
      access: 'private',
    })

    // Private blob URLs are not publicly accessible. Return a URL pointing at our
    // delivery route, which streams the file so it can be used directly in <img src>.
    const url = `/api/file?pathname=${encodeURIComponent(blob.pathname)}`

    return NextResponse.json({ url, pathname: blob.pathname })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
