<template>
  <div>
    <!-- Organization Navbar -->
    <organization-navbar :navLinks="dummyNavLinks" :logoSrc="dummyLogoSrc" />

    <!-- Organization Jumbotron -->
    <organization-jumbotron
      :JumboImageList="dummyJumboImages"
      :JumboTittle="dummyJumboTitle"
      :JumboSubTittle="dummyJumboDescription"
    />

    <v-container>
      <!-- Organization About -->
      <organization-about :aboutText="dummyAboutText" />

      <!-- Organization Stats -->
      <organization-stats
        :member="'350'"
        :generation="'2025'"
        :alumni="'1.5k'"
        :bgColor="'#333333'"
        :textColor="'#ffffff'"
        :numberColor="'#d1d5db'"
        :labelColor="'#6b7280'"
      />

      <!-- Organization Activity -->
      <organization-activity
        :title="'Our Activities'"
        :description="'Adapun kegiataw yang kami lakukan adalah kegiatan yang berkontribusi pada pelestarian lingkungan dan pengembangan diri.'"
        :footerText="'Nah dibawah inis ada detail beberapa kegiatan yang pernah kita lakukan.'"
        :activities="activitiesData"
        :carouselBgColor="'#222'"
        :fontColor="'#ffffff'"
      />

      <!-- Organization Member List -->
      <organization-memberList :members="dummyMembers" />

      <!-- Organization Gallery -->
      <organization-gallery :galleryImages="dummyGalleryImages" />
    </v-container>

    <!-- Organization Footer -->
    <organization-footer
      :footerBgColor="dummyFooterBgColor"
      :fontColor="dummyFontColor"
      :iconColor="dummyIconColor"
      :footerText="dummyFooterText"
      :footerLink="dummyFooterLink"
      :logoSrc="dummyLogoSrc"
      :socialLinks="dummySocialLinks"
      :contactLinks="dummyContactLinks"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activitiesData: [
        {
          title: 'Mendaki Gunung',
          description:
            'Mendaki gunung untuk merasakan keindahan alam dan meningkatkan keterampilan bertahan hidup.',
        },
        {
          title: 'Pembelajaran Hidroponik',
          description:
            'Mengenal teknik bertani modern yang ramah lingkungan dan berkontribusi pada ketahanan pangan.',
        },
        {
          title: 'Pembelajaran tentang Lingkungan Hidup',
          description:
            'Memahami isu-isu lingkungan dan mencari solusi inovatif untuk mengatasi tantangan yang dihadapi.',
        },
        {
          title: 'Kunjungan Studi',
          description:
            'Mengunjungi tempat-tempat yang memiliki praktik terbaik dalam pengelolaan lingkungan dan belajar dari pengalaman mereka.',
        },
      ],

      // Dummy data for Navbar
      dummyNavLinks: [
        { text: 'Home', url: '/' },
        { text: 'About', url: '/about' },
        { text: 'Services', url: '/services' },
        { text: 'Contact', url: '/contact' },
      ],
      dummyLogoSrc: 'logo.png',

      // Dummy data for Jumbotron
      dummyJumboImages: ['bgJumbo2.jpg'],
      dummyJumboTitle: 'Welcome to Our Organization',
      dummyJumboDescription: 'We are committed to making a difference.',

      // Dummy data for About
      dummyAboutText:
        'We are an organization focused on community development and environmental sustainability.',
      dummyAboutImage: 'about-image.jpg',

      // Dummy data for Stats
      dummyStats: [
        { title: 'Members', value: 500 },
        { title: 'Projects', value: 120 },
        { title: 'Events', value: 30 },
      ],

      // Dummy data for Activities
      dummyActivities: [
        {
          title: 'Community Outreach',
          description:
            'Engaging with the community through various initiatives.',
        },
        {
          title: 'Environmental Awareness',
          description:
            'Promoting sustainable practices and environmental education.',
        },
      ],

      // Dummy data for Member List
      dummyMembers: [
        { name: 'John Doe', role: 'President', image: 'member1.jpg' },
        { name: 'Jane Smith', role: 'Vice President', image: 'member2.jpg' },
        { name: 'Emily White', role: 'Secretary', image: 'member3.jpg' },
      ],

      // Dummy data for Gallery
      dummyGalleryImages: [
        'gallery-image1.jpg',
        'gallery-image2.jpg',
        'gallery-image3.jpg',
      ],

      // Dummy data for Footer
      dummyFooterBgColor: 'bg-[#333333]',
      dummyFontColor: '#FFFFFF',
      dummyIconColor: 'text-white',
      dummyFooterText: 'Organization Name',
      dummyFooterLink: 'https://organization.website',
      dummySocialLinks: [
        {
          icon: 'mdi-instagram',
          name: '@organization',
          url: 'https://www.instagram.com/organization',
        },
        {
          icon: 'mdi-youtube',
          name: 'Organization Channel',
          url: 'https://www.youtube.com/channel/organization',
        },
      ],
      dummyContactLinks: [
        {
          icon: 'mdi-whatsapp',
          text: '+123456789',
          url: 'https://wa.me/+123456789',
        },
        {
          icon: 'mdi-email-outline',
          text: 'contact@organization.com',
          url: 'mailto:contact@organization.com',
        },
      ],
    }
  },
}
</script>
