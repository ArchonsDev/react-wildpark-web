import Cookies from "js-cookie";
import axios from "axios";

export const getOrganization = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/organizations/${data.id}`,
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

export const addMember = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/organizations/${data.id}/members`,
      {
        accountId: data.accountId,
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

export const deleteOrg = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/organizations/${data.id}`,
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

export const updateOrg = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/organizations/${data.id}`,
      {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        paymentStrategy: data.paymentStrategy,
        organizationType: data.type,
      },
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (response.status === 200 || response.status === 409) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};

export const deleteMember = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/organizations/${data.id}/members/${data.accountId}`,
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (response.status === 200 || response.status === 409) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};

export const getOrgMembers = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/organizations/${data.id}/members`,
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

export const deleteAdmin = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/organizations/${data.id}/admins/${data.accountId}`,
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

export const addAdmin = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/organizations/${data.id}/admins`,
      {
        accountId: data.accountId,
      },
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

export const createOrg = async (data, onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/organizations/`,
      {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        paymentStrategy: data.paymentStrategy,
        type: data.type,
      },
      {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (response.status === 200 || response.status === 409) {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    onFail && onFail(error);
  } finally {
    onCleanup && onCleanup();
  }
};

export const getAllOrgs = async (onSuccess, onFail, onCleanup) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/organizations/",
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