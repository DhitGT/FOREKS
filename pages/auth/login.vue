<template>
  <v-container class="flex justify-center items-center min-h-screen">
    <v-card class="pa-5 w-full max-w-sm">
      <v-card-title class="text-center">{{
        user ? `Welcome, ${user.displayName || user.email}` : 'Login'
      }}</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            color="black"
            required
            dark
            :rules="emailRules"
            prepend-icon="mdi-email"
            class="text-black"
            style="color: black"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            class="text-black"
            color="black"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-btn
            class="w-full mt-4"
            color="primary"
            @click="login"
            :disabled="!valid"
            >Login with Email</v-btn
          >
        </v-form>
      </v-card-text>
      <v-btn @click="getUser"> GetUsers </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, dispatch } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
    }
  },
  methods: {
    async getUser() {
      try {
        const res = await this.$store.dispatch('Auth/getUser')
        console.log(res)
        alert(JSON.stringify(res.data))
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async login() {
      try {
        const res = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
        console.log('res', res)
        console.log('state', this.user)
        // alert(JSON.stringify(res.data))
      } catch (error) {
        console.error('Error:', error)
      }
    },
    // async loginWithEmail() {
    //   try {
    //     const { user } = await this.$firebase.signInWithEmailAndPassword(
    //       this.$firebase.auth,
    //       this.email,
    //       this.password
    //     )
    //     this.$store.commit('setUser', user) // Update user in Vuex
    //     this.$router.push('/') // Navigate to home on success
    //   } catch (error) {
    //     console.error('Error logging in with email:', error)
    //     alert('Login failed. Please check your credentials.')
    //   }
    // },
    // async loginWithGoogle() {
    //   try {
    //     const provider = this.$firebase.googleProvider
    //     const { user } = await this.$firebase.signInWithPopup(
    //       this.$firebase.auth,
    //       provider
    //     )
    //     this.$store.commit('setUser', user) // Update user in Vuex
    //     this.$router.push('/crud') // Navigate to desired route
    //   } catch (error) {
    //     console.error('Error logging in with Google:', error)
    //     alert('Google login failed. Please try again.')
    //   }
    // },
  },
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
