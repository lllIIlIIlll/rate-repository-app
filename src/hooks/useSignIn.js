import { useMutation, useApolloClient } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error);
    },
  });
  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });
      authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  return [signIn, result];
};

export default useSignIn;
