import { SearchArtifacts } from "@/store/search";
import { SymbolView } from "expo-symbols";
import { useAtom } from "jotai";
import { Activity, Fragment } from "react";
import { Pressable, TextInput, View } from "react-native";

export const SearchBarHeader = () => {
  const [query, setQuery] = useAtom(SearchArtifacts);
  return (
    <Fragment>
      <View className="flex-row items-center bg-amber-50 rounded-full border border-gray-200 px-4 mt-10 mx-4">
        <SymbolView
          name={{ android: "travel_explore" }}
          size={20}
          tintColor="amber"
        />

        <TextInput
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search records"
          accessibilityHint="Enter keywords to filter the list"
          accessibilityRole="search"
          placeholder="Search..."
          placeholderTextColor="#9ca3af"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          className="flex-1 py-3 px-2 text-amber-950 font-bold font-mono"
        />

        <Activity mode={query.length > 0 ? "visible" : "hidden"}>
          <Pressable
            onPress={() => setQuery("")}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            hitSlop={10}
          >
            <SymbolView
              name={{ android: "cancel" }}
              size={18}
              tintColor="darkred"
            />
          </Pressable>
        </Activity>
      </View>
    </Fragment>
  );
};
