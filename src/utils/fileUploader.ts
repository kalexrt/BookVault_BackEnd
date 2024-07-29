import { uploadStream } from "../cloudinary";

export const uploadSingleImage = async (imageFiles: {
  [key: string]: Express.Multer.File[];
}) => {
  const firstKey = Object.keys(imageFiles)[0];
  const photo = imageFiles[firstKey][0];

  const companyImageResult = await uploadStream(
    photo.buffer,
    "images",
    photo.originalname
  );
  const imageUrl = companyImageResult.secure_url;

  return { imageUrl };
};