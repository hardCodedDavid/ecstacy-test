<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";
import { notificationMethods } from "@/state/helpers";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  mounted() {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get("token")}`;
    if (this.$cookies.get("token")) {
      this.axios.get('https://api.codedevents.com/admin/auth/user')
      .then((res) => {
          console.log(res);
          // console.log($cookies.get("token"));
      })
      .catch((err) => {
          // this.error = true
          console.log(err);
      })
      .finally(() => {
            // this.loading =  false
      });
    } else {
        localStorage.removeItem('user');
    }

    
    
    
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
};
</script>
