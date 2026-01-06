import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { useUserGet } from '@/data/user-get';
import { useAddPicture } from '@/data/user-collection-post';
import { User } from '@/data/user-get';

export default function CameraScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';

  // --- User ophalen ---
  const { user: apiUser, isLoading: userLoading } = useUserGet();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (apiUser) {
      console.log('User loaded:', apiUser._id);
      setUser(apiUser);
    }
  }, [apiUser]);

  // --- Hooks altijd bovenaan ---
  const { addTakenPictureToCollection } = useAddPicture(user, setUser);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // --- Loading / permissie checks ---
  if (userLoading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading user...</Text>
      </View>
    );
  }

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to use the camera
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // --- Functie: foto nemen ---
  const takePicture = async () => {
    if (!cameraRef.current) {
      console.warn('Camera not ready');
      return;
    }

    console.log('📸 Taking picture...');
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: false });
      if (!photo.uri) {
        console.warn('No URI returned from camera');
        return;
      }
      console.log('Photo captured, URI:', photo.uri);

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 600 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      if (!manipulatedImage.base64) {
        console.warn('Failed to convert image to base64');
        return;
      }

      const base64Image = `data:image/jpeg;base64,${manipulatedImage.base64}`;
      setImage(base64Image);
      console.log(' Image ready in state');
    } catch (err) {
      console.error('Error taking picture:', err);
    }
  };

  // --- Functie: foto toevoegen aan collectie ---
  const handleAddPhoto = async () => {
    if (!image) return;
    console.log('Adding photo to collection for insectId:', id);
    try {
      await addTakenPictureToCollection(id, image);
      console.log('✅ Photo successfully added');
      setImage(null); // reset preview
    } catch (err) {
      console.error('Error adding photo to collection:', err);
    }
  };

  // --- Render ---
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        onCameraReady={() => {
          console.log('Camera ready');
          setCameraReady(true);
        }}
      />

      {/* Buttons overlay */}
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button title="Take Picture" onPress={takePicture} disabled={!cameraReady} />
        <View style={{ height: 12 }} />
        <Button title="Cancel" onPress={() => router.back()} />
      </View>

      {/* Preview overlay */}
      {image && (
        <View
          style={{
            position: 'absolute',
            top: 50,
            alignSelf: 'center',
            width: 220,
            height: 240,
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button title="Add to Collection" onPress={handleAddPhoto} />
        </View>
      )}
    </SafeAreaView>
  );
}
