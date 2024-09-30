import { View, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 15,
  },
  languageContainer: {
    marginTop: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignSelf: "flex-start",
    padding: 5,
  },
});

const RepositoryInfo = ({ name, description, language }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading">
        {name}
      </Text>
      <Text color="textSecondary">{description}</Text>
      <View style={styles.languageContainer}>
        <Text color="white">{language}</Text>
      </View>
    </View>
  );
};

export default RepositoryInfo;
