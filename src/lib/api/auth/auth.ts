import howl from "@/lib/howl";
export const loginApi = async(data:{email:string,password:string}) => {
  return await howl({link:"/login",method:"post",data})
};

export const verifyOtpApi = async(data:{otp:string,}) => {
  return await howl({link:"/verify-otp",method:"post",data})
};

export const resendOtpApi = async(data:{email:string,}) => {
  return await howl({link:"/resend-otp",method:"post",data})
};

export const forgotApi = async(data:{email:string}) => {
  return await howl({link:"/forgot-password",method:"post",data})
};

export const changePassApi  = async(data:{password:string,password_confirmation:string},token:string) => {
  return await howl({link:"/forgot-password",method:"post",data,token})
};

export const updatePassApi  = async(data:{current:string,password:string,password_confirmation:string},token:string) => {
  return await howl({link:"/update-password",method:"post",data,token})
};

export const editAccApi  = async(data:{full_name:string,email:string,bio:string,avatar:string, method:string},token:string) => {
  return await howl({link:"/edit-account",method:"post",data,token,content:"form"})
};

export type EditAddressPayload = {
  display_name: string;
  user_name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  zip_code: string;
  _method:"PATCH"
};

export const editAddressApi  = async(data:EditAddressPayload,token:string) => {
  return await howl({link:"/edit-address",method:"post",data,token})
};

export const getProfileApi = async(token:string) => {
  return await howl({link:"/get-profile",token})
};

export const logoutApi  = async(token:string) => {
  return await howl({link:"/logout",method:"post",token})
};