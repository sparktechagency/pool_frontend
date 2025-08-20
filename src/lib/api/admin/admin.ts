import { AnyType } from "@/lib/config/error-type";
import howl from "@/lib/howl";


export const getDashboardApi = async(filter:string|number,token:string) => {
  return await howl({link:`/admin/get-data?filter=${filter}`,token})
};

export const getChartApi = async(token:string) => {
  return await howl({link:`/admin/get-chart`,token})
};

export const getUsersApi = async(page:string|number,search:string|null,token:string) => {
  return await howl({link:`/admin/get-users?per_page=10&page=${page}${search?`&search=${search}`:""}`,token})
};
export const viewUserApi = async(id:string,token:string) => {
  return await howl({link:`/admin/view-user/${id}`,token})
};
export const deleteUserApi = async(id:string,token:string) => {
  return await howl({link:`/admin/delete-user/${id}`,method:"delete",token})
};

//Quote listing


export const getQuoteListingApi = async(token:string,page:number|string) => {
  return await howl({link:`/admin/get-quote-listing?per_page=10&page=${page}`,token});
};

export const adminViewQuoteApi = async(id:string|number,token:string) => {
  return await howl({link:`/admin/view-quote/${id}`,token});
};

export const getTransactionApi = async(page:string|number,token:string) => {
  return await howl({link:`/admin/get-transactions?per_page=10&page=${page}`,token});
};

// Category APIs
export const getCategoriesApi = async (token: string) => {

  return await howl({ link: `/admin/get-categories`, token });
};

export const viewCategoryApi = async (id: string | number, token: string) => {
  return await howl({ link: `/admin/view-category/${id}`, token });
};

export const addCategoryApi = async (
  token: string,
  data: FormData
) => {

  return await howl({
    link: `/admin/add-category`,
    method:"post",data,token,content:"form"
  });
};


export const editCategoryApi = async (
  id: string | number,
  token: string,
  data: { icon: string; name: string }
) => {
  return await howl({
    link: `/admin/edit-category/${id}`,
    method: "post", // still POST because _method:PUT will be in body
    token,
    data: { ...data, _method: "PUT" },
  });
};

export const deleteCategoryApi = async (id: string | number, token: string) => {
  return await howl({
    link: `/admin/delete-category/${id}`,
    method: "delete",
    token,
  });
};

// subsc

export const getSubscriptionApi = async (token: string) => {
  return await howl({ link: `/admin/get-subscriptions`, token });
};

export const updateSubscription = async (id:string|number,token: string,data:AnyType) => {
  return await howl({ link: `/admin/update-subscription/${id}`,method:"post",data, token });
};

export const updateAdminProfile = async (token: string,data:AnyType) => {
  return await howl({ link: `/admin/update-profile`,method:"post",data, token });
};


export const updatePageApi = async (token: string,data:AnyType) => {
  return await howl({ link: `/admin/update-profile`,method:"post",data, token });
};


// content

export const createContentApi = async (data:AnyType,token:string)=>{
  return await howl({ link: `/admin/create-page`,method:"post",data, token });
}

