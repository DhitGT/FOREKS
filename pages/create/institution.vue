<template>
  <div>
    <div class="container">
      <h1 class="font-bold text-center text-3xl">Register</h1>
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="institution"
            class="block mb-2 text-sm font-medium text-white"
            >Institution Name</label
          >
          <input
            type="text"
            id="institution"
            class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-white"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
            required
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600 ring-offset-gray-800"
              required
            />
          </div>
          <label for="remember" class="ms-2 text-sm font-medium text-gray-300"
            >Remember me</label
          >
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
