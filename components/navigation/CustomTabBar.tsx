import { View, Pressable, Text } from "react-native";
import TabShape from "./TabShape"; // jouw SVG component
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: "row", height: 60 }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {/* SVG achtergrond */}
            <View style={{ position: "absolute", top: 0, width: "100%" }}>
              <TabShape active={focused} />
            </View>


            {/* Label */}
            <Text style={{ color: focused ? "#fff" : "#000", marginTop: 2 }}>
              {options.title || route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
