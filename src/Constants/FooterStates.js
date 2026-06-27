import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export const footerLinks = {
    quickLinks: [
        { label: "MENU", href: "#menu" },
        { label: "Pizza", href: "#pizza" },
        { label: "Burger", href: "#burger" },
    ],
    legal: [
        { label: "PRIVACY POLICY", href: "/" },
        { label: "TERMS OF SERVICE", href: "/" },
        { label: "REFUND POLICY", href: "/" }
    ],
    social: [
        { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
        { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF }
    ]
};

export const addressInfo = {
    title: "42 CONNAUGHT PLACE",
    sub: "New Delhi, Delhi 110001, India"
};

export const contactInfo = {
    phone: "+91 11 4100 5678",
    hours: "Opening Hours 11AM - 11PM"
};

export const mapImageUrl = "https://cdn.pixabay.com/photo/2016/09/20/09/48/route-1682181_640.png";
