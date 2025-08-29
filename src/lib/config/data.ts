// export const BASE_ENDPOINT = "http://103.186.20.110:8080";
// export const BASE_API_ENDPOINT = "http://103.186.20.110:8080/api";

export const BASE_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL!;
export const BASE_API_ENDPOINT = `${process.env.NEXT_PUBLIC_SERVER_URL!}/api`;