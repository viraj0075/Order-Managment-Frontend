export default function DeliveryAddress({ activeOrder }) {
    if (!activeOrder || !activeOrder.deliveryDetails) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#EFEAE2]/30 border border-gray-200/40 rounded-2xl p-5 text-sm font-semibold">
            <div>
                <h4 className="text-primary-100 font-black text-xs uppercase tracking-widest mb-2">
                    Delivery Details
                </h4>
                <p className="text-primary-100 font-extrabold">{activeOrder.deliveryDetails.name}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{activeOrder.deliveryDetails.address}</p>
                <p className="text-gray-500 text-xs mt-1">{activeOrder.deliveryDetails.phone}</p>
            </div>
            <div className="flex flex-col justify-between items-start md:items-end">
                <div className="text-left md:text-right">
                    <h4 className="font-black text-xs uppercase tracking-widest mb-1 text-primary-100">
                        Current Status
                    </h4>
                    <p className="text-primary-100 font-black uppercase text-base">{activeOrder.status}</p>
                </div>
            </div>
        </div>
    );
}
