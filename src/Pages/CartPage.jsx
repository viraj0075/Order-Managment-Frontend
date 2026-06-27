import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowRight, FaArrowLeft, FaShoppingBag, FaSpinner } from 'react-icons/fa';
import ContainerLayout from '../Layouts/ContainerLayout';
import Input from '../Components/UI/Input.jsx';


export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, getCartTotal, placeOrder } = useCart();
    const navigate = useNavigate();

    const [checkoutDetails, setCheckoutDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 20 || subtotal === 0 ? 0 : 3.99;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 10) {
                setCheckoutDetails((prev) => ({ ...prev, [name]: digitsOnly }));
            }
        } else {
            setCheckoutDetails((prev) => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        let tempErrors = { name: '', address: '', phone: '' };
        let isValid = true;

        if (!checkoutDetails.name.trim()) {
            tempErrors.name = 'Full name is required.';
            isValid = false;
        } else if (checkoutDetails.name.length > 200) {
            tempErrors.name = 'Name must be under 200 characters.';
            isValid = false;
        }

        if (!checkoutDetails.address.trim()) {
            tempErrors.address = 'Delivery address is required.';
            isValid = false;
        } else if (checkoutDetails.address.length > 250) {
            tempErrors.address = 'Address must be under 250 characters.';
            isValid = false;
        }

        if (!checkoutDetails.phone.trim()) {
            tempErrors.phone = 'Phone number is required.';
            isValid = false;
        } else if (!/^\d{10}$/.test(checkoutDetails.phone.trim())) {
            tempErrors.phone = 'Phone number must be exactly 10 digits.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(tempErrors);
            return;
        }

        setIsSubmitting(true);
        const order = await placeOrder(checkoutDetails);
        setIsSubmitting(false);
        if (order) {
            navigate('/order');
        }
    };

    return (
        <section className="bg-primary-1000 min-h-screen pt-28 pb-16">
            <ContainerLayout>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-primary-100 font-extrabold hover:text-primary-200 transition-colors uppercase tracking-wider mb-8 text-sm cursor-pointer select-none"
                >
                    <FaArrowLeft /> Back to Menu
                </button>

                <h2 className="text-primary-100 text-2xl sm:text-3xl font-black tracking-tight mb-8 uppercase select-none">
                    Your Cart
                </h2>

                {cart.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white/40 backdrop-blur-md border border-gray-200/60 rounded-xl lg:rounded-3xl p-3 lg:p-6 max-w-lg mx-auto shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-[#EFEAE2] flex items-center justify-center text-primary-200 mb-6 text-3xl">
                            <FaShoppingBag />
                        </div>
                        <h3 className="text-primary-100 font-black text-2xl uppercase tracking-tight mb-3">
                            Your cart is empty
                        </h3>
                        <p className="text-gray-500 font-semibold mb-8 max-w-xs text-md">
                            Add some delicious fresh burgers and pizzas to your tray and satisfy your cravings!
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary-200 hover:bg-orange-600 text-white font-black text-sm tracking-wider px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md uppercase cursor-pointer"
                        >
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 space-y-4">
                            {cart.map((item) => {
                                const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
                                return (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row items-center sm:justify-between bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl lg:rounded-2xl p-3 lg:p-4 gap-4 shadow-sm"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h4 className="text-primary-100 font-black text-lg uppercase tracking-tight leading-tight">
                                                    {item.name}
                                                </h4>
                                                <span className="text-primary-200 font-extrabold text-sm tracking-tight">
                                                    {item.price} each
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                                            <div className="flex items-center gap-3 bg-[#EFEAE2]/60 px-3 py-1.5 rounded-full border border-gray-200/40">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-primary-100 hover:bg-[#EFEAE2] transition-colors cursor-pointer text-xs font-bold"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="text-primary-100 font-black text-sm select-none min-w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-primary-100 hover:bg-[#EFEAE2] transition-colors cursor-pointer text-xs font-bold"
                                                    aria-label="Increase quantity"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="text-primary-100 font-black text-lg tracking-tight min-w-16 text-right">
                                                    ${itemTotal.toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors p-2 cursor-pointer hover:scale-105 active:scale-95"
                                                    aria-label="Remove item"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="lg:col-span-5 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl lg:rounded-3xl p-3 lg:p-6 shadow-sm">
                            <h3 className="text-primary-100 font-black text-2xl lg:text-3xl uppercase tracking-tight mb-6">
                                Order Summary
                            </h3>

                            <div className="space-y-3 pb-6 border-b border-gray-200/70 text-sm font-semibold text-gray-500">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-primary-100 font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-primary-100 font-bold">
                                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Taxes (5%)</span>
                                    <span className="text-primary-100 font-bold">${tax.toFixed(2)}</span>
                                </div>
                                {deliveryFee > 0 && (
                                    <p className="text-xs text-orange-500 font-bold mt-1">
                                        Add ${(20 - subtotal).toFixed(2)} more for FREE delivery!
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-6 text-primary-100">
                                <span className="font-black text-lg uppercase tracking-wider">Total</span>
                                <span className="font-black text-3xl tracking-tight">${total.toFixed(2)}</span>
                            </div>

                            {!isCheckingOut ? (
                                <button
                                    onClick={() => setIsCheckingOut(true)}
                                    className="w-full bg-primary-200 hover:bg-orange-600 text-white font-black text-sm tracking-wider py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 uppercase cursor-pointer"
                                >
                                    Proceed to Checkout <FaArrowRight />
                                </button>
                            ) : (
                                <form onSubmit={handlePlaceOrder} className="space-y-4 mt-2" noValidate>
                                    <h4 className="text-primary-200 font-black text-sm uppercase tracking-widest mb-4">
                                        Delivery Details
                                    </h4>
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        name="name"
                                        value={checkoutDetails.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        maxLength={200}
                                        error={errors.name}
                                        required
                                    />
                                    <Input
                                        label="Delivery Address"
                                        type="textarea"
                                        name="address"
                                        value={checkoutDetails.address}
                                        onChange={handleInputChange}
                                        placeholder="Flat/House No., Street, City, ZIP Code"
                                        rows="3"
                                        maxLength={250}
                                        error={errors.address}
                                        required
                                    />
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        name="phone"
                                        value={checkoutDetails.phone}
                                        onChange={handleInputChange}
                                        placeholder="10-digit number"
                                        maxLength={10}
                                        error={errors.phone}
                                        required
                                    />

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={() => setIsCheckingOut(false)}
                                            className={`flex-1 border border-gray-300 hover:bg-[#EFEAE2]/40 text-primary-100 font-black text-xs tracking-wider py-3.5 rounded-xl transition-all active:scale-95 uppercase cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            Go Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`flex-2 bg-primary-200 hover:bg-orange-600 text-white font-black text-xs tracking-wider py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 uppercase cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    Placing Order... <FaSpinner className="animate-spin text-sm" />
                                                </>
                                            ) : (
                                                <>
                                                    Place Order <FaArrowRight />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </ContainerLayout>
        </section>
    );
}
