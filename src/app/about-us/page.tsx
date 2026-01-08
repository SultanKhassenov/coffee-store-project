import Footer from "@/components/layout/footer/Footer";
import AboutUsLayout from "@/components/sections/about-us/AboutUsLayout";
import { AboutUsSection } from "@/components/sections/about-us/AboutUsSection";

export default function AboutUsPage() {
    return (
        <>
            <AboutUsLayout />
            <AboutUsSection />
            <Footer />
        </>
    );
}
