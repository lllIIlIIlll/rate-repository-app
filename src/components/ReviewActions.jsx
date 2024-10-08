import { View, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigate } from "react-router-native";

import useDeleteReview from "../hooks/useDeleteReview";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

const ReviewActions = ({ refetch, repositoryId, reviewId }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const submitDelete = async () => {
    try {
      await deleteReview(reviewId);
      refetch();
      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
        },
        {
          text: "DELETE",
          onPress: () => submitDelete(),
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.viewButton}
        onPress={() => navigate(`/${repositoryId}`)}
      >
        <Text color={"white"} fontWeight="bold">
          View repository
        </Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={() => showAlert()}>
        <Text color={"white"} fontWeight="bold">
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewActions;
