import { useState, useEffect } from "react";
import { testimonialData } from "../../data/testimonialData";

export const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex(index === 0 ? testimonialData.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === testimonialData.length - 1 ? 0 : index + 1);
  };

  const { name, rating, text, image } = testimonialData[index];

  return (
    <section className="testimonials">
      <h2 className="title">Lo que dicen nuestros clientes</h2>

      <div className="testimonial-slider">
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <div className="testimonial-card">
          <img src={image} alt={name} className="testimonial-img" />

          <h3>{name}</h3>

          <div className="stars">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>

          <p>"{text}"</p>
        </div>

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </section>
  );
};
