import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, search, first) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: order.direction,
      orderBy: order.orderBy,
      searchKeyword: search,
      first: first,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderDirection: order.direction,
        orderBy: order.orderBy,
        searchKeyword: search,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
