<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'

import Stat from '@/components/widgets/stat'
// import SalesAnalytics from "./sales-analytics";
// import SellingProduct from './selling-product';

import TopUsers from './top-users'
import Activity from './activity'
import SocialSource from './social-source'

export default {
  page: {
    title: 'Dashboard',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    Stat,
    TopUsers,
    Activity,
    SocialSource,
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Overview',
        },
        {
          text: 'Dashboard',
          active: true,
        },
      ],
      eventData: null,
      dashboard: null,
    }
  },
  mounted() {
    this.axios
      .get('https://api.ecstasynigeria.com/api/v1/admin/dashboard')
      .then((res) => {
        console.log(res.data.data)
        this.dashboard = res.data.data
      })
      .catch((err) => {
        console.log(err.response)
        // localStorage.removeItem('user')
        // this.$cookies.remove('token')
        // this.$router.push('/login');
      })
      .finally({})
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <Stat :total_users="dashboard.total_users" :total_transactions="dashboard.total_transactions" :total_topup_amount="dashboard.total_topup_amount" />
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
      <TopUsers :recent_users="dashboard.recent_users" />
      <Activity :recent_transactions="dashboard.recent_transactions" />
      <SocialSource />
    </div>
  </Layout>
</template>
