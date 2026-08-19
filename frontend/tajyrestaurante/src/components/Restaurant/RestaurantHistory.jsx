import { history } from "../../data/restauranteData";
export const RestaurantHistory = () => {
  return (
    <section className="about-history">
      <h2 className="title">Nuestra historia</h2>
      <p className="about-text">{history}</p>
    </section>
  );
};
