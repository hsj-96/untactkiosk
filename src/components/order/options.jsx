import React from 'react';
import Option from './option';
import styles from './options.module.css';

const Options = ({ option }) => {
  return (
    <>
      <ul className={styles.wrapper}>
        {
          option.map((data) => 
            <Option 
              key={data.id} 
              name={data.name}
              list={data.list}
              price={data.price}
              imagepath={data.imagepath}
          />)
        }
      </ul>
    </>
  );
};

export default Options;