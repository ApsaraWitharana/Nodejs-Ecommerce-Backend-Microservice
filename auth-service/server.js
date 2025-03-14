const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3004;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Auth Service DB Connected'))
    .catch(err => console.error(err));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Auth service listening on port ${port}`);
});