export default {
  async getEskulWebPageUrl(_, payload) {
    try {
      // console.log("STATE TOKEN action: ", this.$store.state.token)

      const data = await this.$axios.$post(
        "/getEskulWebPageUrl", payload
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
  },
  async storeActivitiesEskulItem(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeActivitiesEskulItem", payload
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
  async storeGallery(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeGallery", payload
      );
      return data
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async storeActivitiesDesc(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/storeActivitiesDesc", payload
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
  async getEskulWebPage(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/webprofile/getEskulWebPage", payload
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
  async getEskulActivityReport(_, payload) {
    try {
      console.log("EXECUTED")
      const data = await this.$axios.$post(
        "/dashboard/i/getEskulActivityReport", payload
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
  async getEskulMembers(_, page = 1) {
    try {
      const data = await this.$axios.$get(
        "/dashboard/o/getEskulMembers", {
        params: {
          page: page,       // Page number
          per_page: 10      // Items per page
        }
      }
      );

      return {
        status: true,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async editEskulMember(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/updateEskulMember",
        payload

      );

      return {
        status: true,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async deleteEskulMember(_, payload) {
    try {
      const data = await this.$axios.$post(
        "/dashboard/o/deleteEskulMember",
        payload

      );

      return {
        status: true,
        data: data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.message,
      }
    }
  },
  async storeEskulMember(_, payload) {
    try {
      const { data } = await this.$axios.$post(
        "/dashboard/o/storeEskulMember", payload
      );
      return {
        status: true,
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
