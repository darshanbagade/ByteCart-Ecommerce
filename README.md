# ByteCart E-Commerce Backend

This is the backend for **ByteCart**, a full-featured e-commerce application built using the MERN stack. It provides RESTful APIs for handling users, products, carts, orders, and authentication.

**Note:** Frontend development is currently in progress.

## Features

- User registration and login with JWT authentication
- Role-based access control (admin and user)
- Product management with creation, updates, and retrieval
- Cart management with add/remove/update items
- Order placement, cancellation, and payment status updates
- Admin routes to manage order and payment updates
- Separate address model for flexible address storage

## Folder Structure

```
server/
├── config/             # Database connection and config files
├── controllers/        # Route handler functions
├── middlewares/        # Authentication and role validation
├── models/             # Mongoose schema definitions
├── routes/             # API route definitions
├── utils/              # Custom error and response classes
├── app.js              # Express app configuration
├── server.js           # Server entry point
```

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Development tools:** Postman, dotenv, nodemon

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/darshanbagade/ByteCart-Ecommerce.git
    cd ByteCart-Ecommerce/server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root with the following:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **API Base URL:**

    ```
    http://localhost:5000/api/v1
    ```

## API Overview


| Endpoint                          | HTTP Method | Description                                      | Authentication Required | Role Access       |
|-----------------------------------|-------------|--------------------------------------------------|------------------------|-------------------|
| `/auth/register`                 | POST        | Register a new user with email and password      | No                     | Public            |
| `/auth/login`                    | POST        | Authenticate user and return JWT token           | No                     | Public            |
| `/auth/profile`                  | GET         | Retrieve authenticated user’s profile            | Yes (JWT)             | User              |
| `/auth/profile`                  | PATCH       | Update authenticated user’s profile              | Yes (JWT)             | User              |
| `/users`                         | GET         | Retrieve all users (admin only)                  | Yes (JWT)             | Admin             |
| `/users/:id`                     | GET         | Retrieve a specific user by ID (admin only)      | Yes (JWT)             | Admin             |
| `/users/:id`                     | PATCH       | Update a specific user by ID (admin only)        | Yes (JWT)             | Admin             |
| `/users/:id`                     | DELETE      | Delete a specific user by ID (admin only)        | Yes (JWT)             | Admin             |
| `/products`                      | GET         | Retrieve all products (public)                   | No                     | Public            |
| `/products/:id`                  | GET         | Retrieve a specific product by ID (public)       | No                     | Public            |
| `/products`                      | POST        | Create a new product                            | Yes (JWT)             | Admin             |
| `/products/:id`                  | PATCH       | Update a specific product by ID                 | Yes (JWT)             | Admin             |
| `/products/:id`                  | DELETE      | Delete a specific product by ID                 | Yes (JWT)             | Admin             |
| `/cart`                          | GET         | Retrieve authenticated user’s cart               | Yes (JWT)             | User              |
| `/cart`                          | POST        | Add item to authenticated user’s cart            | Yes (JWT)             | User              |
| `/cart/:itemId`                  | PATCH       | Update item quantity in cart                    | Yes (JWT)             | User              |
| `/cart/:itemId`                  | DELETE      | Remove item from cart                           | Yes (JWT)             | User              |
| `/orders`                        | GET         | Retrieve authenticated user’s orders             | Yes (JWT)             | User              |
| `/orders`                        | POST        | Place a new order from cart                     | Yes (JWT)             | User              |
| `/orders/:id`                    | GET         | Retrieve a specific order by ID                 | Yes (JWT)             | User, Admin       |
| `/orders/:id`                    | PATCH       | Update order status (e.g., cancel, process)     | Yes (JWT)             | User (cancel), Admin (status) |
| `/orders/:id/payment`            | PATCH       | Update payment status for an order              | Yes (JWT)             | Admin             |
| `/admin/orders`                  | GET         | Retrieve all orders (admin only)                | Yes (JWT)             | Admin             |
| `/addresses`                     | GET         | Retrieve authenticated user’s addresses          | Yes (JWT)             | User              |
| `/addresses`                     | POST        | Add a new address for authenticated user         | Yes (JWT)             | User              |
| `/addresses/:id`                 | PATCH       | Update a specific address by ID                 | Yes (JWT)             | User              |
| `/addresses/:id`                 | DELETE      | Delete a specific address by ID                 | Yes (JWT)             | User              |

## Author

Created by [Darshan Bagade](https://github.com/darshanbagade)
