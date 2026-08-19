import { Hero } from "../components/Home/Hero";
import { Gallery } from "../components/Home/Gallery";
import { Testimonial } from "../components/Home/Testimonial";
import { Maps } from "../components/Maps";
export const Home = () => {
  return (
    <main className="home">
      <Hero />
      <section className="page-container">
        <Gallery />
        <Maps />
        <Testimonial />
      </section>
    </main>
  );
};
