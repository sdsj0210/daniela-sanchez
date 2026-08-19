import { useState } from "react";
import { dishesData } from "../../data/menuData";

export const Gallery = () => {
  const [activeDish, setActiveDish] = useState(null);

  const openDishImg = (plato) => setActiveDish(plato);
  const closeDishImg = () => setActiveDish(null);

  return (
    <section className="gallery page-container">
      <h2 className="title">Nuestros Platos</h2>

      <div className="gallery-grid">
        {dishesData.map((dish, index) => (
          <div
            className="dish-card"
            key={index}
            onClick={() => openDishImg(dish)}
          >
            <img src={dish.image} alt={dish.name} />
            <div className="dish-overlay">
              <p>{dish.name}</p>
            </div>
          </div>
        ))}
      </div>

      {activeDish && (
        <div className="lightbox">
          <div className="lightbox-content">
            <button className="close-btn" onClick={closeDishImg}>
              X
            </button>
            <img src={activeDish.image} alt={activeDish.name} />
            <p>{activeDish.name}</p>
          </div>
        </div>
      )}
    </section>
  );
};
