import { FormEvent, useState, useEffect } from 'react';

type Image = { name: string; size: number; src: string; index: number };

const useImageUpload = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  const selectImageFile = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = {
          index: images.length,
          name: files[0].name,
          size: files[0].size,
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

  useEffect(() => {
    initCurrentImage();
  }, [images]);

  return {
    images,
    currentImage,
    selectImageFile,
    setCurrentImage,
  };
};

export default useImageUpload;
