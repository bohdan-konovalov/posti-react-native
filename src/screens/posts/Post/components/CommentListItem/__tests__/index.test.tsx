import { render } from "@testing-library/react-native";
import { PostComment } from "src/redux/api/apiTypes";
import { CommentListItem } from "../index";

const mockComment: PostComment = {
  postId: 1,
  id: 1,
  name: "id labore ex et quam laborum",
  email: "Eliseo@gardner.biz",
  body:
    "laudantium enim quasi est quidem magnam voluptate ipsam eos\n" +
    "tempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
};

describe("CommentListItem", () => {
  it("should render content correctly", () => {
    const { getByText } = render(<CommentListItem comment={mockComment} />);
    const commentNameText = getByText(mockComment.name);
    const commentEmailText = getByText(mockComment.email);
    const commentBodyText = getByText(mockComment.body);

    expect(commentNameText).not.toBeNull();
    expect(commentEmailText).not.toBeNull();
    expect(commentBodyText).not.toBeNull();

    expect(commentNameText).toBeOnTheScreen();
    expect(commentEmailText).toBeOnTheScreen();
    expect(commentBodyText).toBeOnTheScreen();
  });
});
