# 🛒 Shopping List REST API

A modern, lightweight REST API built with **Node.js** and **TypeScript** using a native HTTP server configuration and temporary in-memory storage.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** installed on your system.

### Installation
1. Install all required dependencies:
   ```bash
   npm install
   ```

2. Run the development server (automatically restarts on file changes):
   ```bash
   npm run dev
   ```
   The API will boot up and start listening on **`http://localhost:4001`**.

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

### 4. Update an Item
Modifies explicit properties of an existing item by its ID. Because the structure uses a flexible validation design, fields are completely optional—you only need to pass properties you wish to modify.
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

### 5. Delete an Item
Permanently removes a product out of temporary storage by its numeric ID.
* **URL:** `/items/:id`
* **Method:** `DELETE`
* **Success Response:**
  * **Code:** `200 OK`
  * **Payload:** `{ "message": "Item deleted successfully" }`
* **Error Response:**
  * **Code:** `404 NOT FOUND`
  * **Payload:** `{ "message": "Item not found" }`

---

## 🚨 Data Validation & Security Guards
The server protects the data layer by actively enforcing type validations on `POST` and `PUT` request parameters:
* **`name`**: Required for creation. Must be a non-empty string.
* **`category`**: Required for creation. Must be a non-empty string.
* **`quantity`**: Required for creation. Must be a valid numeric integer greater than `0`.
* **`notes`**: Optional string tag.

If data parameters breach any of these rules, the server terminates the transaction early and returns a **`400 BAD REQUEST`** status code outlining the exact error.
