interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface DetailedPost {
  authorId: number;
  authorName: string;
  id: number;
  title: string;
  body: string;
  comments: PostComment[];
}

interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type FilterTypes = "by-user";

interface Filter {
  type: FilterTypes;
}

interface UserFilter extends Filter {
  type: "by-user";
  userId: number;
  userName: string;
}

export interface PostsStateInterface {
  posts: Post[];
  filteredPosts: Post[];
  selectedPostWithDetails: DetailedPost | null;
  filter: UserFilter | null;
}
