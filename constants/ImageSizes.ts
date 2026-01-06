import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const ImageSizes = {

    thumbnail: screenWidth / 2.5, 
    showcase: screenWidth / 1.5,
  };