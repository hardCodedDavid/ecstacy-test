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
  },
  //   mounted() {
  //     this.fetchCategory()
  //   },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>
    <div class="row">
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
    </div>
    <!-- End Form Layout -->
  </Layout>
</template>
