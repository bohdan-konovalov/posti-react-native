// Post types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// User types
interface Geo {
  lat: string;
  lng: string;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}
