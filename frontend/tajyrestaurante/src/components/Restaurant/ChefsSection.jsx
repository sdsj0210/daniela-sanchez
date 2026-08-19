import { chefData } from "../../data/chefData";

export const ChefSection = () => {
  return (
    <section className="chefs-section">
      <h2 className="title">Nuestros Chefs</h2>

      <div className="chefs-grid">
        {chefData.map((chef) => (
          <div key={chef.name} className="card chefs">
            <div className="chef-image-wrapper">
              <img
                src={chef.image}
                alt={chef.name}
                loading="lazy"
                width="400"
                height="500"
              />
            </div>

            <div className="chef-info">
              <h2>{chef.name}</h2>
              <span className="chef-role">{chef.role}</span>
              <p>{chef.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
