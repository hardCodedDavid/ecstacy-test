<script>
import { mapGetters, mapMutations } from "vuex";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import VueToastr from "vue-toastr";
import { BASE_URL } from "../../../baseconstant";

/**
 * Orders component
 */
export default {
  components: { Layout, PageHeader, VueToastr },
  page: {
    title: "Withdrawals",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Withdrawals",
      items: [
        {
          text: "Transactions",
        },
        {
          text: "Withdrawals",
          active: true,
        },
      ],
      paymentData: [],
      totalRows: 1,
      currentPage: 1,
      requestCurrentPage: 1,
      perPage: 50,
      pageOptions: [50],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      isBusy: false,
      paymentInfo: null,
      paymentId: null,
      paymentRef: null,
      fields: [
        {
          key: "index",
          label: "S/N",
        },
        {
          key: "reference_id",
          label: "Reference",
          sortable: true,
        },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
        },
        {
          key: "bank_name",
          label: "Bank Name",
        },
        {
          key: "account_number",
          label: "Account Number",
          sortable: true,
        },
        {
          key: "account_name",
          label: "Account Name",
          sortable: true,
        },
        {
          key: "email",
          label: "User Email",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Date",
          sortable: true,
        },
        {
          key: "status",
          label: "Payment Status",
          sortable: true,
        },
        "action",
      ],
    };
  },
  middleware: "authentication",
  computed: {
    ...mapGetters({
      withdrawals: "withdrawal/getWithdrawals",
    }),
    /**
     * Total no. of records
     */
    rows() {
      return this.withdrawals.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.fetchPayments();
  },
  methods: {
    ...mapMutations({
      populateWithdrawals: "withdrawal/SET_WITHDRAWALS",
    }),
    gotoNext(value) {
      this.fetchPayments(value);
    },
    fetchPayments(page = 1) {
      this.isBusy = !this.isBusy;
      this.axios
        .get(BASE_URL + `/admin/withdrawals?page=${page}&per_page=50`)
        .then((res) => {
          console.log(res.data.data);
          // console.log(JSON.parse(res.data.data.data[0].meta_data));

          const dataArrr = [];
          res.data?.data?.forEach((record) => {
            let u = {};
            u.id = record.id;
            u.user_id =
              record.user != null ? record.user?.id : record.receiver?.id;
            u.reference_id = record.reference
              ? `${record.reference}`
              : "Not available";
            u.amount = record.amount;
            u.bank_name = record.meta?.bank_name || "Not available";
            u.email =
              record.user != null ? record.user?.email : record.receiver?.email;
            u.account_name = record.meta?.account_name || "Not available";
            u.account_number = record.meta?.account_number || "Not available";
            u.status = record.status == 0 ? "failed" : record.status;
            u.created_at = record.created_at;

            dataArrr.push(u);
          });
          this.populateWithdrawals(dataArrr);
          this.totalRows = res.data?.meta?.total;
        })
        .catch((err) => {
          // this.error = true
          console.log(err);
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    approveWithdrawal(id) {
      this.isBusy = !this.isBusy;
      this.axios
        .post(BASE_URL + "/admin/withdrawals/approve/" + id)
        .then(() => {
          // console.log(res.data.data);
          this.$refs.mytoast.Add({
            msg: "Transaction approved successfully",
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "success",
          });
          this.fetchPayments();
        })
        .catch((err) => {
          // this.error = true
          console.log("James", err);
          this.$refs.mytoast.Add({
            msg: err.response?.data?.error,
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "error",
          });
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    declineWithdrawal(id) {
      this.isBusy = !this.isBusy;
      this.axios
        .post(BASE_URL + "/admin/withdrawals/decline/" + id)
        .then((res) => {
          console.log(res.data.data);
          this.$refs.mytoast.Add({
            msg: "Transaction declined successfully",
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "success",
          });
          this.fetchPayments();
        })
        .catch((err) => {
          // this.error = true
          // console.log(err);
          this.$refs.mytoast.Add({
            msg: err.response?.data?.error,
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "error",
          });
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    getPaymentInfo(item) {
      this.paymentInfo = item;
      this.paymentId = item.id;
      this.paymentRef = item.reference;
    },
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>
    <!-- ::START POST Resolve Payment Modal -->
    <!-- {{paymentData}} -->
    <b-modal
      id="modal-resolve-payment"
      title="Resolve Payment"
      title-class="font-18"
      hide-footer
    >
      <p>Are you sure you want to Resolve this Payment "{{ paymentRef }}"</p>

      <div class="modal-footer">
        <button
          @click="resolvePayment(), $bvModal.hide('modal-resolve-payment')"
          type="button"
          class="btn btn-success"
        >
          Resolve
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-resolve-payment')"
        >
          Close
        </b-button>
      </div>
    </b-modal>

    <!-- ::END POST Resolve Payment Modal -->
    <div class="row">
      <div class="col-12">
        <!-- <div>
              <div class="float-end">
                <form class="d-inline-flex mb-3">
                  <label class="my-1 me-2" for="order-selectinput">Orders</label>
                  <select class="form-select" id="order-selectinput">
                    <option selected="">All</option>
                    <option value="1">Active</option>
                    <option value="2">Unpaid</option>
                  </select>
                </form>
              </div>
              <button
                type="button"
                class="btn btn-success mb-3"
              >
                <i class="mdi mdi-plus me-1"></i> Add New Order
              </button>
            </div> -->
        <div
          class="table table-centered datatable dt-responsive nowrap table-card-list dataTable no-footer dtr-inline"
        >
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center fw-normal">
                  Show&nbsp;
                  <b-form-select
                    v-model="perPage"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select
                  >&nbsp;entries
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
              <div
                id="tickets-table_filter"
                class="dataTables_filter text-md-end"
              >
                <label class="d-inline-flex align-items-center fw-normal">
                  Search:
                  <b-form-input
                    v-model="filter"
                    type="search"
                    placeholder="Search..."
                    class="form-control form-control-sm ms-2"
                  ></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->
          </div>
          <!-- Table -->

          <b-table
            :busy="isBusy"
            table-class="table table-centered datatable table-card-list"
            thead-tr-class="bg-transparent"
            :items="withdrawals"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="1"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
            show-empty
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #empty="scope">
              <p class="text-center p-3">{{ scope.emptyText }}</p>
            </template>
            <template v-slot:cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template v-slot:cell(check)="data">
              <div class="custom-control custom-checkbox text-center">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="`contacusercheck${data.item.id}`"
                />
                <label
                  class="custom-control-label"
                  :for="`contacusercheck${data.item.id}`"
                ></label>
              </div>
            </template>
            <template v-slot:cell(id)="data">
              <a href="javascript: void(0);" class="text-dark fw-bold">{{
                data.item.id
              }}</a>
            </template>

            <template v-slot:cell(reference_id)="data">
              <a href="javascript: void(0);" class="text-dark"
                >{{ data.item.reference_id.slice(0, 15) }}...</a
              >
            </template>

            <template v-slot:cell(amount)="data">
              <p>₦{{ data.item.amount }}</p>
            </template>

            <template v-slot:cell(email)="data">
              <router-link
                :to="{
                  name: 'user-details',
                  params: { id: data.item.user_id },
                }"
                style="max-width: 200px;"
                class="d-inline-block text-truncate text-info"
                >{{ data.item.email }}</router-link
              >
            </template>

            <template v-slot:cell(name)="data">
              <a href="#" class="text-body">{{ data.item.name }}</a>
            </template>
            <template v-slot:cell(status)="data">
              <div
                class="badge bg-pill bg-soft-success font-size-12"
                :class="{
                  'bg-soft-danger': data.item.status === 'failed',
                  'bg-soft-warning': data.item.status === 'pending',
                  'bg-soft-success': data.item.status === 'success',
                }"
              >
                {{ data.item.status }}
              </div>
            </template>
            <template v-slot:cell(created_at)="data">
              <div>
                {{ data.item.created_at | formatDate }}
              </div>
            </template>
            <template v-slot:cell(action)="{ item }">
              <ul class="list-inline mb-0">
                <li v-if="item.status != 'success'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Approve"
                    v-b-modal.modal-edit-admin
                    @click="approveWithdrawal(item.reference_id)"
                  >
                    <i
                      class="uil uil-check-circle font-size-18 text-success"
                    ></i>
                  </a>
                </li>
                <li v-if="item.status == 'pending'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Restrict"
                    v-b-modal.modal-edit-admin
                    @click="declineWithdrawal(item.reference_id)"
                  >
                    <i class="uil uil-info-circle font-size-18 text-danger"></i>
                  </a>
                </li>
              </ul>
            </template>
          </b-table>
        </div>
        <div class="row">
          <div class="col">
            <div class="dataTables_paginate paging_simple_numbers float-end">
              <ul class="pagination pagination-rounded">
                <!-- pagination -->
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  @change="gotoNext"
                  first-number
                  last-number
                ></b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
