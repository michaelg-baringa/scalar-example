/* eslint-disable no-template-curly-in-string */
/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    distDir: "build",
    output: "standalone",
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; always;",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Cache-Control",
                        value: "no-cache, no-store, must-revalidate",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "accelerometer=(self), camera=(self), geolocation=(self), gyroscope=(self), magnetometer=(self), microphone=(self), payment=(self), usb=(self)",
                    },
                ],
            },
        ]
    },
}

export default nextConfig
