/* eslint-disable prettier/prettier */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { token } from "./Login"; 

export const AxiosInterceptor = () => {
    
    const UpdateHeader = (request: AxiosRequestConfig) => {
        const axiosToken = token;
        const newHeaders = {
            Authorization: axiosToken,
            "Content-Type": "application/json",
        };
        request.headers = newHeaders;
        return request;
    };

    axios.interceptors.request.use((request) => {
        UpdateHeader(request) 
        return request;
      });

    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalRequest = err.config;
            if (originalRequest.url !== "/login" && err.response) { //Si no es un login y encima me devuelve 401 entonces es porque expiro el token.
                
                if (err.response.status === 401 && !originalRequest._retry) {
                    try {
                        store.dispatch (resetJWT()); //Necesito REDUX
                    }catch (error) {
                        console.log(error);
                    }


                    originalRequest.retry = true;
                    const loginState = store.getState().auth; //Necesito REDUX

                    const response = await loginWS.refreshToken ( //Necesito REDUX
                        loginState.user.token,
                    );
                    //console.log("response: "JSON.stringify(response,null,2));
                    if (response.status === 200) {
                        axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
                        try {
                            store.dispatch (updateJWT (response.data)); //Necesito REDUX
                        } catch (error) {
                            console.log(error);
                        }

                        originalRequest.headers.Authorization = "Bearer " + response.data.token;

                        return await axios.request(originalRequest);
                    } else {
                        //other ws errors
                        return Promise.reject(err);
                    }
                } else {
                    //other ws errors
                    return Promise.reject(err);
                }
            } else {
                //other ws errors
                return Promise.reject(err);
            }
        }
    )

    
    
    axios.interceptors.response.use(
        (response) => {
            console.log("response", response);
            return response;
        },
        (error) => {
            console.log("error", error);
            return Promise.reject(error);
        }
    )
    
  
};