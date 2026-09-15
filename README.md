# 🛒 Shopping List REST API

A modern, lightweight REST API built with **Node.js** and **TypeScript** using a native HTTP server configuration and temporary in-memory storage.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** installed (this project uses `tsx` to run TypeScript directly, no separate compile step needed)
- **npm** (bundled with Node.js)

### Installation

1. Clone the repository and move into the project folder:
   ```bash
   git clone https://github.com/mapk6-apl/shopping-list-api.git
   cd shopping-list-api
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

3. Run the server (via `nodemon` + `tsx`, automatically restarts on file changes):
   ```bash
   npm run dev
   ```
   The API will boot up and start listening on **`http://localhost:4000`**.

### Configuration

The port is currently hardcoded to `4000` in `src/server.ts`. There is no `.env` file or build step — `tsx` runs the TypeScript source directly, and there's no `build`/`start` script for a compiled production run yet.

---

## 🔐 Authentication

This API has **no authentication or authorization** layer. It is intended for local development / learning purposes only and should not be exposed publicly without adding auth, rate limiting, and request sanitization.

---

## 🛣️ API Endpoints

All data payloads must be structured as valid **JSON**.

### 1. Get All Items
Retrieves the full list of products stored in temporary memory.
* **URL:** `/items`
* **Method:** `GET`
* **Success Response:**
  * **Code:** `200 OK`
  * **Payload:**
    ```json
    [
      {
        "id": 1,
        "name": "Whole Milk",
        "category": "Dairy",
        "quantity": 2,
        "notes": "Get the large carton"
      }
    ]
    ```

### 2. Get a Single Item
Retrieves the details of a specific item using its unique numeric ID.
* **URL:** `/items/:id`
* **Method:** `GET`
* **Success Response:**
  * **Code:** `200 OK`
  * **Payload:**
    ```json
    {
      "id": 1,
      "name": "Whole Milk",
      "category": "Dairy",
      "quantity": 2,
      "notes": "Get the large carton"
    }
    ```
* **Error Response:**
  * **Code:** `404 NOT FOUND`
  * **Payload:** `{ "error": "Item not found" }`

### 3. Add an Item
Creates a brand-new shopping item. The server dynamically handles assigning unique auto-incrementing IDs.
* **URL:** `/items`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "Apples",
    "category": "Produce",
    "quantity": 6,
    "notes": "Crisp green ones"
  }
  ```
* **Success Response:**
  * **Code:** `201 CREATED`
  * **Payload:** *(Returns the complete item object including the new ID)*
* **Error Response:**
  * **Code:** `400 BAD REQUEST`
  * **Payload:** `{ "error": "quantity must be a positive integer" }`

### 4. Update an Item
Modifies explicit properties of an existing item by its ID. Fields are optional — only pass the properties you wish to modify.
* **URL:** `/items/:id`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Request Body Example:** *(Updating just the quantity)*
  ```json
  {
    "quantity": 12
  }
  ```
* **Success Response:**
  * **Code:** `200 OK`
  * **Payload:** *(Returns the complete updated item object)*
* **Error Response:**
  * **Code:** `404 NOT FOUND`
  * **Payload:** `{ "error": "Item not found" }`
  * **Code:** `400 BAD REQUEST`
  * **Payload:** `{ "error": "name must be a non-empty string" }`

### 5. Delete an Item
Permanently removes a product from temporary storage by its numeric ID.
* **URL:** `/items/:id`
* **Method:** `DELETE`
* **Success Response:**
  * **Code:** `200 OK`
  * **Payload:** `{ "message": "Item deleted successfully" }`
* **Error Response:**
  * **Code:** `404 NOT FOUND`
  * **Payload:** `{ "error": "Item not found" }`

---

## 🚨 Data Validation

The server enforces type validation on `POST` and `PUT` request parameters:
* **`name`**: Required for creation. Must be a non-empty string.
* **`category`**: Required for creation. Must be a non-empty string.
* **`quantity`**: Required for creation. Must be a valid numeric integer greater than `0`.
* **`notes`**: Optional string tag.

If data parameters breach any of these rules, the server terminates the transaction early and returns a **`400 BAD REQUEST`** status code with an `error` message describing the problem.

> **Note:** This is input validation only — it does not include authentication, rate limiting, or protection against malicious input (e.g. injection attacks). See the [Authentication](#-authentication) section above.
