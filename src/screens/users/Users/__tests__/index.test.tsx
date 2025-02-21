import { render, fireEvent } from "@testing-library/react-native";
import { useGetAllUsersQuery } from "src/redux/api/apiSlice";
import Users, { flatListTestID } from "..";

const mockedRefetch = jest.fn();
const mockedUseQueryResponse = {
  data: [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      emai: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
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
  useGetAllUsersQuery: jest.fn(() => mockedUseQueryResponse),
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

describe("Users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render content correctly", () => {
    const { getByTestId } = render(<Users />);
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
      (useGetAllUsersQuery as jest.Mock).mockReturnValue(
        currentUseQueryResponse
      );
      const { getByTestId } = render(<Users />);
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
    const { getByTestId } = render(<Users />);
    const { props: flatListProps } = getByTestId(flatListTestID);
    const PostListItem = flatListProps.renderItem;

    const { getByText } = render(
      <PostListItem item={mockedUseQueryResponse.data[0]} />
    );

    fireEvent(getByText(mockedUseQueryResponse.data[0].name), "press");

    expect(mockedNavigate).toHaveBeenCalledWith("user", {
      userId: mockedUseQueryResponse.data[0].id,
    });
  });
});
