import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Tajy</h1>
            <p className="hero-subtitle">
              Sabores de Paraguay y Cuba en un solo lugar
            </p>

            <div className="hero-buttons">
              <Link to="/reservation" className="btn-primary">
                Reservar mesa
              </Link>

              <Link to="/menu" className="btn-secondary">
                Ver menú
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
