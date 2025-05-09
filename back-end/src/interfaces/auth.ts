export interface GoogleLoginRequestBody {
  idToken: string;
}

export interface GooglePayload {
  sub: string;
  name?: string;
}