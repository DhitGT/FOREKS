<template>
  <v-container class="py-4">
    <span :style="{ color: textColor }" class="text-4xl font-bold mb-5"
      >Members Lists</span
    >
    <!-- Member List (Single Column) -->
    <v-row class="justify-center" v-if="members.length">
      <v-col v-for="(member, index) in displayedMembers" :key="index" cols="12">
        <v-card class="rounded-lg border px-4 py-1" :class="cardColor">
          <v-row>
            <v-col cols="12" class="flex justify-between items-center">
              <p class="font-bold text-lg" :class="textColor">
                {{ member.name }}
              </p>
              <p class="text-sm text-gray-600" :class="textColor">
                Gen {{ member.gen }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- See More Button -->
    <v-row class="justify-center">
      <v-btn
        v-if="showSeeMoreButton"
        @click="loadMoreMembers"
        color="primary"
        class="mt-4"
        rounded
      >
        See More Members
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      required: true,
      default: [
        { name: 'Alice', gen: 'A1' },
        { name: 'Bob', gen: 'B2' },
        { name: 'Charlie', gen: 'C3' },
        { name: 'David', gen: 'D4' },
        { name: 'Eva', gen: 'E5' },
        { name: 'Frank', gen: 'F6' },
        { name: 'Grace', gen: 'G7' },
        { name: 'Hannah', gen: 'H8' },
        { name: 'Ivy', gen: 'I9' },
      ],
    },
    cardColor: {
      type: String,
      default: '#f9fafb', // Light card color
    },
    textColor: {
      type: String,
      default: '#ffffff', // Text color (black or dark)
    },
    maxMembersToShow: {
      type: Number,
      default: 6, // Number of members to initially display
    },
  },
  computed: {
    showSeeMoreButton() {
      return this.members.length > this.maxMembersToShow
    },
    displayedMembers() {
      return this.members.slice(0, this.maxMembersToShow)
    },
  },
  methods: {
    loadMoreMembers() {
      this.$emit('loadMore') // Emits event to parent component to load more members
    },
  },
}
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.text-black {
  color: #000000;
}
</style>
