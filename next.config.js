/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        FEATURE_FLAG_SERVER_ACTIONS: true,
        // Your public (client-side) configurations
    },
}

module.exports = nextConfig
