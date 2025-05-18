import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>No cars found. Please adjust your filters.</p>
    </div>
  );
};

export default NotFound;
