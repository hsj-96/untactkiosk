import React, { useEffect, useRef } from 'react';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './category.module.css';

const Category = ({ id, name, imagepath, categorySelect, onCategoryClick, addRef }) => {
  const selectStyle = categorySelect === id ? styles.selected : styles.notSelected; // 카테고리 선택 버튼 스타일
  const pageStyle = categorySelect ? styles.orderPage : styles.categoryPage; // 카테고리 선택 화면 : 주문 화면

  const clickButton = () => {
    onCategoryClick(id);
  }

  const categoryRef = useRef();
  useEffect(() => {
    addRef(getButtonInfo({ ref: categoryRef, path: 'order', animtype: 'scale10' }));
  });

  return (
    <div ref={categoryRef} className={`${selectStyle} ${pageStyle}`} onClick={clickButton}>
      <h1 className={styles.name}>{name}</h1>
      <img className={styles.image} src={imagepath} alt="category img" />
    </div>
  );
};

export default Category;