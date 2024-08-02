# Toy Directory App

This is a RESTful API using Node.js for a toy directory app.

## Prerequisites

- Node.js 

## Getting Started

Follow these steps to clone and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/kumarshivesh/toy-directory-app.git
cd toy-directory-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start the server:

```bash
npx ts-node src/index.ts
```

## API Endpoints

Here are the next steps you can take to test your API and ensure everything is working correctly:


### 1. Register a New User

1. Open Postman and create a new request.
2. Select the Method: Choose `POST` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/register into the URL field. 
4. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "email": "xyz@example.com",
  "password": "password123"
}
```
5. Send the Request: Click the "Send" button.

### 2. Login

1. Open Postman and create a new request.
2. Select the Method: Choose `POST` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/login into the URL field. 
4. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "email": "xyz@example.com",
  "password": "password123"
}
```
5. Send the Request: Click the "Send" button.
6. Copy the token from the response, as you will need it for the next requests.

### 3. Add a New Toy

1. Open Postman and create a new request.
2. Select the Method: Choose `POST` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/toys into the URL field.
4. Go to the Headers tab and add a new header:
   Key: Authorization
   Value: Bearer <your_jwt_token> (replace <your_jwt_token> with the actual token you copied from the login response).
5. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "name": "Barbie Doll",
  "description": "A soft and cuddly barbie doll",
  "price": 19.99
}
```
6. Send the Request: Click the "Send" button.


### 4. Get Toy Information

1. Open Postman and create a new request.
2. Select the Method: Choose `GET` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/toys/Barbie%20Doll into the URL field.
4. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
5. Send the Request: Click the "Send" button.


### 5. Modify Toy Information

1. Open Postman and create a new request.
2. Select the Method: Choose `PUT` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/toys/3 into the URL field (assuming the toy ID is 3). 
4. Go to the Headers tab and add a new header:
   Key: Authorization
   Value: Bearer <your_jwt_token> (replace <your_jwt_token> with the actual token you copied from the login response).
5. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "name": "Updated Barbie Doll",
  "description": "Updated a soft and cuddly barbie doll",
  "price": 29.99
}
```
6. Send the Request: Click the "Send" button.

### 6. Delete a Toy

1. Open Postman and create a new request.
2. Select the Method: Choose `DELETE` from the dropdown menu.
3. Enter the URL: Paste http://localhost:3000/toys/3 into the URL field (assuming the toy ID is 3). 
4. Go to the Headers tab and add a new header:
   Key: Authorization
   Value: Bearer <your_jwt_token> (replace <your_jwt_token> with the actual token you copied from the login response).
5. Send the Request: Click the "Send" button.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
[Node.js](https://nodejs.org/en)
[express.js](https://expressjs.com/)


