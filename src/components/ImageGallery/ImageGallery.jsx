import React from 'react';
import CSS from './ImageGallery.module.scss';

export function ImageGallery({ children }) {
  return <ul className={CSS.ImageGallery}>{children}</ul>;
}
