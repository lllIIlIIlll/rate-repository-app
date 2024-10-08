import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";

import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { GET_USER } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.bgColors.bgSecondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    marginLeft: 15,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.pressable}>
          <Link to="/">
            <Text color="white" fontWeight="bold">
              Repositories
            </Text>
          </Link>
        </Pressable>
        {data && !data.me ? (
          <>
            <Pressable style={styles.pressable}>
              <Link to="/signup">
                <Text color="white" fontWeight="bold">
                  Sign up
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.pressable}>
              <Link to="/signin">
                <Text color="white" fontWeight="bold">
                  Sign in
                </Text>
              </Link>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.pressable}>
              <Link to="/createReview">
                <Text color="white" fontWeight="bold">
                  Create a review
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.pressable}>
              <Link to="/userReviews">
                <Text color="white" fontWeight="bold">
                  My reviews
                </Text>
              </Link>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => signOut()}>
              <Text color="white" fontWeight="bold">
                Sign out
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
