const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-sanity"],
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https:",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
      {
        source: "/((?!studio).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              // Google Translate loads scripts from multiple subdomains
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
                " https://translate.google.com" +
                " https://translate.googleapis.com" +
                " https://translate-pa.googleapis.com" +
                " https://www.gstatic.com" +
                " https://www.googletagmanager.com" +
                " https://www.google-analytics.com" +
                " https://core.sanity.io" +
                " https://*.sanity.io",

              // Translate injects a <link> stylesheet from translate.googleapis.com
              "style-src 'self' 'unsafe-inline'" +
                " https://translate.googleapis.com" +
                " https://translate-pa.googleapis.com" +
                " https://fonts.googleapis.com" +
                " https://www.gstatic.com",

              // Flag sprites and UI icons come from ssl.gstatic.com
              "img-src 'self' data: blob:" +
                " https://translate.google.com" +
                " https://translate.googleapis.com" +
                " https://translate-pa.googleapis.com" +
                " https://www.gstatic.com" +
                " https://ssl.gstatic.com" +
                " https://fonts.gstatic.com" +
                " https://lh3.googleusercontent.com" +
                " https://images.unsplash.com" +
                " https://cdn.sanity.io",

              "font-src 'self'" +
                " https://fonts.gstatic.com" +
                " https://translate.googleapis.com",

              // The widget renders inside a sandboxed iframe
              "frame-src 'self'" +
                " https://translate.google.com" +
                " https://translate.googleapis.com" +
                " https://translate-pa.googleapis.com" +
                " https://www.google.com" +
                " https://www.google.com/maps" +
                " https://maps.google.com" +
                " https://core.sanity.io",

              // XHR/fetch calls go to translate-pa.googleapis.com (newer API)
              // as well as the classic translate.googleapis.com endpoint
              "connect-src 'self'" +
                " https://api.web3forms.com" +
                " https://translate.googleapis.com" +
                " https://translate-pa.googleapis.com" +
                " https://translate.google.com" +
                " https://www.googleapis.com" +
                " https://www.google-analytics.com" +
                " https://*.api.sanity.io" +
                " https://*.apicdn.sanity.io" +
                " https://cdn.sanity.io" +
                " wss://*.api.sanity.io",

              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;