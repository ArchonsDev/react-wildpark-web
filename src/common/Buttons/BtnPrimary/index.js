import React from "react";

import styles from './styles.module.css';

const BtnPrimary = ({ onClick, disabled, children }) => {
  return <button type="button" className={`${styles['button-style']} px-4 py-1`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default BtnPrimary;