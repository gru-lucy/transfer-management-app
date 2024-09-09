# Mysterium

## Overview

This project is a basic web application using Express and Sequelize, demonstrating a simple system for handling accounts and transactions. It includes functionality for transferring funds between accounts, retrieving account balances, and seeding the database with initial data.

## Features

- **Account Management**: Transfer funds between accounts and retrieve account balances.
- **Transaction Logging**: Log transactions and track their status.
- **Database Seeding**: Populate the database with initial users and accounts.

## Technologies Used

- **Backend Framework**: Express
- **Database**: Sequelize ORM
- **Database**: PostgreSQL (assumed based on Sequelize configuration)
- **Environment Variables**: dotenv
- **Data Seeding**: Custom seed scripts

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gru-lucy/transfer-management-app.git
   cd transfer-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```bash
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/your-database
   ```

## Database Setup

**Database Configuration**:
   - Ensure that your database is configured correctly in `src/config/db.ts`.
   - Modify DATABASE_URL or other database connection settings as needed.

## Running the Application

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000` to access the application.


## Code Overview

### Models
- **Account**: Represents a user's account.
- **Transaction**: Defines the Transaction model with fields for `id`, `fromAccountId`, `toAccountId`, `amount`, `transactionType`, and `status`.
- **User**: Represents a user in the system.

### Routes
- **Account Routes**: Handles API routes for transferring credits/debits and getting account balances.

### Services
- **Account Service**: Contains logic for transferring funds between accounts and retrieving account balances.


## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.