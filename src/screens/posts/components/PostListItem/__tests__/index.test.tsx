import { render, fireEvent } from "@testing-library/react-native";
import { PostListItem } from "..";

const mockPress = jest.fn();
const mockPost = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body:
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\n" +
    "reprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};
const mockProps = {
  post: mockPost,
  onPress: mockPress,
};

describe("PostListItem", () => {
  it("should render content correctly", () => {
    const { getByText } = render(<PostListItem {...mockProps} />);
    const titleText = getByText(mockPost.title);
    const bodyText = getByText(mockPost.body);

    expect(titleText).not.toBeNull();
    expect(titleText).toBeOnTheScreen();
    expect(bodyText).not.toBeNull();
    expect(bodyText).toBeOnTheScreen();
  });

  it("should handle press correctly", () => {
    const { getByText } = render(<PostListItem {...mockProps} />);
    const titleText = getByText(mockPost.title);

    fireEvent(titleText, "press");

    expect(mockPress).toHaveBeenCalledWith(mockPost.id, mockPost.userId);
  });
});
