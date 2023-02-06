<script>
import simplebar from "simplebar-vue";

export default {
  components: {
    simplebar
  },
  data() {
    return {
      user: null,
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("@/assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
      notData: [],
      lightMode: false,
      darkMode: false,
    };
  },
  mounted() {
    let val = localStorage.getItem('theme');
    
    if(val == 'dark'){
      this.darkMode = true
    } else {
      this.lightMode = true
    }

    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    const {user} = JSON.parse(localStorage.getItem('user'));
    this.user = user
    // console.log(user)
    // if (this.$cookies.get("token")) {
    //   this.axios.get('https://api.codedevents.com/admin/auth/user')
    //   .then((res) => {
    //     this.user = res.data.data
    //       // console.log(res);
    //       // console.log($cookies.get("token"));
    //   })
    //   .catch((err) => {
    //       // this.error = true
    //       console.log(err);
    //   })
    //   .finally(() => {
    //         // this.loading =  false
    //   });
    // } else {
    //     localStorage.removeItem('user');
    // }

    // this.fetchNotifications();
  },
  methods: {
    /**
     * Toggle menu
     */
    // fetchNotifications(){
    //   this.axios.get('https://api.codedevents.com/admin/notifications')
    //   .then((res) => {
    //       console.log(res.data.data);
    //       this.notData = res.data.data;
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   });

    // },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    // initFullScreen() {
    //   document.body.classList.toggle("fullscreen-enable");
    //   if (
    //     !document.fullscreenElement &&
    //     /* alternative standard method */
    //     !document.mozFullScreenElement &&
    //     !document.webkitFullscreenElement
    //   ) {
    //     // current working methods
    //     if (document.documentElement.requestFullscreen) {
    //       document.documentElement.requestFullscreen();
    //     } else if (document.documentElement.mozRequestFullScreen) {
    //       document.documentElement.mozRequestFullScreen();
    //     } else if (document.documentElement.webkitRequestFullscreen) {
    //       document.documentElement.webkitRequestFullscreen(
    //         Element.ALLOW_KEYBOARD_INPUT
    //       );
    //     }
    //   } else {
    //     if (document.cancelFullScreen) {
    //       document.cancelFullScreen();
    //     } else if (document.mozCancelFullScreen) {
    //       document.mozCancelFullScreen();
    //     } else if (document.webkitCancelFullScreen) {
    //       document.webkitCancelFullScreen();
    //     }
    //   }
    // },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    logoutUser() {
      localStorage.removeItem('user');
      this.$cookies.remove('token');
      this.$router.push('/login');
    },
    launchLightMode() {
      localStorage.setItem('theme', 'light');
    },
    launchDarkMode() {
      localStorage.setItem('theme', 'dark');
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="20" />
            </span>
          </router-link>
        </div>
        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('navbar.search.text')"
            />
            <span class="uil-search"></span>
          </div>
        </form>
      </div>

      <div class="d-flex">
        <!-- <b-dropdown
          variant="white"
          class="d-inline-block d-lg-none ms-2"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-search"></i>
          </template>
          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('navbar.search.text')"
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>

        <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }"
          >
            <img
              :src="`${entry.flag}`"
              alt="user-image"
              class="me-1"
              height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
          variant="white"
          class="d-none d-lg-inline-block ms-1"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-apps"></i>
          </template>
          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/github.png" alt="Github" />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/bitbucket.png"
                    alt="bitbucket"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.bitbucket") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/dribbble.png"
                    alt="dribbble"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.dribbble") }}</span>
                </a>
              </div>
            </div>

            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                  <span>{{ $t("navbar.dropdown.site.list.dropbox") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/mail_chimp.png"
                    alt="mail_chimp"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.mailchimp") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/slack.png" alt="slack" />
                  <span>{{ $t("navbar.dropdown.site.list.slack") }}</span>
                </a>
              </div>
            </div>
          </div>
        </b-dropdown> -->

        <!-- <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            data-toggle="fullscreen"
            @click="initFullScreen"
          >
            <i class="uil-minus-path"></i>
          </button>
        </div> -->

        <b-dropdown
          variant="white"
          class="dropdown d-inline-block"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-bell"></i>
            <!-- <span class="badge bg-danger rounded-pill">3</span> -->
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h5 class="m-0 font-size-16">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h5>
              </div>
              <div class="col-auto" v-if="notData.length >= 1">
                <a href="#!" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px" data-simplebar v-if="notData">
            <a v-for="notify in notData" :key="notify.id" href class="text-reset notification-item">
                <div class="media">
                  <div class="avatar-xs me-3">
                    <span
                      class="avatar-title bg-primary rounded-circle font-size-16"
                    >
                      <i class="uil uil-user-circle"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h6 class="mt-0 mb-1">
                      {{notify.title}}
                    </h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        {{notify.message}}
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i>
                        {{notify.date | notify.time}}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
         
            <p class="text-center p-5" v-if="notData.length == 0">No Notifications</p>
         
          </simplebar>
          <div class="p-2 border-top" v-if="notData">
            <div class="d-grid" v-if="notData.length >= 5">
              <a
                class="btn btn-sm btn-link font-size-14 text-center"
                href="javascript:void(0)"
              >
                <i class="uil-arrow-circle-right me-1"></i>
                {{ $t("navbar.dropdown.notification.button") }}
              </a>
            </div>
          </div>
        </b-dropdown>

        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content v-if="user">
            <img v-if="user.profile_photo" :src="user.profile_photo" class="rounded-circle header-profile-user" />
            <img v-else :src="user.thumbnail" alt class="rounded-circle header-profile-user" />
            <span
              class="d-none d-xl-inline-block ms-1 fw-medium font-size-15"
              >{{user.name}}</span
            >
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <!-- item-->
          <router-link to="/profile/admin" class="dropdown-item">
            <i
              class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.profile")
            }}</span>
          </router-link>
          <!-- <a class="dropdown-item" href="#">
            <i
              class="uil uil-wallet font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.mywallet")
            }}</span>
          </a> -->
          <!-- <a class="dropdown-item d-block" href="#">
            <i
              class="uil uil-cog font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.settings")
            }}</span>
            <span class="badge bg-soft-success rounded-pill mt-1 ms-2">03</span>
          </a> -->
          <!-- <a class="dropdown-item" href="#">
            <i
              class="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.lockscreen")
            }}</span>
          </a> -->
          <a href @click="logoutUser" class="dropdown-item">
            <i
              class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t("navbar.dropdown.marcus.list.logout")
            }}</span>
          </a>
        </b-dropdown>

          <a href>
            <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="launchDarkMode"
          >
            <i class="uil-moon toggle-right"></i>
          </button>
          </a>
        </div>

        <div class="dropdown d-inline-block" v-if="darkMode">
          <a href>
            <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="launchLightMode"
          >
            <i class="uil-sun toggle-right"></i>
          </button>
          </a>
        </div>
    </div>
  </header>
