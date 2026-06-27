import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart, } from 'react-icons/fa';
import ContainerLayout from '../Layouts/ContainerLayout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { MENU_STATES } from '../Constants/OrderStates.jsx';



export default function Navbar() {
    const navRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { getCartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navRef.current.classList.add('bg-brand-surface/80', 'shadow-xl', 'border-white/20');
                navRef.current.classList.remove('bg-brand-surface/30', 'border-white/10');
            } else {
                navRef.current.classList.remove('bg-brand-surface/80', 'shadow-xl', 'border-white/20');
                navRef.current.classList.add('bg-brand-surface/30', 'border-white/10');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e, targetId, category = '') => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        if (category) {
            navigate(`/?category=${category}`);
        } else {
            navigate('/?scroll=menu');
        }
    };


    return (
        <>
            <div className="fixed top-3 left-0 w-full z-50">
                <ContainerLayout>
                    <nav
                        ref={navRef}
                        className="w-full bg-primary-100/85 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300 text-white py-2.5 px-4 sm:px-6 flex justify-between items-center rounded-2xl"

                    >
                        <h1 className="flex items-center font-extrabold select-none cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-white text-base sm:text-2xl">Snacks</span>

                            <span className="mx-1 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-orange-500 text-white text-xs sm:text-xl font-black">
                                N
                            </span>

                            <span className="text-white text-base sm:text-2xl">Snacks</span>
                        </h1>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-xl font-semibold text-white transition-colors hover:text-orange-500 cursor-pointer">Menu</a>
                            <a href="#pizza" onClick={(e) => handleNavClick(e, '#menu', MENU_STATES.PIZZA)} className="cursor-pointer text-xl 2xl:text-xl font-medium text-white transition-colors hover:text-orange-500">Pizza</a>
                            <a href="#burger" onClick={(e) => handleNavClick(e, '#menu', MENU_STATES.BURGER)} className="cursor-pointer text-xl 2xl:text-xl font-medium text-white transition-colors hover:text-orange-500">Burger</a>
                            <a onClick={() => navigate('/order')} className="cursor-pointer text-xl 2xl:text-xl font-medium text-white transition-colors hover:text-orange-500">Orders</a>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <button
                                onClick={() => navigate('/cart')}
                                className="relative p-2 text-white hover:text-orange-500 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-transparent border-0"
                                aria-label="Shopping Cart"
                            >
                                <FaShoppingCart className="text-2xl" />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-sm font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-primary-100 shadow-md">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => navigate('/?scroll=menu')}
                                className="text-base font-bold text-white bg-orange-500 px-6 py-3 rounded-xl hover:bg-primary-800 transition-all hover:scale-105 cursor-pointer"
                            >
                                Order Now
                            </button>
                        </div>

                        <div className="flex md:hidden items-center gap-1.5">
                            <button
                                onClick={() => navigate('/cart')}
                                className="relative p-1.5 text-white hover:text-orange-500 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-transparent border-0"
                                aria-label="Shopping Cart"
                            >
                                <FaShoppingCart className="text-2xl" />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary-100 shadow-md">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>

                            <button
                                className="p-1.5 text-2xl text-white hover:text-white transition-colors cursor-pointer relative w-9 h-9 flex items-center justify-center bg-transparent border-0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(!isMobileMenuOpen);
                                }}
                                aria-label="Toggle mobile menu"
                            >
                                <div className={`absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
                                    <FaBars />
                                </div>
                                <div className={`absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                                    <FaTimes />
                                </div>
                            </button>
                        </div>
                    </nav>
                </ContainerLayout>
            </div >

            < div
                className={`fixed inset-0 z-40 bg-primary-100 backdrop-blur-sm flex flex-col items-center justify-start gap-6 pt-25 md:hidden transition-all duration-500 ease-out ${isMobileMenuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-8 pointer-events-none"
                    }`
                }
            >
                <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-xl font-semibold text-white transition-colors hover:text-orange-500">Menu</a>
                <a href="#pizza" onClick={(e) => handleNavClick(e, '#menu', MENU_STATES.PIZZA)} className="text-xl font-semibold text-white transition-colors hover:text-orange-500">Pizza</a>
                <a href="#burger" onClick={(e) => handleNavClick(e, '#menu', MENU_STATES.BURGER)} className="text-xl font-semibold text-white transition-colors hover:text-orange-500">Burger</a>
                <a onClick={() => { setIsMobileMenuOpen(false); navigate('/order'); }} className="text-xl font-semibold text-white transition-colors hover:text-orange-500 cursor-pointer">Orders</a>
                <button
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/?scroll=menu');
                    }}
                    className="w-50 text-base font-bold text-white bg-orange-500 py-3 rounded-xl hover:bg-primary-800 transition-all hover:scale-105 cursor-pointer"
                >
                    Order Now
                </button>
            </ div >

        </>
    );
}