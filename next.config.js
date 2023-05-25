/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/admin/login'
            }
        ]
    }
}

module.exports = nextConfig
