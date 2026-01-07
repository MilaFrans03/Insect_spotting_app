import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const useOverlayStyles = () => {
  return StyleSheet.create({
    root: {
    marginLeft:1,
      flex: 1,
      
    },
    container: {
        flexDirection: "row", // belangrijk: naast elkaar
        //justifyContent: "space-between", // spreidt ze uit
        position: "relative",
        width: (screenWidth)/2.4,
        height: (screenWidth)/2.4,
        backgroundColor:'transparent'

      },
      box1: {
        flex: 1,
        //borderWidth:1,
        //width: screenWidth/2.5,
        //height: screenWidth/2.5,
        //borderWidth: 2,
       
      },

      imageContainer: {
        position: "relative",
  padding: 4,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        width: screenWidth/2.5,
       // height: screenWidth/2.55,
        
      },
      nameTag: {
        position: "absolute",
        width: screenWidth/3,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        paddingLeft: 10,
        //marginRight: 10,
      },

      box2: {
        
        flex: 0,
        
        justifyContent: 'flex-end',
        textAlign:'right',
        backgroundColor:'transparent',
        alignItems: 'flex-end',
        //borderLeftWidth: 2,
        },
        wrapper: {
           left:-14,
           bottom:10,
            width:'20%',
            textAlign:'right',
             backgroundColor:'transparent'
        },
        
   
  });
};
