import { FaApple, FaGooglePlay, FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import ContainerLayout from '../Layouts/ContainerLayout';
import { footerLinks, addressInfo, contactInfo } from '../Constants/FooterStates';
import { useNavigate } from 'react-router-dom';
import { MENU_STATES } from '../Constants/OrderStates.jsx';
import Input from './UI/Input.jsx';

const Footer = () => {
    const navigate = useNavigate();

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        if (href === '#menu') {
            navigate('/?scroll=menu');
        } else if (href === '#pizza') {
            navigate(`/?category=${MENU_STATES.PIZZA}`);
        } else if (href === '#burger') {
            navigate(`/?category=${MENU_STATES.BURGER}`);
        } else {
            navigate(href);
        }
    };
    return (
        <footer className="bg-primary-100 text-white py-16 border-t border-white/5">
            <ContainerLayout>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-start">

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h4 className="text-primary-200 font-black text-lg mb-6 uppercase tracking-widest select-none">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.quickLinks.map((link, idx) => {
                                const { href, label } = link;
                                return (
                                    <li key={idx} >
                                        <a
                                            href={href}
                                            onClick={(e) => handleLinkClick(e, href)}
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-extrabold uppercase tracking-wider select-none cursor-pointer"
                                        >
                                            {label}
                                        </a>
                                    </li>)
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h4 className="text-primary-200 font-black text-lg mb-6 uppercase tracking-widest select-none">
                            Legal
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link, idx) => {
                                const { href, label } = link;
                                return (
                                    <li key={idx}>
                                        <a
                                            href={href}
                                            onClick={(e) => handleLinkClick(e, href)}
                                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-extrabold uppercase tracking-wider select-none cursor-pointer"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h4 className="text-primary-200 font-black text-lg mb-6 uppercase tracking-widest select-none">
                            Get The App
                        </h4>
                        <div className="flex flex-col items-center sm:items-start gap-4">
                            <a
                                href="https://apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group w-fit cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-200 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                                    <FaApple className="text-xl" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-gray-400 font-extrabold tracking-wider uppercase leading-none">Download on the</span>
                                    <span className="text-sm text-white font-black tracking-wide leading-tight group-hover:text-primary-200 transition-colors">App Store</span>
                                </div>
                            </a>

                            <a
                                href="https://play.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group w-fit cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-200 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                                    <FaGooglePlay className="text-base" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] text-gray-400 font-extrabold tracking-wider uppercase leading-none">Get it on</span>
                                    <span className="text-sm text-white font-black tracking-wide leading-tight group-hover:text-primary-200 transition-colors">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h4 className="text-white font-black text-xl mb-6 uppercase tracking-tight select-none">
                            Come Say Hi
                        </h4>
                        <div className="flex flex-col items-center sm:items-start gap-6">
                            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-200 text-white flex items-center justify-center shrink-0 shadow-md">
                                    <FaMapMarkerAlt className="text-lg" />
                                </div>
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="text-sm text-white font-black tracking-wide leading-tight uppercase mb-1">{addressInfo.title}</span>
                                    <span className="text-xs text-gray-300 font-semibold leading-relaxed">{addressInfo.sub}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-200 text-white flex items-center justify-center shrink-0 shadow-md">
                                    <FaPhoneAlt className="text-base" />
                                </div>
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="text-sm text-white font-black tracking-wide leading-tight mb-1">{contactInfo.phone}</span>
                                    <span className="text-xs text-gray-300 font-semibold leading-relaxed">{contactInfo.hours}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pt-10 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center lg:items-center gap-8 w-full">

                    <div className="flex flex-col w-full lg:max-w-md items-center lg:items-start text-center lg:text-left">
                        <h5 className="text-primary-200 font-black text-sm uppercase tracking-widest mb-3 select-none">
                            Never miss a deal again
                        </h5>
                        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px] sm:max-w-[360px]" onSubmit={(e) => e.preventDefault()}>
                            <div className="grow">
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="border-white/20! text-white! placeholder-white/40! focus:border-primary-200! py-2!"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-primary-200 hover:bg-orange-600 text-white font-black text-xs tracking-wider px-6 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase whitespace-nowrap w-full sm:w-auto"
                            >
                                Subscribe <FaArrowRight className="text-xs" />
                            </button>
                        </form>
                        <p className="text-gray-400 text-xs mt-2.5 font-semibold">
                            Get exclusive combos straight to your inbox. No spam, ever.
                        </p>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-4 shrink-0 w-full lg:w-auto">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <span className="text-gray-300 text-sm font-black uppercase tracking-wider select-none">Follow us:</span>
                            <div className="flex gap-2.5">
                                {footerLinks.social.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-primary-200 text-white flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-110 active:scale-95 shadow-md"
                                        aria-label={`Follow us on ${social.label}`}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs font-semibold select-none">
                            © {new Date().getFullYear()} Snacks N Snacks. All rights reserved.
                        </p>
                    </div>

                </div>
            </ContainerLayout>
        </footer >
    );
};

export default Footer;