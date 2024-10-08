import { FlatList, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import SortSelect from "./SortSelect";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  sortComponent,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={sortComponent}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);

  const sort =
    order === "latest"
      ? { orderBy: "CREATED_AT", direction: "DESC" }
      : order === "highest"
      ? { orderBy: "RATING_AVERAGE", direction: "DESC" }
      : { orderBy: "RATING_AVERAGE", direction: "ASC" };

  const { repositories, fetchMore } = useRepositories(sort, searchValue, 8);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      sortComponent={
        <SortSelect
          order={order}
          setOrder={setOrder}
          search={search}
          setSearch={setSearch}
        />
      }
    />
  );
};

export default RepositoryList;
