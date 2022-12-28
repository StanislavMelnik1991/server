import { CreateNewUserBodyDto, LoginUserBodyDto } from "../../types/server.dto";

const baseLink = 'http://localhost:5000/api';

class Controller {
  baseLink: string;

  options?: string;

  token?: string;

  userId?: string;

  constructor(link: string) {
    this.baseLink = link;
  }

  async createUser(user: CreateNewUserBodyDto) {
    const rawResponse = await fetch(`${this.baseLink}/auth/signUp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const {token} = await rawResponse.json();
    this.token = token
    window.localStorage.setItem('token', token)
    console.log(this.token)
    return this.token;
  }

  async loginUser(user: LoginUserBodyDto) {
    const rawResponse = await fetch(`${this.baseLink}/auth/signIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const {token} = await rawResponse.json();
    this.token = token
    window.localStorage.setItem('token', token)
    return this.token;
  }
}
export default new Controller(baseLink);
