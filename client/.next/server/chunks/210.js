"use strict";
exports.id = 210;
exports.ids = [210];
exports.modules = {

/***/ 165:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(924);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const baseLink = "http://localhost:5000/api";
class Controller {
    constructor(link){
        this.baseLink = link;
    }
    async createUser(dto) {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${this.baseLink}/auth/signUp`, dto).then(this.auth);
    }
    async loginUser(dto) {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${this.baseLink}/auth/signIn`, dto).then(this.auth);
    }
    async createUserRequest(dto) {
        const token = window.localStorage.getItem("token");
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`${this.baseLink}/req`, dto, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    async getAllUserRequests() {
        const token = window.localStorage.getItem("token");
        const result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseLink}/req`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            const [requests, total] = res.data;
            return {
                requests,
                total
            };
        });
        return result;
    }
    async getUserRequest(id) {
        const token = window.localStorage.getItem("token");
        return await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseLink}/req/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            const userRequest = res.data;
            return userRequest;
        });
    }
    async getUserResponse(id) {
        const token = window.localStorage.getItem("token");
        return await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseLink}/req/res/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            const userRequest = res.data;
            return userRequest;
        });
    }
    async getAllUsers() {
        const token = window.localStorage.getItem("token");
        return await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseLink}/admin`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            const users = res.data;
            return users;
        });
    }
    async getAllActiveRequestsForUser(id) {
        const token = window.localStorage.getItem("token");
        return await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseLink}/admin/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res)=>{
            const requests = res.data;
            return requests;
        });
    }
    async auth(res) {
        const { role , token  } = await res.data;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("role", role);
        return {
            role,
            token
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Controller(baseLink));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;