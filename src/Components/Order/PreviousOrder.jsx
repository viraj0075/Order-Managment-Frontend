import { ORDER_STATES } from "../../Constants/OrderStates";
import OrderSkeleton from "../Skeleton/OrderSkeleton.jsx";

export default function PreviousOrder({ previousOrders, loadingPrev }) {
    return (
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl lg:rounded-3xl p-3 lg:p-6 shadow-sm mt-8">
            <h3 className="text-primary-100 font-black text-xl uppercase tracking-tight mb-6">
                Previous Orders
            </h3>
            {loadingPrev ? (
                <OrderSkeleton />
            ) : previousOrders.length === 0 ? (
                <p className="text-gray-500 font-semibold text-center py-4">No previous orders found.</p>
            ) : (
                <div className="space-y-4">
                    {previousOrders.map((order) => {
                        const { orderItems, orderId, status, createdAt, totalAmount } = order || {};
                        let items = [];
                        try {
                            items = typeof orderItems === 'string' ? JSON.parse(orderItems) : orderItems;
                        } catch (e) {
                            items = orderItems || [];
                        }

                        return (
                            <div key={orderId} className="border border-gray-200/50 rounded-2xl p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#EFEAE2]/20 transition-all duration-300">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <span className="text-primary-100 font-black text-sm uppercase tracking-tight">
                                            Order #{orderId.substring(0, 8)}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${status === ORDER_STATES.DELIVERED ? 'bg-green-100 text-green-700' :
                                            status === ORDER_STATES.CANCELLED ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {new Date(createdAt).toLocaleString()}
                                    </p>
                                    <div className="text-xs text-gray-500 font-semibold mt-2">
                                        {items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                    </div>
                                </div>
                                <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                                    <span className="text-primary-200 font-black text-xl tracking-tight">
                                        ${parseFloat(totalAmount || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
