import ContainerLayout from '../Layouts/ContainerLayout';
import { eventPackages } from '../Constants/EventStates';

export default function Events() {
    return (
        <section id="deals" className="bg-primary-1000 py-12 md:py-16 overflow-hidden">
            <ContainerLayout>
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center justify-center border border-primary-200/45 bg-[#EFEAE2]/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-primary-200 mb-3 uppercase select-none">
                        Catering & Events
                    </span>
                    <h2 className="text-primary-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 select-none uppercase">
                        Feed The Crowd.
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base font-semibold max-w-md">
                        Stack your favorites and save big. Limited time offers that actually matter.
                    </p>
                </div>

                <div className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible gap-4 md:gap-6 pb-6 md:pb-0 w-full mb-12 scrollbar-none">
                    {eventPackages.map((pkg, idx) => {
                        const { title, serves, price, items, image } = pkg || {};
                        return (<div
                            key={idx}
                            className={`relative overflow-hidden group rounded-2xl lg:rounded-3xl p-3 lg:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl w-[85vw] sm:w-[45vw] md:w-full shrink-0 ${pkg.bgColor}`}
                        >

                            <div>
                                <div className="overflow-hidden rounded-xl w-full h-40 sm:h-44 md:h-48 mb-5 shadow-sm">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <div className="flex flex-col">
                                        <h3 className="text-primary-100 font-black text-lg sm:text-xl tracking-tight uppercase leading-tight select-none">
                                            {title}
                                        </h3>
                                        <span className="text-primary-100/70 font-bold text-xs mt-1">
                                            {serves}
                                        </span>
                                    </div>
                                    <span className="text-white font-black text-2xl lg:text-3xl tracking-tight leading-none">
                                        {price}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {items?.map((item, id) => (
                                        <span
                                            key={id}
                                            className="bg-white/20 backdrop-blur-xs text-primary-100 font-extrabold text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full select-none"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary-100 text-white font-black text-sm tracking-wider py-3.5 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-black/10 cursor-pointer uppercase"
                                aria-label={`Grab deal for ${title.toLowerCase() || ''}`}
                            >
                                Grab Deal
                            </button>
                        </div>)
                    })}
                </div>

                <div className="bg-white border border-gray-200/80 rounded-3xl p-4 sm:p-7 flex flex-col md:flex-row justify-between items-center w-full gap-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-primary-100 font-black text-xl sm:text-2xl tracking-tight uppercase mb-1 md:mb-1.5 select-none">
                            Custom Event Catering
                        </h3>
                        <p className="text-gray-500 text-sm font-semibold leading-relaxed">
                            Birthdays, corporate lunches, graduations, we build it your way.
                        </p>
                    </div>
                    <button
                        className="w-full md:w-auto bg-primary-200 text-white font-black text-sm tracking-wider px-6 py-3.5 rounded-xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary-200/25 cursor-pointer uppercase whitespace-nowrap"
                        aria-label="Build a custom event order"
                    >
                        Build Custom Order
                    </button>
                </div>
            </ContainerLayout>
        </section>
    );
}
