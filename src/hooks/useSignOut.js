import { useApolloClient } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    } catch (e) {
      throw new Error(e);
    }
  };

  return signOut;
};

export default useSignOut;
