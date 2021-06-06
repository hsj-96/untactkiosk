import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './page_buttons.module.css';
import { setPageStatus } from '../hand_detection/pageStatus';

const PageButtons = ({ page, maxPage, onClickPageButton, addRef }) => {
  const history = useHistory();

  const onClickPrev = () => { 
    onClickPageButton('prev');
  }

  const onClickNext = () => {
    onClickPageButton('next');
  }

  const onClickHome = () => {
    history.push('/');
  }

  const homeRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();
  useEffect(() => {
    setPageStatus('order');
    addRef(getButtonInfo({ ref: homeRef, path: 'order', animtype: 'scale30' }));
    addRef(getButtonInfo({ ref: prevRef, path: 'order', animtype: 'scale10' }));
    addRef(getButtonInfo({ ref: nextRef, path: 'order', animtype: 'scale10' }));
  });

  return (
    <div className={styles.wrapper}>
      <div ref={prevRef} className={getPageStatus('prev', page, maxPage)} onClick={onClickPrev}>&lt; 이전</div>
      <div ref={homeRef} className={styles.homeIcon} onClick={onClickHome}><img src="/images/icon/홈.png" alt="home icon" /></div>
      <div ref={nextRef} className={getPageStatus('next', page, maxPage)} onClick={onClickNext}>다음 &gt;</div> 
    </div>
  );
};

function getPageStatus(type, page, maxPage) {
  if(page > 1 && page < maxPage) {
    // prev, next
    return styles.on;
  }
  else if(page === 1 && page !== maxPage) {
    // next
    if(type === 'next') {
      return styles.on;
    }
    else {
      return styles.off;
    }
  }
  else if(page === 1 && page === maxPage) {
    // x x
    return styles.off;
  }
  else if(page > 1 && page === maxPage) {
    // prev
    if(type === 'prev') {
      return styles.on;
    }
    else {
      return styles.off;
    }
  }
}

export default PageButtons;