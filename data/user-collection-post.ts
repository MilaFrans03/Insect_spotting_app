import { launchImageLibrary } from 'react-native-image-picker';
import { User, Picture } from './user-get';
import { API_URL } from '@/constants/Api';

export function useAddPicture(user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> | undefined) {
  return async function addPictureToCollection(insectId: string) {
    if (!user) return;

    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const photoUri = result.assets?.[0]?.uri;
    if (!photoUri) return;

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
      setUser?.(prev => prev ? { ...prev, pictures: [...prev.pictures, newPic] } : prev);
    } catch (err) {
      console.error(err);
    }
  };
}
