const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Customer Service DB Connected'))
    .catch(err => console.error(err));

app.use(express.json());
app.use('/api/customers', customerRoutes);

app.listen(port, () => {
    console.log(`Customer service listening on port ${port}`);
});