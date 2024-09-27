import { View, StyleSheet } from "react-native";
import StatsBox from "./StatsBox";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

const RepositoryStats = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.container}>
      <StatsBox value={stars} stat={"Stars"} />
      <StatsBox value={forks} stat={"Forks"} />
      <StatsBox value={reviews} stat={"Reviews"} />
      <StatsBox value={rating} stat={"Rating"} />
    </View>
  );
};

export default RepositoryStats;
