export type storeDataProps = {
  auth:authReducerProps
  login:loginReducerProps
}

export type authReducerProps = {
    user_id: string,
  userType: number,
}

export type loginReducerProps = {
  token:string;
  username:string;
  otp:number;
}