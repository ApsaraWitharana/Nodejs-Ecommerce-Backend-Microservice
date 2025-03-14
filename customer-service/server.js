const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database'); // Ensure this path is correct
const customerRoutes = require('./routes/customerRoutes');
const Customer = require('./models/Customer');

const app = express();
const port = process.env.PORT || 3001;

if (!config || !config.mongodb || !config.mongodb.uri) {
    console.error("Database configuration is missing or incorrect.");
    process.exit(1);
}

mongoose.connect(config.mongodb.uri, config.mongodb.options)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Customer service running on port ${port}`);
            console.log(`MongoDB URI: ${config.mongodb.uri}`);
        });
    })
    .catch(err => {
        console.error('Fatal startup error:', err);
        process.exit(1);
    });

Customer.init()
    .then(() => console.log('Indexes ensured'))
    .catch(err => console.error('Error creating indexes:', err));

app.use(express.json());
app.use('/api/customers', customerRoutes);

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

module.exports = app;
