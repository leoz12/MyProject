export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  image: string;
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  body: {
    username: string;
    password: string;
  };
}
