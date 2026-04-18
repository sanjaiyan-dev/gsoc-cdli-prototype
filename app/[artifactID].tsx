import { useFetchArtifact } from "@/api/useArtifacts";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { Dimensions, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  createAnimatedComponent,
  Easing,
  StretchInX,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedImage = createAnimatedComponent(Image);

const { width, height } = Dimensions.get("screen");

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
export default function ArtifactID() {
  const { artifactID, imageID } = useLocalSearchParams();

  console.log(artifactID);
  console.log(`https://cdli.earth/dl/tn_photo/${imageID}.jpg`);
  const { data: artifact } = useFetchArtifact({
    artifactID: artifactID.toString(),
  });

  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100),
      );
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: artifact?.designation,
        }}
      />
      <View>
        <GestureHandlerRootView className="m-3 relative">
          <GestureDetector gesture={pinch}>
            <AnimatedImage
              recyclingKey={artifactID.toString() + imageID.toString()}
              contentFit="contain"
              style={[
                {
                  width: "100%",
                  height: 300,
                  borderRadius: 20,
                  backgroundColor: "#0553",
                },
                boxAnimatedStyles,
              ]}
              source={`https://cdli.earth/dl/tn_photo/${imageID}.jpg`}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      <View className="text-center items-center">
        <Animated.Text
          className={
            "text-amber-100 underline relative mt-96 text-4xl font-mono"
          }
          entering={StretchInX.duration(1200).easing(Easing.inOut(Easing.quad))}
        >
          {artifact?.designation}
        </Animated.Text>
      </View>
    </Fragment>
  );
}
