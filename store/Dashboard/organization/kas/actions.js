export default {
  async getEskulKas(_, payload) {
    try {
      const data = await this.$axios.$post(`/kas/getEskulKas`, payload);
      return {
        status: true,
        message: 'Success ',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
  async storeKas(_, payload) {
    try {
      const data = await this.$axios.$post(`/kas/storeKas`, payload);
      return {
        status: true,
        message: 'Success ',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
}
