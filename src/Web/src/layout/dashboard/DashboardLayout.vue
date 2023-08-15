<template>
  <div class="wrapper">
    <side-bar>

      <template slot="links">
        <template>

            <sidebar-link v-for="book in Books" :key="book.id" :to="'/InBook/' + book.id" :name="book.name" icon="ti-book" />

        </template>

        <sidebar-link to="/InBook" name="Bookw" icon="ti-book" />
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
        <sidebar-link to="/stats" name="User Profile" icon="ti-user" />
        <sidebar-link
          to="/table-list"
          name="Table List"
          icon="ti-view-list-alt"
        />
        <sidebar-link to="/typography" name="Typography" icon="ti-text" />
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" />
        <sidebar-link to="/maps" name="Map" icon="ti-map" />

        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" />

      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 Notifications"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import BookService  from "@/Service/BookService";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  data() {
    return {
      Books: [],

    };
  },
  created() {
    this.fetchBooks(); // Call the fetchBooks method when the component is created
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await BookService.getAllBooks();
        this.Books = response.data; // Update the 'books' data property
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
