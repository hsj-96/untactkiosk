import React from 'react';
import styles from './option.module.css';

const Option = ({ name, list, price, imagepath }) => {
  return (
    <li>
      <h1>{name}</h1>
      <div className={styles.buttonWrapper}>
        {
          list.map((optName, idx) => (
            <div key={idx} className={styles.optionButton}>
              <img className={styles.image} src={imagepath[idx]} alt="option img" />
              <p className={styles.name}>{optName}</p>
              { price[idx] > 0 && <p className={styles.price}>{`${priceToString(price[idx])} 원`}</p> }
            </div>
          ))
        }
      </div>
    </li>
  );
};

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default Option;