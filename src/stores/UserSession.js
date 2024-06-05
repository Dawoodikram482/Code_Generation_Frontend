import axiosInstance from "../../axios.js";
import{defineStore} from "pinia";
import axios from "axios";

export const useUserSessionStore = defineStore("userSession", {
    state: () => ({
        jwt: "",
        id: 0,
        email: "",
        name: "",
        role: ""
    }),
    getters: {
        isLoggedIn: (state)=>state.jwt !== "",
        getUserFullName: (state)=>state.name,
        getId: (state)=>state.id,
        getEmail: (state)=>state.email,
        getRole: (state) => state.role
    },
    actions: {
        login(email, password) {
            console.log("Logging in...");
            return new Promise((resolve, reject)=>{
                axiosInstance.post("/login", {
                    email: email,
                    password: password
                }).then(response=>{
                    this.jwt = response.data.jwt;
                    this.id = response.data.id;
                    this.email = response.data.email;
                    this.name = response.data.name;
                    this.role = response.data.role;
                    sessionStorage["jwt"] = this.jwt;
                    sessionStorage["id"] = this.id;
                    sessionStorage["email"] = this.email;
                    sessionStorage["name"] = this.name;
                    sessionStorage["role"] = this.role;
                    axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
                    resolve();
                }).catch(error=>{
                    reject(error);
                });
            });
        },
        localLogin() {
            if(sessionStorage["jwt"] !== undefined) {
                this.jwt = sessionStorage["jwt"];
                this.id = sessionStorage["id"];
                this.email = sessionStorage["email"];
                this.name = sessionStorage["name"];
                this.role = sessionStorage["role"];
                axios.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage["jwt"];
                console.log("Logged in automatically");
            }
        },
        logout() {
            this.jwt = "";
            this.id = 0;
            this.email = "";
            this.name = "";
            this.role = "";
            delete axios.defaults.headers.common["Authorization"];
            sessionStorage.removeItem("jwt");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("role");
        },
    },
});
