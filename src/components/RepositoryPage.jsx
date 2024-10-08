import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryPage = () => {
  const { repositoryId } = useParams();

  const { data, loading, fetchMore } = useRepository(repositoryId, 8);

  if (loading) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={data.repository} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryPage;
