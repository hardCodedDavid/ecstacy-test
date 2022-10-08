<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import Stat from "@/components/widgets/stat";
<<<<<<< HEAD
// import SalesAnalytics from "./sales-analytics";
// import SellingProduct from './selling-product';
=======
import SalesAnalytics from "./sales-analytics";
import SellingProduct from './selling-product';
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
import TopUsers from './top-users';
import Activity from './activity';
import SocialSource from './social-source';

export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    Stat,
<<<<<<< HEAD
    // SalesAnalytics,
    // SellingProduct,
=======
    SalesAnalytics,
    SellingProduct,
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
    TopUsers,
    Activity,
    SocialSource
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
<<<<<<< HEAD
          text: "Overview",
=======
          text: "Minible",
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
<<<<<<< HEAD
      eventData: null,
      dashboard: null,
    };
  },
    mounted() {
      this.axios.get('https://api.codedevents.com/admin/dashboard')
      .then((res) => {
          this.dashboard = res.data.data
      })
      .catch((err) => {
          console.log(err);
          localStorage.removeItem('user');
          this.$cookies.remove('token');
          this.$router.push('/login');
      })
      .finally({

      })

      this.axios.get('https://api.codedevents.com/admin/events?page=1&per_page=50')
      .then((res) => {
          console.log(res.data.data);
          this.eventData = res.data.data
      })
      .catch((err) => {
          console.log(err);
      });
      
=======
    };
  },
    mounted() {
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
      this.axios.get('https://api.codedevents.com/admin/auth/user')
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          // this.error = true
          console.log(err);
      })
      .finally(() => {
            // this.loading =  false
      });
    }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
<<<<<<< HEAD
   
    <Stat />
    <!-- <div class="row">
=======
    <Stat />
    <div class="row">
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
      <SalesAnalytics />
       <div class="col-xl-4">
            <div class="card bg-primary">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-sm-8">
                            <p class="text-white font-size-18">
                                Enhance your
                                <b>Campaign</b> for better outreach
                                <i class="mdi mdi-arrow-right"></i>
                            </p>
                            <div class="mt-4">
                                <a href="javascript: void(0);" class="btn btn-success waves-effect waves-light">Upgrade Account!</a>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mt-4 mt-sm-0">
                                <img src="@/assets/images/setup-analytics-amico.svg" class="img-fluid" alt />
                            </div>
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
            </div>
            <SellingProduct />
        </div>
    </div> --> 
    <div class="row" v-if="!dashboard">
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
    <div class="row" v-if="dashboard">
=======
                <!-- end card-body-->
            </div>
            <!-- end card-->
            <SellingProduct />
        </div>
    </div>
    <div class="row">
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
        <TopUsers />
        <Activity />
        <SocialSource />
    </div>
  </Layout>
</template>