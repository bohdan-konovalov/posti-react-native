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
  selectedPostId: number | null;
  filter: UserFilter | null;
}
