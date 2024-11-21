import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest): NextResponse {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
    const cspHeader = `
    default-src 'self';
    script-src 'nonce-${nonce}' 'strict-dynamic' https://cdn.jsdelivr.net
        ${process.env.NODE_ENV === "production"
            ? ""
            : `'unsafe-eval' 'unsafe-hashes'`
        };
    style-src 
        'self' 
        'nonce-${nonce}'
        'unsafe-hashes'
    ;
    connect-src 'self' ;
    img-src 'self' https://cdn-ukwest.onetrust.com/logos/ blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    `
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, " ")
        .trim()

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-nonce", nonce)
    requestHeaders.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    )

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    response.headers.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    )

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
}
