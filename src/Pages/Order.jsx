import { useEffect, useState, useRef } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';
import ContainerLayout from '../Layouts/ContainerLayout';
import { getAllOrders, getOrderById } from '../Services/OrderServices.js';
import { ORDER_STATES, steps } from '../Constants/OrderStates.jsx';
import PreviousOrder from '../Components/Order/PreviousOrder.jsx';
import DeliveryAddress from '../Components/Order/DeliveryAddress.jsx';
import ReciptItems from '../Components/Order/ReciptItems.jsx';

export default function Order() {
    const { activeOrder, updateOrderStatus, cancelActiveOrder } = useCart();
    const navigate = useNavigate();
    const [previousOrders, setPreviousOrders] = useState([]);
    const [loadingPrev, setLoadingPrev] = useState(false);

    const activeOrderRef = useRef(activeOrder);
    useEffect(() => {
        activeOrderRef.current = activeOrder;
    }, [activeOrder]);

    const fetchPreviousOrders = async () => {
        setLoadingPrev(true);
        const res = await getAllOrders(activeOrder?.id || "");
        if (res.success && res.data?.data) {
            setPreviousOrders(res.data.data);
        }
        setLoadingPrev(false);
    };

    useEffect(() => {
        if (!activeOrder?.id) return;

        const checkStatus = async () => {
            const currentOrder = activeOrderRef.current;
            if (!currentOrder) return;

            const res = await getOrderById(currentOrder.id);
            if (res.success && res.data?.data) {
                const orderData = res.data.data;
                if (orderData.status !== currentOrder.status) {
                    updateOrderStatus(orderData.status);
                }
            }
        };

        checkStatus();

        const interval = setInterval(async () => {
            const currentOrder = activeOrderRef.current;
            if (!currentOrder) return;

            const elapsedTime = Date.now() - currentOrder.timestamp;
            if (elapsedTime >= 40000) {
                cancelActiveOrder();
                return;
            }

            const res = await getOrderById(currentOrder.id);
            if (res.success && res.data?.data) {
                const orderData = res.data.data;
                if (orderData.status !== currentOrder.status) {
                    updateOrderStatus(orderData.status);
                }
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [activeOrder?.id, updateOrderStatus, cancelActiveOrder]);

    useEffect(() => {
        fetchPreviousOrders();
    }, [activeOrder?.id]);

    const currentStepIndex = activeOrder ? steps.findIndex(step => activeOrder.status === step.label) : -1;

    let progressPercentage = 0;
    if (activeOrder) {
        if (activeOrder.status === ORDER_STATES.ORDER_RECEIVED) {
            progressPercentage = 12.5;
        } else if (activeOrder.status === ORDER_STATES.PREPARING) {
            progressPercentage = 45;
        } else if (activeOrder.status === ORDER_STATES.OUT_FOR_DELIVERY) {
            progressPercentage = 75;
        } else if (activeOrder.status === ORDER_STATES.DELIVERED) {
            progressPercentage = 100;
        }
    }

    return (
        <section className="bg-primary-1000 min-h-screen pt-28 pb-16">
            <ContainerLayout>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-primary-100 font-extrabold hover:text-primary-200 transition-colors uppercase tracking-wider mb-8 text-sm cursor-pointer select-none"
                >
                    <FaArrowLeft /> Go Back Home
                </button>

                <div className="max-w-3xl mx-auto space-y-8">
                    {activeOrder ? (
                        <>
                            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl lg:rounded-3xl p-6 sm:p-8 shadow-sm">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200/50 pb-6 mb-6 gap-4">
                                    <div>
                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tracking Order</span>
                                        <h2 className="text-primary-100 font-black text-2xl uppercase tracking-tight">
                                            {activeOrder.id}
                                        </h2>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Expected Delivery</span>
                                        <p className="text-primary-200 font-black text-lg">
                                            {activeOrder.status === ORDER_STATES.ORDER_RECEIVED && 'In ~30 seconds'}
                                            {activeOrder.status === ORDER_STATES.PREPARING && 'In ~20 seconds'}
                                            {activeOrder.status === ORDER_STATES.OUT_FOR_DELIVERY && 'In ~10 seconds'}
                                            {activeOrder.status === ORDER_STATES.DELIVERED && 'Delivered'}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative my-10">
                                    <div className="absolute top-5 left-[12.5%] right-[12.5%] h-1 bg-gray-200 -z-10 rounded-full" />
                                    <div
                                        className="absolute top-5 left-[12.5%] h-1 bg-primary-200 -z-10 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${progressPercentage * 0.75}%` }}
                                    />

                                    <div className="flex justify-between items-start text-center">
                                        {steps.map((step, idx) => {
                                            const Icon = step.icon;
                                            const isCompleted = currentStepIndex > idx;
                                            const isActive = currentStepIndex === idx;

                                            return (
                                                <div key={idx} className="flex flex-col items-center flex-1">
                                                    <div
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isCompleted
                                                            ? 'bg-green-500 text-white'
                                                            : isActive
                                                                ? 'bg-primary-200 text-white scale-110 animate-pulse'
                                                                : 'bg-white text-gray-400 border border-gray-200'
                                                            }`}
                                                    >
                                                        <Icon size={16} />
                                                    </div>
                                                    <span
                                                        className={`text-[10px] sm:text-xs font-black tracking-wider uppercase mt-3 transition-colors ${isActive ? 'text-primary-200' : isCompleted ? 'text-primary-100' : 'text-gray-400'
                                                            }`}
                                                    >
                                                        {step.label}
                                                    </span>
                                                    <span className="hidden sm:block text-[10px] text-gray-400 font-medium max-w-[120px] mt-1">
                                                        {step.desc}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <DeliveryAddress activeOrder={activeOrder} />
                            </div>

                            <ReciptItems activeOrder={activeOrder} />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center bg-white/40 backdrop-blur-md border border-gray-200/60 rounded-2xl lg:rounded-3xl p-3 lg:p-6  shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-[#EFEAE2] flex items-center justify-center text-primary-200 mb-6 text-3xl">
                                <FaBoxOpen />
                            </div>
                            <h3 className="text-primary-100 font-black text-xl lg:text-2xl uppercase tracking-tight mb-3">
                                No Active Orders
                            </h3>
                            <p className="text-gray-500 font-semibold mb-8 max-w-xs text-md">
                                You don't have any active orders right now. Go grab some snacks!
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-primary-200 hover:bg-orange-600 text-white font-black text-sm tracking-wider px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md uppercase cursor-pointer"
                            >
                                Order Now
                            </button>
                        </div>
                    )}

                    <PreviousOrder previousOrders={previousOrders} loadingPrev={loadingPrev} />
                </div>
            </ContainerLayout>
        </section>
    );
}