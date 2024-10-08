import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import theme from "../theme";
import Text from "./Text";
import useReview from "../hooks/useReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  pressable: {
    backgroundColor: "#0366d6",
    width: "95%",
    padding: 15,
    margin: 10,
    borderRadius: 5,
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
  errorMsg: {
    marginLeft: 10,
    color: theme.colors.errorColor,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  text: yup.string().optional(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useReview();
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const ratingNumber = Number(rating);
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: ratingNumber,
        text,
      });
      navigate(`/${data}`);
      return;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.textInputError
            : styles.textInput
        }
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorMsg}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.textInputError
            : styles.textInput
        }
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorMsg}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={
          formik.touched.rating && formik.errors.rating
            ? styles.textInputError
            : styles.textInput
        }
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorMsg}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
      <Pressable style={styles.pressable} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold" style={{ textAlign: "center" }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
