import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import getButtonInfo from '../../common/getButtonInfo';
import styles from './home.module.css';
import { setPageStatus } from '../hand_detection/pageStatus';

const Home = ({ initRefList, addRef }) => {
  const history = useHistory();

  const startButtonRef = useRef();
  useEffect(() => {
    initRefList();
    setPageStatus('home');
    addRef(getButtonInfo({ ref: startButtonRef, path: 'home', animtype: 'scale20' }));
  });
  
  const onClickStart = () => {
    setPageStatus('order');
    history.push('/order');
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>비접촉 키오스크 사용법</h1>
      </div>
      <div className={styles.stepWrapper}>
        <div className={styles.step}>
          <img className={styles.stepnum} src="/images/icon/번호1.png" alt="step num" />
          <div className={styles.imgWrapper}>
            <img src="/images/home/step1.png" alt="step img" />
            <h1>손 인식</h1>
          </div>
          <div className={styles.textWrapper}>
            <p>위의 사진처럼</p>
            <p>카메라에 손을 인식해주세요</p>
          </div>
        </div>
        <div className={styles.step}>
          <img className={styles.stepnum} src="/images/icon/번호2.png" alt="step num" />
          <div className={styles.imgWrapper}>
            <img src="/images/home/step2.png" alt="step img" />
            <h1>이동</h1>
          </div>
          <div className={styles.textWrapper}>
            <p>화면의 초록색 포인터를 보고</p>
            <p>손가락을 움직이세요</p>
          </div>
        </div>
        <div className={styles.step}>
          <img className={styles.stepnum} src="/images/icon/번호3.png" alt="step num" />
          <div className={styles.imgWrapper}>
            <img src="/images/home/step3.png" alt="step img" />
            <h1>선택</h1>
          </div>
          <div className={styles.textWrapper}>
            <p>선택할 버튼 위로</p>
            <p>손가락을 멈추세요</p>
            <p>(색깔이 채워지면 클릭됩니다.)</p>
          </div>
        </div>
      </div>
      <div ref={startButtonRef} className={styles.startButton} onClick={onClickStart}>
        <p className={styles.upperDescription}>키오스크 시작하기</p>
        <p className={styles.lowerDescription}>위의 방법처럼 초록색 포인터를 올려보세요</p> 
      </div>
    </div>
  );
};

export default Home;