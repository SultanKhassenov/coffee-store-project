import Link from "next/link";

type LogoProps = {
    // className?: string;
    media: "sm" | "lg";
}

export default function Logo({ media }: LogoProps ) {
    return (
        <Link href="/" 
            className={`${media === "sm" 
                ? "text-lg max-sm:text-[3vw] font-semibold"
                : media === "lg" && "font-bold"
            }`}
            >
            COFFEINO
        </Link>
    )
}