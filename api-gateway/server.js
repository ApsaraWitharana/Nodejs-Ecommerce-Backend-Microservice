const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.use('/api/auth', createProxyMiddleware({ target: 'http://auth-service:3004', changeOrigin: true }));

app.use('/api/customers', authenticateJWT, createProxyMiddleware({
    target: 'http://customer-service:3001',
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        if (req.user) proxyReq.setHeader('X-User-Id', req.user.userId);
    }
}));

app.use('/api/items', authenticateJWT, createProxyMiddleware({
    target: 'http://item-service:3002',
    changeOrigin: true
}));

app.use('/api/orders', authenticateJWT, createProxyMiddleware({
    target: 'http://order-service:3003',
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        if (req.user) proxyReq.setHeader('X-User-Id', req.user.userId);
    }
}));

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});