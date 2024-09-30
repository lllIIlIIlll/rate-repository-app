import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.bgColors.bgPrimary,
  },
  textInput: {
    width: "95%",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderColor: theme.colors.textSecondary,
    backgroundColor: theme.colors.white,
    borderWidth: 1.0,
  },
  textInputError: {
    width: "95%",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderColor: theme.colors.errorColor,
    backgroundColor: theme.colors.white,
    borderWidth: 1.0,
  },
  pressable: {
    backgroundColor: "#0366d6",
    width: "95%",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  errorMsg: {
    marginLeft: 10,
    color: theme.colors.errorColor,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate("/");
      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={
          formik.touched.username && formik.errors.username
            ? styles.textInputError
            : styles.textInput
        }
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorMsg}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={
          formik.touched.password && formik.errors.password
            ? styles.textInputError
            : styles.textInput
        }
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorMsg}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.pressable} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
