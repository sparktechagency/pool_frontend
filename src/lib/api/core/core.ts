import { AnyType } from "@/lib/config/error-type";
import howl from "@/lib/howl";
interface ServiceRequest {
  service: string;
  describe_issue: string;
  property_type: 'family' | 'commercial' | string;
  service_type: 'pool' | 'spa' | 'pool and spa' | string;
  pool_depth: number;
  date: string;
  time: string;
  zip_code: string;
  address: string;
  expected_budget: number;
  photos?:AnyType
}
export const getQuotesApi = async(token:string,page:string|number) => {
  return await howl({link:`/user/get-quotes?page=${page}`,token})
};

export const createQuoteApi  = async(data:ServiceRequest,token:string) => {
  return await howl({link:"/user/create-quote",method:"post",data,token,content:"form"})
};

export const getMyQuotesApi = async(status:"Pending"| "In progress" |"Completed"|null,token:string) => {
  return await howl({link:`/user/get-my-quotes?status=${status}`,token})
};

export const viewQuoteApi = async(id:string|number,token:string) => {
  
  return await howl({link:`/user/view-quote/${id}`,token,cache:'no-cache'})
};

export const deleteQuoteApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/delete-quote/${id}`,token})
};

export const getCheckBidsApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/get-check-bids?quote_id=${id}`,token})
};

export const getAcceptedBidsApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/get-accepted-bids?quote_id=${id}`,token})
};

export const acceptedBidApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/accept-request?bid_id=${id}`,method:"patch",token})
};

export const cancelOrderApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/cancel-order?quote_id=${id}`,method:"patch",token,})
};

export const getTopProvidersApi = async(token?:string) => {
  return await howl({link:`/user/top-providers`,token})
};

export const getProviderApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/view-provider/${id}`,token})
};

export const createReviewApi = async(token:string) => {
  return await howl({link:`/user/top-providers`,token})
};

export const getReviewsApi = async(token:string) => {
  return await howl({link:`/user/get-reviews`,token})
};

export const viewReviewApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/view-review/${id}`,token})
};

export const getPageApi = async(type:'privacy'|'tnc' ) => {
  return await howl({link:`/get-page?page_type=${type}`})
};

export const myOrdersApi = async(pending:"", page:string|number,token:string) => {
  return await howl({link:`/user/get-my-quotes?status=${pending??"Pending"}&per_page=14&page=${page}`,token});
};

export const myAcceptedOrdersApi = async(pending:"In progress"| "Completed", page:string|number,token:string) => {
  return await howl({link:`/user/get-accepted-bids?status=${"Pending"}&per_page=14&page=${page}`,token});
};

export const acceptRequestApi = async(id:string|number,token:string) => {
  console.log(id);
  
  return await howl({link:`/user/accept-request?bid_id=${id}`,method:"patch",token});
};
export const cancelRequestApi = async(id:string|number,token:string) => {
  return await howl({link:`/user/cancel-order?bid_id=${id}`,method:"patch",token}); 
};

//*PROVIDER APIS:

export const browseQuotesApi = async (token:string,page:string|number)=>{
  return await howl({link:`/provider/browse-quotes?per_page=10&page=${page}`,token});
}
export const browseServiceApi = async (token:string,page:string|number,status?:string|null)=>{
  return await howl({link:`/provider/my-service-quotes?per_page=10&page=${page}${status&&`&status=${status??""}`}`,token});
}

export const ViewBrowsedQuoteApi = async (id:string|number,token:string)=>{
  return await howl({link:`/provider/view-browse-quote/${id}`,token});
} 

export const AcceptQuoteApi = async (id:string|number,token:string)=>{
  return await howl({link:`/provider/accept-budget?quote_id=${id}`, method:"post",token,data:{}});
}

export const ApplyBidApi = async (id:string|number,data:AnyType,token:string)=>{
  return await howl({link:`/provider/apply-bid`,method:"post",token,data});
}
export const EditBidApi = async (id:string|number,data:AnyType,token:string)=>{
  return await howl({link:`/provider/edit-your-bid`,method:"post",token,data});
}

export const FinalSaveApi = async (id:string|number,token:string)=>{
  return await howl({link:`/provider/make-final-save-your-bid?quote_id=${id}&status`,method:"patch",token});
}

export const CurrentAplanApi= async (token:string)=>{
  return await howl({link:`/provider/current-plan`,token});
}

export const getBiddingListApi = async (id:string|number,token:string)=>{  
  return await howl({link:`/provider/bidding-lists?qupte_id=${id}`,token});
}

export const getMyBidApi = async (id:string|number,token:string)=>{  
  return await howl({link:`/provider/get-your-bid?quote_id=${id}`,token});
}
export const createPaymentIntentApi = async (data:{payment_method_types:"card",amount:number|string},token:string)=>{  
  return await howl({link:`/provider/buy-plan-intent`,data,token, method:"post"});
}

export const buyPlanApi = async (data:{payment_intent_id?:string,subscription_id:string},token:string)=>{  
  return await howl({link:`/provider/buy-plan-success`,method:"post",data,token});
}

export const createServiceIntend = async (data:{payment_method_types:"card",provider_id:string|number,amount:number|string},token:string)=>{  
  return await howl({link:`/user/create-payment-intent`,data,token, method:"post"});
}

export const buyServiceApi = async (data:{payment_intent_id?:string,subscription_id:string},token:string)=>{  
  return await howl({link:`/user/payment-success`,method:"post",data,token});
}

export const cancelBidApi = async (id:string|number,token:string)=>{  
  return await howl({link:`/provider/cancel-bid/${id}`,method:"delete",token});
}
export const completeBidApi = async (id:string|number,token:string)=>{  
  return await howl({link:`/provider/mark-as-complete?quote_id=${id}`,method:"patch",token});
}

export const earningsApi = async (token:string,page:string|number,status?:string|null)=>{
  return await howl({link:`/provider/my-earnings?per_page=10&page=${page}${status&&`&status=${status??""}`}`,token});
}


//chat


export const getChatListApi = async (token:string,search:string)=>{
  return await howl({link:`/chat-lists?search=${search}`,token});
}

//content

export const getPage = async (type:string,token:string)=>{
  return await howl({ link: `/get-page?page_type=${type}`, token });
}