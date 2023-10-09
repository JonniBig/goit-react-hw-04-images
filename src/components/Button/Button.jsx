import React from 'react';
import CSS from './Button.module.scss';

export function Button({ onClick }) {
  return (
    <button type="button" className={CSS.Button} onClick={onClick}>
      Load more
    </button>
  );
}
