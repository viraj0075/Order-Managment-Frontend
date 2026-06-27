import { createContext, useContext, useState, useEffect } from 'react';
import { createOrder } from '../Services/OrderServices.js';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [activeOrder, setActiveOrder] = useState(() => {
        const savedOrder = localStorage.getItem('activeOrder');
        return savedOrder ? JSON.parse(savedOrder) : null;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (activeOrder) {
            localStorage.setItem('activeOrder', JSON.stringify(activeOrder));
        } else {
            localStorage.removeItem('activeOrder');
        }
    }, [activeOrder]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (itemId, quantity) => {
        setCart((prevCart) => {
            if (quantity <= 0) {
                return prevCart.filter((i) => i.id !== itemId);
            }
            return prevCart.map((i) =>
                i.id === itemId ? { ...i, quantity } : i
            );
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const numPrice = parseFloat(item.price.replace('$', ''));
            return total + numPrice * item.quantity;
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const placeOrder = async (deliveryDetails) => {
        const total = getCartTotal();
        try {
            const res = await createOrder({
                orderItems: cart,
                deliveryDetails,
                totalAmount: total
            });

            if (res.success && res.data?.success) {
                const orderData = res.data.data;
                const newOrder = {
                    id: orderData.orderId,
                    items: orderData.orderItems,
                    total: `$${parseFloat(orderData.totalAmount).toFixed(2)}`,
                    deliveryDetails: orderData.deliveryDetails,
                    status: orderData.status,
                    timestamp: new Date(orderData.createdAt).getTime()
                };
                setActiveOrder(newOrder);
                clearCart();
                return newOrder;
            } else {
                throw new Error(res.message || res.data?.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order: ' + error.message);
        }
    };

    const updateOrderStatus = (status) => {
        if (!activeOrder) return;
        setActiveOrder((prevOrder) => {
            if (!prevOrder) return null;
            return { ...prevOrder, status };
        });
    };

    const cancelActiveOrder = () => {
        setActiveOrder(null);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                activeOrder,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartCount,
                placeOrder,
                updateOrderStatus,
                cancelActiveOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
