<template>
  <!-- <v-container class="flex justify-center items-center min-h-screen">
    <v-card color="#565656" class="pa-5 w-full max-w-sm">
      <v-card-title class="text-center">Register</v-card-title>
      <v-card-text>
        <v-form ref="registerForm" light v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            color="black"
            required
            light
            :rules="emailRules"
            prepend-icon="mdi-email"
            class="text-white"
          ></v-text-field>
          <v-text-field
            v-model="username"
            label="Userame"
            color="black"
            required
            light
            prepend-icon="mdi-account"
            class="text-white"
          ></v-text-field>
          <v-text-field
            v-model="instansiName"
            label="Instansi Name"
            color="black"
            required
            light
            prepend-icon="mdi-account"
            class="text-white"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            light
            required
            class="text-white"
            color="black"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-btn
            class="w-full mt-4"
            color="primary"
            @click="register"
            :disabled="!valid"
            >Create</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-container> -->
  <div></div>
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
      username: '',
      instansiName: '',
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
    async register() {
      try {
        const res = await this.$store.dispatch('register', {
          email: this.email,
          username: this.username,
          instansiName: this.instansiName,
          password: this.password,
        })
        console.log('res', res)
        console.log('state', this.user)
        // alert(JSON.stringify(res.data))
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
</style>
