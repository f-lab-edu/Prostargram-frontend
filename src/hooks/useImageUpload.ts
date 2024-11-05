import { FormEvent, useState, useEffect } from 'react';

export type FeedImage = {
  file: File;
  index: number;
  src: string;
};

const useImageUpload = () => {
  const [images, setImages] = useState<FeedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<FeedImage | null>(null);

  const selectImageFile = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = {
          file: files[0],
          index: images.length,
          src: reader.result as string,
        };

        setImages((prev) => [...prev, img]);
      };
      reader.readAsDataURL(files[0]); // 파일을 Data URL 형식으로 읽기
    }
  };

  const initCurrentImage = () => {
    if (images.length === 1) {
      setCurrentImage(images[0]);
    }
  };

  const changeCurrentImage = (idx: number, newImages: FeedImage[]) => {
    if (idx === 0 && newImages.length === 0) {
      setCurrentImage(null);
    }

    if (idx === 0 && newImages.length > 0) {
      setCurrentImage(newImages[idx + 1]);
    }

    if (idx !== 0 && newImages.length > 0) {
      setCurrentImage(newImages[idx - 1]);
    }
  };

  const removeImage = (idx: number) => {
    let newImages = images.filter((image) => image.index !== idx);

    newImages = newImages.map((image, index) => ({
      file: image.file,
      src: image.src,
      index,
    }));

    setImages(newImages);
    changeCurrentImage(idx, newImages);
  };

  const updateCurrentImage = (image: FeedImage) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    initCurrentImage();
  }, [images]);

  return {
    images,
    currentImage,
    selectImageFile,
    updateCurrentImage,
    removeImage,
  };
};

export default useImageUpload;
