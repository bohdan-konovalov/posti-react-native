import { render, fireEvent } from "@testing-library/react-native";
import { useGetAllPostsQuery } from "src/redux/api/apiSlice";
import AllPosts, { flatListTestID } from "..";

const mockedRefetch = jest.fn();
const mockedUseQueryResponse = {
  data: [
    {
      userId: 1,
      id: 9,
      title: "nesciunt iure omnis dolorem tempora et accusantium",
      body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
    },
    {
      userId: 1,
      id: 10,
      title: "optio molestias id quia eum",
      body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
    },
    {
      userId: 2,
      id: 11,
      title: "et ea vero quia laudantium autem",
      body:
        "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\n" +
        "accusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    },
  ],
  isLoading: false,
  isFetching: false,
  refetch: mockedRefetch,
};

const mockedUseQueryResponse_1 = {
  data: [],
  isLoading: true,
  isFetching: false,
  refetch: mockedRefetch,
};

const mockedUseQueryResponse_2 = {
  data: mockedUseQueryResponse.data,
  isLoading: false,
  isFetching: true,
  refetch: mockedRefetch,
};

jest.mock("src/redux/api/apiSlice", () => ({
  ...jest.requireActual("src/redux/api/apiSlice"),
  useGetAllPostsQuery: jest.fn(() => mockedUseQueryResponse),
}));

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock("src/ui/components/FlatList", () => ({
  ...jest.requireActual("src/ui/components/FlatList"),
  FlatList: jest.requireActual("react-native").View,
}));

describe("AllPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render content correctly", () => {
    const { getByTestId } = render(<AllPosts />);
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
      (useGetAllPostsQuery as jest.Mock).mockReturnValue(
        currentUseQueryResponse
      );
      const { getByTestId } = render(<AllPosts />);
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
    const { getByTestId } = render(<AllPosts />);
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
});
