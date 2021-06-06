import React, { useEffect, useRef } from 'react';
import OrderItem from './order_item';
import styles from './order_list.module.css';
import getButtonInfo from '../../common/getButtonInfo';

const OrderList = ({ orderList, onDeleteOrderList, onHandlePayment, addRef }) => {
  const price = orderList.reduce((prev, next) => prev + next.price, 0);
  const count = orderList.reduce((prev, next) => prev + next.count, 0);

  const payRef = useRef();
  useEffect(() => {
    addRef(getButtonInfo({ ref: payRef, path: 'order', animtype: 'scale10' }));
  });

  return (
    <div className={styles.wrapper}>
      <h1>주문 내역</h1>
      <ul className={styles.orderList}>
        {
          orderList.map((item) => 
            <OrderItem 
              key={item.name} 
              name={item.name} 
              count={item.count} 
              price={item.price} 
              onDeleteOrderList={onDeleteOrderList} 
              addRef={addRef}
            />)
        }
      </ul>
      <div className={styles.result}>
        <div>
          <span>결제 금액 : </span>
          <strong>{`${priceToString(price)} 원`}</strong>
        </div>
        <div>
          <span>수량 : </span>
          <span>{`${count} 개`}</span>
        </div>
      </div>
      <div ref={payRef} className={styles.payButton} onClick={onHandlePayment}>결제 하기</div>
    </div>
  );
};

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default OrderList;