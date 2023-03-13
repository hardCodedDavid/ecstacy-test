<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'
import VueToastr from 'vue-toastr'

/**
 * Profile component
 */
export default {
  components: { Layout, PageHeader, VueToastr },
  page: {
    title: 'User Detail',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'Transaction Details',
      items: [
        {
          text: 'Transaction',
        },
        {
          text: 'Details',
          active: true,
        },
      ],
      user: null,
      wallet: {
        email: '',
        amount: '',
      },
      wallet_balance: 0,
      total_transactions: 0,
      event: [],
      transaction: null,
      totalRows: 1,
      currentPage: 1,
      per_page: 10,
      pageOptions: [10, 20, 30, 50],
      isBusy: false,
    }
  },
  methods: {
    getNarration(metadata) {
      const data = JSON.parse(metadata)
      // console.log(data)
      if (data == null) {
        return 'Not available'
      } else {
        if (Object.prototype.hasOwnProperty.call(data, 'remark')) {
          return data.remark
        } else {
          return 'Not available'
        }
      }
    },
    fetchData() {
      if (this.$cookies.get('token')) {
        this.axios
          .get(BASE_URL + '/api/v1/admin/transactions/' + this.$route.params.id)
          .then((res) => {
            //   console.log(res.data)

            // console.log(res.data.data.transaction)
            this.transaction = res.data.data.transaction
            this.transaction.wallet_balance = res.data.data.wallet_balance
          })
          .catch((err) => {
            // this.error = true
            console.log(err.response.data)
            this.$refs.mytoast.Add({
              msg: err.response.message || err.response.data.message,
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'error',
            })
          })
          .finally(() => {
            // this.loading =  false
          })
      } else {
        localStorage.removeItem('user')
      }
    },
  },
  mounted() {
    this.fetchData()
    // console.log(this.$cookies.get('token'))
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>

    <div class="row" v-if="isBusy">
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
    <!-- v-if="user && !isBusy" -->
    <div class="row mb-4">
      <div class="col-xl-12">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab active>
              <template v-slot:title>
                <i class="uil uil-user-circle font-size-20"></i>
                <span class="d-none d-sm-block">Transaction Overview</span>
              </template>
              <div class="table-responsive">
                <table class="table table-nowrap table-hover mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Title</a>
                      </td>
                      <td>
                        <p>{{ transaction.title }}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Username</a>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'user-details',
                            params: { id: transaction.user_id },
                          }"
                          style="max-width: 200px;"
                          class="d-inline-block text-truncate text-info"
                          >{{ transaction.user.username }}</router-link
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Amount</a>
                      </td>
                      <td>
                        <p>{{ transaction.amount }}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Wallet balance</a>
                      </td>
                      <td>
                        <p>
                          {{
                            parseFloat(
                              transaction.wallet_balance
                            ).toLocaleString()
                          }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Transaction type</a>
                      </td>
                      <td>
                        <div
                          class="badge bg-pill bg-soft-success font-size-12"
                          :class="{
                            'bg-soft-danger':
                              transaction.transaction_type === 'outflow',
                            'bg-soft-success':
                              transaction.transaction_type === 'inflow',
                          }"
                        >
                          {{
                            transaction.transaction_type == 'outflow'
                              ? 'Debit'
                              : 'Credit'
                          }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Description</a>
                      </td>
                      <td>
                        <p>{{ transaction.narration || 'Not available' }}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Remark</a>
                      </td>
                      <td>
                        <p>
                          {{
                            getNarration(transaction.meta_data)
                          }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Email</a>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'user-details',
                            params: { id: transaction.user_id },
                          }"
                          style="max-width: 200px;"
                          class="d-inline-block text-truncate text-info"
                          >{{ transaction.user.email }}</router-link
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Reference</a>
                      </td>
                      <td>
                        <p>
                          {{ transaction.transaction_id || 'Not available' }}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Status</a>
                      </td>
                      <td>
                        <div
                          class="badge bg-pill bg-soft-success font-size-12"
                          :class="{
                            'bg-soft-danger':
                              transaction.status === 'failed' ||
                              transaction.status === 'reversed',
                            'bg-soft-warning': transaction.status === 'pending',
                            'bg-soft-success': transaction.status === 'success',
                          }"
                        >
                          {{ transaction.status }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#" class="text-dark">Transaction Date/Time</a>
                      </td>
                      <td>
                        <p>{{ transaction.updated_at | formatDate }}</p>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td>
                        <a href="#" class="text-dark">Wallet Balance</a>
                      </td>
                      <td>
                        <p>
                          {{
                            wallet_balance
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }}
                        </p>
                      </td>
                    </tr> -->
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
          <!-- Nav tabs -->
          <!-- Tab content -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
