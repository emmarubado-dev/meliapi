import "dotenv/config";

export const serverPort = process.env.SERVER_PORT;
export const nodeEnv = process.env.NODE_ENV;

export const meliClientId = process.env.MELI_CLIENTID;
export const meliSecret = process.env.MELI_CLIENT_SECRET;
export const meliRedirectURI = "http://localhost:8080";//process.env.MELI_REDIRECT_URI;
export const meliAuthURL = process.env.MELI_AUTH_URL;
export const meliTokenURL = process.env.MELI_TOKEN_URL;
export const meliApiBase = process.env.MELI_API_BASE;

export const dbName = process.env.DB_NAME;
export const host = process.env.DB_HOST;
export const dialect = process.env.DB_DIALECT;
export const dbPort = process.env.DB_PORT;

export const shopApiUrl = process.env.SHOP_API_URL;

export const meliAllInOne = process.env.MELI_ALLINONE;
export const isMLAllInOne = () => {
    return meliAllInOne=="true" || meliAllInOne.toUpperCase()=="TRUE";
};
export const isProd = () => {
    return nodeEnv=="production" || nodeEnv.toUpperCase()=="PRODUCTION";
};
export const isDev = () => {
    return nodeEnv=="development" || nodeEnv.toUpperCase()=="DEVELOPMENT";
};
export const isTest = () => {
    return nodeEnv=="test" || nodeEnv.toUpperCase()=="TEST";
};