import React, { useEffect, useRef } from 'react';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './menu.module.css';

const Menu = ({ menudata, id, onClickMenu, addRef }) => {
  const { name, price, imagepath } = menudata; // id, category, option

  const handleClickMenu = () => {
    onClickMenu(id);
  };

  const menuRef = useRef();
  useEffect(() => {
    addRef(getButtonInfo({ ref: menuRef, path: 'order', animtype: 'scale10' }));
  });

  return (
    <div ref={menuRef} className={styles.menu} onClick={handleClickMenu}>
      <img className={styles.image} src={imagepath} alt="menu img" />
      <span className={styles.name}>{name}</span>
      <span className={styles.price}>{priceToString(price)}원</span>
    </div>
  );
};

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default Menu;