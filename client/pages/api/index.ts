import { ROLE } from "../../constants/user.constants";
import { CreateNewUserBodyDto, CreateResponseBodyDto, CreateUserRequestBodyDto, LoginUserBodyDto, RequestDto, ShortRequestDto, UsersForAdminDto } from "../../types/server.dto";
import axios, { AxiosResponse } from 'axios'

const baseLink = 'http://localhost:5000/api';

class Controller {
  baseLink: string;

  constructor(link: string) {
    this.baseLink = link;
  }

  async createUser(dto: CreateNewUserBodyDto) {
    await axios.post(`${this.baseLink}/auth/signUp`, dto).then(this.auth)
  }

  async loginUser(dto: LoginUserBodyDto) {
    await axios.post(`${this.baseLink}/auth/signIn`, dto).then(this.auth)

  }

  async createUserRequest(dto: CreateUserRequestBodyDto) {
    const token = window.localStorage.getItem('token');
    await axios.post(`${this.baseLink}/req`, dto, { headers: { 'Authorization': `Bearer ${token}` } })
  }

  async getAllUserRequests() {
    const token = window.localStorage.getItem('token');
    const result = await axios.get(
      `${this.baseLink}/req`,
      { headers: { 'Authorization': `Bearer ${token}` } },
    ).then((res) => {
      const [requests, total] = res.data as [Array<ShortRequestDto>, number]
      return { requests, total }
    })

    return result
  }

  async getUserRequest(id: number) {
    const token = window.localStorage.getItem('token');
    return await axios.get(
      `${this.baseLink}/req/${id}`,
      { headers: { 'Authorization': `Bearer ${token}` } },
    ).then((res) => {
      const userRequest = res.data as RequestDto;
      return userRequest
    })
  }

  async getUserResponse(id: number) {
    const token = window.localStorage.getItem('token');
    return await axios.get(
      `${this.baseLink}/req/res/${id}`,
      { headers: { 'Authorization': `Bearer ${token}` } },
    ).then((res) => {
      const userRequest = res.data as RequestDto;
      return userRequest
    })
  }

  async getAllUsers() {
    const token = window.localStorage.getItem('token');
    return await axios.get(
      `${this.baseLink}/admin`,
      { headers: { 'Authorization': `Bearer ${token}` } },
    ).then((res) => {
      const users = res.data as UsersForAdminDto[];
      return users
    })
  }

  async getAllActiveRequestsForUser(id: number) {
    const token = window.localStorage.getItem('token');
    return await axios.get(
      `${this.baseLink}/admin/${id}`,
      { headers: { 'Authorization': `Bearer ${token}` } },
    ).then((res) => {
      const requests = res.data as RequestDto[];
      return requests
    })
  }

  async createNewResponse(dto: CreateResponseBodyDto, reqId: number) {
    const token = window.localStorage.getItem('token');
    await axios.post(
      `${this.baseLink}/admin/${reqId}`,
      dto,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
  }

  private async auth(res: AxiosResponse<any, any>) {
    const { role, token } = await res.data as { token: string, role: ROLE }
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('role', role)
    return { role, token }
  }
}
export default new Controller(baseLink);
