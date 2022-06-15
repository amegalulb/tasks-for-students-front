const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/public': path.resolve(__dirname, 'public'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/entities': path.resolve(__dirname, 'src/entities'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
    },
  },
};
