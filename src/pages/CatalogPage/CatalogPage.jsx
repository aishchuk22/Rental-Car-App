import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchCars, fetchFilteredCars } from "../../redux/cars/operations";
import { nextPage, resetCars } from "../../redux/cars/slice";
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors";

import FilterPanel from "../../components/FilterPanel/FilterPanel";
import NotFound from "../../components/NotFound/NotFound";
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
  const [filters, setFilters] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(resetCars());
    setIsInitialized(true);
    return () => {
      dispatch(resetCars());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isInitialized) return;

    const payload = filters
      ? { ...filters, page, limit: 12 }
      : { page, limit: 12 };

    if (filters) {
      dispatch(fetchFilteredCars(payload));
    } else {
      dispatch(fetchCars(payload));
    }
  }, [dispatch, page, isInitialized, filters]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(nextPage());
    }
  };

  const handleFilter = (filterValues) => {
    dispatch(resetCars());
    setFilters(filterValues);
  };

  const hasCars = cars && cars.length > 0;
  const showLoadMoreButton = !isLoading && hasCars && page < totalPages;

  return (
    <section className={s.catalog}>
      <FilterPanel onFilter={handleFilter} />

      {hasCars && (
        <ul className={s.list}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}

      {!isLoading && !error && !hasCars && <NotFound />}

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
