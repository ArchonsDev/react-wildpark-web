import Cookie from "js-cookie";
import axios from "axios";

export const login = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
      "email": data.email,
      "password": data.password
    });

    if (response.status === 200) {
      Cookie.set('userToken', response?.data?.token);
      Cookie.set('userAccount', JSON.stringify(response?.data?.account));
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};