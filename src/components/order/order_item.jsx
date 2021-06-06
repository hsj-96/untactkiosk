import React, { useEffect, useRef } from 'react';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './order_item.module.css';

const OrderItem = ({ name, count, price, onDeleteOrderList, addRef }) => {
  const handleItemDelete = () => {
    onDeleteOrderList(name);
  }

  const closeRef = useRef();
  useEffect(() => {
    addRef(getButtonInfo({ ref: closeRef, path: 'order', animtype: 'scale50' }));
  });

  return (
    <li className={styles.orderitem}>
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count}</span>
      <strong className={styles.price}>{`${priceToString(price)}원`}</strong>
      <button ref={closeRef} data-menu={name} className={styles.closeButton} onClick={handleItemDelete}>X</button>
    </li>
  );
};

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default OrderItem;