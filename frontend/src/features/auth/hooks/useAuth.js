import { setLoaing, setError, setUser } from "../state/auth.slice";
import { register } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";


export const useAuth = () => {

    const dispatch = useDispatch()

    async function handelRegister({ email, contact, password, fullname }) {

        const data = await register({ email, contact, password, fullname })

        dispatch(setUser(data.user))
    }

    return { handelRegister }
}