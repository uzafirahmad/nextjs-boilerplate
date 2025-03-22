import { NextResponse } from "next/server"
import { jwtVerify } from 'jose'
import refresh from "./utils/refresh";

export async function middleware(request) {
    try {
        const token = request.cookies.get('accessToken')?.value;

        if (!token) {
            throw new Error('No access token');
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        // Attempt to refresh the token
        const refreshToken = request.cookies.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.redirect(
                new URL('/login', request.url)
            )
        }

        try {

            const { flag: refreshed, accessToken: newAccessToken, refreshToken: newRefreshToken } = await refresh(refreshToken);

            if (!refreshed) {
                throw new Error('Refresh API failed');
            }

            // Verify the new access token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(newAccessToken, secret);

            // Create a redirect response to the same URL with new cookies
            const redirectResponse = NextResponse.redirect(request.url);

            redirectResponse.cookies.set('accessToken', newAccessToken);
            redirectResponse.cookies.set('refreshToken', newRefreshToken);

            return redirectResponse;
        } catch (refreshError) {
            // Refresh failed, redirect to login
            return NextResponse.redirect(
                new URL('/login', request.url)
            )
        }
    }
}

export const config = {
    matcher: ['/']
}