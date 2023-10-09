import React, { useState, useEffect } from 'react';
import CSS from './App.module.scss';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/getImages';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query.trim() === '') return;

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0) {
          return;
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
        setError(null);
      } catch (error) {
        setError(error);
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    if (!newQuery.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setIsLoading(true);
    setError(null);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageURL => {
    setIsModalOpen(true);
    setSelectedImageURL(imageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageURL('');
  };

  return (
    <div className={CSS.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => openModal(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && page < Math.ceil(totalHits / 12) && (
        <Button onClick={loadMoreImages} />
      )}
      {error && <p className={CSS.Error}>Error loading images.</p>}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          imageURL={selectedImageURL}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
