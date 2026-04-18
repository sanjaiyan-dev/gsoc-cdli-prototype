import { Carousel } from "@/components/HomeScreen/HeroCards";
import { Fragment } from "react";
import { View } from "react-native";
import { SearchBarHeader } from "@/components/HomeScreen/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArtifactsCards } from "@/components/HomeScreen/ArtifactsCards";

export default function HomeScreen() {
  return (
    <Fragment>
      <SafeAreaView>
        <View className="p-3 m-1">
          <Carousel />

          <View className="min-h-108 overflow-scroll">
            <SearchBarHeader />

            <ArtifactsCards />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
