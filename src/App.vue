<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/scss/app.scss'

import appConfig from '@/app.config'
import { notificationMethods } from '@/state/helpers'
import { BASE_URL } from './baseconstant'

export default {
  name: 'app',
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
    checkUser: function() {
      this.axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${this.$cookies.get('token')}`
      if (this.$cookies.get('token')) {
        this.axios
          .get(BASE_URL + '/api/v1/admin/profile')
          .then((res) => {
            console.log(res)
            // console.log($cookies.get("token"));
          })
          .catch((err) => {
            // this.error = true
            console.log(err)
          })
          .finally(() => {
            // this.loading =  false
          })
      } else {
        localStorage.removeItem('user')
      }
    },
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      // console.log('reach here')
      this.checkUser()
      this.clearNotification()
    },
  },
  mounted() {
    // console.log('dd')
    let val = localStorage.getItem('theme')

    if (val == 'dark') {
      import('./assets/scss/dark.scss')
    } else {
      import('./assets/scss/app.scss')
    }

    this.axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.$cookies.get('token')}`
    if (this.$cookies.get('token')) {
      this.axios
        .get(BASE_URL + '/api/v1/admin/profile')
        .then((res) => {
          console.log(res)
          // console.log($cookies.get("token"));
        })
        .catch((err) => {
          // this.error = true
          console.log(err.response.data)
        })
        .finally(() => {
          // this.loading =  false
        })
    } else {
      localStorage.removeItem('user')
    }

    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  },
}
</script>
