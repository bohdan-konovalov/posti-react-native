import { render } from "@testing-library/react-native";
import { User, Post as PostType, PostComment } from "src/redux/api/apiTypes";
import {
  useGetUserByIdQuery,
  useGetPostByIdQuery,
} from "src/redux/api/apiSlice";
import Post, { testID } from "../index";

const mockedRoute = {
  route: {
    key: "",
    name: "post" as const,
    params: {
      userId: 1,
      postId: 1,
    },
  },
};

const mockedPost = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body:
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\n" +
    "reprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
} satisfies PostType;

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
} satisfies User;

const mockedComments = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\n" +
      "dolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body:
      "est natus enim nihil est dolore omnis voluptatem numquam\n" +
      "et omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
] satisfies PostComment[];

const mockedPostQueryResponse = {
  data: mockedPost,
  isLoading: false,
  isError: false,
};

const mockedUserQueryResponse = {
  data: mockedUser,
  isLoading: false,
  isError: false,
};

const mockedCommentQueryResponse = {
  data: mockedComments,
  isLoading: false,
};

jest.mock("src/redux/api/apiSlice", () => ({
  ...jest.requireActual("src/redux/api/apiSlice"),
  useGetPostByIdQuery: jest.fn((_postId: number) => mockedPostQueryResponse),
  useGetUserByIdQuery: jest.fn((_userId: number) => mockedUserQueryResponse),
  useGetPostCommentsQuery: jest.fn(
    (_postId: number) => mockedCommentQueryResponse
  ),
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

jest.mock("../components/PostWithComments", () => ({
  ...jest.requireActual("../components/PostWithComments"),
  PostWithComments: jest.requireActual("react-native").View,
}));

describe("Post", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render post content correctly", () => {
    const { getByTestId } = render(<Post {...mockedRoute} />);
    const PostWithComments = getByTestId(testID);

    expect(PostWithComments).not.toBeNull();
    expect(PostWithComments).toBeOnTheScreen();

    expect(PostWithComments).toHaveProp(
      "authorId",
      mockedRoute.route.params.userId
    );
    expect(PostWithComments).toHaveProp(
      "authorName",
      mockedUserQueryResponse.data.name
    );
    expect(PostWithComments).toHaveProp(
      "title",
      mockedPostQueryResponse.data.title
    );
    expect(PostWithComments).toHaveProp(
      "body",
      mockedPostQueryResponse.data.body
    );
    expect(PostWithComments).toHaveProp("comments", mockedComments);
    expect(PostWithComments).toHaveProp(
      "isLoading",
      mockedPostQueryResponse.isLoading
    );
    expect(PostWithComments).toHaveProp(
      "areCommentsLoading",
      mockedCommentQueryResponse.isLoading
    );
  });

  it.each([
    {
      userQueryResponse: { ...mockedUserQueryResponse, isError: true },
      postQueryResponse: mockedPostQueryResponse,
    },
    {
      userQueryResponse: mockedUserQueryResponse,
      postQueryResponse: { ...mockedPostQueryResponse, isError: true },
    },
    {
      userQueryResponse: { ...mockedUserQueryResponse, isError: true },
      postQueryResponse: { ...mockedPostQueryResponse, isError: true },
    },
  ])("should render error", ({ userQueryResponse, postQueryResponse }) => {
    (useGetPostByIdQuery as jest.Mock).mockReturnValue(postQueryResponse);
    (useGetUserByIdQuery as jest.Mock).mockReturnValue(userQueryResponse);
    const { getByText, queryByTestId } = render(<Post {...mockedRoute} />);
    const PostWithComments = queryByTestId(testID);
    const errorText = getByText(
      "Something went wrong. Please try again later."
    );

    expect(errorText).not.toBeNull();
    expect(errorText).toBeOnTheScreen();

    expect(PostWithComments).toBeNull();
    expect(PostWithComments).not.toBeOnTheScreen();
  });

  it.each([
    {
      userQueryResponse: { ...mockedUserQueryResponse, isLoading: true },
      postQueryResponse: mockedPostQueryResponse,
    },
    {
      userQueryResponse: mockedUserQueryResponse,
      postQueryResponse: { ...mockedPostQueryResponse, isLoading: true },
    },
    {
      userQueryResponse: { ...mockedUserQueryResponse, isLoading: true },
      postQueryResponse: { ...mockedPostQueryResponse, isLoading: true },
    },
  ])(
    "should pass isLoading to PostWithComments when post is loading",
    ({ userQueryResponse, postQueryResponse }) => {
      (useGetPostByIdQuery as jest.Mock).mockReturnValue(postQueryResponse);
      (useGetUserByIdQuery as jest.Mock).mockReturnValue(userQueryResponse);
      const { queryByTestId } = render(<Post {...mockedRoute} />);
      const PostWithComments = queryByTestId(testID);

      expect(PostWithComments).not.toBeNull();
      expect(PostWithComments).toBeOnTheScreen();

      expect(PostWithComments).toHaveProp("isLoading", true);
    }
  );

  it("should call navigate on author press", () => {
    const { getByTestId } = render(<Post {...mockedRoute} />);
    const PostWithComments = getByTestId(testID);

    PostWithComments.props.onAuthorPress();

    expect(mockedNavigate).toHaveBeenCalledWith("users-tab", {
      screen: "user",
      params: { userId: mockedRoute.route.params.userId },
    });
  });
});
