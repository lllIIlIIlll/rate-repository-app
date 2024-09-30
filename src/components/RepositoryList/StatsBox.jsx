import { View, StyleSheet } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const StatsBox = ({ value, stat }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      </Text>
      <Text color="textSecondary">{stat}</Text>
    </View>
  );
};

export default StatsBox;
