import { Dimensions, StyleSheet, View } from "react-native";
import { Article } from "@/api/types";
import { useFetchArticlesList } from "@/api/useArticles";
import {
  ElevatedButton as Button,
  HorizontalDivider,
  Host,
  Text,
} from "@expo/ui/jetpack-compose";
import { FlashList } from "@shopify/flash-list";
import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
} from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { Fragment } from "react";

const WindowWidth = Dimensions.get("window").width;
const StoryListItemWidth = WindowWidth * 0.7;
const StoryListItemHeight = (StoryListItemWidth / 3) * 3;

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Fragment>
      <View
        onTouchStart={() => console.log("Hi")}
        onTouchEnd={() => console.log("Bye")}
        className={
          "bg-amber-100 flex-1  shadow-lg shadow-teal-700 will-change-auto m-3 rounded-2xl " +
          ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)]
        }
        style={{
          minWidth: StoryListItemWidth,
          maxWidth: StoryListItemWidth,
          minHeight: StoryListItemHeight,
          maxHeight: StoryListItemHeight,
        }}
      >
        <View className="p-3 m-3 overflow-hidden text-justify">
          <Host matchContents>
            <Text
              style={{
                fontFamily: "cursive",
                typography: "titleMedium",
                textAlign: "justify",
                textDecoration: "underline",
                shadow: { color: "orange", blurRadius: 3 },
              }}
            >
              {article.title}
            </Text>
            <Host matchContents>
              <Text
                style={{
                  typography: "bodyMedium",
                  textAlign: "justify",
                  fontFamily: "monospace",
                }}
              >
                {"\n"}
                {"\n"}
                {"\n"}
                {truncateDescription(article.content_html, 250)}
              </Text>
            </Host>
          </Host>
          <Host matchContents>
            <HorizontalDivider />
          </Host>
          <Host matchContents>
            <Button onClick={() => alert(article.id)}>
              <Text>Read </Text>
              <SymbolView className="m-12" name={{ android: "auto_stories" }} />
            </Button>
          </Host>
        </View>
      </View>
    </Fragment>
  );
};

const ROTATIONS = [
  "-rotate-3",
  "rotate-3",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
];

const truncateDescription = (html: string | undefined, limit: number = 200) => {
  if (!html) return "";

  // 1. Strip HTML tags
  let text = html.replace(/<[^>]*>?/gm, "");

  // 2. Decode common HTML Entities
  const entities: { [key: string]: string } = {
    "&sect;": "§",
    "&rsquo;": "’",
    "&lsquo;": "‘",
    "&rdquo;": "”",
    "&ldquo;": "“",
    "&ndash;": "–",
    "&mdash;": "—",
    "&amp;": "&",
    "&nbsp;": " ",
    "&gt;": ">",
    "&lt;": "<",
    "&deg;": "°",
  };

  // Replace entities using a regex
  text = text.replace(/&[a-z0-9]+;/gi, (match) => entities[match] || match);

  // 3. Truncate
  if (text.length <= limit) return text;
  return text.substring(0, limit).trim() + "...";
};

const Carousel = () => {
  const { data, hasNextPage, fetchNextPage } = useFetchArticlesList();
  const allArticles = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <View style={styles.container}>
      <FlashList
        className="rounded-lg"
        decelerationRate={"fast"}
        onEndReached={() => {
          if (hasNextPage) {
            impactAsync(ImpactFeedbackStyle.Soft);
            fetchNextPage();
          } else {
            notificationAsync(NotificationFeedbackType.Error);
          }
        }}
        horizontal
        data={allArticles}
        keyExtractor={(article) => article.id.toString()}
        renderItem={(article) => {
          return <ArticleCard article={article.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: StoryListItemWidth,
    minHeight: StoryListItemHeight * 1.2,
  },
});

export { Carousel };
