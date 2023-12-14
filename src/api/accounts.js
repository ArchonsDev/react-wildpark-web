import Cookies from "js-cookie";
import axios from "axios";

export const getAccount = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/accounts/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
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

export const updateAccount = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/accounts/${data.id}`,
      {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        contactNo: data.contactNo,
        gender: data.gender,
        street: data.street,
        municipality: data.municipality,
        province: data.province,
        country: data.country,
        zipCode: data.zipCode
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
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

export const updatePassword = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/accounts/${data.id}`,
      {
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
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

export const getAccountVehicles = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/accounts/${data.id}/vehicles`, {
      headers: {
        "Authorization": `Bearer ${Cookies.get("userToken")}`
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

export const getAccountOrgs = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/accounts/${data.id}/organizations`,
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