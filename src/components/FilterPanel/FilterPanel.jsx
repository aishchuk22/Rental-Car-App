import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchPriceOptions } from "../../redux/filters/operations";
import {
  selectBrands,
  selectPriceOptions,
} from "../../redux/filters/selectors";

import s from "./FilterPanel.module.css";

const FilterPanel = ({ onFilter }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const priceOptions = useSelector(selectPriceOptions);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [isValidRange, setIsValidRange] = useState(true);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchPriceOptions());
  }, [dispatch]);

  useEffect(() => {
    if (mileageFrom && mileageTo) {
      const from = parseInt(mileageFrom.replace(/,/g, ""));
      const to = parseInt(mileageTo.replace(/,/g, ""));
      setIsValidRange(from <= to);
    } else {
      setIsValidRange(true);
    }
  }, [mileageFrom, mileageTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidRange) return;
    onFilter({ brand, price, mileageFrom, mileageTo });
  };

  const formatInput = (value) => {
    return value.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <form className={s.filterPanel} onSubmit={handleSubmit}>
      <label className={s.label}>
        <span>Car brand</span>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={s.select}
        >
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className={s.label}>
        <span>Price/ 1 hour</span>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={s.select}
        >
          <option value="">Choose a price</option>
          {priceOptions.map((p) => (
            <option key={p} value={p}>
              ${p}
            </option>
          ))}
        </select>
      </label>

      <label className={s.label}>
        <span>Car mileage / km</span>
        <div className={s.mileageInputs}>
          <input
            type="text"
            placeholder="From"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(formatInput(e.target.value))}
            className={s.input}
          />
          <span className={s.separator}></span>
          <input
            type="text"
            placeholder="To"
            value={mileageTo}
            onChange={(e) => setMileageTo(formatInput(e.target.value))}
            className={`${s.input} ${!isValidRange ? s.invalid : ""}`}
          />
        </div>
        {!isValidRange && (
          <p className={s.errorText}>Please enter a valid mileage range</p>
        )}
      </label>

      <button type="submit" className={s.searchBtn} disabled={!isValidRange}>
        Search
      </button>
    </form>
  );
};

export default FilterPanel;
