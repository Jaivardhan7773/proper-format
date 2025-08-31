import { create } from "zustand"
import { axiosInstance } from "../../utils/axios"
import { toast } from "react-toastify";


export const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,
    isCheckingAuth: false,

    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post('/login', { email, password });
            set({ user: res.data, error: null });
            toast.success("login successfull")
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
        } finally {
            set({ loading: false })
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            await axiosInstance.post('/logout')
            set({ user: null })
            toast.success("logout successfull");
        } catch (error) {
            toast.error("Error in logout")
        } finally {
            set({ loading: false })
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res = await axiosInstance.get("/check");
            set({ user: res.data, isCheckingAuth: false });
            return true;
        } catch (err) {
            set({ user: null, isCheckingAuth: false });
            return false;
        }
    }




}))