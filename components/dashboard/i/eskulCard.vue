<template>
  <a
    href="#"
    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="object-cover w-full md:w-48 h-48 rounded-s-lg"
      src="https://placehold.co/400x900"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Koppling
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, cumque.
        <!-- Add longer text here to test the content height behavior -->
      </p>
      <div class="flex items-center justify-start gap-4">
        <p class="font-normal text-gray-700 dark:text-gray-400">Members: 230</p>
        <p class="font-normal text-gray-700 dark:text-gray-400">Gen: 23</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {},
}
</script>
