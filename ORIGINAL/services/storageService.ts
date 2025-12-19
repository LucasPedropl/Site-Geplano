import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!storage) {
      console.warn("Storage not initialized.");
      throw new Error("Firebase Storage não está configurado ou inicializado.");
  }
  
  // Create a reference to the file location
  const storageRef = ref(storage, path);
  
  // Upload the file
  await uploadBytes(storageRef, file);
  
  // Get and return the download URL
  return await getDownloadURL(storageRef);
};