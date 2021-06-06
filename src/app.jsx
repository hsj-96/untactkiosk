import styles from './app.module.css';
import './hover.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Order from './components/order/order';
import Database from './service/database';
import Payment from './components/payment/payment';
import HandDetection from './components/hand_detection/hand_detection';
import { getPageStatus } from './components/hand_detection/pageStatus';
import { useRef } from 'react';

const db = new Database();

class Pointer {
  constructor() {
    this._x = 0;
    this._y = 0;
  }

  set x(value) {
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
  }

  get y() {
    return this._y;
  }
}

class PointerTimer {
  constructor() {
    this._time = 0;
    this._currentRef = null;
    this._isPointerInButton = false;
  }

  set time(value) {
    this._time = value;
  }
  get time() {
    return this._time;
  }

  set currentRef(ref) {
    this._currentRef = ref;
  }
  get currentRef() {
    return this._currentRef;
  }

  set isPointerInButton(value) {
    this._isPointerInButton = value;
  }
  get isPointerInButton() {
    return this._isPointerInButton;
  }

  getTickTime() {
    return 4;
  }
}
const timer = new PointerTimer();
const customClass = ['scale10', "scale20", "scale30", "scale40", "scale50"];

class Loading {
  constructor() {
    this._isLoading = false;
    this._size = 0;
  }

  set isLoading(value) {
    this._isLoading = value;
  }
  get isLoading() {
    return this._isLoading;
  }

  set size(value) {
    this._size = value;
  }
  get size() {
    return this._size;
  }

  setPos(ref, x, y) {
    if(!ref) return;
    ref.style.transform = `translate(${x-28}px, ${y-28}px)`;
  }

  setVisible(ref) {
    if(!ref) return;
    ref.style.display = 'flex';
  }

  setInvisible(ref) {
    if(!ref) return;
    ref.style.display = 'none';
  }

  increaseCircleSize(ref) {
    if(!ref || !this._isLoading) return;
    this._size = this._size + 2.5 > 56 ? 56 : this._size + 2.5;
    ref.style.width = `${this._size}px`;
    ref.style.height = `${this._size}px`;
  }
}


const App = () => {
  const pointer = new Pointer();
  const setPointerPos = (x, y) => {
    pointer.x = x;
    pointer.y = y;
  };

  const loadingRef = useRef();
  const loadingWrapperRef = useRef();
  const loading = new Loading();
  setInterval(() => {
    loading.setPos(loadingRef.current, pointer.x, pointer.y);
    loading.increaseCircleSize(loadingWrapperRef.current);
  }, 30);
  

  let refList = [];
  const initRefList = () => {
    refList = [];
    console.log('init Ref List');
  };

  const checkPointerInBox = (callback) => {
    if(refList) {
      for(const ref of refList) {
        if(getPageStatus() === ref.path) {
          const rect = ref.dom.getBoundingClientRect();
          if(pointer.x > rect.left && pointer.x < rect.right &&
            pointer.y > rect.top && pointer.y < rect.bottom) {
              if(timer.currentRef !== ref.outerHTML) { // 현재 선택된 ref 변경
                timer.time = 0;
                timer.currentRef = ref.outerHTML;
                
                refList.map((data) => data.dom.classList.remove(...customClass));
                ref.dom.classList.add(ref.animtype);
                loading.size = 0;
              }
              loading.setVisible(loadingRef.current);
              loading.isLoading = true;

              timer.isPointerInButton = true;
              timer.time = timer.time + 1;
              if(timer.time === timer.getTickTime()) {
                ref.dom.click();
                timer.time = 0;
                loading.size = 0;
              }
              else {
                console.log(`timer.time : ${timer.time}`); ///////////////
              }

              break;
          }
          else {
            timer.isPointerInButton = false;
          }
        }
      }
    }

    callback();
  };

  setInterval(() => {
    checkPointerInBox(() => {
      if(!timer.isPointerInButton) {  // 포인터가 어떠한 버튼 위에도 없을 때
        timer.currentRef = null;
        timer.time = 0;
        console.log('out pointer');  ///////////////
        refList.map((data) => data.dom.classList.remove(...customClass));

        loading.setInvisible(loadingRef.current);
        loading.isLoading = false;
        loading.size = 0;
      }
    });
  }, 300);

  const addRef = (ref) => {
    let findIndex = 0;
    const findRef = refList.find((data, idx) => { 
      if(data.outerHTML === ref.outerHTML) {
        findIndex = idx;
        return data;
      }
      else {
        return null;
      }
    });
    if(findRef) {
      refList[findIndex] = ref;
    }
    else {
      refList.push(ref); // { id, path, dom }
    }

    //console.log(refList)
  }

  return (
    <div className={styles.app}>
      <div className={styles.detectionWrapper}>
        <HandDetection setPointerPos={setPointerPos} />
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home initRefList={initRefList} addRef={addRef} />
          </Route>
          <Route path="/order">
            <Order db={db} addRef={addRef} />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
        </Switch>
      </BrowserRouter>
      <div ref={loadingRef} className={styles.loading}>
        <div ref={loadingWrapperRef} className={styles.loadingWrapper}></div>
      </div>
    </div>
  );
}

/*
      <div className={styles.detectionWrapper}>
        <HandDetection setPointerPos={setPointerPos} />
      </div>
*/

/**
 * [ 할 일 ]
 *  1. db 받아오는 로직 작성                                                                 OK
 *  2. service 에 db 구성하는 임의의 데이터 생성 (리뷰 페이지 까지 고민같이하기)                       OK
 *  3. order page 작성하기 - order detail, 메뉴 추가, menu detail popup                      OK
 *  4. 버튼 동작 이벤트 만들기
 *     4-1. hover 시에 버튼 커지게 하는 반응형 추가                                             OK
 *     4-2. 버튼 동작 타이머 효과 추가                                                         OK
 *  5. 화면 크기에 따라서 주문 화면에서 아이콘 갯수 (6개 이상) 일 경우 처리 해서 오류 수정하기              OK
 */

/**
 * [ 수정 사항 ]
 * 1. 버튼 사이즈 조절
 *    1-1. 카테고리 버튼 사이즈 크게 조절                                                       OK
 *    1-2. 주문내역 사이즈 크게 조절                                                           NO -> 나중에 2학기 돼서 디자인 다 적용되고, 옵션 선택 기능 추가했을 때 추가하겠음
 *    1-3. 주문내역 X 버튼 사이즈 크게 조절                                                     NO -> 나중에 2학기 돼서 디자인 다 적용되고, 옵션 선택 기능 추가했을 때 추가하겠음
 * 2. 카테고리 버튼 선택 표시 하기                                                             OK
 * 3. 메뉴 버튼들 아이콘 배치 및 크기 재수정                                                     OK
 * 4. 마우스 hover 시에 메뉴 정보 다 보이게 수정                                                 NO -> 나중에 2학기 돼서 디자인 다 적용되고, 옵션 선택 기능 추가했을 때 추가하겠음
 * 5. 포인터의 좌표값이 제대로 나타나지 않는 문제점 해결하기                                          OK
 * 6. 옵션 이미지 배열로 로직 수정                                                             OK
 * 7. 메뉴 6개인 경우에 다음 페이지 버튼 눌리는 버그 수정                                           OK
 * 8. 메뉴 선택시 계속해서 ref 가 추가되는 현상과                                                 OK
 *    메뉴 선택시 pagepath 가 변경되지 않아다른 버튼이 눌리는 현상 해결하기                            OK
 */

/**
 *  [ 앞으로 2학기에 필요한 추가 적용사항 ]
 *  1. 포인터와의 상호작용 애니메이션 강화
 *  2. 미구현 기능(옵션 선택, 주문 정보 리스트 보기, 리뷰 페이지 ...) 구현
 *  3. UI/UX 개선
 */

/**
 * 1. if(componentDidMount) -> propsFunc(string: pagename, component: buttonRef[])
 * 2. page 별로 컴포넌트들을 관리 
 * 3. 컴포넌트의 위치정보를 저장
*/


export default App;
