/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // Optionally, you can add pathname, port, etc.
      },
    ],
  },
};

export default nextConfig;
