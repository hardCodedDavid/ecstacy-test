<script>
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, PageHeader },
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
      perPage: 20,
      pageOptions: [20, 40, 50],
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
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'title',
          label: 'Title',
          sortable: true,
        },
        {
          key: 'amount',
          label: 'Amount',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Type',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Payment Status',
          sortable: true,
        },
        {
          key: 'created_at',
          label: 'Date',
          sortable: true,
        },
        // "action",
      ],
        };
      },
      middleware: "authentication",
      watch: {
    currentPage: function() {
      this.fetchPayments()
    },
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.totalRows
    },
  },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.fetchPayments();
      },
      methods: {
        fetchPayments(){
            this.isBusy = !this.isBusy
            this.axios
        .get(
          'https://api.ecstasynigeria.com/api/v1/admin/withdrawals?page=' +
            this.currentPage +
            '&per_page=' +
            this.perPage
        )
        .then((res) => {
          const dataResponse = res.data.data
          // console.log(dataResponse)
          const dataArrr = []
          dataResponse.data.forEach((record) => {
            const u = {}
            u.id = record.id
            u.title = record.title
            u.amount = record.amount
            u.type = record.transaction_type
            u.status = record.status
            u.created_at = record.updated_at

            dataArrr.push(u)
          })
          this.paymentData = dataArrr
          this.totalRows = dataResponse.total
        })
        .catch((err) => {
          // this.error = true
          console.log(err)
          // console.log(err.response)
          if(err.response.status == 401) {
            return this.$router.push({path: '/login'})
          }
        })
        .finally(() => {
          this.isBusy = false
        })
        },
        approveWithdrawal(id){
            this.isBusy = !this.isBusy
            this.axios.post('https://api.codedevents.com/admin/transactions/withdrawals/' + id + '/approve')
            .then((res) => {
                console.log(res.data.data);
                this.fetchPayments();
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        declineWithdrawal(id){
            this.isBusy = !this.isBusy
            this.axios.post('https://api.codedevents.com/admin/transactions/withdrawals/' + id + '/decline')
            .then((res) => {
                console.log(res.data.data);
                this.fetchPayments();
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
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
        <!-- ::START POST Resolve Payment Modal -->
            <!-- {{paymentData}} -->
        <b-modal id="modal-resolve-payment" title="Resolve Payment" title-class="font-18" hide-footer>
                <p>Are you sure you want to Resolve this Payment "{{paymentRef}}" </p>
                
                <div class="modal-footer">
                    <button @click="resolvePayment(), $bvModal.hide('modal-resolve-payment')" type="button" class="btn btn-success">
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
            <div class="table table-centered datatable dt-responsive nowrap table-card-list dataTable no-footer dtr-inline">
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
                :items="paymentData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
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
                  <a
                    href="javascript: void(0);"
                    class="text-dark fw-bold"
                    >{{ data.item.id }}</a
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
                  <div >
                    {{ data.item.created_at | formatDate }}
                  </div>
                </template>
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline mb-0">
                    <li v-if="item.status == 'pending'" class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Approve"
                        v-b-modal.modal-edit-admin
                        @click="approveWithdrawal(item.id)"
                      >
                        <i class="uil uil-check-circle font-size-18 text-success"></i>
                      </a>
                    </li>
                    <li v-if="item.status == 'pending'" class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Restrict"
                        v-b-modal.modal-edit-admin
                        @click="declineWithdrawal(item.id)"
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
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </template>
    