import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";
import ReviewActions from "./ReviewActions";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  ratingContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 100,
  },
  reviewContainer: {
    padding: 10,
    paddingLeft: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const ReviewItem = ({ review, usersReviews = false, refetch }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          {!usersReviews ? (
            <Text fontWeight="bold">{review.user.username}</Text>
          ) : (
            <Text fontWeight="bold">{review.repository.fullName}</Text>
          )}
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd.MM.yy")}
          </Text>
          <Text color="textSecondary">{review.text}</Text>
        </View>
      </View>
      {usersReviews ? (
        <ReviewActions
          refetch={refetch}
          repositoryId={review.repository.id}
          reviewId={review.id}
        />
      ) : null}
    </View>
  );
};

export default ReviewItem;
