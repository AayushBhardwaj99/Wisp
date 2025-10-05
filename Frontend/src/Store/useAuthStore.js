//Ye ni samajh aya bilkul bhi ki Kya kara hai aur kyu kara hai !

import { create  } from "zustand";
import axiosInstance from "../Lib/axios";

export const useAuthStore = create ((set)=> ({
    authUser :null ,
    isSigningUp : false ,
    isLoggingIn : false , 
    isUpdatingProfile  : false ,

    isCheckingAuth : true ,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth is : " + error);
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth: false })
        }
    }
}));