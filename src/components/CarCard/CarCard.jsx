import s from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const {
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
    img,
  } = car;

  const formatMileage = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <li className={s.card}>
      <img src={img} alt={`${brand} ${model}`} className={s.image} />
      <div className={s.info}>
        <div className={s.titleLine}>
          <h3 className={s.title}>
            {brand} <span className={s.model}>{model}</span>, {year}
          </h3>
          <p className={s.price}>${rentalPrice}</p>
        </div>
        <p className={s.text}>
          {address.split(",")[1]} | {address.split(",")[2]} | {rentalCompany}
        </p>
        <p className={s.text}>
          {type} | {formatMileage(mileage)} km
        </p>
      </div>
    </li>
  );
};

export default CarCard;
