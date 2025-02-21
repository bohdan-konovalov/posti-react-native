import { render } from "@testing-library/react-native";
import { PostComment } from "src/redux/api/apiTypes";
import { PostWithComments, PostProps } from "../index";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { styles } from "../styles";

const testID = "Test";
const containerTestID = `${testID}-post-with-comments-container`;
const mockOnAuthorPress = jest.fn();
const mockComments: PostComment[] = [
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
];

const mockPostWithCommentsProps = {
  testID,
  authorId: 1,
  authorName: "Leanne Graham",
  areCommentsLoading: false,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body:
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\n" +
    "reprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  isLoading: false,
  onAuthorPress: mockOnAuthorPress,
  comments: mockComments,
} satisfies PostProps;

const mockPostWithCommentsAndLoadingProps = {
  ...mockPostWithCommentsProps,
  isLoading: true,
} satisfies PostProps;

const mockPostWithoutCommentsProps = {
  ...mockPostWithCommentsProps,
  comments: [],
} satisfies PostProps;

const mockPostWithoutCommentsAndLoadingProps = {
  ...mockPostWithCommentsProps,
  areCommentsLoading: true,
  comments: [],
} satisfies PostProps;

const mockTabBarHeight = 100;

jest.mock("@react-navigation/bottom-tabs", () => ({
  ...jest.requireActual("@react-navigation/bottom-tabs"),
  useBottomTabBarHeight: jest.fn(() => mockTabBarHeight),
}));

jest.mock("../styles", () => {
  const actualStyles = jest.requireActual("../styles");
  return {
    ...actualStyles,
    styles: {
      ...actualStyles.styles,
      container: {
        ...actualStyles.styles.container,
        padding: 5,
      },
    },
  };
});

describe("PostWithComments", () => {
  it("should render content correctly", () => {
    const { getByText } = render(
      <PostWithComments {...mockPostWithCommentsProps} />
    );
    const postAuthorPrefixText = getByText("By: ");
    const postAuthorNameText = getByText(mockPostWithCommentsProps.authorName);
    const postCommentsTitleText = getByText("Comments:");
    const postTitleText = getByText(mockPostWithCommentsProps.title);
    const postBodyText = getByText(mockPostWithCommentsProps.body);

    const getFirstCommentNameText = getByText(mockComments[0].name);
    const getFirstCommentEmailText = getByText(mockComments[0].email);
    const getFirstCommentBodyText = getByText(mockComments[0].body);

    const getSecondCommentNameText = getByText(mockComments[1].name);
    const getSecondCommentEmailText = getByText(mockComments[1].email);
    const getSecondCommentBodyText = getByText(mockComments[1].body);

    // Defined checks
    // Post data
    expect(postAuthorPrefixText).not.toBeNull();
    expect(postAuthorNameText).not.toBeNull();
    expect(postCommentsTitleText).not.toBeNull();
    expect(postTitleText).not.toBeNull();
    expect(postBodyText).not.toBeNull();

    // First comment data
    expect(getFirstCommentNameText).not.toBeNull();
    expect(getFirstCommentEmailText).not.toBeNull();
    expect(getFirstCommentBodyText).not.toBeNull();

    // Second comment data
    expect(getSecondCommentNameText).not.toBeNull();
    expect(getSecondCommentEmailText).not.toBeNull();
    expect(getSecondCommentBodyText).not.toBeNull();

    // On the screen checks
    // Post data
    expect(postAuthorPrefixText).toBeOnTheScreen();
    expect(postAuthorNameText).toBeOnTheScreen();
    expect(postCommentsTitleText).toBeOnTheScreen();
    expect(postTitleText).toBeOnTheScreen();
    expect(postBodyText).toBeOnTheScreen();

    // First comment data
    expect(getFirstCommentNameText).toBeOnTheScreen();
    expect(getFirstCommentEmailText).toBeOnTheScreen();
    expect(getFirstCommentBodyText).toBeOnTheScreen();

    // Second comment data
    expect(getSecondCommentNameText).toBeOnTheScreen();
    expect(getSecondCommentEmailText).toBeOnTheScreen();
    expect(getSecondCommentBodyText).toBeOnTheScreen();
  });

  it.each([10, 20, 30])(
    "should calculate container style correctly",
    (mockedTabBarHeight) => {
      (useBottomTabBarHeight as jest.Mock).mockReturnValue(mockedTabBarHeight);
      const { getByTestId } = render(
        <PostWithComments {...mockPostWithCommentsProps} />
      );
      const Container = getByTestId(containerTestID);

      expect(Container).toHaveStyle({
        marginBottom: mockedTabBarHeight + styles.container.padding,
      });
    }
  );

  it.each([
    mockPostWithoutCommentsProps,
    mockPostWithoutCommentsAndLoadingProps,
  ])("should show proper commentsPlaceholderText", (props) => {
    const { getByText } = render(<PostWithComments {...props} />);

    const placeholderTextValue = props?.areCommentsLoading
      ? "Loading..."
      : "No data available";
    const placeholderText = getByText(placeholderTextValue);

    expect(placeholderText).not.toBeNull();
    expect(placeholderText).toBeOnTheScreen();
  });

  it("should NOT render post data when isLoading = true", () => {
    const { queryByText } = render(
      <PostWithComments {...mockPostWithCommentsAndLoadingProps} />
    );
    const postAuthorPrefixText = queryByText("By: ");
    const postAuthorNameText = queryByText(
      mockPostWithCommentsAndLoadingProps.authorName
    );
    const postTitleText = queryByText(
      mockPostWithCommentsAndLoadingProps.title
    );
    const postBodyText = queryByText(mockPostWithCommentsAndLoadingProps.body);

    expect(postAuthorPrefixText).toBeNull();
    expect(postAuthorNameText).toBeNull();
    expect(postTitleText).toBeNull();
    expect(postBodyText).toBeNull();
  });
});
