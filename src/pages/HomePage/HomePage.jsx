import { useNavigate } from 'react-router-dom';
import s from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalog');
  };

  return (
    <section className={s.hero}>
      <div className={s.overlay}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button className={s.button} onClick={handleClick}>
          View Catalog
        </button>
      </div>
    </section>
  );
};

export default HomePage;
