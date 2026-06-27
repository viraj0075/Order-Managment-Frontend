# Order Management System - Frontend

The frontend web client for the Order Management System. A modern React dashboard featuring item catalogs (Burgers & Pizzas), a shopping cart, detail validations, and a real-time order status tracking visualizer.

## Features

- **Food Ordering**: Browse categorized items (Burgers, Pizzas) and add them to a dynamic shopping cart.
- **Checkout Form & Validation**: Robust local form validation for checkout name, address, and phone number with submission loading indicators.
- **Real-Time Tracking Visualizer**: Interactive progress bar tracking active orders (Order Received ➔ Preparing ➔ Out for Delivery ➔ Delivered).
- **Polling Sync**: Periodically polls the backend every 10 seconds to sync status with the database.
- **Order History**: Lists previously completed orders fetched dynamically from the database.
- **Premium Design**: Curated warm HSL color palette, smooth glassmorphism components, skeleton loading layouts, and responsive design.

---

## Technical Stack

- **Framework**: React (Vite)
- **Routing**: React Router DOM (v7)
- **Styling**: Vanilla CSS (TailwindCSS utility class helpers)
- **Icons**: React Icons (Fa)
- **Loaders**: React Loading Skeleton

---

## Setup & Running Guide

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)

### Configuration & Run

1. Navigate to the `Frontend` directory:
   ```bash
   cd ./Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root of the `Frontend` directory:
   ```env
   VITE_API_URL=http://localhost:4000
   ```
   *Verify this URL matches the port your backend service is running on.*
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend client will start running at `http://localhost:5173`.*

---

## Project Structure

```text
Frontend/
├── public/                  # Static assets
└── src/
    ├── Api/                 # Axios clients and configuration
    ├── Components/          # Shared components (Navbar, Footer, Skeleton loaders)
    │   ├── Order/           # Subcomponents for tracking (DeliveryAddress, ReciptItems)
    │   └── Skeleton/        # Skeleton loaders (MenuSkeleton, OrderSkeleton)
    ├── Constants/           # Static states and mappings (Process, events, links)
    ├── Context/             # Cart and Active Order React context state
    ├── Layouts/             # Common structural page containers
    ├── Pages/               # Page entry points (Home, CartPage, Order tracking page)
    └── Services/            # Client HTTP API endpoints mapping order calls
```
