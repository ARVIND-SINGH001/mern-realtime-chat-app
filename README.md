 # *Real-Time MERN Chat Application*


A full-stack real-time chat application built with the **MERN stack**, implementing **JWT-based authentication**, **real-time messaging via Socket.IO**, and **image uploads using Cloudinary**.
The application demonstrates core backend concepts involved in building real-time web systems.



# Tech Stack : 

Frontend

* React
* Context API
* Axios
* Tailwind CSS

Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO

Authentication & Media

* JWT (JSON Web Tokens)
* Cloudinary (image storage)

Deployment

* Frontend: Vercel
* Backend: Vercel
* Database: MongoDB Atlas



# Core Features

* User authentication using JWT
* Secure protected routes with middleware
* Real-time one-to-one messaging using Socket.IO
* Online/offline user presence tracking
* Persistent chat history using MongoDB
* Image sharing in chats via Cloudinary
* REST APIs for message history and user management
  

---

 # System Architecture

* REST APIs handle authentication, user data, and message history
* Socket.IO manages real-time message delivery and presence
* Messages are:

  1. Stored in MongoDB
  2. Emitted in real time if the receiver is online
  3. Fetched later via REST if the receiver was offline
* User–socket mappings are maintained in server memory

---

# Authentication Flow

1. User logs in / registers
2. Server generates a JWT
3. JWT is stored on the client
4. Protected routes verify JWT using middleware
5. Authenticated user info is attached to `req.user`

---

# Real-Time Messaging Flow

1. Sender emits a message via Socket.IO
2. Server:

   * Saves message to MongoDB
   * Checks if receiver is online
3. If online → emits message to receiver’s socket
4. If offline → message is fetched later via REST API

---

# Image Uploads (Cloudinary)

* Images are uploaded from the client
* Server sends images to Cloudinary
* Secure image URLs are stored in MongoDB
* Images are rendered directly in chat UI

---

# Project Structure

```
chat-app/
│
├── client/                 # React frontend
│
├── server/
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── models/             # Mongoose schemas
│   ├── middleware/         # Auth & error handling
│   ├── lib/                # Utilities & Helpers
│   └── server.js           # Express + Socket.IO server
│
└── package.json
```

---

#Environment Variables
```
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=
```

---

# Known Limitations

* Socket-to-user mapping is stored in server memory
* No message queue for guaranteed delivery
* Read receipts and typing indicators not implemented

---

# Future Improvements

* Redis for socket session persistence
* Message queues (Kafka / RabbitMQ)
* Read receipts and typing indicators
* End-to-end encryption

---

# Live Demo

link : https://mern-realtime-chat-app-sigma.vercel.app/




