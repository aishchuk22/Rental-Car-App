import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/slice";
import s from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const {
    id,
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

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car));
  };

  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  const formatMileage = (value) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <li className={s.card}>
      <div className={s.imageWrap}>
        <img src={img} alt={`${brand} ${model}`} className={s.image} />
        <button
          type="button"
          className={s.heartBtn}
          onClick={handleToggleFavorite}
        >
          <svg className={s.heartIcon}>
            <use
              href={`/icons/symbol-definitions.svg#${
                isFavorite ? "icon-full-heart" : "icon-empty-heart"
              }`}
            />
          </svg>
        </button>
      </div>

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

      <button type="button" className={s.readMoreBtn} onClick={handleReadMore}>
        Read more
      </button>
    </li>
  );
};

export default CarCard;
