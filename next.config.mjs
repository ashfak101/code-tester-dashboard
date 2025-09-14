/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    webpack: (config, { isServer }) => {
        // Monaco Editor webpack config
        if (!isServer) {
            config.output.globalObject = 'self'
        }

        return config
    },
}

export default nextConfig
