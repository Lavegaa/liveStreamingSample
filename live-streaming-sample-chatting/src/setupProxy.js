const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://10.100.120.39:18090',
      changeOrigin: true
    })
  )
  
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://10.100.120.39:18090',
      ws: true
    })
  )
}
