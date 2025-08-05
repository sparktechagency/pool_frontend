/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_ENDPOINT } from "./config/data";

export interface HowlRequest {
  link: string;
  method?: "get" | "post" | "delete" | "put" | "patch";
  content?:
    | "json"
    | "text"
    | "html"
    | "xml"
    | "form"
    | "multipart"
    | "javascript"
    | "css"
    | "png"
    | "jpeg"
    | "gif"
    | "pdf";
  data?: any;
  auth?: "bearer" | "basic" | "digest" | "apiKey" | "awsSignature" | "custom";
  token?: string;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
}

const contentTypes = {
  json: "application/json",
  text: "text/plain",
  html: "text/html",
  xml: "application/xml",
  form: "application/x-www-form-urlencoded",
  multipart: "multipart/form-data",
  javascript: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
};

const authSchemes = {
  bearer: "Bearer",
  basic: "Basic",
  digest: "Digest",
  apiKey: "Api-Key",
  awsSignature: "",
  custom: "CustomScheme",
};

// Custom Error Class
export class HowlError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    Object.setPrototypeOf(this, HowlError.prototype); // Important for instanceof to work
    this.name = "HowlError";
    this.status = status;
    this.data = data;
  }
}

export default async function howl<T = unknown>({
  link,
  method = "get",
  data = {},
  auth = "bearer",
  content,
  token,
  mode = "cors",
  cache = "default",
  credentials = "same-origin",
  redirect = "follow",
  referrerPolicy = "strict-origin-when-cross-origin",
  integrity = "",
}: HowlRequest): Promise<T> {
  if (!link) throw new Error("Missing 'link'.");

  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `${authSchemes[auth]} ${token}`;
  }

  let body: BodyInit | null = null;

  const isDataEmpty =
    (typeof data === "object" && data !== null && Object.keys(data).length === 0) ||
    data === undefined;

  if (!isDataEmpty) {
    if (content === "json") {
      headers["Content-Type"] = contentTypes.json;
      body = JSON.stringify(data);
    } else if (content === "form") {
      headers["Content-Type"] = contentTypes.form;
      body = new URLSearchParams(data).toString();
    } else if (content === "multipart") {
      // Do not set content-type
      body = data; // data must be FormData
    } else if (content) {
      headers["Content-Type"] = contentTypes[content] ?? contentTypes.json;
      body = data;
    } else {
      headers["Content-Type"] = contentTypes.json;
      body = JSON.stringify(data);
    }
  }

  const requestConfig: RequestInit = {
    method: method.toUpperCase(),
    mode,
    cache,
    credentials,
    redirect,
    referrerPolicy,
    integrity,
    headers,
    body,
  };

  const response = await fetch(BASE_API_ENDPOINT + link, requestConfig);

  const contentType = response.headers.get("Content-Type") || "application/json";
  const text = await response.text();

  let responseData: any;

  if (contentType.includes("application/json")) {
    responseData = text ? JSON.parse(text) : null;
  } else {
    responseData = text;
  }

  if (!response.ok) {
    console.log("________ERROR RESPONSE START____________");
    console.log(responseData);
    console.log("________ERROR RESPONSE END____________");

    // throw new HowlError(response.statusText || "Fetch Error", response.status, responseData);
  }

  return responseData as T;
}

// Safe wrapper to prevent app crashes
export async function safeHowl<T = unknown>(
  req: HowlRequest
): Promise<{ data?: T; error?: HowlError }> {
  try {
    const data = await howl<T>(req);
    return { data };
  } catch (error) {
    if (error instanceof HowlError) {
      return { error };
    }
    throw error; // unexpected error (network crash, etc.)
  }
}
