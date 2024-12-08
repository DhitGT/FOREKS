export default {
  async getReportActivity(_) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$get(
        "/dashboard/i/getActivityReport"
      );
      return {
        status: true,
        message: "Berhasil mendapatkan data",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async getProfileInfo(_) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$get(
        "/dashboard/i/getProfileInfo"
      );
      return {
        status: true,
        message: "Berhasil mendapatkan data",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async getEskulInstansi(_, isTrash) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/dashboard/i/getEskulInstansi", { isTrash: isTrash }
      );
      return {
        status: true,
        message: "Berhasil mendapatkan data",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async setWebProfile(_, formData) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/webProfile/store", formData
      );
      return {
        status: true,
        message: "Berhasil membuat",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async storeEskul(_, formData) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/eskul/store", formData
      );
      return {
        status: true,
        message: "Berhasil membuat",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async trashEskul(_, formData) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/eskul/trash", formData
      );
      return {
        status: true,
        message: "Berhasil",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },
  async restoreEskul(_, formData) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/eskul/restore", formData
      );
      return {
        status: true,
        message: "Berhasil",
        data: data,
      };
    } catch (e) {
      if (e.message.toLowerCase().includes("network")) {
        return {
          status: false,
          message: "Koneksi bermasalah, silakan cek koneksi internet.",
        };
      } else {
        const { errors, message } = e.response.data;
        return {
          status: false,
          errors,
          message,
        };
      }
    }
  },

}


// const response = await this.$store.dispatch(
//   "message/readMessage",
//   payload
// );
