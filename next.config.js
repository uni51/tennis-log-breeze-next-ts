/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['tailwindui.com'], // 読み込みを許可する外部ホスト名を追加
  },
  async redirects() {
    return [
      // {
      //   source: '/memos', // リダイレクト元のURL
      //   destination: '/memos/page/1', // リダイレクト先のURL
      //   permanent: true, // 永続的なリダイレクトかのフラグ
      // },
      // {
      //   source: '/dashboard/memos', // リダイレクト元のURL
      //   destination: '/dashboard/memos/page/1', // リダイレクト先のURL
      //   permanent: true, // 永続的なリダイレクトかのフラグ
      // },
      // {
      //   source: '/memos/categories', // リダイレクト元のURL
      //   destination: '/memos/categories/1/page/1', // リダイレクト先のURL
      //   permanent: true, // 永続的なリダイレクトかのフラグ
      // },
    ]
  },
}

module.exports = nextConfig
