const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create Item
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Single Item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send();
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!item) return res.status(404).send();
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send();
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Stock Management
router.patch('/:id/stock', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send();

        const { operation, quantity } = req.body;
        if (operation === 'decrement') item.stock -= quantity;
        else if (operation === 'increment') item.stock += quantity;
        else return res.status(400).send('Invalid operation');

        if (item.stock < 0) return res.status(400).send('Insufficient stock');
        await item.save();
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;