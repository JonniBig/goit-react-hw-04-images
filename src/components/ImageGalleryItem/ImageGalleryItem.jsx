import React from 'react';
import CSS from './ImageGalleryItem.module.scss';

export function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={CSS.ImageGalleryItem} onClick={onClick}>
      <img
        src={image.webformatURL}
        alt={image.user}
        className={CSS.ImageGalleryItemImage}
      />
    </li>
  );
}
