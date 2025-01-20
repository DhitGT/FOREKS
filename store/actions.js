import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
export default {

  async login({ commit, state }, { email, password }) {
    try {
      const data = await this.$axios.$post("/login", { email: email, password: password })
      commit("SET_USER", data)
      commit("SET_TOKEN", data.token)
      console.log("token fetch: ", data.token)
      console.log("token state: ", state.token)
      Cookies.set(
        "app_id",
        CryptoJS.AES.encrypt(data.token, "token").toString()
      );

      // console.log("data login :", data)
      const baseUrl = window.location.origin; // Dynamically get the base URL
      if (data.token) {
        if (data.data.role === "Manager") {
          this.$router.push({ name: "dashboard-i" });
        } else if (data.data.role === "Leader") {
          this.$router.push({ name: "dashboard-o" });
        }
        // window.location.href = `${baseUrl}/dashboard/i`;
      } else {
        console.log("gagal href")
      }
      console.log(data)
    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async logout({ commit, state }) {
    try {
      // Make a POST request to logout
      const data = await this.$axios.$post("/logout");

      // Clear user and token from the Vuex store
      commit("SET_USER", null);
      commit("SET_TOKEN", null);

      // Delete the "app_id" cookie
      Cookies.remove("app_id");

      console.log("Logout successful");

      // Redirect based on user role
      if (data) {
        this.$router.push({ name: "auth-login" });
      } else {
        console.log("fails");
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  }
  ,
  async register({ commit, state }, { email, username, instansiName, password }) {
    try {
      const data = await this.$axios.$post("/register", { email: email, username: username, instansiName: instansiName, password: password })
      // commit("SET_USER", data)
      // commit("SET_TOKEN", data.token)
      // console.log("token fetch: ", data.token)
      // console.log("token state: ", state.token)
      // Cookies.set(
      //   "app_id",
      //   CryptoJS.AES.encrypt(data.token, "token").toString()
      // );
      // if (data.token) {
      //   const baseUrl = window.location.origin; // Dynamically get the base URL
      //   // window.location.href = `${baseUrl}/dashboard/i`;
      // } else {
      //   console.log("gagal href")
      // }
      if (data.token) {
        this.$router.push({ name: "auth-login" });
      }

      console.log(data)
    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async addUser({ commit, state }, formData) {
    try {
      const data = await this.$axios.$post("/dashboard/i/addUser", formData)

      console.log(data)
      return data
    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async googleSignIn({ commit, state }, formData) {
    try {
      const data = await this.$axios.$post("/auth/googleSignIn", formData)

      console.log(data)
      commit("SET_USER", null);
      commit("SET_TOKEN", null);

      // Delete the "app_id" cookie
      Cookies.remove("app_id");

      commit("SET_USER", data)
      commit("SET_TOKEN", data.token)
      console.log("token fetch: ", data.token)
      console.log("token state: ", state.token)

      Cookies.set(
        "app_id",
        CryptoJS.AES.encrypt(data.token, "token").toString()
      );

      // console.log("data login :", data)

      await new Promise(resolve => setTimeout(resolve, 1000));

      const baseUrl = window.location.origin; // Dynamically get the base URL
      if (data.token && Cookies.get("app_id")) {
        if (data.user.role === "Manager") {
          this.$router.push({ name: "dashboard-i" });
        } else if (data.user.role === "Leader") {
          this.$router.push({ name: "dashboard-o" });
        }
        // window.location.href = `${baseUrl}/dashboard/i`;
      } else {
        console.log("gagal href")
      }
      console.log(data)
      return response
    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async editUser({ commit, state }, formData) {
    try {
      const data = await this.$axios.$post("/dashboard/i/editUser", formData)

      console.log(data)
      return data

    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async deleteUser({ commit, state }, formData) {
    try {
      const data = await this.$axios.$post("/dashboard/i/deleteUser", formData)

      console.log(data)
      return data

    } catch (error) {
      console.log("errror : ", error)
    }
  },
  async getAppStats({ commit, state }, formData) {
    try {
      const data = await this.$axios.$get("/apps/getAppStats", formData)

      console.log(data)
      return data

    } catch (error) {
      console.log("errror : ", error)
    }
  },

  fetchCookie({ dispatch, commit }, isLogin) {
    if (process.client) {
      let auth = null;
      if (document.cookie) {
        // try {
        //   auth = JSON.parse(Cookies.get("auth_dms"));
        // } catch (err) {
        //   auth = null;
        // }


        const encryptedToken = Cookies.get("app_id");
        if (!encryptedToken) {
          console.error("No token found in cookie");
        } else {
          try {
            const decrypted = CryptoJS.AES.decrypt(encryptedToken, "token").toString(CryptoJS.enc.Utf8);
            console.log("Decrypted token:", decrypted);
            commit("SET_TOKEN", decrypted);
          } catch (error) {
            console.error("Failed to decrypt token:", error);
          }
        }


      }
      // if (auth === null && !isLogin) {
      //   localStorage.clear();
      //   window.location.replace("/login");
      // }
    }
  },
};
