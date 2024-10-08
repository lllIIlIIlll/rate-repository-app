import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import theme from "../theme";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
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
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(30).required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Password don't match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const signUp = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

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
      <TextInput
        style={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
            ? styles.textInputError
            : styles.textInput
        }
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorMsg}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.pressable} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
