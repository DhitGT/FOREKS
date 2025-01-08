export default {
  async fetchActivities({ commit }, params) {
    try {
      const response = await this.$axios.$get(
        '/dashboard/o/eskul-report-activities',
        {
          params,
        }
      )

      if (response) {
        return {
          status: true,
          message: 'Successfully fetched activity',
          data: response,
        };
      } else {
        // alert('No activities found.')
      }
    } catch (e) {
      // alert(e.message)
    }
  },

  async getActivity(_, id) {
    try {
      const data = await this.$axios.$get(`/dashboard/o/eskul-report-activities/${id}`);
      return {
        status: true,
        message: 'Successfully fetched activity',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },

  async createActivity(_, payload) {
    try {
      const data = await this.$axios.$post('/dashboard/o/eskul-report-activities', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return {
        status: true,
        message: 'Successfully created activity',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },

  async updateActivity(_, { id, payload }) {
    try {
      const data = await this.$axios.$put(`/dashboard/o/eskul-report-activities/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return {
        status: true,
        message: 'Successfully updated activity',
        data,
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },

  async deleteActivity(_, id) {
    try {
      await this.$axios.$delete(`/dashboard/o/eskul-report-activities/${id}`);
      return {
        status: true,
        message: 'Successfully deleted activity',
      };
    } catch (e) {
      return {
        status: false,
        message: e?.response?.data?.message || e.message,
      };
    }
  },
};
