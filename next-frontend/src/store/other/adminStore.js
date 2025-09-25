import { create } from "zustand"
import { toast } from "react-toastify"
import { axiosInstance } from "../../utils/axios.js"

export const AdminStore = create((set) => ({
    allUsers: [],
    isLoading: false,

    fetchUsers: async () => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get("/users");
            set({ allUsers: res.data });
        } catch (error) {
            toast.error("Error fetching users")
        } finally {
            set({ isLoading: false })
        }
    }
}));