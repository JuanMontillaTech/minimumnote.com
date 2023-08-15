<template>
  <div>

    <card  title="Book"  v-if="suballow" sub-title="editing head book">
      <a class="nav-link">

        <i   class="ti-close" @click="updateSub()" ></i></a>
      <fg-input
        type="text"
        label="Title"
        placeholder="Edit  title"
        v-model="book.name"
      >
      </fg-input>
      <fg-input
        type="text"
        label="Sub Title"
        placeholder="Edit Sub title"
        v-model="book.subtitle"
      >
      </fg-input>
    </Card>


    <div v-if="loading">Loading...</div>

    <card v-else :title="book.name" :sub-title="book.subtitle">
      <a class="nav-link">

      <i   class="ti-pencil" @click="updateSub()" ></i></a>
      <div>
        <div class="row">
          <div class="col-md-12">

            <div class="form-group">
              <label>Page</label>
              <vue-editor    v-model="book.comment"></vue-editor>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
                v-model="book.comment"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd" @click="updateBook">
            Update Book
          </button>
        </div>
      </div>
    </card>



  </div>
</template>

<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import BookService from "@/Service/BookService";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      book: null,
      suballow: false,
      loading: true,
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false,
      },
    };
  },
  watch: {
    "$route.params.id"() {
      this.getBookId();
    },
  },
  created() {
    this.getBookId();
  },
  methods: {
      updateSub() {
        this.suballow =!this.suballow;

    },

    async getBookId() {
      try {
        const bookId = this.$route.params.id;
        var response = await BookService.getBookById(bookId);
        this.book = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    },
    async updateBook() {
      try {
        const bookId = this.$route.params.id;
this.suballow= false;
        await BookService.updateBook(bookId, this.book); // Update with your API method
        this.notifyVue("top", "center"); // Show notification on successful update
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "ti-check",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[2], // Success type
        message: "Book updated successfully!",
      });
    },
  },
};
</script>

<style>
@import '~simplemde/dist/simplemde.min.css';
</style>
