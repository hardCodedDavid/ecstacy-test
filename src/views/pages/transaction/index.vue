<script>
import { mapGetters, mapMutations } from "vuex";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
// import VueToastr from "vue-toastr";
import { BASE_URL } from "../../../baseconstant";

/**
 * Orders component
 */
export default {
  components: { Layout, PageHeader },
  page: {
    title: "Transaction",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Transaction",
      items: [
        {
          text: "App",
        },
        {
          text: "Transaction",
          active: true,
        },
      ],
      transactionData: [],
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
          label: "Reference ID",
          sortable: true,
        },
        {
          key: "user_name",
          label: "Name",
          sortable: true,
        },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
        },
        {
          key: "type",
          label: "Service Type",
          sortable: true,
        },
        {
          key: "provider",
          label: "Service Provider",
          sortable: true,
        },
        {
          key: "status",
          label: "Transaction Status",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Date",
          sortable: true,
        },
        "action",
      ],
    };
  },
  middleware: "authentication",
  // watch: {
  //   currentPage: function() {
  //     this.fetchTransactions()
  //   },
  // },
  computed: {
    ...mapGetters({
      transactions: "transaction/getTransactions",
    }),
    /**
     * Total no. of records
     */
    rows() {
      // return this.totalRows
      return this.transactions.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.fetchTransactions();
  },
  methods: {
    ...mapMutations({
      populateTransaction: "transaction/SET_TRANSACTIONS",
    }),
    getUser(record) {
      if (record.user != null) {
        const user = record.user.email;
        return user;
      } else if (record.user == null && record.receiver != null) {
        const receiver = record.receiver.email;
        return receiver;
      } else {
        return "Not available";
      }
    },
    gotoNext(value) {
      this.fetchTransactions(value);
    },
    fetchTransactions(page = 1) {
      this.isBusy = !this.isBusy;
      this.axios
        .get(BASE_URL + `/admin/transactions?page=${page}&per_page=50`)
        .then((res) => {
          const dataResponse = res.data?.data || [];
          const dataArrr = [];
          dataResponse.forEach((record) => {
            const u = {};
            u.id = record.id;
            u.reference_id =
              `${record.reference.slice(0, 15)}...` || "Not available";
            u.user_id = record.user?.id;
            // u.user_name = record.user != null ? record.first_name+' '+record.user.last_name:'Not available'
            u.user_name = this.getUser(record);
            u.amount = record.amount;
            u.type = record.title;
            u.provider = record.meta?.payment_type || "Not available";
            u.byadmin =
              record.meta_data && JSON.parse(record.meta_data).funded_by_admin
                ? JSON.parse(record.meta_data).funded_by_admin
                : false;
            // u.type = record.transaction_type
            u.status =
              record.status == 0
                ? "failed"
                : record.status == "delivered"
                ? "success"
                : record.status;
            u.created_at = record.created_at;

            // console.log(u)
            dataArrr.push(u);
            // dataArrr.unshift(u)
          });
          this.populateTransaction(dataArrr);
          this.totalRows = res.data?.meta?.total;
        })
        .catch((err) => {
          // this.error = true
          this.$refs.mytoast.Add({
            msg: err.response?.data?.error,
            clickClose: false,
            timeout: 5000,
            position: "toast-top-right",
            type: "error",
          });
          console.log(err.response.data);
          if (err.response.status == 401) {
            return this.$router.push({ path: "/login" });
          }
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    getPaymentInfo(item) {
      this.paymentInfo = item;
      this.paymentId = item.id;
      this.paymentRef = item.reference_id;
    },
    resolvePayment() {
      this.isBusy = true;
      this.axios
        .put(BASE_URL + "/admin/transactions/resolve/" + this.paymentRef)
        .then((res) => {
          console.log(res.data.data);
          this.fetchTransactions();
          this.$refs.mytoast.Add({
            msg: "Transaction resolved successfully",
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
          if (err.response.status == 401) {
            return this.$router.push({ path: "/login" });
          }
        })
        .finally(() => {
          this.isBusy = false;
        });
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
            :items="transactions"
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
            <!-- <template v-slot:cell(user_name)="data">
              <router-link
                :to="{
                  name: 'user-details',
                  params: { id: data.item.id },
                }"
                style="max-width: 200px;"
                class="d-inline-block text-truncate text-danger"
                >{{ data.item.user.name }}</router-link
              >
            </template> -->
            <!-- <template v-slot:cell(check)="data">
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
            </template> -->
            <template v-slot:cell(id)="data">
              <a href="javascript: void(0);" class="text-dark fw-bold">{{
                data.item.id
              }}</a>
            </template>

            <template v-slot:cell(user_name)="data">
              <router-link
                :to="{
                  name: 'user-details',
                  params: { id: data.item.user_id },
                }"
                style="max-width: 200px;"
                class="d-inline-block text-truncate text-info"
                >{{ data.item.user_name }}</router-link
              >
              <!-- <a href="#" class="text-body text-danger">{{ data.item.user_name }}</a> -->
            </template>
            <template v-slot:cell(status)="data">
              <div
                class="badge bg-pill bg-soft-success font-size-12"
                :class="{
                  'bg-soft-danger':
                    data.item.status === 'failed' ||
                    data.item.status === 'reversed',
                  'bg-soft-warning': data.item.status === 'pending',
                  'bg-soft-success': data.item.status === 'success',
                }"
              >
                {{
                  data.item.status == "failed"
                    ? "failed"
                    : data.item.status == "pending"
                    ? "pending"
                    : data.item.status == "success"
                    ? "success"
                    : data.item.status
                }}
              </div>
            </template>
            <template v-slot:cell(created_at)="data">
              <div>
                {{ data.item.created_at | formatDate }}
              </div>
            </template>
            <template v-slot:cell(action)="{ item }">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a
                    :href="'/management/transaction/' + item.id"
                    class="px-2 text-info"
                    v-b-tooltip.hover
                    title="View Transaction"
                  >
                    <i class="uil-eye font-size-20"></i>
                  </a>
                </li>
                <li v-if="item.status != 'success'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-success"
                    v-b-tooltip.hover
                    title="Resolve Payment"
                    @click="getPaymentInfo(item)"
                    v-b-modal.modal-resolve-payment
                    data-toggle="modal"
                  >
                    <i class="uil-money-withdrawal font-size-20"></i>
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
                >
                </b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
