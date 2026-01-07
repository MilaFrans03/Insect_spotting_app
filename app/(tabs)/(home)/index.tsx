import React from 'react';
import { View, FlatList, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCollection } from '@/data/user-collection-get';
import { ThemedText } from '@/components/ThemedText';
import { ImageSizes } from '@/constants/ImageSizes';
import { useOverlayStyles } from '@/hooks/useOverlayStyles';
import { Divider } from '@/components/Divider';
import { Marker } from '@/components/Marker';
import { Dimensions } from 'react-native';
import { useUserGet } from '@/data/user-get';
import { useLocalSearchParams, useRouter } from 'expo-router';




export default function HomeScreen() {
   const params = useLocalSearchParams();
    const router = useRouter(); 
      const { collectionData, addPictureToCollection, deletePicture, isLoading } = useCollection();
      const styles = useOverlayStyles();
      const screenWidth = Dimensions.get('window').width;

      const {user: data} = useUserGet();
      const userId = data?._id ?? '';

      
      const selectedSeason = "spring";

const filteredData = collectionData.filter(item =>
  item.season?.toLowerCase().includes(selectedSeason)
);
    
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
    
      return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1,  }}>
        <ScrollView style={{ flex: 1 }}>
          
        <ThemedText type="subtitle" >WELCOME BACK, {data.name}!</ThemedText>
    

        <View style={{ }}>
        <Image source={require('@/assets/images/HomeScreen.png')}
        style={{right: 20,
                 width:'110%' }} />

        </View>
          <View>
          <Marker />
          <ThemedText type="subtitle" >IN SEASON</ThemedText>
          <Divider />
          </View>


    
          <FlatList
            key="2-cols" // force re-render voor numColumns
            data={filteredData}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: '/(stack)/insectInfo/[id]', 
                  params: { id: item._id }
                })}
                style={{
                  flex: 1 / 2,
                  marginBottom: 2,
                  marginHorizontal: 2,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                <View style={styles.root}>
      <View>
        <ThemedText>{item._id}</ThemedText>
      </View>
    
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={styles.imageContainer}>
            <Image
              source={
                typeof item.photo_url === 'string'
                  ? { uri: item.photo_url }  // online URL (user foto)
                  : item.photo_url           // require(...) lokaal
              }
              style={{
                width: ImageSizes.thumbnail,
                height: ImageSizes.thumbnail,
              }}
            />
          </View>
          <View style={styles.nameTag}>
        
            <ThemedText type="tag">{item.name}</ThemedText>
           
            </View>
        </View>
    
        <View style={styles.box2}>
            <View style={styles.wrapper}>
          {item.in_collection ? (
            item.date_found && (
              <ThemedText type="side">{new Date(item.date_found).toLocaleDateString()}</ThemedText>
            )
          ) : null}
    
            </View>
        </View>
      </View>
      <View>
      <ThemedText>{item.season}</ThemedText>
      </View>
    </View>
    
              </TouchableOpacity>
            )}
          />
       </ScrollView>
        </View>
        </SafeAreaView>
      );
    }
    