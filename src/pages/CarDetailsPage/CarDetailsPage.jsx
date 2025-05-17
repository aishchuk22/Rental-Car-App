import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { Audio } from "react-loader-spinner";
import s from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector((state) => state.cars.selectedCar);
  const isLoading = useSelector((state) => state.cars.isCarLoading);
  const error = useSelector((state) => state.cars.carError);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  const formatMileage = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (isLoading) {
    return (
      <div className={s.loaderWrap}>
        <Audio height={80} width={80} color="#3b82f6" />
      </div>
    );
  }

  if (error) return <p className={s.error}>Error: {error}</p>;
  if (!car) return null;

  const {
    brand,
    model,
    year,
    id: carId,
    img,
    address,
    rentalPrice,
    description,
    type,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalConditions,
    mileage,
  } = car;

  return (
    <section className={s.detailsSection}>
      <div className={s.container}>
        <img src={img} alt={model} className={s.image} />

        <div className={s.detailsWrap}>
          <h2 className={s.title}>
            {brand} {model}, {year} <span className={s.carId}>ID: {carId}</span>
          </h2>
          <p className={s.subInfo}>
            <svg>
              <use href="/icons/symbol-definitions.svg#icon-location-mark" />
            </svg>
            {address.split(",")[1]}, {address.split(",")[2]}
            <span className={s.dot}></span>
            Mileage: {formatMileage(mileage)} km
            <span className={s.dot}></span>
            <span className={s.price}>${rentalPrice}</span>
          </p>

          <p className={s.description}>{description}</p>

          <h3 className={s.blockTitle}>Rental Conditions:</h3>
          <ul className={s.conditionsList}>
            {rentalConditions.map((cond, i) => (
              <li key={i}>
                <svg>
                  <use href="/icons/symbol-definitions.svg#icon-check-circle" />
                </svg>
                {cond}
              </li>
            ))}
          </ul>

          <h3 className={s.blockTitle}>Car Specifications:</h3>
          <ul className={s.specList}>
            <li>
              <svg>
                <use href="/icons/symbol-definitions.svg#icon-calendar" />
              </svg>
              Year: {year}
            </li>
            <li>
              <svg>
                <use href="/icons/symbol-definitions.svg#icon-car" />
              </svg>
              Type: {type}
            </li>
            <li>
              <svg>
                <use href="/icons/symbol-definitions.svg#icon-fuel-pump" />
              </svg>
              Fuel Consumption: {fuelConsumption}
            </li>
            <li>
              <svg>
                <use href="/icons/symbol-definitions.svg#icon-gear" />
              </svg>
              Engine Size: {engineSize}
            </li>
          </ul>

          <h3 className={s.blockTitle}>Accessories and functionalities:</h3>
          <ul className={s.featuresList}>
            {[...accessories, ...functionalities].map((item, i) => (
              <li key={i}>
                <svg>
                  <use href="/icons/symbol-definitions.svg#icon-check-circle" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;
