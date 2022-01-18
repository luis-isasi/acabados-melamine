module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};
