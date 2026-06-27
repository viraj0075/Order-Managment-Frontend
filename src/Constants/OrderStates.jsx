import { FaClipboardList, FaUtensils, FaMotorcycle, FaCheckCircle } from 'react-icons/fa';

export const steps = [
    { label: 'Order Received', icon: FaClipboardList, desc: 'We have received your food request.' },
    { label: 'Preparing', icon: FaUtensils, desc: 'Our chefs are cooking your hot meal.' },
    { label: 'Out for Delivery', icon: FaMotorcycle, desc: 'Rider is on the way to your door.' },
    { label: 'Delivered', icon: FaCheckCircle, desc: 'Food is at your doorstep. Enjoy!' }
];

export const ORDER_STATES = {
    ORDER_RECEIVED: "Order Received",
    PREPARING: "Preparing",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled"
};

export const MENU_STATES = {
    BURGER: "Burger",
    PIZZA: "Pizza"
}