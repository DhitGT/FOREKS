<template>
  <div class="container flex flex-col gap-4">
    <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">Header</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-100"> Ekstrakurikuler Logo </label>
          <div class="flex gap-4">
            <v-avatar class="w-20">
              <img
                class="w-24"
                :src="
                  preview.navbar.logo
                    ? preview.navbar.logo
                    : `http://localhost:8000/storage/${profileInfo?.logo}`
                "
                alt=""
              />
            </v-avatar>
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload($event, 'navbar')"
              class="rounded-lg max-w-sm w-sm text-black bg-gray-300"
            />
          </div>
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-100">
            Ekstrakurikuler Slogan Name
          </label>
          <input
            type="text"
            v-model="preview.navbar.slogan"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <v-btn
          outlined
          color="green"
          @click="storeNavbar"
          class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
        <p class="text-gray-700">Preview</p>
        <div class="example bg-gray-500">
          <dashboard-o-example-navbar
            :preview="preview.navbar"
            :profileInfo="profileInfo"
          />
        </div>
      </div>
    </div>
    <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">Jumbotron</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-100"> Background Image </label>
          <div class="flex gap-4">
            <input
              accept="image/*"
              @change="handleFileUpload($event, 'jumbotron')"
              type="file"
              class="rounded-lg text-black bg-gray-300"
            />
          </div>
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-100"> Jumbotron Title </label>
          <input
            type="text"
            v-model="preview.jumbotron.title"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-100"> Jumbotron SubTitle </label>
          <input
            type="text"
            v-model="preview.jumbotron.subtitle"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <div class="flex flex-col gap 4">
          <div class="flex items-center gap-2">
            <input
              id="default-checkbox"
              type="checkbox"
              v-model="preview.jumbotron.isFormRegister"
              class="w-4 h-4 text-blue-600 bg-gray-600 rounded"
            />
            <label for="" class="text-gray-100">
              Member Registration Form Links
            </label>
          </div>
          <input
            type="text"
            @onChange="handleFormLinkChange"
            v-model="preview.jumbotron.formLink"
            class="rounded-lg max-w-sm text-black bg-gray-300"
          />
        </div>
        <v-btn
          @click="storeJumbotron"
          outlined
          color="green"
          class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-500">
        <dashboard-o-example-jumbotron
          :JumboImageList="dummyJumboImages"
          :JumboTittle="dummyJumboTitle"
          :JumboSubTittle="dummyJumboDescript"
          :preview="preview.jumbotron"
          :profileInfo="profileInfo"
        />
      </div>
    </div>
    <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">About Us</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-100"> Content </label>
          <quill-editor
            class="text-black"
            v-model="preview.aboutUs"
            :options="editorOptions"
          />
        </div>

        <v-btn
          @click="storeAboutUs"
          outlined
          color="green"
          class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-800">
        <dashboard-o-example-about
          :preview="preview.aboutUs"
          class="rounded-lg"
        />
      </div>
    </div>
    <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">Activities</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap 4">
          <label for="" class="text-gray-100"> Activities Description </label>
          <quill-editor
            class="text-black"
            v-model="preview.activities.activities_desc"
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
                  <th scope="col" class="px-6 py-3">Gen</th>
                  <th scope="col" class="px-6 py-3">Location</th>
                  <th scope="col" class="px-6 py-3">Date</th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in preview.activities.web_page_activities"
                  :key="i"
                  class="bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      <v-avatar
                        ><img
                          :src="
                            'http://localhost:8000/storage/' + item?.cover_image
                          "
                          alt="logo"
                      /></v-avatar>
                      {{ item.title }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{ item.gen }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{ item.location }}
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white"
                  >
                    <div class="flex gap-4 items-center">
                      {{ item.date }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <v-btn
                      @click="handleEditActv(item)"
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
          @click="handleModalToggle(true)"
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
                            :src="
                              preview?.activitiesform?.web_page_activities
                                ?.isEdit
                                ? 'http://localhost:8000/storage/' +
                                  preview?.activitiesform?.web_page_activities
                                    ?.cover_image
                                : preview?.activitiesform?.web_page_activities
                                    ?.cover_image_prev
                            "
                            alt=""
                          />
                        </v-avatar>
                        <input
                          type="file"
                          accept="image/*"
                          @change="handleFileUpload($event, 'activitiesCover')"
                          class="rounded-lg max-w-sm w-sm text-black bg-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Activity Date</label
                    >
                    <!-- dheepmark -->
                    <input
                      type="date"
                      v-model="preview.activitiesform.web_page_activities.date"
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Activity Title</label
                    >
                    <input
                      type="text"
                      v-model="preview.activitiesform.web_page_activities.title"
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Description</label
                    >
                    <quill-editor
                      class="text-black"
                      :options="editorOptions"
                      v-model="
                        preview.activitiesform.web_page_activities.description
                      "
                    />
                  </div>

                  <hr class="text-black bg-black my-2" />

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Location</label
                    >
                    <input
                      type="text"
                      v-model="
                        preview.activitiesform.web_page_activities.location
                      "
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>
                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg">Gen</label>
                    <input
                      type="text"
                      v-model="preview.activitiesform.web_page_activities.gen"
                      class="rounded-lg max-w-sm text-white bg-gray-400"
                    />
                  </div>

                  <div class="flex flex-col gap-4 mt-4">
                    <label class="text-gray-700 font-bold text-lg"
                      >Gallery</label
                    >
                    <div class="flex flex-wrap items-center gap-3">
                      <div
                        v-for="(item, i) in preview?.activitiesform
                          ?.web_page_activities?.web_page_activities_galery"
                        :key="i"
                        class="card p1 rounded"
                      >
                        <template v-if="item.image">
                          <img
                            :src="'http://localhost:8000/storage/' + item.image"
                            class="w-32 shadow-md"
                            alt=""
                          />
                          <v-btn
                            icon
                            @click="handleDeleteImageActv(item, i)"
                            flat
                            class="relative bottom-10 right-0"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                      </div>
                      <div
                        v-for="(item, i) in preview?.activitiesform
                          ?.web_page_activities?.gallery"
                        :key="i"
                        class="card p1 rounded"
                      >
                        <img
                          :src="item.imageView"
                          class="w-32 shadow-md"
                          alt=""
                        />
                        <v-btn
                          icon
                          @click="handleDeleteImageActv(item, i)"
                          flat
                          class="relative bottom-10 right-0"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                      <div class="my-auto">
                        <!-- Trigger Button -->
                        <v-btn icon @click="dialogUploadImage = true">
                          <v-icon
                            class="w-32 bg-gray-600 p-4 mb-8 rounded-full text-gray-700"
                            width="32"
                          >
                            mdi-plus
                          </v-icon>
                        </v-btn>

                        <!-- Modal -->
                        <v-dialog v-model="dialogUploadImage" max-width="500px">
                          <v-card>
                            <v-card-title class="headline"
                              >Upload Image</v-card-title
                            >

                            <v-card-text>
                              <!-- File Input -->
                              <input
                                label="Choose an image"
                                accept="image/*"
                                @change="
                                  handleFileUpload($event, 'activitiesGallery')
                                "
                                type="file"
                                outlined
                                dense
                                multiple
                              />
                            </v-card-text>

                            <v-card-actions>
                              <!-- Cancel Button -->
                              <v-btn text @click="dialogUploadImage = false"
                                >Cancel</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>

            <!-- Modal Actions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="handleModalToggle(false)">Cancel</v-btn>
              <v-btn color="primary" @click="storeActivitiesEskulItem">{{
                preview?.activitiesform?.web_page_activities?.isEdit
                  ? 'Update'
                  : 'Save'
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          outlined
          @click="storeActivitiesDescEskul"
          color="green"
          class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-800">
        <organization-activity
          class="rounded-lg"
          :data="preview.activities"
          :carouselBgColor="'#222'"
          :fontColor="'#ffffff'"
        />
      </div>
    </div>
    <!-- <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">Member Lists</p>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <label for="" class="text-gray-100"> Member List </label>
          <div class="flex justify-start gap-4">
            <form class="max-w-sm">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                >Select User Data</label
              >
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </div> -->
    <div class="p-4 bg-gray-700 rounded-lg shadow-lg">
      <div class="section">
        <p class="text-xl font-bold text-gray-100">Gallery</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 mt-4">
          <div class="flex flex-wrap items-center gap-3">
            <div
              v-for="(item, i) in webPage?.web_page_galery"
              :key="i"
              class="card p1 rounded"
            >
              <template v-if="item.image">
                <img
                  :src="'http://localhost:8000/storage/' + item.image"
                  class="w-32 shadow-md"
                  alt=""
                />
                <v-btn
                  icon
                  @click="handleDeleteImageGallery(item, i)"
                  flat
                  class="relative bottom-10 right-0"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </div>
            <div
              v-for="(item, i) in preview?.gallery"
              :key="i"
              class="card p1 rounded"
            >
              <img :src="item.imageView" class="w-32 shadow-md" alt="" />
              <v-btn
                icon
                @click="handleDeleteImageGallery(item, i)"
                flat
                class="relative bottom-10 right-0"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <div class="my-auto">
              <!-- Trigger Button -->
              <v-btn icon @click="dialogUploadImage = true">
                <v-icon
                  class="w-32 bg-gray-600 p-4 mb-8 rounded-full text-gray-700"
                  width="32"
                >
                  mdi-plus
                </v-icon>
              </v-btn>

              <!-- Modal -->
              <v-dialog v-model="dialogUploadImage" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Upload Image</v-card-title>

                  <v-card-text>
                    <!-- File Input -->
                    <input
                      label="Choose an image"
                      accept="image/*"
                      @change="handleFileUpload($event, 'gallery')"
                      type="file"
                      outlined
                      multiple
                      dense
                    />
                  </v-card-text>

                  <v-card-actions>
                    <!-- Cancel Button -->
                    <v-btn text @click="dialogUploadImage = false"
                      >Cancel</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>

        <v-btn
          @click="storeGallery"
          outlined
          color="green"
          class="btn px-4 py-2 rounded-lg"
          >Save</v-btn
        >
      </div>
      <p class="text-gray-700">Preview</p>
      <div class="example bg-gray-500">
        <organization-gallery
          :gallery="preview.gallery"
          :wpgallery="webPage.web_page_galery"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  async mounted() {
    await this.getProfileInfo()
    await this.getEskulWebPage()
  },

  data() {
    return {
      dialogUploadImage: false,
      preview: {
        navbar: {
          logo: '',
          logoForUpload: '',
          slogan: '',
        },
        jumbotron: {
          jumboBg: '',
          jumboBgUpload: '',
          title: '',
          subtitle: '',
          isFormRegister: '',
          formLink: '',
        },
        aboutUs: '',
        activities: {
          activities_desc: '',
          web_page_activities: [],
        },
        // activitiesform: {
        //   activities_desc: '',
        //   web_page_activities: [
        //     {
        //       cover_image: '',
        //       gen: '',
        //       date: '',
        //       location: '',
        //       title: '',
        //       gallery: [{ imageUpload: '', imageView: '' }],
        //       description: '',
        //     },
        //   ],
        // },
        activitiesform: {
          web_page_activities: {
            cover_image: '',
            gen: '',
            date: '',
            location: '',
            title: '',
            gallery: [],
            description: '',
          },
        },
        gallery: [],
      },
      profileInfo: [],
      webPage: [],
      dialog: false,
      dummyJumboImages: ['bgJumbo2.jpg'],
      dummyJumboTitle: 'Welcome to Our Organization',
      dummyJumboDescription: 'We are committed to making a difference.',
      content: '', // Holds the editor content
      editorOptions: {
        theme: 'snow', // Available themes: 'snow', 'bubble'
        placeholder: 'Write something...',
        modules: {
          toolbar: [
            // Font settings
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }], // Font size

            // Text formatting
            ['bold', 'italic', 'underline', 'strike'], // Bold, italic, underline, strikethrough

            // Script
            [{ script: 'sub' }, { script: 'super' }], // Subscript, superscript

            // Header formatting
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading levels
            [{ color: [] }, { background: [] }], // Text color and background color

            // Alignment
            [{ align: [] }],

            // List formatting
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }], // Ordered, unordered, checklist
            [{ indent: '-1' }, { indent: '+1' }], // Indent, outdent

            // Direction
            [{ direction: 'rtl' }], // Right-to-left text direction

            // Links, Images, Video
            ['link', 'image', 'video'],

            // Code blocks and blockquote
            ['code-block', 'blockquote'],

            // Clean formatting
            ['clean'], // Remove formatting
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
    handleDeleteImageGallery(item, i) {
      const gallery = this.preview.gallery

      // Ensure web_page_activities is defined
      if (!gallery) {
        console.error('web_page_activities is undefined')
        return
      }

      // Determine the target array based on edit mode
      const targetArray = this.webPage.web_page_galery

      // Ensure target array exists and index is valid
      if (!Array.isArray(targetArray) || i < 0 || i >= targetArray.length) {
        console.error('Invalid array or index:', targetArray, i)
        return
      }

      gallery.deletedImages = [] // Ensure deletedImages is initialized
      gallery.deletedImages.push(targetArray[i])

      // Remove the image from the target array
      targetArray.splice(i, 1)

      console.log('Deleted images:', gallery.deletedImages)
    },
    handleDeleteImageActv(item, i) {
      const activities = this.preview.activitiesform.web_page_activities

      // Ensure web_page_activities is defined
      if (!activities) {
        console.error('web_page_activities is undefined')
        return
      }

      // Determine the target array based on edit mode
      const targetArray = activities.isEdit
        ? activities.web_page_activities_galery
        : activities.gallery

      // Ensure target array exists and index is valid
      if (!Array.isArray(targetArray) || i < 0 || i >= targetArray.length) {
        console.error('Invalid array or index:', targetArray, i)
        return
      }

      // Push to deletedImages if in edit mode
      if (activities.isEdit) {
        activities.deletedImages = activities.deletedImages || [] // Ensure deletedImages is initialized
        activities.deletedImages.push(targetArray[i])
      }

      // Remove the image from the target array
      targetArray.splice(i, 1)

      // Log updated arrays for debugging
      console.log('Updated gallery:', activities.gallery)
      console.log(
        'Updated web_page_activities_galery:',
        activities.web_page_activities_galery
      )
      console.log('Deleted images:', activities.deletedImages)
    },
    handleModalToggle(val) {
      this.dialog = val
      const emptyForm = {
        web_page_activities: {
          cover_image: '',
          gen: '',
          date: '',
          location: '',
          title: '',
          gallery: [],
          isEdit: false,
          description: '',
        },
      }

      this.preview.activitiesform = emptyForm
    },
    handleEditActv(item) {
      console.log('prev : ', item)
      this.dialog = true
      this.preview.activitiesform.web_page_activities = item
      this.preview.activitiesform.web_page_activities.isEdit = true
      console.log('prev : ', this.preview.activitiesform.web_page_activities)
    },
    handleFormLinkChange() {
      // Check if the formLink has content, if so, set isFormRegister to true
      this.preview.jumbotron.isFormRegister =
        this.preview.jumbotron.formLink.length > 0
      console.log('WOIIIII')
      console.log('WOIIIII', this.preview.jumbotron)
    },
    saveActivity() {
      // Add save logic here
      this.dialog = false // Close the modal after saving
    },
    handleFileUpload(event, isFor) {
      const file = event?.target.files[0]
      const files = event?.target.files
      if (file) {
        switch (isFor) {
          case 'navbar': {
            this.preview.navbar.logoForUpload = file
            this.preview.navbar.logo = file
            const reader = new FileReader()
            reader.onload = (e) => {
              this.preview.navbar.logo = e.target.result
            }
            reader.readAsDataURL(file)
            break // Break added to prevent fall-through to 'jumbotron' case
          }
          case 'jumbotron': {
            console.log('is for JUMBOTRONNN')
            this.preview.jumbotron.jumboBgUpload = file
            this.preview.jumbotron.jumboBg = file

            console.log(this.preview.jumbotron)
            const reader = new FileReader()
            reader.onload = (e) => {
              this.preview.jumbotron.jumboBg = e.target.result
            }
            reader.readAsDataURL(file)
            break // Break added to prevent fall-through
          }
          case 'activitiesCover': {
            this.preview.activitiesform.web_page_activities.cover_image = file
            this.preview.activitiesform.web_page_activities.cover_image_prev =
              file

            const reader = new FileReader()
            reader.onload = (e) => {
              this.preview.activitiesform.web_page_activities.cover_image_prev =
                e.target.result
            }
            console.log(
              'cover imgae : ',
              this.preview.activitiesform.web_page_activities
            )
            reader.readAsDataURL(file)
            break
          }
          case 'activitiesGallery': {
            console.log('is for activitiesGallery')

            const isEdit =
              this.preview?.activitiesform?.web_page_activities?.isEdit
            const currentActivity =
              this.preview.activitiesform.web_page_activities

            // Ensure both galleries exist
            if (!currentActivity.gallery) {
              currentActivity.gallery = []
            }
            if (!currentActivity.web_page_activities_galery) {
              currentActivity.web_page_activities_galery = []
            }

            // Process multiple files
            Array.from(event.target.files).forEach((file) => {
              const newGalleryItem = { imageView: file, imageUpload: file }

              // Add to web_page_activities_galery if editing
              if (isEdit) {
                currentActivity.web_page_activities_galery.push({
                  ...newGalleryItem,
                })
              }

              // Add to the main gallery
              currentActivity.gallery.push({ ...newGalleryItem })

              // Read the file as Data URL and update imageView
              const reader = new FileReader()
              reader.onload = (e) => {
                const galleryIndex = currentActivity.gallery.length - 1 // Last item in gallery

                // Update imageView in web_page_activities_galery if editing
                if (isEdit) {
                  const gallerywpIndex =
                    currentActivity.web_page_activities_galery.length - 1 // Last item in web_page_activities_galery
                  currentActivity.web_page_activities_galery[
                    gallerywpIndex
                  ].imageView = e.target.result
                }

                // Update imageView in the main gallery
                currentActivity.gallery[galleryIndex].imageView =
                  e.target.result
              }

              reader.readAsDataURL(file)
            })

            // Close dialog after processing all files
            this.dialogUploadImage = false
            // Prevent fall-through
            break
          }
          case 'gallery': {
            console.log('Uploading files for gallery...')
            if (!this.preview.gallery) {
              this.preview.gallery = []
            }

            Array.from(files).forEach((file) => {
              const newGalleryItem = { imageView: file, imageUpload: file }
              const reader = new FileReader()

              reader.onload = (e) => {
                newGalleryItem.imageView = e.target.result
                this.preview.gallery.push(newGalleryItem)
              }

              reader.readAsDataURL(file)
            })

            this.dialogUploadImage = false // Close dialog
            break
          }
        }
      }
    },
    async getProfileInfo() {
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getProfileInfo'
      )
      this.profileInfo = data.data
      this.webPage = data.data.web_pages
      if (this.webPage != null) {
        this.preview.gallery = []
        this.preview.navbar.slogan = this.webPage.navbar_title
        this.preview.jumbotron.title = this.webPage.jumbotron_title
        this.preview.jumbotron.subtitle = this.webPage.jumbotron_subtitle
        this.preview.jumbotron.formLink = this.webPage.form_register_link
        this.preview.jumbotron.isFormRegister =
          this.webPage.form_register_link != null ? true : false
        this.preview.aboutUs = this.webPage.about_desc

        this.preview.activities.web_page_activities =
          this.webPage.web_page_activities
        this.preview.activities.activities_desc = this.webPage.activities_desc
      }
    },
    async getEskulWebPage() {
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getEskulWebPage',
        { eskul_id: this.profileInfo.id }
      )
      console.log('eskulWebPage : ', data)
    },
    async storeNavbar() {
      const formData = new FormData()
      if (this.preview.navbar.logoForUpload != '') {
        formData.append('logo', this.preview.navbar.logoForUpload)
      }
      if (this.preview.navbar.slogan != '') {
        formData.append('navbar_title', this.preview.navbar.slogan)
      }

      const { data, message } = await this.$store.dispatch(
        'Dashboard/organization/storeNavbar',
        formData
      )

      console.log('store nav : ', message)

      this.getProfileInfo()
    },
    async storeGallery() {
      const formData = new FormData()
      this.preview.gallery.forEach((item, index) => {
        if (item.imageUpload) {
          formData.append(`gallery[${index}][imageUpload]`, item.imageUpload)
        }
      })
      formData.append('eskul_id', this.profileInfo.id)

      this.preview?.gallery?.deletedImages?.forEach((deletedItem) => {
        formData.append('deletedImages[]', deletedItem.id || deletedItem.image)
      })

      const data = await this.$store.dispatch(
        'Dashboard/organization/storeGallery',
        formData
      )

      // console.log('store:', message)

      this.getProfileInfo()
    },
    async storeActivitiesEskulItem() {
      const formData = new FormData()
      const isEdit = this.preview.activitiesform.web_page_activities.isEdit

      // Append general fields
      formData.append('eskul_id', this.profileInfo.id)
      formData.append(
        'activity_id',
        this.preview.activitiesform.web_page_activities.id
      )
      formData.append('is_edit', isEdit)
      formData.append(
        'cover_image',
        this.preview.activitiesform.web_page_activities.cover_image
      )
      formData.append(
        'gen',
        this.preview.activitiesform.web_page_activities.gen
      )
      formData.append(
        'title',
        this.preview.activitiesform.web_page_activities.title
      )
      formData.append(
        'date',
        this.preview.activitiesform.web_page_activities.date
      )
      formData.append(
        'location',
        this.preview.activitiesform.web_page_activities.location
      )
      formData.append(
        'description',
        this.preview.activitiesform.web_page_activities.description
      )

      if (isEdit) {
        // Handle gallery for edit
        this.preview.activitiesform.web_page_activities.web_page_activities_galery.forEach(
          (item, index) => {
            if (item.imageUpload) {
              // Append newly added images
              formData.append(
                `gallery[${index}][imageUpload]`,
                item.imageUpload
              )
            } else {
              // Append existing image references (to retain them)
              formData.append(`gallery[${index}][image]`, item.image)
            }
          }
        )

        // Optionally handle deleted images (send their IDs or paths for removal)
        this.preview?.activitiesform?.web_page_activities?.deletedImages?.forEach(
          (deletedItem) => {
            formData.append(
              'deletedImages[]',
              deletedItem.id || deletedItem.image
            )
          }
        )
      } else {
        // Handle gallery for creation
        this.preview.activitiesform.web_page_activities.gallery.forEach(
          (item, index) => {
            if (item.imageUpload) {
              formData.append(
                `gallery[${index}][imageUpload]`,
                item.imageUpload
              )
            }
          }
        )
      }

      // Make API request
      const { data, message } = await this.$store.dispatch(
        'Dashboard/organization/storeActivitiesEskulItem',
        formData
      )

      console.log('store nav:', message)

      this.getProfileInfo()
    },

    async storeActivitiesDescEskul() {
      const formData = new FormData()

      formData.append('eskul_id', this.profileInfo.id)
      this.preview.activitiesform.web_page_activities.gallery.forEach(
        (item, index) => {
          // Append the binary file (imageUpload) directly to FormData
          if (item.imageUpload) {
            formData.append(`gallery[${index}][imageUpload]`, item.imageUpload)
          }
        }
      )

      formData.append('description', this.preview.activities.activities_desc)

      const { data, message } = await this.$store.dispatch(
        'Dashboard/organization/storeActivitiesDesc',
        formData
      )

      console.log('store nav : ', message)

      this.getProfileInfo()
    },
    async storeAboutUs() {
      const formData = new FormData()
      if (this.preview.aboutUs != '') {
        formData.append('about_desc', this.preview.aboutUs)
      }

      const { data, message } = await this.$store.dispatch(
        'Dashboard/organization/storeAboutUs',
        formData
      )

      console.log('store nav : ', message)

      this.getProfileInfo()
    },
    async storeJumbotron() {
      const formData = new FormData()
      if (this.preview.jumbotron.jumboBgUpload != '') {
        formData.append('jumbotron_image', this.preview.jumbotron.jumboBgUpload)
      }
      if (this.preview.navbar.title != '') {
        formData.append('jumbotron_title', this.preview.jumbotron.title)
      }
      if (this.preview.navbar.subtitle != '') {
        formData.append('jumbotron_subtitle', this.preview.jumbotron.subtitle)
      }
      if (this.preview.navbar.formLink != '') {
        formData.append('form_register_link', this.preview.jumbotron.formLink)
      }
      formData.append(
        'is_form_register_link',
        this.preview.jumbotron.isFormRegister
      )

      const { data, message } = await this.$store.dispatch(
        'Dashboard/organization/storeJumbotron',
        formData
      )

      console.log('store nav : ', message)

      this.getProfileInfo()
    },
  },
}
</script>
