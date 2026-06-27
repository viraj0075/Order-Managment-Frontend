import ContainerLayout from '../Layouts/ContainerLayout';
import { processSteps } from '../Constants/ProcessStates';

export default function Proccess() {
    return (
        <section className="bg-primary-900 py-12 md:py-16 overflow-hidden">
            <ContainerLayout>
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center justify-center border border-primary-200/45 bg-[#EFEAE2]/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-primary-200 mb-3 uppercase select-none">
                        Process
                    </span>
                    <h2 className="text-primary-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 select-none uppercase">
                        Browse Then Order
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base font-semibold max-w-md">
                        Scroll through everything we've got cooking.
                    </p>
                </div>

                <div className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible gap-4 md:gap-6 pb-6 md:pb-0 w-full scrollbar-none">
                    {processSteps.map((stepItem, idx) => {
                        const { image, title, step, desc, label, labelColor } = stepItem || {};
                        return (<div
                            key={idx}
                            className="relative overflow-hidden group rounded-2xl lg:rounded-3xl h-[350px] sm:h-[420px] md:h-[480px] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 w-[85vw] sm:w-[45vw] md:w-full shrink-0"
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent z-10 pointer-events-none rounded-2xl lg:rounded-3xl" />

                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                            />

                            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 z-20 flex flex-col items-start text-left">
                                <span className="bg-white text-primary-100 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-sm select-none">
                                    {step}
                                </span>

                                <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight leading-tight uppercase mb-2 select-none">
                                    {title}
                                </h3>

                                <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed mb-4 max-w-xs">
                                    {desc}
                                </p>

                                <span className={`font-black text-xl sm:text-2xl tracking-widest uppercase select-none ${labelColor}`}>
                                    {label}
                                </span>
                            </div>
                        </div>)
                    }
                    )}
                </div>
            </ContainerLayout>
        </section >
    );
}
