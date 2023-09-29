<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'

import Stat from '@/components/widgets/stat'
import SalesAnalytics from "./sales-analytics"
// import SellingProduct from './selling-product'

import TopUsers from './top-users'
import Activity from './activity'
// import SocialSource from './social-source'

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
    // SocialSource,
    SalesAnalytics,
    // SellingProduct,
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
      isLoading: false,
      dashboard: {
        total_users: 0,
        recent_users: 0,
        recent_transactions: 0,
        social_analysis: 0,
        total_wd: 0
      },
    }
  },
  mounted() {
    this.isLoading = true
    this.axios
      .get(BASE_URL+'/admin/dashboard')
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
      .finally(() => {
        this.isLoading = false;
      })
  },
}
</script>

<template>
  <Layout>
    <div v-if="!isLoading">
      <PageHeader :title="title" :items="items" />
      <Stat :total_users="dashboard.total_users" :wds="dashboard.total_withdrawals" :total_transactions="dashboard.total_transactions" :total_topup_amount="dashboard.total_topup_amount" />
    </div>
    
    <div class="row" v-if="isLoading">
      <div class="col-xl-12">
        <div class="text-center text-primary my-2 mt-5">
          <b-spinner class="align-middle pl-3"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </div>
    </div>
    <div class="row">
      <SalesAnalytics :social_analysis="dashboard" v-if="dashboard" />
      <TopUsers :recent_users="dashboard.recent_users" v-if="!isLoading" />
      <Activity :recent_transactions="dashboard.recent_transactions" v-if="!isLoading" />
      <!-- <SocialSource /> -->
    </div>
  </Layout>
</template>
