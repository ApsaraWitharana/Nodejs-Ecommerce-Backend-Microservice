const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create Customer
router.post('/', async (req, res) => {
    try {
        const customer = new Customer({
            userId: req.headers['x-user-id'],
            ...req.body
        });
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Customers (with optional userId filter)
router.get('/', async (req, res) => {
    try {
        const filter = req.query.userId ? { userId: req.query.userId } : {};
        const customers = await Customer.find(filter);
        res.send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Single Customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Customer
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.send({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;