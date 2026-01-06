import { launchImageLibraryAsync } from 'expo-image-picker';
import { User, Picture } from './user-get';
import { API_URL } from '@/constants/Api';

export function useAddPicture(
  user: User | null,
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
) {
// Uit galerij gekozen foto
  async function addPictureToCollection(insectId: string) {
    if (!user) return;

    const result = await launchImageLibraryAsync({ mediaTypes: 'Images', selectionLimit: 1 });
    const photoUri = result.assets?.[0]?.uri;
    if (!photoUri) return;

    console.log('Picked photo URI:', photoUri);

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/pictures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insect_id: insectId,
          photo_url: photoUri,
          in_collection: true,
          date_found: new Date().toISOString(),
        }),
      });

      const newPic: Picture = await res.json();
      console.log('New picture added from library:', newPic);
      setUser?.(prev => prev ? { ...prev, pictures: [...prev.pictures, newPic] } : prev);
    } catch (err) {
      console.error(err);
    }
  }

  // Genomen foto (base64) 
  async function addTakenPictureToCollection(insectId: string, base64Image: string) {
    if (!user) {
      console.warn('No user provided, cannot add picture');
      return;
    }
    if (!base64Image) {
      console.warn('No base64 image provided');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/pictures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insect_id: insectId,
          photo_url: base64Image, // base64 i.p.v. URI
          in_collection: true,
          date_found: new Date().toISOString(),
        }),
      });

      const newPic: Picture = await res.json();
      console.log('New picture added from camera:', newPic);
      setUser?.(prev => prev ? { ...prev, pictures: [...prev.pictures, newPic] } : prev);
    } catch (err) {
      console.error('Error adding taken picture:', err);
    }
  }

  return {
    addPictureToCollection,
    addTakenPictureToCollection,
  };
}
