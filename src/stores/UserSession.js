import axiosInstance from "../../axios.js";
import { defineStore } from "pinia";

export function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export const useUserSessionStore = defineStore("userSession", {
    state: () => ({
        user : null,
        token : null
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axiosInstance.post("/login", { email, password });
                const token = response.data.Token;
                if (!token) {
                    throw new Error("Login failed");
                }
                this.token = token; // Set the token in the state
                const decodedJwt = decodeToken(token);
                if (!decodedJwt) {
                    throw new Error("Failed to decode token.");
                }
                console.log(decodedJwt);
                console.log(token);

                this.setUser({
                    jwt: token,
                    id: decodedJwt.sub,
                    role: decodedJwt.auth,
                    // isApproved: decodedJwt.approved,
                });
                return { success: true, message: "Login successful!" };
            } catch (error) {
                console.error("Login Error:", error);
                return { success: false, message: error.message || "Login failed. Please check your credentials." };
            }
        },
        checkUserRole() {
            const token = localStorage.getItem("jwt");
            if (token) {
                this.token = token;
                try {
                    const decodedToken = decodeToken(token);
                    if (decodedToken) {
                        this.user = {
                            id: decodedToken.sub,
                            role: decodedToken.auth,
                        };
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        },
        setUser(userData) {
            this.user = {
                id: userData.id,
                role: userData.role,
                // isApproved: userData.isApproved,
            };
             const token = userData.jwt;
            localStorage.setItem("jwt", token);
        },
        logout() {
            this.user = null;
            this.jwt = null;
            localStorage.removeItem("jwt");
        },
    },
});
