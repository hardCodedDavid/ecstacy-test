<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
// import Switches from "vue-switches";
import VueToastr from 'vue-toastr'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'

/**
 * Profile component
 */
export default {
  components: { Layout, PageHeader, VueToastr },
  page: {
    title: 'Profile',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'Profile',
      items: [
        {
          text: 'Contacts',
        },
        {
          text: 'Profile',
          active: true,
        },
      ],
      admin: {
        name: '',
        phone: '',
      },
      password: {
        old_password: '',
        new_password: '',
      },
      service:{
        wallet_topup:50.05,
        airtime_topup:50.05,
        data_topup:50.05,
        utility_topup:50.05,
        tvsubscription_topup:50.05,
        epin_topup:50.05,
        wallet_transfer_topup:50.05,
        withdrawal_topup:50.05,
        games_charge:50.05,
        glo_cg_topup:50.05,
        airtel_cg_topup:50.05,
        mtn_sme_topup:50.05,
      },
      profile_photo: '',
      user: null,
      login2FA: false,
      transaction2FA: false,
      isLoading: false,
      Loading: false,
      loadings: false,
      url: false,
    }
  },
  mounted() {
    this.getUser()
    // console.log(this.user)
  },
  methods: {
    resetPassword(e) {
      e.preventDefault()
      this.loadings = true
      if (
        this.password.old_password === '' &&
        this.password.new_password === ''
      ) {
        this.loadings = false
        this.$refs.mytoast.Add({
          msg: 'Password field is required',
          clickClose: false,
          timeout: 5000,
          position: 'toast-top-right',
          type: 'error',
        })
      } else {
        this.axios
          .put(BASE_URL + '/api/v1/admin/password/change', this.password)
          .then(() => {
            // console.log(res.data.data)
            this.$refs.mytoast.Add({
              msg: 'Password Updated Successfully',
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'success',
            })
          })
          .catch((err) => {
            // this.error = true
            console.log(err.response)
            this.$refs.mytoast.Add({
              msg: err.response.data.error,
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'error',
            })
          })
          .finally(() => {
            this.getUser()
            this.loadings = false
          })
      }
    },
    updateServiceCharge(e) {
      e.preventDefault()
      this.loadings = true
        this.axios
          .put(BASE_URL + '/api/v1/admin/update-service-charges', this.service)
          .then(() => {
            this.$refs.mytoast.Add({
              msg: 'Service Charge Updated Successfully',
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'success',
            })
          })
          .catch((err) => {
            // this.error = true
            // console.log(err.response)
            this.$refs.mytoast.Add({
              msg: err.response.data.message,
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'error',
            })
          })
          .finally(() => {
            this.getUser()
            this.loadings = false
          })
      
    },
    check2FA() {
      if (this.user.two_factor_enabled == true) {
        this.enable2FA()
      } else {
        this.disable2FA()
      }
    },
    enable2FA() {
      this.loadings = true
      this.axios
        .post('https://api.codedevents.com/admin/auth/2fa/enable')
        .then((res) => {
          console.log(res.data.data)
          this.$refs.mytoast.Add({
            msg: 'Login 2FA Active',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          // this.error = true
          console.log(err)

          this.$refs.mytoast.Add({
            msg: err.response.data.details,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.getUser()
          this.loadings = false
        })
    },
    disable2FA() {
      this.loadings = true
      this.axios
        .post('https://api.codedevents.com/admin/auth/2fa/disable')
        .then((res) => {
          console.log(res.data.data)
          this.$refs.mytoast.Add({
            msg: 'Login 2FA Inactive',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'warning',
          })
        })
        .catch((err) => {
          // this.error = true
          console.log(err)

          this.$refs.mytoast.Add({
            msg: err.response.data.details,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.getUser()
          this.loadings = false
        })
    },
    updateProfile(e) {
      e.preventDefault()
      this.isLoading = true
      this.axios
        .put(BASE_URL + '/api/v1/admin/profile/update', this.admin)
        .then(() => {
          //   console.log(res)
          this.getUser()
          this.$refs.mytoast.Add({
            msg: 'Profile Updated Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          // this.error = true
          //   console.log(err)
          this.$refs.mytoast.Add({
            msg: err.response.data.message,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateProfilePhoto(e) {
      e.preventDefault()
      this.Loading = true
      // Set formData
      const formData = new FormData()
      // Append the method only if you are using a patch route in your server side
      formData.append('_method', 'POST')
      // Append the file
      formData.append('photo', this.profile_photo)

      this.axios
        .post(BASE_URL + '/api/v1/admin/profile/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          //   console.log(res)
          this.getUser()
          this.url = ''
          this.$refs.mytoast.Add({
            msg: 'Profile Photo Updated Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          // this.error = true
          //   console.log(err.response)
          this.$refs.mytoast.Add({
            msg: err.response.data.message,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.Loading = false
        })
    },
    getUser() {
      if (this.$cookies.get('token')) {
        this.axios
          .get(BASE_URL + '/api/v1/admin/profile')
          .then((res) => {
            // console.log(res.data.data)
            this.user = res.data.data.user
            this.service = res.data.data.service_charges
            // this.admin.name = res.data.data.name
            // this.admin.phone = res.data.data.phone
            // this.url = res.data.data.profile_photo
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
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)

      this.profile_photo = URL.createObjectURL(file)
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>

    <div class="row" v-if="!user">
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

    <div class="row mb-4" v-if="user">
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
                <img
                  :src="user.photo"
                  alt
                  class="avatar-lg rounded-circle img-thumbnail"
                />
              </div>
              <h5 class="mt-3 mb-1">{{ user.name }}</h5>
              <p class="text-muted">{{ user.email }}</p>
            </div>

            <hr class="my-4" />

            <div class="text-muted">
              <!-- <h5 class="font-size-16">About</h5>
                            <p>{{user}}</p> -->
              <div class="table-responsive mt-4 mb-0">
                <div>
                  <p class="mb-1">Name :</p>
                  <h5 class="font-size-16">{{ user.name || 'null' }}</h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">Mobile :</p>
                  <h5 class="font-size-16">
                    {{ user.phone || '+2348012345' }}
                  </h5>
                </div>
                <div class="mt-4">
                  <p class="mb-1">E-mail :</p>
                  <h5 class="font-size-16">{{ user.email }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="card mb-0">
          <b-tabs content-class="p-4" justified class="nav-tabs-custom">
            <b-tab>
              <template v-slot:title>
                <i class="uil-cog toggle-right font-size-20"></i>
                <span class="d-none d-sm-block">Settings</span>
              </template>
              <div>
                <div>
                  <h5 class="mb-3">Profile Photo</h5>
                  <form
                    @submit="updateProfilePhoto"
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <div class="card p-3">
                      <img
                        class="avatar-lg rounded-circle img-thumbnail"
                        :src="url"
                        alt="Card image cap"
                      />
                      <b-form-file
                        placeholder="Choose an image here..."
                        @change="onFileChange"
                        v-model="profile_photo"
                        :state="Boolean(profile_photo)"
                      ></b-form-file>

                      <button
                        v-if="!Loading"
                        @click="updateProfilePhoto"
                        class="btn btn-primary mt-4"
                      >
                        Submit
                      </button>
                      <button v-if="Loading" class="btn btn-primary mt-4">
                        <b-spinner
                          small
                          variant="white"
                          role="status"
                          class="me-2"
                        ></b-spinner>
                        <span>Loading...</span>
                      </button>
                    </div>
                  </form>

                  <h5 class="mt-5 mb-3">Update Profile</h5>
                  <form method="post" @submit="updateProfile">
                    <div class="card p-3 mb-3">
                      <label for="validationCustom03">Name</label>
                      <input
                        id="validationCustom03"
                        type="text"
                        class="form-control mb-4"
                        placeholder="Enter Name"
                        v-model="admin.name"
                      />
                      <label for="validationCustom03">Phone</label>
                      <input
                        id="validationCustom03"
                        type="number"
                        class="form-control mb-4"
                        placeholder="Enter Phone Number"
                        v-model="admin.phone"
                      />
                      <button
                        v-if="!isLoading"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Submit
                      </button>
                      <button v-if="isLoading" class="btn btn-primary">
                        <b-spinner
                          small
                          variant="white"
                          role="status"
                          class="me-2"
                        ></b-spinner>
                        <span>Loading...</span>
                      </button>
                    </div>
                  </form>

                  <!-- <div class="card p-3">
                    <p class="mt-5 mb-3 font-bold">Update 2FA</p>
                    <toggle-button
                      @change="check2FA()"
                      v-model="user.two_factor_enabled"
                      :labels="{ checked: 'Active', unchecked: 'Inactive' }"
                      width=70
                      height=30
                    />
                </div> -->
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil uil-lock-alt font-size-20"></i>
                <span class="d-none d-sm-block">Security</span>
              </template>
              <div>
                <div>
                  <h5 class="mb-3">Reset Password</h5>
                  <form method="post" @submit="resetPassword">
                    <div class="card p-3 mb-3">
                      <label for="validationCustom03">Current Password</label>
                      <input
                        id="validationCustom03"
                        type="password"
                        class="form-control mb-4"
                        placeholder="Enter Current Password"
                        v-model="password.old_password"
                      />
                      <label for="validationCustom03">New Password</label>
                      <input
                        id="validationCustom03"
                        type="password"
                        class="form-control mb-4"
                        placeholder="Enter New Password"
                        v-model="password.new_password"
                      />
                      <button
                        v-if="!isLoading"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Submit
                      </button>
                      <button v-if="isLoading" class="btn btn-primary">
                        <b-spinner
                          small
                          variant="white"
                          role="status"
                          class="me-2"
                        ></b-spinner>
                        <span>Loading...</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="uil-cog toggle-right font-size-20"></i>
                <span class="d-none d-sm-block">Service Settings</span>
              </template>
              <div>
                <div>
                  <h5 class="mb-3">Service Settings</h5>
                  <form method="post" @submit="updateServiceCharge">
                    <div class="card p-3 mb-3">
                      <div class="row">
                        <div class="col-md-4">
                          <label for="wallet"
                            >Wallet topup charge</label
                          >
                          <input
                            id="wallet"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.wallet_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="airtime"
                            >Airtime service charge</label
                          >
                          <input
                            id="airtime"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.airtime_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="data"
                            >Data service charge</label
                          >
                          <input
                            id="data"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.data_topup"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label for="bill"
                            >Utility Bills charge</label
                          >
                          <input
                            id="bill"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.utility_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="tv"
                            >Tv subscription service charge</label
                          >
                          <input
                            id="tv"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.tvsubscription_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="epin"
                            >E-pin service charge</label
                          >
                          <input
                            id="epin"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.epin_topup"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label for="transfer"
                            >Wallet transfer charge</label
                          >
                          <input
                            id="transfer"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.wallet_transfer_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="wd"
                            >Withdrawal service charge</label
                          >
                          <input
                            id="wd"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.withdrawal_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="games"
                            >Game subscription charge</label
                          >
                          <input
                            id="games"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.games_charge"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label for="data"
                            >MTN SME service charge</label
                          >
                          <input
                            id="data"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.mtn_sme_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="data"
                            >GLO SME/CG service charge</label
                          >
                          <input
                            id="data"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.glo_cg_topup"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="data"
                            >AIRTEL SME/CG service charge</label
                          >
                          <input
                            id="data"
                            type="number"
                            class="form-control mb-4"
                            placeholder="Amount"
                            v-model="service.airtel_cg_topup"
                          />
                        </div>
                      </div>

                      <button
                        v-if="!isLoading"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Submit
                      </button>
                      <button v-if="isLoading" class="btn btn-primary">
                        <b-spinner
                          small
                          variant="white"
                          role="status"
                          class="me-2"
                        ></b-spinner>
                        <span>Loading...</span>
                      </button>
                    </div>
                  </form>
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
