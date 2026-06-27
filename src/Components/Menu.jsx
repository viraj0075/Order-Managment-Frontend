import { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import ContainerLayout from '../Layouts/ContainerLayout';
import { useCart } from '../Context/CartContext';
import { getProductsByCategory } from '../Services/ProductServices';
import MenuSkeleton from './Skeleton/MenuSkeleton';
import { MENU_STATES } from '../Constants/OrderStates';

export default function Menu() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');
    const scrollQuery = searchParams.get('scroll');

    const [activeTab, setActiveTab] = useState(categoryQuery || MENU_STATES.BURGER);
    const { cart, addToCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(true);
    const [productsData, setProductsData] = useState([]);

    const getProductsData = async () => {
        setLoading(true);
        const res = await getProductsByCategory(activeTab);
        setProductsData(res.data.data);
        setLoading(false);
    }

    useEffect(() => {
        if (categoryQuery && (categoryQuery === MENU_STATES.BURGER || categoryQuery === MENU_STATES.PIZZA)) {
            setActiveTab(categoryQuery);
        }
    }, [categoryQuery]);

    useEffect(() => {
        if (categoryQuery || scrollQuery === 'menu') {
            const element = document.getElementById('menu');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [categoryQuery, scrollQuery]);

    useEffect(() => {
        getProductsData();
    }, [activeTab]);


    return (
        <section id="menu" className="bg-primary-1000 py-12 md:py-16 overflow-hidden">
            <ContainerLayout>
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center justify-center border border-primary-200/45 bg-[#EFEAE2]/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-primary-200 mb-3 uppercase select-none">
                        Menu
                    </span>
                    <h2 className="text-primary-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 select-none uppercase">
                        Pick Your Craving
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base font-semibold max-w-md">
                        Every bite hits different. Choose your category and feast.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-10 max-w-xs sm:max-w-md mx-auto flex-wrap">
                    <button
                        onClick={() => {
                            setActiveTab(MENU_STATES.BURGER);
                            setSearchParams({ category: MENU_STATES.BURGER });
                        }}
                        className={`flex-1 px-6 py-3 rounded-full text-sm sm:text-base font-black tracking-wider transition-all duration-300 uppercase ${activeTab === MENU_STATES.BURGER
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                            : 'bg-[#EFEAE2] text-primary-100/70 hover:bg-[#e4decb] hover:text-primary-100'
                            } cursor-pointer`}
                    >
                        Burgers
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab(MENU_STATES.PIZZA);
                            setSearchParams({ category: MENU_STATES.PIZZA });
                        }}
                        className={`flex-1 px-6 py-3 rounded-full text-sm sm:text-base font-black tracking-wider transition-all duration-300 uppercase ${activeTab === MENU_STATES.PIZZA
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200/30 scale-105'
                            : 'bg-[#EFEAE2] text-primary-100/70 hover:bg-[#e4decb] hover:text-primary-100'
                            } cursor-pointer`}
                    >
                        Pizzas
                    </button>
                </div>

                {loading ? (
                    <MenuSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {productsData?.map((item) => {
                            const cartItem = cart.find((i) => i.id === item.productId);
                            const quantity = cartItem ? cartItem.quantity : 0;
                            const { productId, name, description, price, image } = item || {};
                            return (
                                <div
                                    key={productId}
                                    className="rounded-2xl p-3 sm:p-5 border border-gray-300/85 flex flex-col justify-between transition-all duration-300 hover:border-primary-100/30 hover:-translate-y-1.5 w-full"
                                >
                                    <div className="overflow-hidden rounded-xl w-full h-56 sm:h-64 md:h-72 mb-4 flex items-center justify-center">
                                        <img
                                            src={image}
                                            alt={`Fresh hot ${name.toLowerCase()}`}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="grow flex flex-col">
                                        <h3 className="text-primary-100 font-black text-xl md:text-2xl uppercase tracking-tight mb-1.5 select-none leading-tight">
                                            {name}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-semibold mb-4 grow leading-relaxed">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-primary-200 font-black text-2xl tracking-tight">
                                            $ {price}
                                        </span>
                                        {quantity > 0 ? (
                                            <div className="flex items-center gap-3 bg-[#EFEAE2]/60 px-2.5 py-1.5 rounded-full border border-gray-300/40 shadow-sm transition-all duration-300">
                                                <button
                                                    onClick={() => updateQuantity(productId, quantity - 1)}
                                                    className="w-7 h-7 rounded-full bg-primary-100 text-white flex items-center justify-center hover:bg-primary-200 hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-bold"
                                                    aria-label={`Decrease quantity of ${name.toLowerCase()}`}
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="text-primary-100 font-black text-sm select-none min-w-4 text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(productId, quantity + 1)}
                                                    className="w-7 h-7 rounded-full bg-primary-100 text-white flex items-center justify-center hover:bg-primary-200 hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs font-bold"
                                                    aria-label={`Increase quantity of ${name.toLowerCase()}`}
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart({ ...item, id: productId, price: typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${parseFloat(item.price || 0).toFixed(2)}` })}
                                                className="w-10 h-10 rounded-full bg-primary-100 text-white flex items-center justify-center hover:bg-primary-200 hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg cursor-pointer"
                                                aria-label={`Add ${name.toLowerCase()} to cart`}
                                            >
                                                <FaPlus className="text-sm font-bold" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ContainerLayout>
        </section>
    );
}