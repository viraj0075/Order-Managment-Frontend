import { showcases, stats } from '../Constants/FamilyStates';
import ContainerLayout from '../Layouts/ContainerLayout';

export default function Family() {

    return (
        <section className="bg-pirmary-900 py-12 md:py-16 overflow-hidden">
            <ContainerLayout>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                    {stats.map((stat, idx) => {
                        const { value, label, bgColor } = stat || {};
                        return (
                            <div
                                key={idx}
                                className={`flex flex-col items-center justify-center p-3 sm:p-6 rounded-2xl lg:rounded-4xl aspect-[1.15] sm:aspect-square text-center shadow-sm select-none transition-transform duration-300 ${bgColor}`}
                            >
                                <span className="text-primary-100 font-black text-3xl sm:text-4xl lg:text-5xl mb-2 tracking-tight uppercase leading-none">
                                    {value}
                                </span>
                                <span className="text-primary-100 font-extrabold text-xs sm:text-sm lg:text-base leading-tight opacity-90">
                                    {label}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {showcases.map((showcase, idx) => {
                        const { gridClass, image, title } = showcase || {};
                        return (
                            <div
                                key={idx}
                                className={`relative overflow-hidden group rounded-2xl lg:rounded-4xl h-[300px] sm:h-[400px] md:h-[480px] shadow-sm ${gridClass}`}
                            >
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10 rounded-2xl lg:rounded-4xl pointer-events-none" />

                                <img
                                    src={image}
                                    alt={title.replace('\n', ' ')}
                                    className="w-full h-full object-cover rounded-2xl lg:rounded-4xl transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />

                                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20">
                                    <h3 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase leading-tight select-none whitespace-pre-line">
                                        {title}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ContainerLayout>
        </section>
    );
}