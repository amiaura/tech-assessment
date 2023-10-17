const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const orders = [];

app.post('/post/orders', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/orders/:customer', (req, res) => {
  const customer = req.params.customer;
  const customerOrders = orders.filter((order) => order.customer === customer);
  res.json(customerOrders);
});

app.get('/orders', (req, res) => {
  console.log(orders);
  res.send(orders);
});

// Update Order
app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const updatedOrder = req.body;
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    res.status(404).send('Order not found');
  } else {
    orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
    res.json(orders[orderIndex]);
  }
});

// Cancel Order
app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex === -1) {
    res.status(404).send('Order not found');
  } else {
    const canceledOrder = orders.splice(orderIndex, 1);
    res.json(canceledOrder[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;