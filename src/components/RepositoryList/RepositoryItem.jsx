import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

import RepositoryInfo from "./RepositoryInfo";
import RepositoryStats from "./RepositoryStats";
import theme from "../../theme";
import Text from "../Text";

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
  pressable: {
    backgroundColor: "#0366d6",
    width: "100%",
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(`/${repository.id}`)}>
      <View testID="repositoryItem" style={styles.mainContainer}>
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
        {repository.url && (
          <Pressable
            style={styles.pressable}
            onPress={() => Linking.openURL(repository.url)}
          >
            <Text
              color="white"
              fontWeight="bold"
              style={{ textAlign: "center" }}
            >
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
