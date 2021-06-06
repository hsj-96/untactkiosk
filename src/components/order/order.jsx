import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './order.module.css';
import Category from '../category/category';
import Menus from '../menus/menus';
import PageButtons from './page_buttons';
import OrderList from './order_list';
import MenuDetail from './menu_detail';
import { setPageStatus } from '../hand_detection/pageStatus';

const MAX_MENU_NUM = 6;

const Order = ({ db, addRef }) => {
  const history = useHistory();
  const [categorySelect, setCategorySelect] = useState(null); //null
  const [menuSelect, setMenuSelect] = useState(null);
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]); // name, price, count

  const onCategoryClick = (categoryId) => {
    setCategorySelect(categoryId);
    setPage(1);
  };

  const onClickPageButton = (type) => {
    if(type === 'prev') {
      const value = page === 1 ? 1 : page-1;
      setPage(value);
    }
    else if(type === 'next') {
      const maxPage = parseInt((db.getMenuList(categorySelect).length-1) / 6) + 1;
      const value = page === maxPage ? maxPage : page+1;
      setPage(value);
    }
  };

  const onAddOrderList = ({name, price, count}) => {
    setOrderList((list) => {
      if(list.find((data) => data.name === name)) {
        const updated = list.map((item) => {
          if(item.name === name) return { name, price, count }
          else return item;
        });
        return updated;
      }
      else {
        const updated = [ ...list, { name, price, count }];
        return updated;
      }
    });
  };

  const onDeleteOrderList = (name) => {
    setOrderList((list) => {
      const updated = list.filter((data) => data.name !== name);
      return updated;
    });
  };

  const onClickMenu = (menuId) => {
    setPageStatus(`menuselect-${menuId}`);
    setMenuSelect(menuId);
  };

  const onDeleteMenuPopup = () => {
    setPageStatus('order');
    setMenuSelect(null);
  };

  const onHandlePayment = () => {
    setPageStatus('payment');
    history.push('/payment');
  }

  return (
    <div className={`${styles.order} ${isCategorySelected(categorySelect)}`}>
      {
        !categorySelect && (<div className={styles.headerWrapper}>
          <img className={styles.cupIcon} src="/images/home/컵아이콘.png" alt="cup icon" />
          <span className={styles.headerText}>
            <span>안녕하세요</span><strong> KU커피 </strong><span>입니다</span>
          </span>
        </div>)
      }
      <div className={`${styles.categoryWrapper} ${isCategorySelected(categorySelect)}`}>
        {
          db.getCategoryList().map((data) => (
            <Category 
              key={data.id} 
              id={data.id} 
              name={data.name} 
              imagepath={data.imagepath}
              categorySelect={categorySelect} 
              onCategoryClick={onCategoryClick} 
              addRef={addRef}
            />
          ))
        }
      </div>
      {
        categorySelect && (
          <div className={styles.menupageWrapper}>
            <div className={styles.menusWrapper}>
              <Menus 
                db={db.getMenuList(categorySelect).filter((data, idx) => 
                  (idx >= (page-1) * MAX_MENU_NUM) && (idx < page * MAX_MENU_NUM)
                )} 
                onClickMenu={onClickMenu}
                addRef={addRef}
              />
              <PageButtons 
                page={page}
                maxPage={parseInt((db.getMenuList(categorySelect).length-1) / 6) + 1} 
                onClickPageButton={onClickPageButton} 
                addRef={addRef}
              />
            </div>
            <div className={styles.orderDetailWrapper}>
              <OrderList 
                orderList={orderList} 
                onDeleteOrderList={onDeleteOrderList} 
                onHandlePayment={onHandlePayment}
                addRef={addRef}
              />
            </div>
            { 
            menuSelect && (
              <div className={`${styles.menuDetailPopup} ${isMenuSelected(menuSelect)}`}>
                <MenuDetail 
                  db={db} 
                  menuSelect={menuSelect} 
                  orderList={orderList}
                  onDeleteMenuPopup={onDeleteMenuPopup} 
                  onAddOrderList={onAddOrderList}
                  addRef={addRef}
                />
              </div>
            )
            }
          </div>
        )
      }
    </div>
  );
};

function isCategorySelected(categorySelect) {
  return categorySelect ? styles.categorySelectOn : styles.categorySelectOff;
}

function isMenuSelected(menuSelect) {
  return menuSelect ? styles.menuPopupOn : styles.menuPopupOff;
}

export default Order;
