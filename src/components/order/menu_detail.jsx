import React, { useEffect, useRef } from 'react';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './menu_detail.module.css';
import Options from './options';
import Review from './review';
import { setPageStatus } from '../hand_detection/pageStatus';

const MenuDetail = ({ db, menuSelect, orderList, onDeleteMenuPopup, onAddOrderList, addRef }) => {
  const { imagepath, name, price } = db.getMenuInfo(menuSelect);
  const review = db.getMenuReview(menuSelect);
  const option = db.getMenuOption(menuSelect);
  const countRef = useRef();
  const priceRef = useRef();
  
  const updateValue = orderList.find((data) => data.name === db.getMenuInfo(menuSelect).name);
  const updatePrice = updateValue ? updateValue.price : price;
  const updateCount = updateValue ? updateValue.count : 1;

  const handlePlusButton = () => {
    const count = parseInt(countRef.current.innerText) + 1; 
    countRef.current.innerText = ` ${count} `;
    priceRef.current.innerText = `${priceToString(price*count)} 원`;
  };

  const handleMinusButton = () => {
    const count = parseInt(countRef.current.innerText) - 1 < 1 ? 1 : parseInt(countRef.current.innerText) - 1; 
    countRef.current.innerText = ` ${count} `;
    priceRef.current.innerText = `${priceToString(price*count)} 원`;
  };

  const handleSaveButton = () => {
    onAddOrderList({
      name : name,
      count : parseInt(countRef.current.innerText),
      price : parseInt(countRef.current.innerText) * price
    });
    onDeleteMenuPopup();
  };

  const minusRef = useRef();
  const plusRef = useRef();
  const saveRef = useRef();
  const closeRef = useRef();
  useEffect(() => {
    setPageStatus(`menuselect-${menuSelect}`);
    addRef(getButtonInfo({ ref: minusRef, path: `menuselect-${menuSelect}`, animtype: 'scale50' }));
    addRef(getButtonInfo({ ref: plusRef, path: `menuselect-${menuSelect}`, animtype: 'scale50' }));
    addRef(getButtonInfo({ ref: saveRef, path: `menuselect-${menuSelect}`, animtype: 'scale10' }));
    addRef(getButtonInfo({ ref: closeRef, path: `menuselect-${menuSelect}`, animtype: 'scale50' }));
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.reviewWrapper}>
        <div className={styles.menuInfo}>
          <img className={styles.menuImage} src={imagepath} alt="menu img" />
          <div className={styles.infoWrapper}> 
            <p className={styles.name}>{name}</p>
            <p ref={priceRef} className={styles.price}>{`${priceToString(updatePrice)} 원`}</p>
            <div className={styles.buttonWrapper}>
              <div ref={minusRef} data-menu={menuSelect} onClick={handleMinusButton}>
                <img className={styles.minus} src="/images/icon/수량 마이너스.png" alt="minus button" />
              </div>
              <strong ref={countRef} className={styles.count}>{` ${updateCount} `}</strong>
              <div ref={plusRef} data-menu={menuSelect} onClick={handlePlusButton}>
                <img className={styles.plus} src="/images/icon/수량 플러스.png" alt="plus button" />
              </div>
            </div>
          </div>
        </div>
        <ul className={styles.reviewInfo}>
          {
            review && review.map((data) => 
              <Review 
                key={data.id}
                db={db}
                orderList={data.order_list}
                grade={data.grade}
                text={data.text}
              />)
          }
        </ul>
      </div>
      <div className={styles.optionWrapper}>
        <Options option={option} />
        <div ref={saveRef} data-menu={menuSelect} className={styles.save} onClick={handleSaveButton}>저장하기</div>
      </div>
      <div ref={closeRef} data-menu={menuSelect} className={styles.close} onClick={onDeleteMenuPopup}>X</div>
    </div>
  );
};

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default MenuDetail;