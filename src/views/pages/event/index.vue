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
      title: "Events",
      meta: [
        {
          name: "description",
          content: appConfig.description,
        },
      ],
    },
    data() {
      return {
        title: "Events",
        isBusy: false,
        items: [
          {
            text: "App",
          },
          {
            text: "Events",
            active: true,
          },
        ],
        eventData: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "age",
        sortDesc: false,
        fields: [
          {
            key: "index",
            label: "S/N",
          },
          {
            key: "banner",
            label: "Image",
          },
          {
            key: "title",
            label: "Name",
            sortable: true,
          },
          {
            key: "category.name",
            label: "Category",
            sortable: true,
          },
          {
            key: "host",
            label: "Creator",
            sortable: true,
          },
          {
            key: "plans",
            label: "Plan",
            sortable: true,
          },
          {
            key: "status",
            label: "Event Status",
            sortable: true,
          },
          {
            key: "start_date",
            label: "Start Date",
            sortable: true,
          },
          // "action",
        ],
      };
    },
    middleware: "authentication",
    computed: {
      /**
       * Total no. of records
       */
      rows() {
        return this.eventData.length;
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.isBusy =  true
        this.axios.get('https://api.codedevents.com/admin/events?page=1&per_page=50')
        .then((res) => {
            console.log(res.data.data);
            this.eventData = res.data.data
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.isBusy =  false
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
      <div class="row">
        <div class="col-12">
          <div>
            <!-- <div class="float-end">
              <form class="d-inline-flex mb-3">
                <label class="my-1 me-2" for="order-selectinput">Orders</label>
                <select class="form-select" id="order-selectinput">
                  <option selected="">All</option>
                  <option value="1">Active</option>
                  <option value="2">Unpaid</option>
                </select>
              </form>
            </div> -->
            <!-- <button
              type="button"
              class="btn btn-success mb-3 brand-primary"
            >
              <i class="mdi mdi-plus me-1"></i> Add New Order
            </button> -->
          </div>
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
              :items="eventData"
              :fields="fields"
              responsive="sm"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
            >
              <template #table-busy>
                  <div class="text-center text-primary my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                  </div>
              </template>
              <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template v-slot:cell(banner)="data">
              <img
                    v-if="data.item.banner"
                    :src="data.item.banner"
                    alt
                    class="avatar-xs rounded-circle me-2"
                  />
                  <div
                    v-if="!data.item.banner"
                    class="avatar-xs d-inline-block me-2"
                  >
                    <div
                      class="avatar-title bg-soft-primary rounded-circle text-primary"
                    >
                      <i class="mdi mdi-account-circle m-0"></i>
                    </div>
                  </div>
            </template>
  
              <template v-slot:cell(title)="data">
                <router-link :to="{ name: 'event-details', params: { id: data.item.id }}" style="color: #761300; max-width: 250px;"  class="d-inline-block text-truncate">{{data.item.title}}</router-link>
              </template>

              <template v-slot:cell(plans)>
                <p>Premium Plan</p>
              </template>

              <template v-slot:cell(status)="data">
                <div
                  class="badge bg-pill bg-soft-info font-size-12"
                  :class="{
                    'bg-soft-success': data.item.status === 'active',
                    'bg-soft-danger': data.item.status === 'expired',
                    'bg-soft-warning': data.item.status === 'pending',
                  }"
                >
                  {{ data.item.status }}
                </div>
              </template>
              <template v-slot:cell(start_date)="data">
                <p>{{data.item.start_date | formatDate}}</p>
              </template>
              <template v-slot:cell(action)>
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <a
                      href="javascript:void(0);"
                      class="px-2 text-primary"
                      v-b-tooltip.hover
                      title="Edit"
                    >
                      <i class="uil uil-pen font-size-18"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript:void(0);"
                      class="px-2 text-danger"
                      v-b-tooltip.hover
                      title="Delete"
                    >
                      <i class="uil uil-trash-alt font-size-18"></i>
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
  