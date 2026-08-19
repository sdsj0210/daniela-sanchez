import { AboutCard } from "./AboutCard";
import { aboutContent, valores } from "../../data/restauranteData";
export const RestaurantInfo = () => {
  return (
    <section className="cards-grid">
      {aboutContent.map((item) => (
        <AboutCard key={item.title} title={item.title}>
          <p>{item.text}</p>
        </AboutCard>
      ))}

      <AboutCard title="Valores" variant="valores">
        <ul>
          {valores.map((valor) => (
            <li key={valor.title}>
              <span>{valor.title}:</span> {valor.text}
            </li>
          ))}
        </ul>
      </AboutCard>
    </section>
  );
};
