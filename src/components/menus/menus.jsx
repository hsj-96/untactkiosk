import React from 'react';
import Menu from '../menu/menu';
import styles from './menus.module.css';

const Menus = ({ db, onClickMenu, addRef }) => {
  return (
    <div className={styles.menus}>
      <div className={styles.menuWrapper}>
        {
          db.map((data) => (
              <Menu 
                key={data.id} 
                id={data.id} 
                menudata={data} 
                onClickMenu={onClickMenu}
                addRef={addRef} 
              />
          ))
        }
      </div>
    </div>
  );
};

export default Menus;