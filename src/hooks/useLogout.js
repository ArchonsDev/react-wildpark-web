import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import SessionUserContext from "../contexts/SessionUserContext";

export const useLogout = () => {
    const navigate = useNavigate();
    const { setSessionUser, toggleLogoutModal } = useContext(SessionUserContext);

    const logout = () => {
        Cookie.remove("userToken");
        Cookie.remove("userAccount");
        setSessionUser(null);
        toggleLogoutModal();
        navigate("/");
    }

    return logout;
}