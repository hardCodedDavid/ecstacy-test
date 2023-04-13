<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'
    import VueToastr from "vue-toastr";

/**
 * Profile component
 */
export default {
  components: { Layout, PageHeader,VueToastr },
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
      title: 'User Details',
      items: [
        {
          text: 'Contacts',
        },
        {
          text: 'User Details',
          active: true,
        },
      ],
      user: null,
      wallet: {
        email: '',
        amount: ''
      },
      wallet_balance: 0,
      total_transactions: 0,
      event: [],
      transactions: [],
      wdtransactions: [],
      totalRows: 1,
      currentPage: 1,
      per_page: 10,
      pageOptions: [10, 20, 30, 50],
      isBusy: false,
    }
  },
  methods: {
    getUser(record){
      // console.log(record)
      if(record.user != null) {
        // const user = record.user.first_name+' '+record.user.last_name
        return record.user
      } else if(record.user == null && record.receiver != null) {
        // const receiver = record.receiver.first_name+' '+record.receiver.last_name
        return record.receiver
      } else {
        return 'Not available'
      }
    },
    fundUserWallet(){
      this.isBusy =  true
        this.axios.put(BASE_URL+'/admin/wallet-action/credit',this.wallet)
        .then(() => {
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Wallet topup Successful",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
          })
          .finally(() => {
              this.isBusy =  false
              this.wallet.amount = ''
          });
    },
    withdrawUserFund(){
      this.isBusy =  true
        this.axios.put(BASE_URL+'/admin/wallet-action/debit',this.wallet)
        .then(() => {
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Wallet withdrawal Successful",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
          })
          .finally(() => {
              this.isBusy =  false
              this.wallet.amount = ''
          });
    },
    fetchData(){
if (this.$cookies.get('token')) {
      this.axios
        .get(
          BASE_URL +
            '/admin/view-user/' +
            this.$route.params.id +
            '?page=' +
            this.currentPage +
            '&per_page=' +
            this.per_page
        )
        .then((res) => {
          // console.log(res.data.data)
          this.wallet.email = res.data.data.user.email
          this.user = res.data.data.user
          this.transactions = res.data.data.transactions
          this.wallet_balance = res.data.data.wallet_balance
          this.total_transactions = res.data.data.total_transactions
          this.wdtransactions = res.data.data.wdtransactions


          // console.log(res.data.data.wdtransactions);
          const wdArr = []
          res.data.data.wdtransactions.map((item) => {
            const u = {}
            u.id = item.id
            u.title = item.title
            u.status = item.status
            u.amount = item.amount
            u.bank_name = JSON.parse(item.meta_data).bank_name || 'Not available'
            u.narration = item.narration || 'Not available'
            u.created_at = item.created_at || 'Not available'
            u.type = item.transaction_type || 'Not available'
            u.account_name = JSON.parse(item.meta_data).account_name || 'Not available'
            u.account_number = JSON.parse(item.meta_data).account_number || 'Not available'

            wdArr.push(u)
          })
          // console.log(wdArr)
          this.wdtransactions = wdArr
        })
        .catch((err) => {
          // this.error = true
          // console.log(err.response)
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
      // console.log('dd')
      localStorage.removeItem('user')
    }
    }
    // fetchWallet(){
    //     this.axios.get('https://api.codedevents.com/admin/users/' + this.$route.params.id + '/wallet')
    //     .then((res) => {
    //         console.log(res);
    //         this.wallet = res.data.data
    //     })
    //     .catch((err) => {
    //         // this.error = true
    //         console.log(err);
    //     })
    //     .finally(() => {
    //             // this.loading =  false
    //     });
    // },
    // fetchEvent(){
    //     this.axios.get('https://api.codedevents.com/admin/events/user/' + this.$route.params.id + '?page=1&per_page=1000000')
    //     .then((res) => {
    //         console.log(res);
    //         this.event = res.data.data
    //     })
    //     .catch((err) => {
    //         // this.error = true
    //         console.log(err);
    //     })
    //     .finally(() => {
    //             // this.loading =  false
    //     });
    // },
    // fetchTransaction(){
    //     this.axios.get('https://api.codedevents.com/admin/transactions/user/' + this.$route.params.id + '?page=1&per_page=1000000')
    //     .then((res) => {
    //         console.log(res);
    //         this.transaction = res.data.data
    //     })
    //     .catch((err) => {
    //         // this.error = true
    //         console.log(err);
    //     })
    //     .finally(() => {
    //             // this.loading =  false
    //     });
    // }
  },
  mounted() {
    this.fetchData();
    // this.fetchEvent();
    // this.fetchTransaction();
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

    <!-- ::START TOPUP WALLET Modal -->
    <b-modal
      id="modal-fund-wallet"
      title="Fund wallet"
      title-class="font-18"
      hide-footer
    >
      <label for="" class="m-2">Email Address: </label>
      <input
        type="email"
        id="horizontal-firstname-input"
        v-model="wallet.email"
        readonly
        class="m-2 form-control"
      />
      <label for="" class="m-2">Amount: </label>
      <input
        type="number"
        v-model="wallet.amount"
        id="horizontal-firstname-input"
        placeholder="Amount to fund..."
        class="m-2 form-control"
      />

      <!-- <textarea v-model="role.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button
          @click="fundUserWallet(), $bvModal.hide('modal-fund-wallet')"
          type="button"
          class="btn btn-primary"
        >
          Fund Wallet
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-fund-wallet')"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <!-- ::END TOPUP WALLET Modal -->


    <!-- ::START withdraw WALLET Modal -->
    <b-modal
      id="modal-withdraw-wallet"
      title="Withdraw wallet"
      title-class="font-18"
      hide-footer
    >
      <label for="" class="m-2">Email Address: </label>
      <input
        type="email"
        id="horizontal-firstname-input"
        v-model="wallet.email"
        readonly
        class="m-2 form-control"
      />
      <label for="" class="m-2">Amount: </label>
      <input
        type="number"
        v-model="wallet.amount"
        id="horizontal-firstname-input"
        placeholder="Amount to withdraw..."
        class="m-2 form-control"
      />

      <!-- <textarea v-model="role.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button
          @click="withdrawUserFund(), $bvModal.hide('modal-withdraw-wallet')"
          type="button"
          class="btn btn-primary"
        >
          Withdraw Funds
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-withdraw-wallet')"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <!-- ::END withdraw WALLET Modal -->

    <div class="row mb-4" v-if="user && !isBusy">
      <div class="col-xl-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-center">
              <div class="clearfix"></div>
              <div v-if="user.photo">
                <img
                  :src="user.photo"
                  alt
                  class="avatar-lg rounded-circle img-thumbnail"
                />
              </div>
              <div v-else>
                <div class="avatar-md d-inline-block me-2">
                  <div
                    class="avatar-title bg-soft-primary rounded-circle text-primary"
                  >
                    <i class="mdi mdi-account-circle"></i>
                  </div>
                </div>
              </div>
              <h5 class="mt-3 mb-1">
                {{ user.first_name + ' ' + user.last_name }}
              </h5>
              <p class="text-muted">{{ user.email }}</p>

              <div class="mt-4">
                <p
                  class="badge bg-pill"
                  :class="{
                    'bg-soft-success': user.email_verified_at !== null,
                    'bg-soft-danger': user.email_verified_at === null,
                  }"
                >
                  <span>{{
                    user.email_verified_at !== null ? 'Verified' : 'Unverified'
                  }}</span>
                </p>
              </div>
            </div>

            <hr class="my-4" />

            <div class="text-muted">
              <!-- <h5 class="font-size-16">About</h5>
                            <p>{{user}}</p> -->
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Name :</p>
                  <h5 class="font-size-16">
                    {{ user.first_name + ' ' + user.last_name || 'null' }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Mobile :</p>
                  <h5 class="font-size-16">{{ user.phone || '' }}</h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">E-mail :</p>
                  <h5 class="font-size-16">{{ user.email }}</h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Country :</p>
                  <h5 class="font-size-16">{{ user.country }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab active>
              <template v-slot:title>
                <i class="uil uil-user-circle font-size-20"></i>
                <span class="d-none d-sm-block">Overview</span>
              </template>
              <div>
                <div>
                  <!-- <h5 class="font-size-16 mb-4">Permissions</h5> -->

                  <div class="table-responsive">
                    <table class="table table-nowrap table-hover mb-0">
                      <tbody>
                        <tr>
                          <!-- <th scope="row">{{role.id}}</th> -->
                          <td>
                            <a href="#" class="text-dark">Registerd Date</a>
                          </td>
                          <td>
                            <p>{{ user.created_at | formatDate }}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-dark">Wallet Balance</a>
                          </td>
                          <td>
                            <p>₦
                              {{
                                wallet_balance
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }}
                            <button
                              class="px-3 btn btn-primary text-white"
                              style="margin-left:20px;"
                              type="button"
                              v-b-tooltip.hover
                              title="Edit"
                              v-b-modal.modal-fund-wallet
                            >
                              Topup
                            </button>
                            <button
                              class="px-3 btn btn-primary text-white"
                              style="margin-left:20px;"
                              type="button"
                              v-b-tooltip.hover
                              title="Edit"
                              v-b-modal.modal-withdraw-wallet
                            >
                              Withdraw
                            </button>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-dark">Total transactions</a>
                          </td>
                          <td>
                            <p>{{ total_transactions }}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-dark">Email Verified</a>
                          </td>
                          <td>
                            <span
                              v-if="user.email_verified_at"
                              class="badge bg-soft-success font-size-12"
                              >Active</span
                            >
                            <span
                              v-if="!user.email_verified_at"
                              class="badge bg-soft-danger font-size-12"
                              >Inactive</span
                            >
                          </td>
                        </tr>
                        <!-- <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction Pin</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.has_transaction_pin" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.has_transaction_pin" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr> -->
                        <tr>
                          <td>
                            <a href="#" class="text-dark">Login 2FA</a>
                          </td>
                          <td>
                            <span
                              v-if="user.twoFa"
                              class="badge bg-soft-success font-size-12"
                              >Active</span
                            >
                            <span
                              v-if="!user.twoFa"
                              class="badge bg-soft-danger font-size-12"
                              >Inactive</span
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-dark">Transaction Pin</a>
                          </td>
                          <td>
                            <span
                              v-if="user.pin"
                              class="badge bg-soft-success font-size-12"
                              >Active</span
                            >
                            <span
                              v-if="!user.pin"
                              class="badge bg-soft-danger font-size-12"
                              >Inactive</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-money-bill-stack font-size-20"></i>
                <span class="d-none d-sm-block">Transactions</span>
              </template>
              <div>
                <div>
                  <div class="table-responsive">
                    <table class="table table-nowrap table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Type</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody
                        v-for="(transaction, index) in transactions"
                        :key="transaction.id"
                      >
                        <tr>
                          <th scope="row">{{ index + 1 }}</th>
                          <td>
                            <p
                              class="badge bg-pill font-size-12 text-center rounded"
                              :class="{
                                'bg-soft-success':
                                  transaction.transaction_type === 'inflow',
                                'bg-soft-danger':
                                  transaction.transaction_type === 'outflow',
                              }"
                            >
                              {{ transaction.transaction_type }}
                            </p>
                          </td>
                          <td>
                            <p>
                              {{
                                transaction.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }}
                            </p>
                          </td>
                          <td>
                            <p>
                              {{
                                getUser(transaction).first_name +
                                  ' ' +
                                  getUser(transaction).last_name
                              }}
                            </p>
                          </td>
                          <tb>
                            <span
                              class="badge bg-pill font-size-12 mt-3"
                              :class="{
                                'bg-soft-success':
                                  transaction.status === 'delivered' ||
                                  transaction.status === 'success',
                                'bg-soft-danger':
                                  transaction.status === 'failed',
                                'bg-soft-warning':
                                  transaction.status === 'pending',
                              }"
                              >{{ transaction.status }}</span
                            >
                          </tb>
                          <td>
                            <p>{{ transaction.created_at | formatDate }}</p>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="transactions.length == 0">
                        <p class="text-center pt-3 pb-5">
                          No transactions has been made
                        </p>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-money-stack font-size-20"></i>
                <span class="d-none d-sm-block">Withdrawals</span>
              </template>
              <div>
                <div>
                  <div class="table-responsive">
                    <table class="table table-nowrap table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Bank Name</th>
                          <th scope="col">Account Name</th>
                          <th scope="col">Account Number</th>
                          <th scope="col">Narration</th>
                          <th scope="col">Status</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody
                        v-for="(transaction, index) in wdtransactions"
                        :key="transaction.id"
                      >
                        <tr>
                          <th scope="row">{{ index + 1 }}</th>
                          <td>
                            <p>
                              {{
                                transaction.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }}
                            </p>
                          </td>
                          <td>
                            <p>
                              {{ transaction.bank_name }}
                            </p>
                          </td>
                          <td>
                            <p>
                              {{ transaction.account_name }}
                              <!-- {{
                                transaction.user.first_name +
                                  ' ' +
                                  transaction.user.last_name
                              }} -->
                            </p>
                          </td>
                          <td>
                            <p>
                              {{ transaction.account_number }}
                            </p>
                          </td>
                          <td>
                            <p>
                              {{ transaction.narration }}
                            </p>
                          </td>
                          <tb>
                            <span
                              class="badge bg-pill font-size-12 d-flex items-center"
                              style="position:relative;top:-6px;"
                              :class="{
                                'bg-soft-success':
                                  transaction.status === 'delivered' ||
                                  transaction.status === 'success',
                                'bg-soft-danger':
                                  transaction.status === 'failed',
                                'bg-soft-warning':
                                  transaction.status === 'pending',
                              }"
                              >{{ transaction.status }}</span
                            >
                          </tb>
                          <td>
                            <p>{{ transaction.created_at | formatDate }}</p>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="transactions.length == 0">
                        <tr>
                          <td colspan="7" class="text-center pt-3 pb-5">
                            No transactions has been made
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
