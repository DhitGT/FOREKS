<template>
  <div :style="{ backgroundColor: bgColor, color: textColor }" class="py-8">
    <div class="flex justify-around space-x-6 text-center">
      <div>
        <p :style="{ color: numberColor }" class="text-3xl font-semibold">
          {{ member }}
        </p>
        <p :style="{ color: labelColor }" class="text-sm">Members</p>
      </div>
      <div>
        <p :style="{ color: numberColor }" class="text-3xl font-semibold">
          {{ generation }}
        </p>
        <p :style="{ color: labelColor }" class="text-sm">Generations</p>
      </div>
      <div>
        <p :style="{ color: numberColor }" class="text-3xl font-semibold">
          {{ alumni }}
        </p>
        <p :style="{ color: labelColor }" class="text-sm">Alumni</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: String,
      default: '300',
    },
    generation: {
      type: String,
      default: '1023',
    },
    alumni: {
      type: String,
      default: '2k++',
    },
    bgColor: {
      type: String,
      default: '#333333', // gray-900
    },
    textColor: {
      type: String,
      default: '#ffffff', // white
    },
    numberColor: {
      type: String,
      default: '#d1d5db', // gray-300
    },
    labelColor: {
      type: String,
      default: '#6b7280', // gray-500
    },
  },
}
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
