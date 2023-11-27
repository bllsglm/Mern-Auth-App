# Mern Authentication App

![This App built with the MERN stack & Redux-RTK.](./mern.png)

This project is part of my MERN Stack portfolio. It is a simple Mern App that uses RTK Query.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run the Application](#run-the-application)

### Features

<a name="features"></a>

- User registration and login.
- Easy-to-use and user-friendly interface.
- User authentication with JsonWebToken
- Clean and intuitive design.
- Responsive layout for mobile and desktop.
- Built with MERN stack (MongoDB, Express, React, Node.js)
- Utilizes Redux Toolkit and RTK Query for state management.

### Usage

<a name="usage"></a>

1. Create a MongoDB database and obtain your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Set the following environment variables:

### Environment Variables

<a name="environment-variables"></a>

```bash
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```

### Installation

<a name="installation"></a> 3. Install Dependencies (frontend & backend):

```bash
npm install
cd frontend
npm install
```

### Run the Application

<a name="run-the-application"></a>

```bash
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server

```

5. BUILD & DEPLOY

```bash
# Create frontend prod build
cd frontend
npm run build
```
