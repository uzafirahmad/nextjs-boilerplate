# 📌 Next.js Project Setup Guide  

## 📂 Environment Variables (`.env` Files)  
Upload the following files inside the **root directory**:  
- `.env.production`  
- `.env.development`  

Each file should contain the following fields:  
```plaintext
NEXT_PUBLIC_BACKEND_URL=your_backend_url
JWT_SECRET=your_jwt_secret
```
Ensure the correct `NEXT_PUBLIC_BACKEND_URL` is used for production and development environments.  

---

## 🚀 Start Server Commands  
- **Development Mode:**  
  ```sh
  npm run dev
  ```
- **Build Project:**  
  ```sh
  npm run build
  ```
- **Start Production Server:**  
  ```sh
  npm run start
  ```

---

## 🐳 Docker Deployment  
To build and start the application using Docker, run:  
```sh
docker-compose up --build
```

---
