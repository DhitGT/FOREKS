<template>
  <div class="h-full rounded-lg">
    <div
      @click="handleClick"
      href="#"
      class="flex min-w-fit md:max-w-sm flex-col h-full items-center rounded-lg shadow border"
      :style="{ borderColor: borderColor, backgroundColor: bgColor }"
    >
      <div class="ma-2 overflow-hidden rounded-lg">
        <img
          class="object-cover w-full aspect-square rounded-lg"
          :src="item.imgUrl"
          alt=""
        />
      </div>
      <div class="flex flex-col justify-start p-4 leading-normal">
        <div class="flex justify-between" style="max-height: fit-content">
          <p
            :style="{ color: textColor }"
            class="font-normal md:text-sm text-xs"
          >
            Gen {{ item.gen }}
          </p>
          <p
            :style="{ color: textColor }"
            class="font-normal md:text-sm text-xs"
          >
            {{ item.date }}
          </p>
        </div>
        <h5
          :style="{ color: titleColor }"
          class="md:mb-2 md:text-2xl text-lg font-bold tracking-tight"
        >
          {{ item.title }}
        </h5>
        <div class="overflow-y-hidden max-h-[5vh] md:max-h-max">
          <p
            :style="{ color: textColor }"
            class="mb-3 font-normal md:text-sm text-xs"
          >
            {{
              item.descript.length > 50
                ? item.descript.slice(0, 50) + ' Baca Selengkapnya..'
                : item.descript
            }}
          </p>
        </div>
        <button
          @click="handleClick"
          :style="{ color: buttonTextColor }"
          class="text-sm hover:text-gray-300 mt-auto"
        >
          Lihat Detail
        </button>
        <!-- Added button for viewing details -->
      </div>
    </div>
    <organization-dialog-kegiatan
      @close="handleClose"
      :item="item"
      :show="dialog.show"
    ></organization-dialog-kegiatan>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    bgColor: {
      type: String,
      default: '#80AF81', // Default background color
    },
    borderColor: {
      type: String,
      default: '#F1FDF3', // Default border color
    },
    titleColor: {
      type: String,
      default: '#F1FDF3', // Default title color
    },
    textColor: {
      type: String,
      default: '#F1FDF3', // Default text color
    },
    buttonTextColor: {
      type: String,
      default: '#F1FDF3', // Default button text color
    },
  },
  data() {
    return {
      dialog: {
        show: false,
      },
    }
  },
  methods: {
    handleClick() {
      this.dialog.show = true
    },
    handleClose() {
      this.dialog.show = false
    },
  },
}
</script>
