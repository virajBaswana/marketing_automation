export const FB_CLIENT_ID = import.meta.env.FB_CLIENT_ID || "315609364823245";
export const FB_REDIRECT_URI =
  import.meta.env.FB_REDIRECT_URI || "http://localhost:3000/fb";
export const FB_CONFIG_ID = import.meta.env.FB_CONFIG_ID || "489540216979730";
export const FB_STATE =
  import.meta.env.FB_STATE ||
  "qeiourghdsiuyfghaisrgiyufguayksgfuakhjsgfuyasgfuaguyfkgad";
export const FB_AUTH_BASE_URL =
  import.meta.env.FB_AUTH_BASE_URL || "https://www.facebook.com/v20.0/dialog/oauth";

const params = new URLSearchParams({
  client_id: FB_CLIENT_ID,
  redirect_uri: FB_REDIRECT_URI,
  config_id: FB_CONFIG_ID,
  state: FB_STATE,
});

export const FB_AUTH_URL = FB_AUTH_BASE_URL + "?" + params;
console.log(FB_AUTH_BASE_URL)