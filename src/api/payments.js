import Cookies from "js-cookie";
import axios from "axios";

export const addPayment = async (data, onSuccess, onFail, onCleanup) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/payments/`,
      {
        ...data,
        date: `${year}-${month}-${day} ${hours}:${minutes}`
      },
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 200) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};

export const deletePayment = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/payments/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Delete response status:", response.status);

    if (response.status === 200) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};