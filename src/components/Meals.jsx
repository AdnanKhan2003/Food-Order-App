import MealItem from "./MealItem.jsx";
import { useHttp } from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching data....</p>;
  }

  if (error) {
    return <Error title="Error Occurred" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
