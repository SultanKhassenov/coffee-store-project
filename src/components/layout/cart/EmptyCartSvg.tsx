import { ShoppingCart } from "lucide-react";

export default function EmptyCartSvg() {
    return (
        <div className="min-md:w-[300px] max-md:w-full h-fit py-6 max-md:p-4 mx-auto flex flex-col items-center text-[#bbb] font-medium md:text-sm"> 
            <svg viewBox="0 0 24 24" fill="none" className="mr-[1.3vw] w-1/3 h-1/3">
                <defs>
                    <radialGradient id="grad-stroke" cx="50%" cy="0%" r="100%">
                        <stop offset="80%" stopColor="#bbb" />
                        <stop offset="100%" stopColor="#999" />
                    </radialGradient>
                </defs> 
                <ShoppingCart stroke="url(#grad-stroke)"/> 
            </svg>
        {/* shadow */}
        <div className="bg-[radial-gradient(at_50%_50%,_#0005_10%,_transparent_50%)] w-1/2 h-6 mb-2"/>
            <p>Здесь пока пусто...</p> 
        </div>
    );
}