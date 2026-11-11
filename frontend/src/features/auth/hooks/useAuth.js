import { setLoading, setError, setUser } from "../state/auth.slice";
import { register, login, getMe } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({ email, contact, password, fullname, isSeller });
            dispatch(setUser(data.user));
            return data.user;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message || "Registration failed";
            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
            return data.user;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message || "Login failed";
            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe (){

        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
            console.log(user)
        }
        catch(err){
            console.log(err);
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleGetMe, user, loading, error };
}
