<template>
  <div class="container flex flex-col gap-4">
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">Header</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-800"> Ekstrakurikuler Logo </label>
          <div class="flex gap-4">
            <v-avatar class="w-20">
              <img
                class="w-24"
                src="https://koppling.site/kopplingLogo.png"
                alt=""
              />
            </v-avatar>
            <input
              type="file"
              class="rounded-lg max-w-sm w-sm text-black bg-gray-300"
            />
          </div>
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-800">
            Ekstrakurikuler Slogan Name
          </label>
          <input
            type="text"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
        <p class="text-gray-700">Preview</p>
        <div class="example bg-gray-500">
          <dashboard-o-example-navbar />
        </div>
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">Jumbotron</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-800"> Background Image </label>
          <div class="flex gap-4">
            <input type="file" class="rounded-lg text-black bg-gray-300" />
          </div>
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-800"> Jumbotron Title </label>
          <input
            type="text"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-800"> Jumbotron SubTitle </label>
          <input
            type="text"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <div class="flex flex-col gap 4">
          <div class="flex items-center gap-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-600 rounded"
            />
            <label for="" class="text-gray-800">
              Member Registration Form Links
            </label>
          </div>
          <input
            type="text"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-500">
        <dashboard-o-example-jumbotron
          :JumboImageList="dummyJumboImages"
          :JumboTittle="dummyJumboTitle"
          :JumboSubTittle="dummyJumboDescript"
        />
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">About Us</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-800"> Content </label>
          <quill-editor
            class="text-black"
            v-model="content"
            :options="editorOptions"
          />
        </div>

        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-800">
        <dashboard-o-example-about class="rounded-lg" />
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">Activities</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-800"> Activities Description </label>
          <quill-editor
            class="text-black"
            v-model="content"
            :options="editorOptions"
          />
        </div>

        <!-- DheepMark -->
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Title</th>
                  <th scope="col" class="px-6 py-3">Description</th>
                  <th scope="col" class="px-6 py-3">Location</th>
                  <th scope="col" class="px-6 py-3">Date</th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in dummyCardActivities"
                  :key="i"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      <v-avatar
                        ><img
                          :src="'/assets/img/bgJumbo/' + item?.gallery[0]"
                          alt="logo"
                      /></v-avatar>
                      {{ item.title }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{
                        item.description.length > 17
                          ? item.description.slice(0, 17) + '...'
                          : item.description
                      }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{ item.location }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{ item.date }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <v-btn
                      @click="dialog = true"
                      plain
                      color="black"
                      flat
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Edit</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <v-btn
          @click="dialog = true"
          outlined
          color="primary"
          class="btn px-4 py-4 rounded-lg"
          >Add New</v-btn
        >
        <!-- Modal/Dialog -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">Activity Details</v-card-title>

            <v-card-text>
              <div>
                <div class="bg-gray-300 rounded-lg p-3">
                  <div class="flex flex-col gap-4">
                    <div>
                      <label class="text-gray-800">Card Cover Image</label>
                      <div class="flex gap-4">
                        <v-avatar class="w-20">
                          <img
                            class="w-24"
                            src="https://koppling.site/kopplingLogo.png"
                            alt=""
                          />
                        </v-avatar>
                        <input
                          type="file"
                          class="rounded-lg max-w-sm w-sm text-black bg-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Activity Date</label
                    >
                    <input
                      type="date"
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Activity Title</label
                    >
                    <quill-editor class="text-black" :options="editorOptions" />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Description</label
                    >
                    <quill-editor class="text-black" :options="editorOptions" />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Location</label
                    >
                    <input
                      type="text"
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Gallery</label
                    >
                    <div class="flex flex-wrap items-center gap-3">
                      <div
                        v-for="(item, i) in dummyCardActivities"
                        :key="i"
                        class="card p1 rounded"
                      >
                        <img
                          src="https://placehold.co/300"
                          class="w-32 shadow-md"
                          alt=""
                        />
                        <v-btn icon flat class="relative bottom-10 right-0">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                      <div class="my-auto">
                        <v-btn icon>
                          <v-icon
                            class="w-32 bg-gray-600 p-4 mb-8 rounded-full text-gray-700"
                            width="32"
                            >mdi-plus</v-icon
                          >
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>

            <!-- Modal Actions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveActivity">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-800">
        <organization-activity
          class="rounded-lg"
          :title="'Our Activities'"
          :description="'Adapun kegiataw yang kami lakukan adalah kegiatan yang berkontribusi pada pelestarian lingkungan dan pengembangan diri.'"
          :footerText="'Nah dibawah inis ada detail beberapa kegiatan yang pernah kita lakukan.'"
          :activities="activitiesData"
          :carouselBgColor="'#222'"
          :fontColor="'#ffffff'"
        />
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">Member Lists</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-800"> Member List </label>
          <div class="flex justify-start gap-4">
            <form class="max-w-sm">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select User Data</label
              >
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </form>
          </div>
        </div>

        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-500">
        <organization-member-list />
      </div>
    </div>
    <div class="p-4 bg-white rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-800">Gallery</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-800"> Image List </label>
          <div class="flex justify-start gap-4">
            <div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Image</th>
                      <th scope="col" class="px-6 py-3">Image Name</th>
                      <th scope="col" class="px-6 py-3">Type</th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in dummyGallery"
                      :key="i"
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div class="flex gap-4 items-center">
                          <img
                            :src="'/assets/img/bgJumbo/' + item"
                            alt="logo"
                            class="w-28"
                          />
                          {{ item }}
                        </div>
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div class="flex gap-4 items-center">
                          {{ item }}
                        </div>
                      </td>
                      <td
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div class="flex gap-4 items-center">
                          {{ item }}
                        </div>
                      </td>

                      <td class="px-6 py-4 text-right">
                        <v-btn
                          @click="dialog = true"
                          plain
                          color="black"
                          flat
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >Edit</v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <v-btn outlined color="green" class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-500">
        <organization-gallery />
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  data() {
    return {
      dialog: false,
      dummyJumboImages: ['bgJumbo2.jpg'],
      dummyJumboTitle: 'Welcome to Our Organization',
      dummyJumboDescription: 'We are committed to making a difference.',
      content: '', // Holds the editor content
      editorOptions: {
        theme: 'snow', // Options: 'snow', 'bubble', etc.
        placeholder: 'Write something...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
          ],
        },
      },
      dummyGallery: ['bgJumbo.jpg', 'bgJumbo2.jpg', 'bgJumbo3.jpg'],
      dummyCardActivities: [
        {
          date: '19-05-2024',
          title: 'Kunjungan Hidroponik',
          description: 'Kunjungan Hidroponik di Lorem Ipsum Dolor sit amet',
          location: 'Jakarta',
          gallery: ['bgJumbo.jpg', 'bgJumbo2.jpg', 'bgJumbo3.jpg'],
        },
        {
          date: '19-05-2024',
          title: 'Kunjungan Hidroponik',
          description: 'Kunjungan Hidroponik di Lorem Ipsum Dolor sit amet',
          location: 'Jakarta',
          gallery: ['bgJumbo.jpg', 'bgJumbo2.jpg', 'bgJumbo3.jpg'],
        },
        {
          date: '19-05-2024',
          title: 'Kunjungan Hidroponik',
          description: 'Kunjungan Hidroponik di Lorem Ipsum Dolor sit amet',
          location: 'Jakarta',
          gallery: ['bgJumbo.jpg', 'bgJumbo2.jpg', 'bgJumbo3.jpg'],
        },
      ],
    }
  },
  methods: {
    saveActivity() {
      // Add save logic here
      this.dialog = false // Close the modal after saving
    },
  },
}
</script>
