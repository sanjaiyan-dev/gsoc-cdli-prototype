import { useFetchArtifactsList } from "@/api/useArtifacts";
import { SearchArtifacts } from "@/store/search";
import { FlashList } from "@shopify/flash-list";
import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
} from "expo-haptics";
import { Image } from "expo-image";
import { useAtomValue } from "jotai";
import { Activity, Fragment, useDeferredValue } from "react";
import { ScrollView, Text, View } from "react-native";

const ArtifactsCards = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchArtifactsList();
  const artifacts = data?.pages.flatMap((page) => page.artifacts) ?? [];
  const searchTerm = useAtomValue(SearchArtifacts).trim();
  const defferedSearchTerm = useDeferredValue(searchTerm, "");
  const filteredArtifacts = artifacts.filter((artifact) =>
    artifact.designation
      .trim()
      .toLowerCase()
      .includes(defferedSearchTerm.trim().toLowerCase()),
  );
  return (
    <Fragment>
      <View style={{ flex: 1, margin: 3 }}>
        <FlashList
          masonry
          numColumns={2}
          onEndReached={() => {
            if (hasNextPage) {
              impactAsync(ImpactFeedbackStyle.Soft);
              fetchNextPage();
            } else {
              notificationAsync(NotificationFeedbackType.Error);
            }
          }}
          keyExtractor={(artifact) => artifact.id.toString()}
          data={filteredArtifacts}
          ListHeaderComponent={
            <Activity
              mode={filteredArtifacts.length > 0 ? "visible" : "hidden"}
            >
              <Text className="text-amber-50 p-4">
                Results for:{" "}
                <Text className="font-semibold">{defferedSearchTerm}</Text>
              </Text>
            </Activity>
          }
          ListEmptyComponent={
            <View className="p-10 items-center">
              <Text className="text-amber-50 text-lg text-center">
                No results found for {'"'}
                {defferedSearchTerm}
                {'"'}
              </Text>
            </View>
          }
          renderItem={(artifact) => {
            return (
              <Fragment>
                <View className="bg-amber-200 min-h-108 p-3 m-3 rounded-3xl">
                  <Image
                    contentFit="cover"
                    className="min-w-4xl min-h-3xl rounded-xl"
                    style={{
                      width: "100%",
                      height: 300,
                      borderRadius: 20,
                      backgroundColor: "#0553",
                    }}
                    source={`https://cdli.earth/dl/tn_photo/${artifact.item.external_resources[0].external_resource_key}.jpg`}
                  />
                  <Text className="text-amber-950 text-center font-mono text-3xl">
                    {artifact.item.designation}
                  </Text>
                  <Text>
                    Collection:{" "}
                    {artifact.item?.collections[0]?.collection?.collection}
                  </Text>
                </View>
              </Fragment>
            );
          }}
        ></FlashList>
      </View>
    </Fragment>
  );
};

export { ArtifactsCards };
