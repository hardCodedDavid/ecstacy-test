<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Shops component
 */
export default {
  components: {
    Layout,
    PageHeader,
  },
  page: {
    title: "Events",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Events",
      items: [
        {
          text: "App",
        },
        {
          text: "Events",
          active: true,
        },
      ],
      shops: [],
      isLoading: false,
    };
  },
  middleware: "authentication",
  methods: {
    fetchData() {
      this.isLoading = true;
        this.axios.get('https://api.codedevents.com/admin/events?page=1&per_page=50')
        .then((res) => {
            console.log(res.data.data);
            this.shops = res.data.data
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row mb-2">
      <div class="col-md-6">
        <!-- <div class="mb-3">
          <a
            href="javascript:void(0);"
            class="btn btn-success waves-effect waves-light"
            ><i class="mdi mdi-plus me-2"></i> Add New</a
          >
        </div> -->
      </div>

      <div class="col-md-6">
        <div class="form-inline float-md-end mb-3">
          <div class="search-box ms-2">
            <div class="position-relative">
              <input
                type="text"
                class="form-control rounded border-0"
                placeholder="Search..."
              />
              <i class="mdi mdi-magnify search-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row">
      <div
        class="col-xl-4 col-sm-6"
        v-for="(item, index) in shops"
        :key="index"
      >
        <div class="card">
          <div class="card-body">
            <div class="media">
              <div class="avatar-sm me-4">
                <!-- <span
                  :class="`avatar-title bg-soft-${item.color} text-${item.color} font-size-16 rounded-circle`"
                >
                </span> -->
                <img :src="item.banner" alt="..." class="rounded-circle" width="50" height="50">
              </div>
              <div class="media-body align-self-center">
                <div class="pb-1">
                  <h5 class="text-truncate font-size-16 mb-1">
                    <router-link :to="{ name: 'event-details', params: { id: item.id }}" class="text-muted">{{ item.title }}</router-link>
                  </h5>
                  <p class="text-muted">
                    <i class="mdi mdi-account me-1"></i> {{ item.host }}
                  </p>
                </div>
                <!-- <div class="row">
                  <div class="col-6">
                    <div class="mt-3">
                      <p class="text-muted mb-2">Products</p>
                      <h5 class="font-size-16 mb-0">{{ item.products }}</h5>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mt-3">
                      <p class="text-muted mb-2">Wallet Balance</p>
                      <h5 class="font-size-16 mb-0">${{ item.balance }}</h5>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row" v-if="isLoading">
      <div class="col-xl-12">
        <div class="text-center my-3">
          <a href="javascript:void(0);" class="text-primary"
            ><i
              class="mdi mdi-loading mdi-spin font-size-20 align-middle me-2"
            ></i>
            Loading
          </a>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
