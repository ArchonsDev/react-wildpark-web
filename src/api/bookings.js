import Cookies from "js-cookie";
import axios from "axios";

export const deleteBooking = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/bookings/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
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