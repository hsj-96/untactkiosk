import React from 'react';
import styles from './review.module.css';

const Review = ({ db, orderList, grade, text }) => {
  const menu = orderList.map((id) => db.getMenuInfo(id).name);
  const tmpStyle = {
    maxWidth: `${grade*2}em`
  };

  return (
    <li className={styles.wrapper}>
      <div className={styles.starWrapper}>
        <div className={styles.starGrayWrapper}>
          <img className={styles.starGray} src="/images/review/star_rate_gray.png" alt="star img" />
        </div>
        <div className={styles.starColorWrapper} style={tmpStyle}>
          <img className={styles.starColor} src="/images/review/star_rate_color.png" alt="star img" />
        </div>
      </div>
      <div className={styles.menuWrapper}>
        { 
          menu.map((name, idx) => <div key={idx} className={styles.name}>{name}</div>)
        }
      </div>
      <div className={styles.text}>
        {text}
      </div>
    </li>
  );
};

export default Review;