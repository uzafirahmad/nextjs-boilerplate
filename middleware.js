import { NextResponse } from "next/server"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export function middleware(request) {
    const token = request.cookies.get('accessToken')?.value;
    if (!token) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}