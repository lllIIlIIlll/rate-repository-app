import { View, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";

import ReviewItem from "./ReviewItem";
import { GET_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewPage = () => {
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={data.me.reviews.edges}
      renderItem={({ item }) => (
        <ReviewItem review={item.node} usersReviews={true} refetch={refetch} />
      )}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ReviewPage;
