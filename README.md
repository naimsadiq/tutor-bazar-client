# 🎓 Tuition Management System

[🌐 Live Site](https://tutor-bazar-d24e4.web.app/)

---

## 📝 Project Overview

The **Tuition Management System** is a full-featured platform for students, tutors, and admins to manage tuition activities:

- Post and browse tuition requests
- Tutor applications and approvals
- Payment tracking and financial reports
- Student–Tutor communication

**Purpose:**  
To solve real problems of finding qualified tutors and verified tuition while providing smooth digital workflows.

---

## ✨ Features

| Module                  | Features                                                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication**      | Register as Student/Tutor, Email & Password login, Google login, JWT-based role verification, Protected routes                                            |
| **Home Page**           | Hero section, Latest tuition posts & tutors (dynamic), Framer Motion animations, How it works section, Why Choose Us section                              |
| **Student Dashboard**   | Create/Update/Delete tuition posts, View applied tutors, Approve/Reject tutor applications, Stripe payment integration, Payment history, Profile settings |
| **Tutor Dashboard**     | Apply for tuitions, Track application status, View ongoing tuitions, Revenue & transaction history, Profile management                                    |
| **Admin Dashboard**     | User management (view/update/delete/change roles), Tuition management (approve/reject posts), Reports & analytics, Charts & graphs                        |
| **Additional Features** | Mobile responsive, Sticky Navbar & Footer, Social media links, Full-screen loading spinner, 404 error page                                                |
| **Challenge Features**  | Search & Sort tuitions, Pagination, Advanced filtering (class, subject, location), JWT token verification for role & access                               |

---

## 🛠️ Technology Stack

### Client

- **React**
- **React Router**
- **TailwindCSS & DaisyUI**
- **Axios**
- **Framer Motion**
- **Firebase**
- **React Icons**
- **Stripe React SDK**

### Server

- **Node.js & Express**
- **MongoDB (Mongoose)**
- **JSON Web Token (JWT)**
- **Stripe API**
- **dotenv**

---

## 🔑 Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_API_KEY=your_firebase_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🧑‍💻 Admin Credentials

> 🔐 **Use the following admin account to explore admin features**

- 📧 **Email:** `admin@gmail.com`
- 🔑 **Password:** `Admin123#`
