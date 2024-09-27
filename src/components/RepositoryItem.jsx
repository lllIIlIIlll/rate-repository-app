import { View, Image, StyleSheet } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryStats from "./RepositoryStats";
import theme from "../theme";

const styles = StyleSheet.create({
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  mainContainer: {
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.ownerImage}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <RepositoryInfo
          name={repository.fullName}
          description={repository.description}
          language={repository.language}
        />
      </View>
      <RepositoryStats
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        rating={repository.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
