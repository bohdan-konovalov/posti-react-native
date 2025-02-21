import { fireEvent, render } from "@testing-library/react-native";
import { useGetPostsByUserIdQuery } from "src/redux/api/apiSlice";
import FilteredPosts, { flatListTestID } from "..";

const mockRoute = {
  route: {
    key: "",
    name: "filtered-posts" as const,
    params: {
      filter: {
        type: "by-user" as const,
        userId: 5,
        userName: "Test Name",
      },
    },
  },
};
const mockRoute_2 = {
  route: {
    ...mockRoute.route,
    params: {
      ...mockRoute.route.params,
      filter: {
        ...mockRoute.route.params.filter,
        userId: 1,
      },
    },
  },
};
const mockedRefetch = jest.fn();
const mockedUseQueryResponse = {
  data: [
    {
      userId: 5,
      id: 41,
      title: "non est facere",
      body:
        "molestias id nostrum\nexcepturi molestiae dolore omnis repellendus quaerat saepe\n" +
        "consectetur iste quaerat tenetur asperiores accusamus ex ut\nnam quidem est ducimus sunt debitis saepe",
    },
    {
      userId: 5,
      id: 42,
      title:
        "commodi ullam sint et excepturi error explicabo praesentium voluptas",
      body:
        "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\n" +
        "odit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut",
    },
    {
      userId: 5,
      id: 43,
      title:
        "eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis",
      body:
        "similique fugit est\nillum et dolorum harum et voluptate eaque quidem\n" +
        "exercitationem quos nam commodi possimus cum odio nihil nulla\ndolorum exercitationem magnam ex et a et distinctio debitis",
    },
  ],
  isLoading: false,
  isFetching: false,
  refetch: mockedRefetch,
};
const mockedUseQueryResponse_1 = {
  data: mockedUseQueryResponse.data,
  isLoading: false,
  isFetching: true,
  refetch: mockedRefetch,
};
const mockedUseQueryResponse_2 = {
  data: [],
  isLoading: true,
  isFetching: false,
  refetch: mockedRefetch,
};

jest.mock("src/redux/api/apiSlice", () => ({
  ...jest.requireActual("src/redux/api/apiSlice"),
  useGetPostsByUserIdQuery: jest.fn(
    (_userId: number) => mockedUseQueryResponse
  ),
}));

const mockedNavigate = jest.fn();
const mockedSetOptions = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: mockedSetOptions,
    }),
  };
});

jest.mock("src/ui/components/FlatList", () => ({
  ...jest.requireActual("src/ui/components/FlatList"),
  FlatList: jest.requireActual("react-native").View,
}));

describe("FilteredPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render content correctly", () => {
    const { getByTestId } = render(<FilteredPosts {...mockRoute} />);
    const FlatListComponent = getByTestId(flatListTestID);

    expect(FlatListComponent).not.toBeNull();
    expect(FlatListComponent).toBeOnTheScreen();
  });

  it.each([
    mockedUseQueryResponse,
    mockedUseQueryResponse_1,
    mockedUseQueryResponse_2,
  ])(
    "FlatList receives correct data from useQuery",
    (currentUseQueryResponse) => {
      (useGetPostsByUserIdQuery as jest.Mock).mockReturnValue(
        currentUseQueryResponse
      );
      const { getByTestId } = render(<FilteredPosts {...mockRoute} />);
      const { props: flatListProps } = getByTestId(flatListTestID);

      expect(flatListProps.data).toStrictEqual(currentUseQueryResponse.data);
      expect(flatListProps.isLoading).toBe(currentUseQueryResponse.isLoading);
      expect(flatListProps.isFetching).toBe(currentUseQueryResponse.isFetching);
      expect(flatListProps.onRefresh).toStrictEqual(
        currentUseQueryResponse.refetch
      );
    }
  );

  it("should call navigate on item press", () => {
    const { getByTestId } = render(<FilteredPosts {...mockRoute} />);
    const { props: flatListProps } = getByTestId(flatListTestID);
    const PostListItem = flatListProps.renderItem;

    const { getByText } = render(
      <PostListItem item={mockedUseQueryResponse.data[0]} />
    );

    fireEvent(getByText(mockedUseQueryResponse.data[0].title), "press");

    expect(mockedNavigate).toHaveBeenCalledWith("post", {
      postId: mockedUseQueryResponse.data[0].id,
      userId: mockedUseQueryResponse.data[0].userId,
    });
  });

  it("should hide posts from previous user", () => {
    (useGetPostsByUserIdQuery as jest.Mock).mockReturnValue(
      mockedUseQueryResponse
    );
    const { getByTestId } = render(<FilteredPosts {...mockRoute_2} />);
    const { props: flatListProps } = getByTestId(flatListTestID);

    expect(flatListProps.data.length).toBe(0);
  });

  it("should set userName from params as a title", () => {
    render(<FilteredPosts {...mockRoute} />);

    expect(mockedSetOptions).toHaveBeenCalledWith({
      title: `Posts by ${mockRoute.route.params.filter.userName}`,
    });
  });
});
