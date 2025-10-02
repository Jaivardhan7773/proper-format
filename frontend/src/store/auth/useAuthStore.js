import { create } from "zustand"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-toastify";


export const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/check");
            set({ user: res.data });
            return true;
        } catch (err) {
            console.error("Error checking authentication:", err);
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post('/login', { email, password });
            set({ user: res.data, error: null });
            toast.success("login successfull");
            return true;
        } catch (err) {
            const backendData = err.response?.data;
            // Check for express-validator errors
            let errorMessage = "";
            if (backendData?.error) {
                // Take the first validation error message
                errorMessage = backendData.error[0].msg;
            } else if (backendData?.message) {
                errorMessage = backendData.message;
            } else {
                errorMessage = "Login failed";
            }

            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        } finally {
            set({ loading: false })
        }
    },


    Googlelogin: async (idToken) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post(`/google`, { idToken });
            set({ user: res.data, error: null });
            toast.success("login successfull");
            return true;
        } catch (err) {
            const message = err?.response?.data?.error || err.message || 'Login failed';
            set({ error: message, loading: false });
            toast.error("Google error");
            throw err;
        }
    },


    Signup: async (name, email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post('/signup', { name, email, password });
            set({ user: res.data, error: null });
            toast.success("signup success")
            return true;
        } catch (err) {
            const backendData = err.response?.data;
            // Check for express-validator errors
            let errorMessage = "";
            if (backendData?.error) {
                // Take the first validation error message
                errorMessage = backendData.error[0].msg;
            } else if (backendData?.message) {
                errorMessage = backendData.message;
            } else {
                errorMessage = "Signup failed";
            }

            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        } finally {
            set({ loading: false });
        }

    },

    logout: async () => {
        try {
            const { user } = get();
            if (user) {

                await axiosInstance.post('/logout')
                set({ user: null })
                window.location.replace("/");
                toast.success("logout successfull");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to logout";
            toast.error(message);
        }
    },






}))