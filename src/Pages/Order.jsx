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
    const { activeOrders, updateOrderStatus, cancelActiveOrder } = useCart();
    const navigate = useNavigate();
    const [previousOrders, setPreviousOrders] = useState([]);
    const [loadingPrev, setLoadingPrev] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState("");

    const activeOrdersRef = useRef(activeOrders);
    useEffect(() => {
        activeOrdersRef.current = activeOrders;
    }, [activeOrders]);

    const fetchPreviousOrders = async () => {
        setLoadingPrev(true);
        const res = await getAllOrders(activeOrders[0]?.id || "");
        if (res.success && res.data?.data) {
            setPreviousOrders(res.data.data);
        }
        setLoadingPrev(false);
    };

    useEffect(() => {
        if (activeOrders.length > 0) {
            if (!selectedOrderId || !activeOrders.some(order => order.id === selectedOrderId)) {
                setSelectedOrderId(activeOrders[0].id);
            }
        } else {
            setSelectedOrderId("");
        }
    }, [activeOrders, selectedOrderId]);

    useEffect(() => {
        if (activeOrders.length === 0) return;

        const checkAllStatuses = async () => {
            const currentOrders = activeOrdersRef.current;
            for (const order of currentOrders) {
                const res = await getOrderById(order.id);
                if (res.success && res.data?.data) {
                    const orderData = res.data.data;
                    if (orderData.status !== order.status) {
                        updateOrderStatus(order.id, orderData.status);
                    }
                }
            }
        };

        checkAllStatuses();

        const interval = setInterval(async () => {
            const currentOrders = activeOrdersRef.current;
            if (currentOrders.length === 0) return;

            const now = Date.now();
            for (const order of currentOrders) {
                const elapsedTime = now - order.timestamp;
                if (elapsedTime >= 40000) {
                    cancelActiveOrder(order.id);
                    continue;
                }

                const res = await getOrderById(order.id);
                if (res.success && res.data?.data) {
                    const orderData = res.data.data;
                    if (orderData.status !== order.status) {
                        updateOrderStatus(order.id, orderData.status);
                    }
                }
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [activeOrders.length, updateOrderStatus, cancelActiveOrder]);

    useEffect(() => {
        fetchPreviousOrders();
    }, [activeOrders.length]);

    const selectedOrder = activeOrders.find(order => order.id === selectedOrderId) || null;
    const currentStepIndex = selectedOrder ? steps.findIndex(step => selectedOrder.status === step.label) : -1;

    let progressPercentage = 0;
    if (selectedOrder) {
        if (selectedOrder.status === ORDER_STATES.ORDER_RECEIVED) {
            progressPercentage = 12.5;
        } else if (selectedOrder.status === ORDER_STATES.PREPARING) {
            progressPercentage = 45;
        } else if (selectedOrder.status === ORDER_STATES.OUT_FOR_DELIVERY) {
            progressPercentage = 75;
        } else if (selectedOrder.status === ORDER_STATES.DELIVERED) {
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
                    {activeOrders.length > 0 ? (
                        <>
                            {activeOrders.length > 1 && (
                                <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl lg:rounded-3xl p-6 shadow-sm mb-6">
                                    <h3 className="text-primary-100 font-black text-sm uppercase tracking-wider mb-4">
                                        Active Orders ({activeOrders.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {activeOrders.map((order) => {
                                            const isSelected = order.id === selectedOrderId;
                                            let statusColor = "bg-gray-400";
                                            if (order.status === ORDER_STATES.ORDER_RECEIVED) statusColor = "bg-blue-500 animate-pulse";
                                            else if (order.status === ORDER_STATES.PREPARING) statusColor = "bg-orange-500 animate-pulse";
                                            else if (order.status === ORDER_STATES.OUT_FOR_DELIVERY) statusColor = "bg-yellow-500 animate-pulse";
                                            else if (order.status === ORDER_STATES.DELIVERED) statusColor = "bg-green-500";

                                            return (
                                                <button
                                                    key={order.id}
                                                    onClick={() => setSelectedOrderId(order.id)}
                                                    className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                                                        isSelected
                                                            ? "bg-white border-primary-200 shadow-md ring-2 ring-primary-200/20 scale-[1.02]"
                                                            : "bg-white/40 border-gray-200/40 hover:bg-white/60 hover:scale-[1.01]"
                                                    }`}
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className={`w-2.5 h-2.5 rounded-full ${statusColor}`} />
                                                            <span className="text-primary-100 font-extrabold text-sm truncate uppercase">
                                                                #{order.id.slice(-8)}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <span className="text-primary-200 font-black text-sm">
                                                            {order.total}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {selectedOrder && (
                                <>
                                    <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl lg:rounded-3xl p-6 sm:p-8 shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200/50 pb-6 mb-6 gap-4">
                                            <div>
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tracking Order</span>
                                                <h2 className="text-primary-100 font-black text-2xl uppercase tracking-tight">
                                                    {selectedOrder.id}
                                                </h2>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Expected Delivery</span>
                                                <p className="text-primary-200 font-black text-lg">
                                                    {selectedOrder.status === ORDER_STATES.ORDER_RECEIVED && 'In ~30 seconds'}
                                                    {selectedOrder.status === ORDER_STATES.PREPARING && 'In ~20 seconds'}
                                                    {selectedOrder.status === ORDER_STATES.OUT_FOR_DELIVERY && 'In ~10 seconds'}
                                                    {selectedOrder.status === ORDER_STATES.DELIVERED && 'Delivered'}
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

                                        <DeliveryAddress activeOrder={selectedOrder} />
                                    </div>

                                    <ReciptItems activeOrder={selectedOrder} />
                                </>
                            )}
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