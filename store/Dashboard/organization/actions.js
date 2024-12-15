export default {
  async getProfileInfo(_) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$get(
        "/dashboard/o/getProfileInfo"
      );
      return {
        status: true,
        message: "Berhasil mendapatkan data",
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async storeNavbar(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeNavbar", payload
      );
      return {
        status: true,
        message: data.message,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async storeJumbotron(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeJumbotron", payload
      );
      return {
        status: true,
        message: data.message,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async storeAboutUs(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeAboutUs", payload
      );
      return {
        status: true,
        message: data.message,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  }

}
