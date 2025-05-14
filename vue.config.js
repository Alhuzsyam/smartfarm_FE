module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Ganti dengan URL backend Anda
        changeOrigin: true,
        secure: false, // Jika menggunakan HTTPS, setel ini ke true
      },
    },
  },
}
