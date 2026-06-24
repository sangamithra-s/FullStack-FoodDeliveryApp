# 🍔 Twiggy — Full Stack Food Delivery App

A full-stack food delivery web application built with **React** on the frontend and **Spring Boot** on the backend. The app allows users to browse restaurants, place food orders, and manage their cart — with a dedicated admin panel for managing the platform.

---

## ✨ Features

- 🍕 **Browse Food Items** — Explore a variety of food options by category
- 🛒 **Cart Management** — Add, update, and remove items from the cart
- 📦 **Order Placement** — Place orders with a seamless checkout flow
- 🔐 **User Authentication** — Register and login to manage orders
- 🛠️ **Admin Panel** — Manage food items, categories, and orders
- 📱 **Responsive Design** — Mobile-friendly UI with Bootstrap 5

---

## 🛠️ Tech Stack

### Frontend (`Twiggy/`)
| Technology | Purpose |
|---|---|
| React.js | UI library |
| React Router DOM v6 | Client-side routing |
| Bootstrap 5 | Responsive styling |
| JavaScript (ES6+) | Frontend logic |

### Backend (`twiggyapi/`)
| Technology | Purpose |
|---|---|
| Java | Programming language |
| Spring Boot | Backend framework |
| Spring MVC | REST API |
| Spring Data JPA | Database ORM |
| MySQL / PostgreSQL | Relational database |

### Admin Panel (`Admin panel/`)
| Technology | Purpose |
|---|---|
| React.js | Admin dashboard UI |
| Bootstrap 5 | Styling |

---

## 📁 Project Structure

```
FullStack-FoodDeliveryApp/
├── Twiggy/              # React frontend (customer-facing)
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route-level pages
│       ├── App.js
│       └── index.js
│
├── Admin panel/         # React admin dashboard
│   └── src/
│       ├── components/
│       └── pages/
│
├── twiggyapi/           # Spring Boot backend
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/twiggy/
│           │       ├── controller/   # REST controllers
│           │       ├── model/        # Entity classes
│           │       ├── repository/   # JPA repositories
│           │       └── service/      # Business logic
│           └── resources/
│               └── application.properties
│
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (v17+)
- [Maven](https://maven.apache.org/) or use the included `mvnw` wrapper
- [MySQL](https://www.mysql.com/) or any compatible relational database
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/sangamithra-s/FullStack-FoodDeliveryApp.git
cd FullStack-FoodDeliveryApp
```

---

### 2. Backend Setup (Spring Boot)

```bash
cd twiggyapi
```

Configure your database in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/twiggy_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

---

### 3. Frontend Setup (React — Customer App)

```bash
cd ../Twiggy
npm install
npm start
```

The frontend will start on `http://localhost:3000`

---

### 4. Admin Panel Setup

```bash
cd "../Admin panel"
npm install
npm start
```

The admin panel will start on `http://localhost:3001`

---

## 🔑 Environment Variables

For the frontend, create a `.env` file inside the `Twiggy/` folder:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

For the admin panel, create a `.env` inside `Admin panel/`:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 📡 API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/food` | Get all food items |
| POST | `/api/food` | Add a new food item (Admin) |
| PUT | `/api/food/{id}` | Update food item (Admin) |
| DELETE | `/api/food/{id}` | Delete food item (Admin) |
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Place an order |

---

## 🧠 What I Learned

- Building RESTful APIs with Spring Boot and Spring Data JPA
- Connecting a React frontend to a Java backend via REST
- Managing state and routing in React with React Router DOM v6
- Building a role-based admin panel in React
- Designing a relational database schema for a food delivery system
- Full-stack integration between a JavaScript frontend and Java backend

---

## 🚀 Future Improvements

- [ ] Deploy backend on AWS / Railway
- [ ] Deploy frontend on Vercel / Netlify
- [ ] Add payment gateway integration (Razorpay / Stripe)
- [ ] Real-time order tracking with WebSockets
- [ ] Push notifications for order status updates

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Sangamithra S**
[GitHub](https://github.com/sangamithra-s)
