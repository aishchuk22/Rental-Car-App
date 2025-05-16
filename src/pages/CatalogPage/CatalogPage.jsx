import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operations";
import { nextPage, resetCars } from "../../redux/cars/slice";
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors";
import CarCard from "../../components/CarCard/CarCard";
import { Audio } from "react-loader-spinner";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(resetCars());
    setIsInitialized(true);

    return () => {
      dispatch(resetCars());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchCars({ page, limit: 12 }));
    }
  }, [dispatch, page, isInitialized]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(nextPage());
    }
  };

  const hasCars = cars && cars.length > 0;

  const showLoadMoreButton = !isLoading && page < totalPages;

  return (
    <section className={s.catalog}>
      <h1 className={s.title}>Catalog</h1>

      {hasCars && (
        <ul className={s.list}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}

      {isLoading && (
        <div className={s.loaderWrap}>
          <Audio height={80} width={80} color="#3b82f6" />
        </div>
      )}

      {error && <p className={s.error}>Error: {error}</p>}

      {showLoadMoreButton && (
        <button className={s.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default CatalogPage;
