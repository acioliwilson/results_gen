module.exports = {
  devServer: {
      proxy: 'http://localhost:3000',
  }
}

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//   ? '/lotteries/'
//   : '/',
//   devServer: {
//     proxy: 'https://node-api-ashen.vercel.app/',
//   }
// }