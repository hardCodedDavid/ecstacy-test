<script>
import VueToastr from "vue-toastr";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { BASE_URL } from "../../../baseconstant";

/**
 * Elements component
 */
export default {
  page: {
    title: "Settings",
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
    VueToastr,
  },
  data() {
    return {
      title: "Settings",
      modalData: [],
      gridList: [
        {
          profile: "mdi-cloud-sync-outline",
          name: "Service Charges",
          list: "servicesList"
        },
        {
          profile: "mdi-access-point-plus",
          name: "Network SME Topup",
          list: "smeList"
        },
        {
          profile: "mdi-percent-outline",
          name: "Discount Fees",
          list: "discountList"
        },
        {
          profile: "mdi-account-arrow-right-outline",
          name: "Referrals",
          list: "referralList"
        },
        {
          profile: "mdi-access-point-network",
          name: "Network SME Discounts",
          list: "cgList"
        },
        {
          profile: "mdi-signal-cellular-1",
          name: "Airtime Discount",
          list: "airtimeList"
        },
        {
          profile: "mdi-wifi-sync",
          name: "Data Discount",
          list: "dataList"
        },
        {
          profile: "mdi-gauge-full",
          name: "Limit Fees",
          list: "limitList"
        },
      ],
      servicesList: [
        {
          name: "Wallet Topup Charge",
          model: "wallet_topup"
        },
        {
          name: "Airtime Service Charge",
          model: "airtime_topup"
        },
        {
          name: "Data Service Charge",
          model: "data_topup"
        },
        {
          name: "Utility Bills charge",
          model: "utility_topup"
        },
        {
          name: "Tv subscription service charg",
          model: "tvsubscription_topup"
        },
        {
          name: "E-pin service charge",
          model: "epin_topup"
        },
        {
          name: "Wallet transfer charge",
          model: "wallet_transfer_topup"
        },
        {
          name: "Withdrawal service charge",
          model: "withdrawal_topup"
        },
        {
          name: "Game subscription charge",
          model: "games_charge"
        },
      ],
      smeList: [
        {
          name: "MTN SME Topup",
          model: "mtn_sme_topup"
        },
        {
          name: "GLO SME/CG Topup",
          model: "glo_cg_topup"
        },
        {
          name: "AIRTEL SME/CG Topup",
          model: "airtel_cg_topup"
        },
      ],
      discountList: [
        {
          name: "Airtime Discount(%)",
          model: "airtime_discount"
        },
        {
          name: "Data Discount(%)",
          model: "data_discount"
        },
        {
          name: "SME Data Discount(%)",
          model: "sme_data_discount"
        },
        {
          name: "Cable Tv Discount(%)",
          model: "cable_tv_discount"
        },
        {
          name: "Utility Bills Discount(%)",
          model: "utility_bills_discount"
        },
        {
          name: "Education Discount(%)",
          model: "education_payment_discount"
        },
      ],
      referralList: [
        {
          name: "Referral Commission",
          model: "referral_commission"
        },
        {
          name: "Referral Minimum Top Up",
          model: "referral_minimum_top_up"
        },
      ],
      cgList: [
        {
          name: "MTN CG Charge",
          model: "mtn_cg_charge"
        },
        {
          name: "MTN CG Data Discount",
          model: "mtn_cg_data_discount"
        },
        {
          name: "MTN Data Card Charge",
          model: "mtn_data_card_charge"
        },
        {
          name: "MTN Data Card Discount",
          model: "mtn_data_card_discount"
        },
        {
          name: "9Mobile SME service charge",
          model: "ninemobile_sme_charge"
        },
        {
          name: "9Mobile SME data discount",
          model: "ninemobile_sme_discount"
        },
      ],
      airtimeList: [
        {
          name: "MTN Airtime Discount(%)",
          model: "mtn_airtime_discount"
        },
        {
          name: "GLO Airtime Discount(%)",
          model: "glo_airtime_discount"
        },
        {
          name: "Airtel Airtime Discount(%)",
          model: "airtel_airtime_discount"
        },
        {
          name: "Etisalat Airtime Discount(%)",
          model: "etisalat_airtime_discount"
        },
      ],
      dataList: [
        {
          name: "MTN Data Discount(%)",
          model: "mtn_data_discount"
        },
        {
          name: "GLO Data Discount(%)",
          model: "glo_data_discount"
        },
        {
          name: "Airtel Data Discount(%)",
          model: "airtel_data_discount"
        },
        {
          name: "Etisalat Data Discount(%)",
          model: "etisalat_data_discount"
        },
      ],
      limitList: [
        {
          name: "Minimum Airtime Purchase",
          model: "minimum_airtime_purchase"
        },
        {
          name: "Daily Withdrawal Limit",
          model: "daily_withdrawal_limit"
        },
        {
          name: "Airtime Purchase Limit",
          model: "airtime_purchase_limit"
        },
        {
          name: "Withdrawal Fee Percentage (%)",
          model: "withdrawal_fee_percentage"
        },
        {
          name: "Withdrawal Fee Limit TO Charge",
          model: "withdrawal_fee_limit_to_charge"
        },
        {
          name: "Minimum Withdrawal Amount",
          model: "minimum_withdrawal_amount"
        },
      ],



      items: [
        {
          text: "Service",
          href: "/",
        },
        {
          text: "Settings",
          active: true,
        },
      ],
      user: null,
      loadings: false,
      isLoading: false,
      service: {
        wallet_topup: 20,
        airtime_topup: 0,
        data_topup: 0,
        utility_topup: 0,
        tvsubscription_topup: 0,
        epin_topup: 0,
        wallet_transfer_topup: 0,
        withdrawal_topup: 50,
        games_charge: 0,
        glo_cg_topup: 2.2,
        airtel_cg_topup: 6.9,
        mtn_sme_topup: 0,
        cable_tv_discount: 0,
        utility_bills_discount: 0,
        data_discount: 0,
        airtime_discount: 3,
        sme_data_discount: 0,
        education_payment_discount: 0,
        referral_commission: 50,
        referral_minimum_top_up: 500,
        mtn_cg_charge: 0,
        mtn_cg_data_discount: 0,
        mtn_data_card_charge: 0,
        mtn_data_card_discount: 0,
        ninemobile_sme_charge: 0,
        ninemobile_sme_discount: 0,

        mtn_airtime_discount:90,
        glo_airtime_discount:0,
        airtel_airtime_discount:0,
        etisalat_airtime_discount:0,
        mtn_data_discount:0,
        airtel_data_discount:0,
        etisalat_data_discount:0,
        glo_data_discount:0, //

        minimum_airtime_purchase:0,
        daily_withdrawal_limit:0,
        airtime_purchase_limit:90,
        withdrawal_fee_percentage:0,
        withdrawal_fee_limit_to_charge:0,

        minimum_withdrawal_amount:0
      },
      error: {
        title: false,
        // category: false,
        thumbnail: false,
        content: false,
      },
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    updateServiceCharge(e) {
      e.preventDefault();
      this.loadings = true;
      this.axios
        .put(BASE_URL + "/admin/update-service-charges", this.service)
        .then(() => {
          this.getUser();
          this.$refs.mytoast.Add({
            msg: "Service charges updated successfully",
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "success",
          });
          this.$bvModal.hide('modal-edit-settings');
        })
        .catch((err) => {
          // this.error = true
          // console.log(err.response)
          this.$refs.mytoast.Add({
            msg: err.response?.data?.error,
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "error",
          });
        })
        .finally(() => {
          this.loadings = false;
        });
    },
    getUser() {
      if (this.$cookies.get("token")) {
        this.axios
          .get(BASE_URL + "/admin/profile")
          .then((res) => {
            console.log(res.data?.data?.service_charges);
            this.service = res.data?.data?.service_charges;
          })
          .catch((err) => {
            // this.error = true
            console.log(err);
          })
          .finally(() => {
            // this.loading =  false
          });
      } else {
        localStorage.removeItem("user");
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    getModalList(list) {
      if (this[list]) {
        this.modalData = this[list];
      }
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>

    <div class="row">
      <div
        class="col-xl-3 col-sm-6"
        v-for="(item, index) in gridList"
        :key="index"
      >
        <div class="card text-center">
          <div class="card-body">
            <div class="clearfix m-4"></div>
            <div class="mb-4">
              <!-- <img
                v-if="item.profile"
                :src="item.profile"
                alt
                class="avatar-lg rounded-circle img-thumbnail"
              /> -->
              <div class="avatar-lg mx-auto mb-4">
                <div
                  class="avatar-title bg-soft-dark rounded-circle text-primary"
                >
                  <i
                    :class="'mdi ' + item.profile + ' display-4 m-0 text-white'"
                  ></i>
                </div>
              </div>
            </div>
            <h5 class="font-size-16 mb-1">
              <a href="#" class="text-dark">{{ item.name }}</a>
            </h5>
            <!-- <p class="text-muted mb-2">{{ item.designation }}</p> -->
          </div>

          <div class="btn-group" role="group">
            <button @click="getModalList(item.list)" type="button" class="btn btn-outline-light text-truncate" v-b-modal.modal-edit-settings>
              <i class="bx bx-pencil me-1"></i> Edit {{ item.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- ::START EDIT Settings Modal -->    
      <b-modal id="modal-edit-settings" title="Edit Settings" title-class="font-18" hide-footer>
        <form method="post" @submit="updateServiceCharge">
          <div  v-for="(list, index) in modalData" :key="index">
            <label for="" class="m-2">{{ list.name }}: </label>
            <input type="text" v-model="service[list.model]" id="horizontal-firstname-input" :placeholder="'Enter ' + list.name" class="m-2 form-control">
          </div>
          
          <div class="modal-footer">
              <button v-if="!loadings" type="submit" class="btn btn-primary">
                  Save changes
              </button>
              <button v-if="loadings" class="btn btn-primary">
                <b-spinner
                  small
                  variant="white"
                  role="status"
                  class="me-2"
                ></b-spinner>
                <span>Loading...</span>
              </button>
              <b-button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="$bvModal.hide('modal-edit-settings')"
                  >
                  Close
              </b-button>
          </div>
        </form>
        </b-modal>
        <!-- ::END EDIT Settings Modal -->
    </div>
  <!-- <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Service Settings</h4>
            <div class="row">
              <div>
                <form method="post" @submit="updateServiceCharge">
                  <div class="card p-3 mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <label for="wallet">Wallet topup charge</label>
                        <input
                          id="wallet"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.wallet_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="airtime">Airtime service charge</label>
                        <input
                          id="airtime"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.airtime_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Data service charge</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.data_topup"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label for="bill">Utility Bills charge</label>
                        <input
                          id="bill"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.utility_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="tv">Tv subscription service charge</label>
                        <input
                          id="tv"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.tvsubscription_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="epin">E-pin service charge</label>
                        <input
                          id="epin"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.epin_topup"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label for="transfer">Wallet transfer charge</label>
                        <input
                          id="transfer"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.wallet_transfer_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="wd">Withdrawal service charge</label>
                        <input
                          id="wd"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.withdrawal_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="games">Game subscription charge</label>
                        <input
                          id="games"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.games_charge"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label for="data">MTN SME service charge</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.mtn_sme_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">GLO SME/CG service charge</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.glo_cg_topup"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">AIRTEL SME/CG service charge</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.airtel_cg_topup"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label for="data">Airtime Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.airtime_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Data Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.data_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">SME Data Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.sme_data_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Cable Tv Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.cable_tv_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Utility Bills Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.utility_bills_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Education Discount(%)</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.education_payment_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Referral Commission</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.referral_commission"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">Referral Minimum Top Up</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.referral_minimum_top_up"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">MTN CG Charge</label>
                        <input
                          id="data"
                          type="text"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.mtn_cg_charge"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">MTN CG Data Discount</label>
                        <input
                          id="data"
                          type="text"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.mtn_cg_data_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">MTN Data Card Charge</label>
                        <input
                          id="data"
                          type="text"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.mtn_data_card_charge"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">MTN Data Card Discount</label>
                        <input
                          id="data"
                          type="text"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.mtn_data_card_discount"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">9Mobile SME service charge</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.ninemobile_sme_charge"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="data">9Mobile SME data discount</label>
                        <input
                          id="data"
                          type="number"
                          step="any"
                          class="form-control mb-4"
                          placeholder="Amount"
                          v-model="service.ninemobile_sme_discount"
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
          </div>
        </div>
      </div>
  </div> -->
    <!-- End Form Layout -->
  </Layout>
</template>
