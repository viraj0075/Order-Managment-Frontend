import { FaBolt } from 'react-icons/fa';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import ContainerLayout from '../Layouts/ContainerLayout';
import { categories } from '../Constants/Categories';
import { MENU_STATES } from '../Constants/OrderStates';

const Hero = () => {
    const navigate = useNavigate();
    const marqueeItems = [...categories, ...categories, ...categories];

    const handleCategoryClick = (name) => {
        if (name === 'BURGERS') {
            navigate(`/?category=${MENU_STATES.BURGER}`);
        } else if (name === 'PIZZAS') {
            navigate(`/?category=${MENU_STATES.PIZZA}`);
        }
    };

    return (
        <section className="bg-primary-100 text-white pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden relative flex flex-col justify-between min-h-screen">

            <div className="flex grow items-center z-10">
                <ContainerLayout>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-2 ">
                        <div className="inline-flex items-center gap-2 border border-primary-200/40 bg-white/5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-primary-200 mb-6 md:mb-8 transition-all duration-300 hover:bg-white/10 hover:border-primary-200/60 select-none">
                            <FaBolt className="text-primary-200 animate-bounce" />
                            <span>Delivered in 25 minutes or less</span>
                        </div>

                        <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.92] mb-8 select-none uppercase">
                            CRAVE IT.<br />
                            TAP IT. EAT IT.
                        </h1>

                        <div className="flex flex-row flex-wrap items-center gap-3 justify-center w-full max-w-md px-4">
                            <a
                                href="/order"
                                onClick={(e) => { e.preventDefault(); navigate('/order'); }}
                                className="group flex-1 min-w-[120px] max-w-[160px] sm:max-w-none inline-flex items-center justify-center bg-primary-200 text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wide px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary-200/25 uppercase whitespace-nowrap"
                            >
                                Order Now
                                <FaArrowRightLong
                                    className="
                                        ml-2 sm:ml-3
                                        text-xs sm:text-base md:text-lg
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-2
                                    "
                                />
                            </a>

                            <a
                                href="#deals"
                                className="flex-1 min-w-[120px] max-w-[160px] sm:max-w-none inline-flex items-center justify-center bg-white text-primary-200 font-extrabold text-xs sm:text-sm md:text-base tracking-wide px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/5 uppercase whitespace-nowrap"
                            >
                                View Deals
                            </a>
                        </div>
                    </div>
                </ContainerLayout>
            </div>

            <ContainerLayout>

                <div className="w-full overflow-hidden py-8 mt-12 z-10 relative">

                    <div className="relative w-full flex items-center">
                        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2">
                            {marqueeItems.map((item, idx) => {
                                const { name, bgColor, textColor, image } = item || {};
                                return (<div
                                    key={`${name}-${idx}`}
                                    onClick={() => handleCategoryClick(name)}
                                    className={`flex flex-col shrink-0 w-50 sm:w-52 md:w-60 rounded-2xl p-3 pb-4 select-none hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-xl cursor-pointer ${bgColor}`}
                                >
                                    <div className="overflow-hidden rounded-2xl w-full h-58 md:h-64">
                                        <img
                                            src={image}
                                            alt={`Delicious freshly prepared ${name.toLowerCase()}`}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className={`font-black text-lg sm:text-xl tracking-wider text-center mt-3.5 block uppercase ${textColor}`}>
                                        {name}
                                    </span>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </ContainerLayout>

        </section>
    );
}

export default Hero;