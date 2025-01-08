<template>
  <v-container class="flex justify-center items-center min-h-screen">
    <v-card
      color="rgb(31 41 55)"
      class="pa-5 max-w-lg bg-gray-900 min-w-md elevation-10 rounded-lg"
    >
      <v-card-title class="text-center w-full mx-auto text-h5 font-weight-bold"
        >Register</v-card-title
      >
      <v-card-text>
        <div
          id="g_id_onload"
          data-client_id="303497307410-ccjldo3va228ubi019n681dskuaso9nd.apps.googleusercontent.com"
          data-login_uri="/auth/callback"
          data-auto_select="true"
          data-callback="handleCredentialResponse"
          style="background-color: rgb(17, 24, 39)"
        ></div>
        <div
          id="google-signin-button"
          class="text-black bg-gray-900 my-4"
        ></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    // Initialize Google Sign-In
    window.handleCredentialResponse = this.handleCredentialResponse

    window.google.accounts.id.initialize({
      client_id:
        '303497307410-ccjldo3va228ubi019n681dskuaso9nd.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    })

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'dark',
        size: 'large',
      }
    )
  },
  methods: {
    async handleCredentialResponse(response) {
      console.log('Google response:', response)
      await this.googleSignIn(response)
    },
    async googleSignIn(payload) {
      try {
        const res = await this.$store.dispatch('googleSignIn', payload)
        console.log(res)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.v-card {
  /* Light background for the card */
  border-radius: 12px; /* Rounded corners */
}

.text-black {
  color: #333; /* Darker text color for better readability */
}

#google-signin-button {
  background-color: rgb(17 24 39) !important;
  margin-top: 20px; /* Spacing above the Google Sign-In button */
}
</style>
