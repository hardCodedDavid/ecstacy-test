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
    title: "Blog",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Blog",
      items: [
        {
          text: "App",
        },
        {
          text: "Blog",
          active: true,
        },
      ],
      data: [],
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
          key: "check",
          label: "",
        },
        // {
        //   key: "id",
        //   label: "ID",
        // },
        {
          key: "title",
          label: "Title",
        },
        {
          key: "category.name",
          label: "Category",
          sortable: true,
        },
        {
          key: "body",
          label: "Body",
          sortable: true,
        },
        "action",
      ],
      isBusy: false,
    };
  },
  middleware: "authentication",
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.data.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.fetchBlog();
  },
  methods: {
    fetchBlog(){
        this.toggleBusy();
        this.axios.get('https://api.codedevents.com/admin/blog?page=1&per_page=50')
        .then((res) => {
            console.log(res.data.data);
            this.data = res.data.data;
        })
        .catch((err) => {
            // this.error = true
            console.log(err);
        })
        .finally(() => {
            this.isBusy =  false
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    toggleBusy() {
        this.isBusy = !this.isBusy
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div>
          <div class="float-end">
            <form class="d-inline-flex mb-3">
              <label class="my-1 me-2" for="order-selectinput">Blogs</label>
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
            <i class="mdi mdi-plus me-1"></i> Add New Blog
          </button>
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
            :items="data"
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
                >{{ data.id }}</a
              >
            </template>

            <template v-slot:cell(title)="data">
                <img
                    v-if="data.item.thumbnail"
                    :src="data.item.thumbnail"
                    alt
                    class="avatar-xs rounded-circle me-2"
                  />
                  <div
                    v-if="!data.item.thumbnail"
                    class="avatar-xs d-inline-block me-2"
                  >
                    <div
                      class="avatar-title bg-soft-primary rounded-circle text-primary"
                    >
                      <i class="mdi mdi-account-circle m-0"></i>
                    </div>
                  </div>
              <a href="#" class="text-body">{{ data.item.title }}</a>
            </template>
            <template v-slot:cell(body)="data">
              <p class="d-inline-block text-truncate" style="max-width: 150px;">{{ data.item.body }}</p>
            </template>
            <template v-slot:cell(status)="data">
              <div
                class="badge bg-pill bg-soft-success font-size-12"
                :class="{
                  'bg-soft-danger': data.item.status === 'Chargeback',
                  'bg-soft-warning': data.item.status === 'unpaid',
                }"
              >
                {{ data.item.status }}
              </div>
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
