<template>
  <v-container class="flex justify-center items-center min-h-screen">
    <v-card class="pa-5 max-w-lg min-w-md elevation-10 rounded-lg dark-card">
      <v-card-title
        class="text-center mx-auto text-h5 font-weight-bold text-white"
      >
        Register
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="text-white">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="input-field"
              placeholder="Enter your email"
            />
            <span v-if="!valid && !email" class="error-text"
              >Email is required</span
            >
            <span
              v-if="!valid && email && !/.+@.+\..+/.test(email)"
              class="error-text"
            >
              E-mail must be valid
            </span>
          </div>
          <div class="mb-4">
            <label for="username" class="text-white">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="input-field"
              placeholder="Enter your username"
            />
            <span v-if="!valid && !username" class="error-text"
              >Username is required</span
            >
          </div>
          <div class="mb-4">
            <label for="instansiName" class="text-white">Instansi Name</label>
            <input
              type="text"
              id="instansiName"
              v-model="instansiName"
              required
              class="input-field"
              placeholder="Enter your institution name"
            />
            <span v-if="!valid && !instansiName" class="error-text"
              >Instansi Name is required</span
            >
          </div>
          <div class="mb-4">
            <label for="password" class="text-white">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="input-field"
              placeholder="Enter your password"
            />
            <span v-if="!valid && !password" class="error-text"
              >Password is required</span
            >
          </div>
          <button
            type="submit"
            class="w-full mt-4 btn-primary"
            :disabled="!valid"
          >
            Register
          </button>
        </form>
        <v-divider class="my-4"></v-divider>
        <div
          id="g_id_onload"
          data-client_id="303497307410-ccjldo3va228ubi019n681dskuaso9nd.apps.googleusercontent.com"
          data-login_uri="/auth/callback"
          data-auto_select="true"
          data-callback="handleCredentialResponse"
        ></div>
        <div id="google-signin-button" class="text-black my-4"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'default',
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
        theme: 'dark', // Set theme to dark
        size: 'large',
      }
    )
  },
  data() {
    return {
      email: '',
      username: '',
      instansiName: '',
      password: '',
      valid: true,
    }
  },
  methods: {
    async register() {
      // Validasi sederhana untuk memastikan semua field terisi
      this.valid =
        this.email && this.username && this.instansiName && this.password
      if (!this.valid) return

      try {
        const res = await this.$store.dispatch('register', {
          email: this.email,
          username: this.username,
          instansiName: this.instansiName,
          password: this.password,
        })
        console.log('Response:', res)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async handleCredentialResponse(response) {
      console.log('Google response:', response)
      await this.googleSignIn(response)
    },
    async googleSignIn(payload) {
      try {
        const res = await this.$store.dispatch('googleSignIn', payload)
        console.log('Google sign-in response:', res)
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

.dark-card {
  background-color: #1e1e1e; /* Dark background for the card */
  color: #ffffff; /* White text color */
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333; /* Dark background for input */
  color: #fff; /* White text color for input */
}

.input-field:focus {
  border-color: #6200ea; /* Highlight border on focus */
  outline: none; /* Remove default outline */
}

.error-text {
  color: red; /* Red color for error messages */
  font-size: 12px; /* Smaller font size for error messages */
}

.btn-primary {
  background-color: #6200ea; /* Primary button color */
  color: white; /* Button text color */
  border: none; /* Remove border */
  padding: 10px; /* Button padding */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

.btn-primary:disabled {
  background-color: #444; /* Darker color when disabled */
  cursor: not-allowed; /* Not-allowed cursor when disabled */
}

.v-divider {
  background-color: #444; /* Darker divider color */
}
</style>
