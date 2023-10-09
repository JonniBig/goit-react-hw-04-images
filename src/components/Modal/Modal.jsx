import React, { useEffect } from 'react';
import CSS from './Modal.module.scss';

export function Modal({ isOpen, imageURL, onClose }) {
  useEffect(() => {
    const onEscapeKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', onEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', onEscapeKey);
    };
  }, [isOpen, onClose]);

  const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={CSS.Overlay} onClick={onOverlayClick}>
      <div className={CSS.Modal}>
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
}
