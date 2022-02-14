const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv').config({path: `${__dirname}/../../.env`})


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `http://localhost:${process.env.PORT}`,
            changeOrigin: true,
        })
    );
};