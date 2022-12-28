export type CreateNewUserBodyDto = {
  name: string;
  email: string;
  password: string;
}
export type LoginUserBodyDto = {
  email: string;
  password: string;
}
export type CreateUserRequestBodyDto = {
  title: string;
  message: string;
}