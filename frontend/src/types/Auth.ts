export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: {
    socialId: string;
    provider: string;
    role: "USER" | "ADMIN";
  };
};
