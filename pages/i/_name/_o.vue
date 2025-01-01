<template>
  <div>
    <div v-if="!ewp" class="h-screen w-screen flex justify-center items-center">
      <!-- <v-skeleton-loader type="card" /> -->
      <!-- Alternatively, you can use a progress circular -->
      <v-progress-circular
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </div>
    <div v-else>
      <!-- Organization Navbar -->
      <organization-navbar
        :logoSrc="ewp?.logo"
        :NavTittle="ewp?.web_pages?.navbar_title"
      />

      <!-- Organization Jumbotron -->
      <organization-jumbotron
        id="home"
        :JumboImage="ewp?.web_pages?.jumbotron_image"
        :JumboTittle="ewp?.web_pages?.jumbotron_title"
        :JumboSubTittle="ewp?.web_pages?.jumbotron_subtitle"
        :FormHref="ewp?.web_pages?.form_register_link"
        :badge="ewp ? JSON.parse(ewp.badge) : []"
      />

      <v-container>
        <!-- Organization About -->
        <organization-about
          id="about"
          :aboutText="ewp?.web_pages?.about_desc"
        />

        <!-- Organization Stats -->
        <organization-stats
          :member="ewp?.eskul_members_count"
          :generation="ewp?.gen"
          :alumni="ewp?.alumni"
        />

        <!-- Organization Activity -->
        <organization-activity id="activities" :data="ewp?.web_pages" />

        <!-- Organization Gallery -->
        <organization-gallery
          id="galery"
          :gallery="[]"
          :wpgallery="ewp?.web_pages?.web_page_galery"
        />
      </v-container>

      <!-- Organization Footer -->
      <organization-footer
        id="contact"
        :footerText="ewp?.web_pages?.custom_domain_name"
        :footerLink="ewp?.web_pages?.custom_domain_name"
        :logoSrc="'http://localhost:8000/storage/' + ewp?.logo"
        :instaLink="ewp?.instagram_url"
        :whatsapp_number="ewp?.whatsapp_number"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ewp: null,
    }
  },
  methods: {
    async getEskulWebPageUrl() {
      let cdn = this.$route.params.o
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getEskulWebPageUrl',
        { cdn: cdn }
      )
      this.ewp = data.data
    },
  },
  mounted() {
    this.getEskulWebPageUrl()
  },
}
</script>
