<template>
  <section class="my-24 py-16" id="faq">
    <div class="flex flex-col md:flex-row p-7 container">
      <div class="md:mr-28">
        <h2
          class="text-3xl xs:text-center sm:text-center md:text-left font-bold"
        >
          Things You Need to Know
        </h2>
        <p class="xs:text-center sm:text-center md:text-left">
          Still unsure about FORESK? These points might answer your questions.
        </p>
      </div>
      <div class="container mx-auto">
        <div class="accordion flex flex-col gap-2">
          <div
            class="border bg-gray-900 border-gray-900 rounded"
            v-for="(item, index) in faqs"
            :key="index"
          >
            <button
              @click="toggle(index)"
              class="w-full flex justify-between items-center px-4 h-full py-2 text-left text-gray-100 bg-gray-800 border-b border-gray-900 focus:outline-none"
            >
              <span class="text-lg font-medium">{{ item?.question }}</span>
              <svg
                :class="{
                  'rotate-180': activeIndex === index,
                  'rotate-0': activeIndex !== index,
                }"
                class="w-6 h-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="faq-content"
              :class="{ open: activeIndex === index }"
              ref="content"
            >
              <div
                v-html="item?.answer"
                class="px-4 py-2 bg-gray-900 text-gray-100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
      faqs: [
        {
          question: 'What is FORESK?',
          answer:
            ' FORESK stands for <strong>Forum Extracurricular</strong>. It is an application designed to help schools manage extracurricular organizations efficiently. FORESK empowers organization leaders with tools to streamline operations and provides a platform to showcase their activities online.',
        },
        {
          question: 'Who can use FORESK?',
          answer:
            "FORESK is designed for:<ul class='list-disc pl-5'><li><strong>Extracurricular Leaders</strong>: To manage their clubs and promote them online.</li><li><strong>Students</strong>: To explore and join various extracurricular activities.</li><li><strong>School Administrators</strong>: To oversee and support all school organizations.</li></ul>",
        },
        {
          question: 'What are the main features of FORESK?',
          answer:
            "FORESK offers a range of features, including:<ul class='list-disc pl-5'><li><strong>Organization Management</strong>: Manage schedules, activities, and members.</li><li><strong>Online Showcase</strong>: Promote extracurricular activities and attract new members.</li><li><strong>Reporting Tools</strong>: Generate reports for progress and achievements.</li></ul>",
        },
        {
          question: 'How does FORESK benefit extracurricular leaders?',
          answer:
            "FORESK simplifies the responsibilities of extracurricular leaders by providing:<ul class='list-disc pl-5'><li>A centralized platform to manage activities.</li><li>Increased visibility for their clubs through online promotion.</li></ul>",
        },
        {
          question:
            'Can FORESK help recruit new members for my extracurricular club?',
          answer:
            'Yes! FORESK allows leaders to create a compelling online presence for their clubs, making it easier for students to discover and join organizations that match their interests.',
        },
        {
          question: 'Is FORESK free to use?',
          answer: 'for now FORESK still free',
        },
      ],
    }
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    },
  },
}
</script>

<style scoped>
.accordion button {
  transition: background-color 0.3s ease;
}
.accordion button:hover {
  background-color: #151515;
}

.faq-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

.faq-content.open {
  max-height: fit-content; /* You can adjust this value based on the content */
  opacity: 1;
}
</style>
