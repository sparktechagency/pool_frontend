import howl from "@/lib/howl";


export const getUsersApi = async(page:string|number,search:string|null,token:string) => {
  return await howl({link:`/admin/get-users?per_page=10&page=${page}${search?`&search=${search}`:""}`,token})
};