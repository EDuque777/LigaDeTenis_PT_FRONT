"use client"
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { FaSpinner } from 'react-icons/fa';
import styles from '../StylesFull/register.module.css';

const UploadImage = ({ onImageUpload }) => {
  const [imageprofilePicture, setimageprofilePicture] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [successImage, setSuccessImage] = useState(false);
  const [croppedProfileImage, setCroppedProfileImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false)
  const cropperRef = useRef(null);

  const handleImageChange = (event) => {
    setimageprofilePicture(event.target.files[0]);
    setShowCropper(true);
  };

  const handleCancelSubmit = () => {
    setimageprofilePicture(null);
    setShowCropper(false);
  };

  const handleSubmit = async () => {
    try {
      if (cropperRef.current) {
        const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
        if (croppedCanvas) {
          croppedCanvas.toBlob(async (blob) => {
            if (blob) {
              const formData = new FormData();
              formData.append('file', blob);
              setLoading(true);
              // const response = await axios.post('http://localhost:3001/upload', formData, {
                const response = await axios.post('https://ligadetenisptback-dev-mjcc.4.us-1.fl0.io/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
  
              if (response.status === 200) {
                // console.log(response.data.imageUrl);
                onImageUpload(response.data.imageUrl);
                setCroppedProfileImage(response.data.imageUrl)
                setSuccessImage(true)
                setLoading(false);
              } else {
                console.log(response.data);
              }
            }
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setimageprofilePicture(null);
      setShowCropper(false);
    };
  };

  const handleShowImage = () => {
    setShowImage(true)
  }

  const handleChangeImage = () => {
    setimageprofilePicture(null);
    setSuccessImage(false);
    setShowImage(false);
    setLoadingImage(false)
  }

  return (
    <div>
      {imageprofilePicture && showCropper && (
        <div className={styles.containerCropper} >
          <Cropper
            ref={cropperRef}
            src={URL.createObjectURL(imageprofilePicture)}
            className={styles.interCropper}
            aspectRatio={1}
            zoomOnWheel={false}
            viewMode={3}
            dragMode="move"
          />
        </div>
      )}

      {!imageprofilePicture && !successImage && !loading && (
      <input type="file" accept="image/*" name="file" onChange={handleImageChange} className={styles.selectImage} />
      )}

      {successImage && !showImage && (
        <button type="button" onClick={handleShowImage} className={styles.buttonViewImage} >View image</button>
      )}

      {showImage && (
        <div className={styles.containerImageProfile} >
          <img src={croppedProfileImage} alt="Profile Picture" onLoad={() => setLoadingImage(true)} className={styles.fullImageProfile} />
          {!loadingImage && (
            <div className={styles.containerLoadingImage} >
            <FaSpinner className={styles.spinnerIcon} />
            </div>
          )}
        </div>
      )}

      {successImage && showImage && (
        <button type="button" onClick={handleChangeImage} className={styles.buttonChangeImage} >change image</button>
      )}

      {successImage && !showImage && (
        <div>
        <button type="button" onClick={handleChangeImage} className={styles.buttonChangeImage} >change image</button>
        </div>
      )}

      {imageprofilePicture && (
      <div>
      <button type="button" onClick={handleSubmit} className={styles.buttonStyles} >
      upload cropped image
      </button>
      </div>
      )}

      {imageprofilePicture && (
        <div>
        <button type="button" onClick={handleCancelSubmit} className={styles.buttonStylesCancel} >
        Cancel
        </button>
        </div>
      )}

      {loading && (
      <div>
        <FaSpinner className={styles.spinnerIconTwo} />
      </div>
      )}

    </div>
  );
};

export default UploadImage;