export interface GoogleLoginRequestBody {
  idToken: string;
}

export interface JwtPayload {
  accountId: number;
  sub: string;
}
