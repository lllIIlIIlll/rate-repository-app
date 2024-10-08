import { Picker } from "@react-native-picker/picker";
import { TextInput, StyleSheet } from "react-native";

import theme from "../../theme";

const styles = StyleSheet.create({
  searchInput: {
    width: "95%",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderColor: theme.colors.textSecondary,
    backgroundColor: theme.colors.white,
    borderWidth: 1.0,
  },
});

const SortSelect = ({ order, setOrder, search, setSearch }) => {
  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value={"latest"} />
        <Picker.Item label="Highest rated repositories" value={"highest"} />
        <Picker.Item label="Lowest rated repositories" value={"lowest"} />
      </Picker>
    </>
  );
};

export default SortSelect;
