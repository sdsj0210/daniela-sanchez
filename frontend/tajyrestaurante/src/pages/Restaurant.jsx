import { ChefSection } from "../components/Restaurant/ChefsSection";
import { RestaurantHistory } from "../components/Restaurant/RestaurantHistory";
import { RestaurantInfo } from "../components/Restaurant/RestaurantInfo";

export const Restaurant = () => {
  return (
    <main className="restaurant page-container">
      <ChefSection />
      <RestaurantHistory />
      <RestaurantInfo />
    </main>
  );
};
