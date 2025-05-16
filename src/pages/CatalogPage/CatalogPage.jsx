import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operations";
import {
  selectCars,
  selectIsLoading,
  selectError,
} from "../../redux/cars/selectors";
import CarCard from "../../components/CarCard/CarCard";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  return (
    <section className={s.catalog}>
      <h1 className={s.title}>Catalog</h1>

      {isLoading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={s.list}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
    </section>
  );
};

export default CatalogPage;
