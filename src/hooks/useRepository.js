import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: id, first: first },
    fetchPolicy: "cache-and-network",
    onError: (e) => console.log(e),
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id: id,
      },
    });
  };

  return { data, loading, fetchMore: handleFetchMore };
};

export default useRepository;
