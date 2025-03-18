# Node.js E-Commerce Microservices Project

## Overview
This project is a microservices-based e-commerce application built using Node.js, JavaScript, and MongoDB. It includes authentication, customer management, item management, order processing, and API gateway functionalities. The services are containerized using Docker for scalability.

## Features
- **User Authentication**: Secure login and registration.
- **Item Management**: CRUD operations for products.
- **Customer Management**: Handling customer details.
- **Order Processing**: Managing customer orders.
- **API Gateway**: Centralized routing for microservices.
- **Docker Integration**: Containerized deployment.

## Technology Stack
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Containerization**: Docker
- **API Communication**: RESTful APIs

## Microservices
1. **Authentication Service** - Handles user authentication and authorization.
2. **Customer Service** - Manages customer-related data.
3. **Item Service** - Handles products and inventory.
4. **Order Service** - Manages customer orders and transactions.
5. **API Gateway** - Routes requests to respective microservices.

## Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud-based)
- Docker

### Clone the Repository
```sh
https://github.com/ApsaraWitharana/Nodejs-Ecommerce-Backend-Microservice.git
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure:
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=5000
```

### Running the Services
Start each microservice individually:
```sh
cd auth-service && npm start
cd customer-service && npm start
cd item-service && npm start
cd order-service && npm start
cd api-gateway && npm start
```

Or run using Docker:
```sh
docker-compose up --build
```

## API Endpoints
### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Add a customer

### Items
- `GET /items` - Get all items
- `POST /items` - Add an item

### Orders
- `POST /orders` - Create an order
- `GET /orders/:id` - Get order details

## Docker Setup
To run the services in Docker:
```sh
docker-compose up --build
```

## Contributing
Feel free to fork the repo and submit pull requests.

## License
This project is licensed under the MIT License.

## Contact

For inquiries or collaboration:
- **Author:** [Sachini Apsara](https://github.com/ApsaraWitharana)
  
<div align="center">
    © 2025 All Rights Reserved, Designed By Sachini Apsara
</div>


⭐ **Feel free to contribute, star the repo, and explore more!**
