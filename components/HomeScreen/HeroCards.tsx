import { StyleSheet, Text, View } from "react-native";

import { type FC } from "react";

import Animated, {
  createAnimatedComponent,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { FlashList } from "@shopify/flash-list";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import type { SharedValue } from "react-native-reanimated";

const AnimatedList = createAnimatedComponent(FlashList);

type CarouselItemProps = {
  item: {
    mainColor: string;
  } | null;
  index: number;
  translateX: SharedValue<number>;
  itemWidth: number;
  itemHeight: number;
  carouselWidth: number;
  maxRenderedItems: number;
  activeIndex: SharedValue<number>;
};

const CarouselHeroItem: FC<CarouselItemProps> = ({
  item,
  index,
  translateX,
  itemWidth,
  itemHeight,
  carouselWidth,
  maxRenderedItems,
  activeIndex,
}) => {
  const rItemListStyle = useAnimatedStyle(() => {
    const position = index * itemWidth + translateX.value;
    const center = carouselWidth / 2;

    const distanceFromCenter = Math.abs(
      center - ((position + center + itemWidth / 2) % carouselWidth),
    );
    const maxDistance = carouselWidth / 2;
    const normalizedDistanceFromCenter = 1 - distanceFromCenter / maxDistance;

    const scale = interpolate(
      normalizedDistanceFromCenter,
      [0, 1],
      [2, 0.8],
      Extrapolation.CLAMP,
    );

    const initialActiveIndex = Math.floor(maxRenderedItems / 2);
    const preciseActiveIndex =
      initialActiveIndex +
      (-translateX.value + itemWidth / 2) / (carouselWidth / maxRenderedItems);

    activeIndex.value = Math.floor(preciseActiveIndex);

    const rotateY = interpolate(
      preciseActiveIndex - index - 0.5,
      [-2, -1, 0, 1, 2],
      [-25, -20, 0, 20, 25],
    );
    return {
      transform: [
        {
          scale: scale,
        },
        { perspective: 500 },
        {
          rotateY: `${rotateY}deg`,
        },
      ],
    };
  }, []);

  const rZIndexStyle = useAnimatedStyle(() => {
    const position = index * itemWidth + translateX.value;
    const center = carouselWidth / 2;

    const distanceFromCenter = Math.abs(
      center - ((position + center + itemWidth / 2) % carouselWidth),
    );
    const maxDistance = carouselWidth / 2;
    const normalizedDistanceFromCenter = 1 - distanceFromCenter / maxDistance;

    const zIndex = interpolate(
      normalizedDistanceFromCenter,
      [0, 1],
      [1000, 0],
      Extrapolation.CLAMP,
    );

    return {
      zIndex: Math.floor(zIndex),
    };
  }, []);

  return (
    <Animated.View style={rZIndexStyle} className={"rounded-4xl  mt-24"}>
      <Animated.View
        key={index}
        style={[
          {
            height: itemHeight,
            width: itemWidth,
          },
          rItemListStyle,
        ]}
      >
        <View
          className="rounded-lg text-center object-center items-center"
          style={[
            {
              flex: 3,

              backgroundColor: item?.mainColor ?? "transparent",
              borderCurve: "continuous",
            },
            item?.mainColor ? styles.shadow : {},
          ]}
        >
          <Text>Artifacts</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
  },
});

type BaseCarouselItemType = {
  mainColor: string;
};

type CarouselProps<T extends BaseCarouselItemType = BaseCarouselItemType> = {
  items: (T | null)[];
  maxRenderedItems: number;
  width: number;
  activeIndex: SharedValue<number>;
};

// Define a constant that holds the aspect ratio of each item in the list
// Feel free to update it to match your needs (or pass it as a props)
const LIST_ITEM_ASPECT_RATIO = 3 / 4;

// Define the Carousel component with the given props
const Carousel: FC<CarouselProps> = ({
  items,
  maxRenderedItems,
  width,
  activeIndex,
}) => {
  // Calculate the width and height of each list item based on the given width and aspect ratio
  const LIST_ITEM_WIDTH = width / maxRenderedItems;
  const LIST_ITEM_HEIGHT = LIST_ITEM_WIDTH / LIST_ITEM_ASPECT_RATIO;

  // Create a shared animated value to track the current position of the list
  const translateX = useSharedValue(0);

 
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = -x;
    },
  });

  // Render the carousel using the Animated ScrollView and the CarouselItem component
  return (
    <Animated.View className="shadow-inner shadow-amber-950 max-h-100 rounded-4xl justify-center items-end">
      <AnimatedList
        horizontal
        pagingEnabled
        onEndReached={() => impactAsync(ImpactFeedbackStyle.Soft)}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate={0.8}
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <CarouselHeroItem
              key={index}
              item={item}
              index={index}
              translateX={translateX}
              itemWidth={LIST_ITEM_WIDTH}
              itemHeight={LIST_ITEM_HEIGHT}
              carouselWidth={width}
              maxRenderedItems={maxRenderedItems}
              activeIndex={activeIndex}
            />
          );
        }}
        snapToOffsets={items.map((_, index) => index * LIST_ITEM_WIDTH)}
      />
    </Animated.View>
  );
};

export { Carousel };
