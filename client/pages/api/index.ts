import { CreateNewUserBodyDto, CreateUserRequestBodyDto, LoginUserBodyDto } from "../../types/server.dto";

const baseLink = 'http://localhost:5000/api';

class Controller {
  baseLink: string;

  options?: string;

  token: string| null;

  constructor(link: string) {
    this.baseLink = link;
    this.token = null
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

  async createUserRequest(user: CreateUserRequestBodyDto) {
    this.token = window.localStorage.getItem('token');
    await fetch(`${this.baseLink}/res`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(user),
    });
  }

  async getAllUserRequests() {
    this.token = window.localStorage.getItem('token');
    const res = await fetch(`${this.baseLink}/res`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    });
    const [requests, total] = await res.json()
    return {requests, total}
  }
}
export default new Controller(baseLink);
