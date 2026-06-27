export default function ReciptItems({ activeOrder }) {
    if (!activeOrder || !activeOrder.items) return null;

    return (
        <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-primary-100 font-black text-xl uppercase tracking-tight mb-6">
                Order Receipt
            </h3>
            <div className="divide-y divide-gray-100">
                {activeOrder.items.map((item, idx) => {
                    const { name, quantity, price } = item || {};
                    return (
                        <div key={idx} className="flex justify-between py-4 text-sm font-semibold">
                            <div className="flex items-center gap-3">
                                <span className="bg-[#EFEAE2] text-primary-100 font-black text-xs px-2.5 py-1 rounded-lg">
                                    {quantity}x
                                </span>
                                <span className="text-primary-100 uppercase font-black">{name}</span>
                            </div>
                            <span className="text-primary-100 font-extrabold">{price}</span>
                        </div>
                    )
                })}
            </div>
            <div className="border-t border-gray-200/70 pt-4 mt-4 flex justify-between items-center text-primary-100">
                <span className="font-black text-base uppercase tracking-wider">Total Paid</span>
                <span className="font-black text-2xl tracking-tight text-primary-200">{activeOrder.total}</span>
            </div>
        </div>
    );
}
