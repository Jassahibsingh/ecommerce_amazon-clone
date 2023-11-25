/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'omnczttujsoparudbemf.supabase.co'
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: 'img-src \'self\' data:; frame-src https: http://localhost:3000/checkout;',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
