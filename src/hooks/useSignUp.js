import { useMutation } from "@apollo/client";

import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error);
    },
  });

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { user: { username, password } },
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  return signUp;
};

export default useSignUp;
