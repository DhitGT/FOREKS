export default {
  async getUser(_) {
    try {
      const data = await this.$axios.$get(
        "/users"
      );
      return {
        status: true,
        message: "Berhasil mendapatkan data kontak",
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
