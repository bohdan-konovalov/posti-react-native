import {
  FlatList as NativeFlatList,
  ActivityIndicator,
  FlatListProps as NativeFlatListProps,
} from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";

interface FlatListProps<ItemT> extends NativeFlatListProps<ItemT> {
  isLoading?: boolean;
  isFetching?: boolean;
}

const emptyArray: any[] = [];

const FlatList = <ItemT,>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  isLoading,
  isFetching,
  ...props
}: FlatListProps<ItemT>) => {
  const showSpinnerAsEmptyComponent = isLoading || isFetching;
  const reduceOpacity = isFetching && data?.length;
  return (
    <NativeFlatList
      data={isLoading ? emptyArray : data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={isFetching}
      ListEmptyComponent={
        showSpinnerAsEmptyComponent ? (
          <ActivityIndicator size="large" color="#6200EE" />
        ) : (
          <Text style={styles.text}>No data available</Text>
        )
      }
      style={[styles.flatList, { opacity: reduceOpacity ? 0.5 : 1 }]}
      contentContainerStyle={styles.contentContainer}
      {...props}
    />
  );
};

export { FlatList };
