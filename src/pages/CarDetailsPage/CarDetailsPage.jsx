import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCarById } from "../../redux/cars/operations";

import toast, { Toaster } from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import s from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector((state) => state.cars.selectedCar);
  const isLoading = useSelector((state) => state.cars.isCarLoading);
  const error = useSelector((state) => state.cars.carError);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  const formatMileage = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Your car rental request was successfully submitted!");
    setFormData({ name: "", email: "", date: "", comment: "" });
  };

  if (isLoading) {
    return (
      <div className={s.loaderWrap}>
        <Audio height={80} width={80} color="#3b82f6" />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
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
        <div className={s.subContainer}>
          <img src={img} alt={model} className={s.image} />
          <div className={s.formWrap}>
            <h3 className={s.formTitle}>Book your car now</h3>
            <p className={s.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>
            <form className={s.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                required
                className={s.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className={s.input}
              />
              <input
                type="text"
                name="date"
                placeholder="Booking date"
                value={formData.date}
                onChange={handleChange}
                required
                className={s.input}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
              />
              <textarea
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                className={s.textarea}
              />
              <button type="submit" className={s.button}>
                Send
              </button>
            </form>
          </div>
        </div>
        <div className={s.detailsWrap}>
          <h2 className={s.title}>
            {brand} {model}, {year}
          <p className={s.carId}>ID: {carId}</p>
          </h2>
          <div className={s.subInfo}>
            <svg>
              <use href="/icons/symbol-definitions.svg#icon-location-mark" />
            </svg>
            {address.split(",")[1]}, {address.split(",")[2]}
            <p className={s.mileage}>Mileage: {formatMileage(mileage)} km</p>
          </div>

          <p className={s.price}>${rentalPrice}</p>
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
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </section>
  );
};

export default CarDetailsPage;
