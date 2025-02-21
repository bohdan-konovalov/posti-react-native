import { render, fireEvent } from "@testing-library/react-native";
import { User as UserType } from "src/redux/api/apiTypes";
import { useGetUserByIdQuery } from "src/redux/api/apiSlice";
import User from "../index";

const mockedRoute = {
  route: {
    key: "",
    name: "user" as const,
    params: {
      userId: 1,
    },
  },
};

const mockedUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
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
} satisfies UserType;

const mockedUserQueryResponse = {
  data: mockedUser,
  isLoading: false,
  isError: false,
};

const mockedUserQueryResponseWithError = {
  ...mockedUserQueryResponse,
  data: undefined,
  isError: true,
};

const mockedUserQueryResponseWithLoading = {
  ...mockedUserQueryResponse,
  data: undefined,
  isLoading: true,
};

jest.mock("src/redux/api/apiSlice", () => ({
  ...jest.requireActual("src/redux/api/apiSlice"),
  useGetUserByIdQuery: jest.fn((_userId: number) => mockedUserQueryResponse),
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

describe("User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render user content correctly", () => {
    const { getByText } = render(<User {...mockedRoute} />);

    const nameText = getByText(`Name: ${mockedUser.name}`);
    const emailText = getByText(`Email: ${mockedUser.email}`);
    const phoneText = getByText(`Phone: ${mockedUser.phone}`);
    const websiteText = getByText(`Website: ${mockedUser.website}`);
    const buttonText = getByText(`Browse ${mockedUser.name}'s posts`);

    expect(nameText).not.toBeNull();
    expect(nameText).toBeOnTheScreen();

    expect(emailText).not.toBeNull();
    expect(emailText).toBeOnTheScreen();

    expect(phoneText).not.toBeNull();
    expect(phoneText).toBeOnTheScreen();

    expect(websiteText).not.toBeNull();
    expect(websiteText).toBeOnTheScreen();

    expect(buttonText).not.toBeNull();
    expect(buttonText).toBeOnTheScreen();
  });

  it("should handle button press correctly", () => {
    const { getByText } = render(<User {...mockedRoute} />);
    const buttonText = getByText(`Browse ${mockedUser.name}'s posts`);

    fireEvent(buttonText, "press");

    expect(mockedNavigate).toHaveBeenCalledWith("posts-tab", {
      screen: "filtered-posts",
      params: {
        filter: {
          type: "by-user",
          userId: mockedRoute.route.params.userId,
          userName: mockedUser.name,
        },
      },
    });
  });

  it("should handle error correctly", () => {
    (useGetUserByIdQuery as jest.Mock).mockReturnValue(
      mockedUserQueryResponseWithError
    );
    const { getByText, queryByText } = render(<User {...mockedRoute} />);

    const errorText = getByText(
      "Something went wrong. Please try again later."
    );

    const nameText = queryByText(`Name: ${mockedUser.name}`);
    const emailText = queryByText(`Email: ${mockedUser.email}`);
    const phoneText = queryByText(`Phone: ${mockedUser.phone}`);
    const websiteText = queryByText(`Website: ${mockedUser.website}`);
    const buttonText = queryByText(`Browse ${mockedUser.name}'s posts`);

    expect(errorText).not.toBeNull();
    expect(errorText).toBeOnTheScreen();

    expect(nameText).toBeNull();
    expect(nameText).not.toBeOnTheScreen();

    expect(emailText).toBeNull();
    expect(emailText).not.toBeOnTheScreen();

    expect(phoneText).toBeNull();
    expect(phoneText).not.toBeOnTheScreen();

    expect(websiteText).toBeNull();
    expect(websiteText).not.toBeOnTheScreen();

    expect(buttonText).toBeNull();
    expect(buttonText).not.toBeOnTheScreen();
  });

  it("should handle loading correctly", () => {
    (useGetUserByIdQuery as jest.Mock).mockReturnValue(
      mockedUserQueryResponseWithLoading
    );
    const { queryByText } = render(<User {...mockedRoute} />);

    const nameText = queryByText(`Name: ${mockedUser.name}`);
    const emailText = queryByText(`Email: ${mockedUser.email}`);
    const phoneText = queryByText(`Phone: ${mockedUser.phone}`);
    const websiteText = queryByText(`Website: ${mockedUser.website}`);
    const buttonText = queryByText("Browse this user posts");

    expect(nameText).toBeNull();
    expect(nameText).not.toBeOnTheScreen();

    expect(emailText).toBeNull();
    expect(emailText).not.toBeOnTheScreen();

    expect(phoneText).toBeNull();
    expect(phoneText).not.toBeOnTheScreen();

    expect(websiteText).toBeNull();
    expect(websiteText).not.toBeOnTheScreen();

    expect(buttonText).not.toBeNull();
    expect(buttonText).toBeOnTheScreen();

    fireEvent(buttonText, "press");

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
