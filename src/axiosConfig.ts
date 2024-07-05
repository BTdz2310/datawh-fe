import axios from 'axios';


const axiosConfig = axios.create({
    baseURL: `${process.env.URL_BE||""}`,
    withCredentials: true,
    headers: { "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
});

axiosConfig.interceptors.request.use(
    (config) => {

        const accessTokenString = localStorage.getItem("accessToken");
        const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log(accessToken)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(error)
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

                try {
                    const response = await axios.get(`${process.env.REACT_APP_URL_BE||""}/auth/refresh-token`, {withCredentials: true});
                    const newAccessToken = response.data.access_token;
                    localStorage.setItem('accessToken', JSON.stringify(newAccessToken))
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (error) {
                    throw new Error();
                    // Handle token refresh failure
                    // mostly logout the user and re-authenticate by login again
                }
            // }
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
