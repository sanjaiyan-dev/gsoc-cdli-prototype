import {
  Carousel,
  HeroCards,
  HeroCardsLists,
} from "@/components/HomeScreen/HeroCards";
import { Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import { SearchBarHeader } from "@/components/HomeScreen/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_RENDERED_ITEMS = 5;
const INITIAL_ACTIVE_INDEX = Math.floor(MAX_RENDERED_ITEMS / 2);
export default function HomeScreen() {
  const activeIndex = useSharedValue(INITIAL_ACTIVE_INDEX);
  return (
    <Fragment>
      <SafeAreaView>
        <SearchBarHeader />
      
<View className="p-3 m-1">
        <Carousel
          items={data}
          maxRenderedItems={MAX_RENDERED_ITEMS}
          width={windowWidth}
          activeIndex={activeIndex}
        />
        </View>
        <Text className="text-white">Hi</Text>
      </SafeAreaView>
    </Fragment>
  );
}

import { Dimensions } from "react-native";

import Color from "color";
import { useSharedValue } from "react-native-reanimated";

const colors = [
  "#336699",
  "#6699CC",
  "#99CCFF",
  "#CCCCFF",
  "#99CC99",
  "#CCFFCC",
  "#FFFF99",
  "#FFCC99",
  "#FF9999",
  "#FFCCCC",
  "#FF99CC",
  "#CC99FF",
  "#9966CC",
  "#663399",
  "#FF9966",
  "#FF6600",
  "#CC6600",
  "#996600",
  "#FFCC00",
  "#FFFF00",
].map((color) => {
  return {
    mainColor: color,
    accentColor: Color(color).darken(0.1).hex(),
  };
});

const data = [ null,null,...colors, null, null];

const BACKGROUND_COLOR = "#111111";

const { width: windowWidth } = Dimensions.get("window");
