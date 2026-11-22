import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Steps from "../components/landing/Steps";
import Compare from "../components/landing/Compare";
import Proof from "../components/landing/Proof";
import Faq from "../components/landing/Faq";
import CtaFooter from "../components/landing/CtaFooter";
import FloatingCta from "../components/landing/FloatingCta";

export default function Landing() {
    return (
        <div className="bg-page">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Steps />
                <Compare />
                <Proof />
                <Faq />
            </main>
            <CtaFooter />
            <FloatingCta />
        </div>
    );
}