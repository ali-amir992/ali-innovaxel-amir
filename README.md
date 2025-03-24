# URL Shortener

A simple and efficient URL shortener built with **Node.js, Express.js, and TypeScript**. This application allows users to shorten URLs, retrieve original URLs, update shortened URLs, delete them, and track usage statistics.

## 🚀 Features

- Shorten long URLs
- Redirect users to original URLs
- Update shortened URLs
- Delete short URLs
- Track access count for each short URL
- RESTful API with proper error handling


## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose ORM
- **Frontend:** React.js (Vite), TypeScript
- **HTTP Client:** Axios

## 📂 Project Structure

```
## 🛠 Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB (Local or Cloud, e.g., MongoDB Atlas)

### Backend Setup
```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev  # Start development server
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev  # Start React app
```

## 📌 API Endpoints

### 1️⃣ Shorten a URL
**POST** `/api/v1/shorten`
```json
{
  "url": "https://example.com"
}
```
_Response:_
```json
{
  "id": "12345",
  "shortCode": "abc123",
  "url": "https://example.com",
  "createdAt": "2025-03-22T12:00:00.000Z"
}
```

### 2️⃣ Redirect to Original URL
**GET** `/:shortCode`
_Response:_ **Redirects to the original URL**

### 3️⃣ Get URL Stats
**GET** `/api/v1/:shortCode/stats`
_Response:_
```json
{
  "shortCode": "abc123",
  "accessCount": 10,
  "createdAt": "2025-03-22T12:00:00.000Z"
}
```

### 4️⃣ Update Shortened URL
**PUT** `/api/v1/:shortCode`
```json
{
  "url": "https://newexample.com"
}
```

### 5️⃣ Delete Shortened URL
**DELETE** `/api/v1/:shortCode`
_Response:_ `{ "message": "Deleted successfully" }`

## ⚡ Best Practices Followed
✅ TypeScript for type safety  
✅ Proper error handling & validation  
✅ Code structured using MVC pattern  