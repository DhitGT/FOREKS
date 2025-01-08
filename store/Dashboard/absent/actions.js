export default {
  async GetEskulAbsen(_) {
    try {
      const data = await this.$axios.$get(`/absent/getEskulAbsent`);
      return {
        status: true,
        message: 'Successfully fetched ',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
  async editAbsen(_, payload) {
    try {
      const data = await this.$axios.$post(`/absent/editAbsen`, payload);
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
  async deleteAbsen(_, payload) {
    try {
      const data = await this.$axios.$post(`/absent/deleteAbsen`, payload);
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
  async GetEskulAbsenByCode(_, code) {
    try {
      const data = await this.$axios.$post(`/absent/getEskulAbsenByCode`, { absent_code: code });
      return {
        status: true,
        message: 'Successfully fetched ',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
  async getUserByName(_, name) {
    try {
      const data = await this.$axios.$post(`/absent/getUserByName`, { name: name });
      return {
        status: true,
        message: 'Successfully fetched ',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
  async storeAbsen(_, payload) {
    try {
      const data = await this.$axios.$post(`/absent/storeAbsen`, payload);
      return {
        status: true,
        message: 'Successfully fetched ',
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
