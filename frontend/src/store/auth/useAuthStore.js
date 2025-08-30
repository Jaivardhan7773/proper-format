import { create } from "zustand"
import { axiosInstance } from "../../utils/axios"


export const useAuthStore = create((set , get) => ({
    authUser : null,
    isSigningUp : false,
    isLoginingUp:false,
    isCheckingAuth:true,


}))