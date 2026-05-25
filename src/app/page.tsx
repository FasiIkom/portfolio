import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import FeaturedWork from "@/components/FeaturedWork";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <FeaturedWork />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
