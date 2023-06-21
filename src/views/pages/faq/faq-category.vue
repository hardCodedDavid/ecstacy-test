<script>
import Multiselect from 'vue-multiselect'
import VueToastr from 'vue-toastr'

import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'

/**
 * Orders component
 */
export default {
  components: { Layout, PageHeader, Multiselect, VueToastr },
  page: {
    title: 'FAQ',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'FAQ',
      isBusy: false,
      items: [
        {
          text: 'App',
        },
        {
          text: 'FAQ',
          active: true,
        },
      ],
      faqCategoryData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [50],
      filter: null,
      filterOn: [],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'status',
          label: 'Status',
        },
        'action',
      ],
      faq_category: {
        // id: this.id,
        name: this.name,
        status: this.status,
      },
      options: [
        {
          name: 'active'
        },
        {
          name: 'inactive'
        }
      ],
      errorMessage: '',
    }
  },
  middleware: 'authentication',
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.faqCategoryData?.length
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isBusy = true
      this.axios
        .get(BASE_URL + '/admin/faq/category/all')
        .then((res) => {
          this.faqCategoryData = res.data?.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    addFAQCategory() {
      this.isBusy = true
      if (!this.faq_category.name) {
        this.errorMessage = 'Name is required'
      } else if (!this.faq_category.status) {
        this.errorMessage = 'Status is required'
      }
      this.faq_category.status = this.faq_category.status.name
      if (this.errorMessage != '') {
        this.$refs.mytoast.Add({
          msg: this.errorMessage,
          clickClose: false,
          timeout: 5000,
          position: 'toast-top-right',
          type: 'error',
        })
        this.isBusy = false
      }

      if (this.isBusy === true) {
        this.axios
          .post(BASE_URL + '/admin/faq/category/create', this.faq_category)
          .then(() => {
            this.$bvModal.hide('modal-add-faq-category')
            this.fetchData()
            this.$refs.mytoast.Add({
              msg: 'FAQ Category Created Successfully',
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'success',
            })
          })
          .catch((err) => {
            console.log(err.response)
            this.$refs.mytoast.Add({
              msg: err.response?.data?.error,
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'error',
            })
          })
          .finally(() => {
            this.isBusy = false
          })
      }
    },
    deleteFAQCategory(id) {
      this.isBusy = true
      this.axios
        .delete(BASE_URL + '/admin/faq/category/delete/' + id)
        .then(() => {
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Category Deleted Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$refs.mytoast.Add({
            msg: err.response?.data?.error,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.isBusy = false
        })
    },

    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <vue-toastr ref="mytoast"></vue-toastr>
    <!-- ::START ADD admin Modal -->
    <b-modal
      id="modal-add-faq-category"
      title="Add FAQ"
      title-class="font-18"
      hide-footer
    >
      <!-- <h5>Edit admin</h5> -->
      <label for="" class="m-2">Name: </label>
      <input
        type="text"
        v-model="faq_category.name"
        id="horizontal-firstname-input"
        placeholder="Enter category name..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Status: </label>
      <multiselect
        class="m-2"
        v-model="faq_category.status"
        :options="options"
        track-by="id"
        label="name"
      ></multiselect>

      <!-- <textarea v-model="admin.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button @click="addFAQCategory()" type="button" class="btn btn-primary">
          Save changes
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-add-faq-category')"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <!-- ::END ADD Admin Modal -->

    <!-- ::START DELETE Admin Modal -->
    <b-modal
      id="modal-delete-admin"
      title="Delete Admin"
      title-class="font-18"
      hide-footer
    >
      <p>Are you sure you want to delete "{{ faq_category.name }}"</p>

      <div class="modal-footer">
        <button
          @click="deleteAdmin(), $bvModal.hide('modal-delete-admin')"
          type="button"
          class="btn btn-primary"
        >
          Delete
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-delete-admin')"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <!-- ::END DELETE Admin Modal -->

    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-primary mb-3 brand-primary"
          v-b-modal.modal-add-faq-category
        >
          <i class="mdi mdi-plus me-1"></i> Add New FAQ
        </button>
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
            :items="faqCategoryData"
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
            <template v-slot:cell(action)="{ item }">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    v-b-modal.modal-delete-admin
                    @click="deleteFAQCategory(item.id)"
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
