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
      perPage: 50,
      pageOptions: [50, 100, 200, 500],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [
        {
          key: "index",
          label: "S/N",
        },
        // {
        //   key: "image",
        //   label: "Image",
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
        {
          key: "created_at",
          label: "Date",
          sortable: true,
        },
        {
          key: "action",
          label: "Action",
        },
      ],
      isBusy: false,
      blogInfo: null,
      blogInfoId: null,
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
        this.axios.get('https://api.codedevents.com/admin/blog?page=1&per_page=10000')
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
    },
    getBlogDetails(data){
        this.blogInfo = data.item.title;
        this.blogInfoId = data.item.id;
    },
    deleteBlog(){
        this.toggleBusy();
        this.axios.delete('https://api.codedevents.com/admin/blog/' + this.blogInfoId)
        .then((res) => {
            console.log(res.data.data);
            this.fetchBlog();
        })
        .catch((err) => {
            // this.error = true
            console.log(err);
        })
        .finally(() => {
            this.isBusy =  false
        });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

<!-- ::START DELETE category Modal -->
        
        <b-modal id="modal-delete-category" title="Delete Blog" title-class="font-18" hide-footer>
            <p>Are you sure you want to delete "{{blogInfo}}" </p>
            
            <div class="modal-footer">
                <button @click="deleteBlog(), $bvModal.hide('modal-delete-category')" type="button" class="btn btn-primary">
                    Delete
                </button>
                <b-button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="$bvModal.hide('modal-delete-category')"
                    >
                    Close
                </b-button>
            </div>
        </b-modal>

      <!-- ::END DELETE category Modal -->
    <div class="row">
      <div class="col-12">
        <div>
          <div class="float-end">
            <!-- <form class="d-inline-flex mb-3">
              <label class="my-1 me-2" for="order-selectinput">Blogs</label>
              <select class="form-select" id="order-selectinput">
                <option selected="">All</option>
                <option value="1">Active</option>
                <option value="2">Unpaid</option>
              </select>
            </form> -->
          </div>
          <button
            type="button"
            class="btn btn-success mb-3 brand-primary"
          >
          <router-link :to="{ name: 'blog-create'}" class="text-white"><i class="mdi mdi-plus me-1"></i> Add New Blog</router-link>
            
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
                >{{ data.id }}</a
              >
            </template>
            <template v-slot:cell(image)="data">
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
            </template>

            <template v-slot:cell(title)="data">
              <router-link :to="{ name: 'blog-details', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
            </template>
            <template v-slot:cell(body)="data">
              <p class="text-truncate" style="max-width: 450px;">{{ data.item.body | truncate(80, '...') }}</p>
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
            <template v-slot:cell(created_at)="data">
              <div >
                {{ data.item.created_at | formatDate }}
              </div>
            </template>
            <template v-slot:cell(action)="data">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                  >
                  <router-link :to="{ name: 'blog-edit', params: { id: data.item.id }}">
                    <i class="uil uil-pen font-size-18"></i>
                  </router-link>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    @click="getBlogDetails(data)"
                    v-b-modal.modal-delete-category
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
