import Cookies from "js-cookie";
import axios from "axios";

export const createVehicle = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/vehicles/`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        }
      });

    if (response.status === 200) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};

export const updateVehicle = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/vehicles/${data.id}`,
      {
        "color": data.color,
      },
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
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

export const deleteVehicle = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/vehicles/${data.id}`,
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (response.status === 200) {
      onSuccess && onSuccess();
    }
  } catch (error) {
    onFail && onFail();
  } finally {
    onCleanup && onCleanup();
  }
};