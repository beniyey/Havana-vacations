import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";


class InterceptorsService {
    // intercepts http request to push in the token bearer for the backend
    // to provide information based on user authorization
    public CreateInterceptors(): void {
        axios.interceptors.request.use(request => {
            if (authService.isLoggedIn()) {
                request.headers = {
                    authorization: "Bearer " + store.getState().authState.token
                }
            }
            return request;
        });
    };
};

const interceptorService = new InterceptorsService();
export default interceptorService;