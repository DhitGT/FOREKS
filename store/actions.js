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
      if (data.token) {
        const baseUrl = window.location.origin; // Dynamically get the base URL
        // window.location.href = `${baseUrl}/dashboard/i`;
        this.$router.push({ name: "dashboard-i" });
      } else {
        console.log("gagal href")
      }
      console.log(data)
    } catch (error) {
      console.log("errror : ", error)
    }
  },
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
