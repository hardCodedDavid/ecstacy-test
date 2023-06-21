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
      faqData: [],
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
          key: 'title',
          label: 'Question',
          sortable: true,
        },
        {
          key: 'body',
          label: 'Answer',
        },
        {
          key: 'slug',
          label: 'Slug',
          sortable: true,
        },
        'action',
      ],
      faq: {
        // id: this.id,
        question: this.question,
        answer: this.answer,
        faq_category_id: this.faq_category_id,
      },
      options: [{ name: 'admin', id: 'id' }],
      errorMessage: '',
    }
  },
  middleware: 'authentication',
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.faqData?.length
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.fetchData()
    this.fetchCategory()
  },
  methods: {
    fetchData() {
      this.isBusy = true
      this.axios
        .get(BASE_URL + '/admin/faq/all')
        .then((res) => {
          this.faqData = res.data?.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    addFAQ() {
      this.isBusy = true
      if (!this.faq.question) {
        this.errorMessage = 'Question is required'
      } else if (!this.faq.answer) {
        this.errorMessage = 'Answer is required'
      } else if (!this.faq.faq_category_id) {
        this.errorMessage = 'Category is required'
      }
      this.faq.faq_category_id = this.faq.faq_category_id.id
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
          .post(BASE_URL + '/admin/faq/create', this.faq)
          .then(() => {
            // console.log(res.data.data);
            this.fetchData()
            this.$refs.mytoast.Add({
              msg: 'Admin Created Successfully',
              clickClose: false,
              timeout: 5000,
              position: 'toast-top-right',
              type: 'success',
            })
            this.$bvModal.hide('modal-add-faq')
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
    fetchCategory() {
      this.isBusy = true
      this.axios
        .get(BASE_URL + '/admin/faq/category/all')
        .then((res) => {
          // console.log(res.data.data)
          const rolesArr = []
          res.data.data.map((d) => {
            let obj = {}
            obj.id = d.id
            obj.name = d.name
            rolesArr.push(obj)
          })
          // console.log(rolesArr)
          this.options = rolesArr
          // this.options = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    deleteAdmin() {
      this.isBusy = true
      this.axios
        .delete(BASE_URL + '/admin/faq/delete' + this.admin.id)
        .then((res) => {
          console.log(res.data.data)
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'FAQ Deleted Successfully',
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
      id="modal-add-faq"
      title="Add FAQ"
      title-class="font-18"
      hide-footer
    >
      <!-- <h5>Edit admin</h5> -->
      <label for="" class="m-2">Question: </label>
      <input
        type="text"
        v-model="faq.question"
        id="horizontal-firstname-input"
        placeholder="Enter question..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Answer: </label>
      <input
        type="email"
        v-model="faq.answer"
        id="horizontal-firstname-input"
        placeholder="Enter answer..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Category: </label>
      <multiselect
        class="m-2"
        v-model="faq.faq_category_id"
        :options="options"
        track-by="id"
        label="name"
      ></multiselect>

      <!-- <textarea v-model="admin.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button @click="addFAQ()" type="button" class="btn btn-primary">
          Save changes
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-add-faq')"
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
      <p>Are you sure you want to delete "{{ faq.question }}"</p>

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
          v-b-modal.modal-add-faq
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
            :items="faqData"
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

            <!-- <template v-slot:cell(plans)>
                  <p>Premium Plan</p>
                </template> -->
            <template v-slot:cell(start_date)="data">
              <p>{{ data.item.start_date | formatDate }}</p>
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
                    @click="getAdminInfo(item)"
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
