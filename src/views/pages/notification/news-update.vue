<script>
// import Multiselect from "vue-multiselect";
import VueToastr from 'vue-toastr'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'

/**
 * Orders component
 */
export default {
  // Multiselect,
  components: { Layout, PageHeader, VueToastr },
  page: {
    title: 'News',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'News Update',
      isBusy: false,
      items: [
        {
          text: 'App',
        },
        {
          text: 'News',
          active: true,
        },
      ],
      adminData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: 'age',
      sortDesc: false,
      form: {
        title: '',
        category: '',
        image: this.image,
        body: '',
      },
      // editor: ClassicEditor,
      error: {
        title: false,
        category: false,
        image: false,
        body: false,
      },
      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'thumbnail',
          label: 'Image',
        },
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'content',
          label: 'Content',
          sortable: false,
        },
        {
          key: 'status',
          label: 'Status',
        },
        'action',
      ],
      post: {
        id: this.id,
        title: this.title,
        content: this.content,
      },
      options: [{ name: 'admin', id: 'admin' }],
    }
  },
  middleware: 'authentication',
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.adminData?.length
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
        .get(BASE_URL + '/admin/news-updates?per_page=10000')
        .then((res) => {
          this.totalRows = res.data.data.total
          this.adminData = res.data?.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    addPost() {
      // this.post.role = this.post.role.id
      //   this.isBusy =  true
      //   console.log(this.admin)
      //   // return
      //   this.axios.post(BASE_URL+'/admin/create', this.admin)
      //   .then(() => {
      //         // console.log(res.data.data);
      //         this.fetchData();
      //         this.$refs.mytoast.Add({
      //           msg: "Admin Created Successfully",
      //           clickClose: false,
      //           timeout: 5000,
      //           position: "toast-top-right",
      //           type: "success",
      //         });
      //     })
      //     .catch((err) => {
      //         // console.log(err.response);
      //         this.$refs.mytoast.Add({
      //           msg: err.response?.data?.error,
      //           clickClose: false,
      //           timeout: 5000,
      //           position: "toast-top-right",
      //           type: "error",
      //         });
      //     })
      //     .finally(() => {
      //         this.fetchData();
      //         this.isBusy =  false
      //     });
    },
    getPostInfo(item) {
      this.post.id = item.id
      this.post.title = item.title
      this.post.content = item.content
    },
    deletePost() {
      this.isBusy = true
      console.log(this.post.id)
      this.axios
        .delete(BASE_URL + '/admin/news-updates/' + this.post.id)
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Post Deleted Successfully',
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
    publishPost(id) {
      this.isBusy = true
      this.axios
        .put(BASE_URL + '/admin/news-updates/' + id + '/approve')
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Post Approved Successfully',
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
    unPublishPost(id) {
      this.isBusy = true
      this.axios
        .put(BASE_URL + '/admin/news-updates/' + id + '/unpublish')
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Post unpublished successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          // console.log(err);
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
    <!-- <b-modal
      id="modal-add-post"
      title="Add Post"
      title-class="font-18"
      hide-footer
    >
      <form @submit="postBlog" method="post" enctype="multipart/form-data">
        <div class="row">
          <div class="col-12">
            <div class="mt-4">
              <b-form-group label="Title" label-for="title" class="mb-3">
                <b-form-input
                  type="text"
                  id="title"
                  v-model="form.title"
                  v-bind:class="{ 'is-invalid': error.title }"
                ></b-form-input>
              </b-form-group>
              <p class="text-danger" v-if="error.title">
                the title field is required
              </p>
            </div>
          </div>
          <div class="col-12">
            <div class="col-md-6">
              <b-form-group
                label="Image"
                label-for="formrow-image"
                class="mb-3"
              >
                <b-form-file
                  placeholder="Choose an image here..."
                  @change="onFileChange"
                  v-model="form.image"
                  :state="Boolean(form.image)"
                  v-bind:class="{ 'is-invalid': error.image }"
                ></b-form-file>
              </b-form-group>
              <p class="text-danger" v-if="error.image">
                the image field is required
              </p>
            </div>
            <div class="row">
              <div class="col-6" v-if="url">
                <div class="card border shadow-none">
                  <img
                    class="card-img-top img-fluid"
                    :src="url"
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mt-5 mt-lg-4">
              <b-form-group label="Body" label-for="formrow-body" class="mb-3">
                <ckeditor
                  v-bind:class="{ 'is-invalid': error.body }"
                  v-model="form.body"
                  :editor="editor"
                ></ckeditor>
              </b-form-group>
              <p class="text-danger" v-if="error.body">
                the body field is required
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </b-modal> -->
    <!-- ::END ADD Admin Modal -->

    <!-- ::START DELETE Admin Modal -->
    <b-modal
      id="modal-delete-admin"
      title="Delete Post"
      title-class="font-18"
      hide-footer
    >
      <p>Are you sure you want to delete "{{ post.title }}"</p>

      <div class="modal-footer">
        <button
          @click="deletePost(), $bvModal.hide('modal-delete-admin')"
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
        <!-- <button
          type="button"
          class="btn btn-primary mb-3 brand-primary"
        >
          <i class="mdi mdi-plus me-1"></i> Add Post
        </button> -->

        <router-link
          :to="{ name: 'addnews' }"
          style="color: #761300; max-width: 250px;"
          class="d-inline-block text-truncate"
        >
          <button type="button" class="btn btn-primary mb-3 brand-primary">
            <i class="mdi mdi-plus me-1"></i> New Post
          </button>
        </router-link>

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
            :items="adminData"
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
            <template v-slot:cell(thumbnail)="data">
              <img
                v-if="data.item.photo"
                :src="data.item.photo"
                alt
                class="avatar-xs rounded-circle me-2"
              />
              <div
                v-if="!data.item.photo"
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
              <router-link
                :to="{ name: 'news-details', params: { id: data.item.id } }"
                style="color: #761300; max-width: 250px;"
                class="d-inline-block text-truncate"
                >{{ data.item.title }}</router-link
              >
            </template>

            <template v-slot:cell(content)="data">
              <div style="color: #761300; max-width: 250px;">
                {{ data.item.content.substring(0, 90) }}...
              </div>
            </template>

            <template v-slot:cell(status)="data">
              <div
                style="color: #761300; max-width: 250px;"
                class="badge bg-pill font-size-12"
                :class="{
                  'bg-soft-success': data.item.status === 'published',
                  // 'bg-soft-danger': data.item.status === 'unp',
                  'bg-soft-warning': data.item.status === 'pending',
                }"
              >
                {{ data.item.status }}
              </div>
            </template>
            <template v-slot:cell(start_date)="data">
              <p>{{ data.item.start_date | formatDate }}</p>
            </template>
            <template v-slot:cell(action)="{ item }">
              <!-- v-if="item.role == 'admin'" -->
              <ul class="list-inline mb-0">
                <li v-if="item.status == 'pending'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Publish"
                    v-b-modal.modal-edit-admin
                    @click="publishPost(item.id)"
                  >
                    <i
                      class="uil uil-check-circle font-size-18 text-success"
                    ></i>
                  </a>
                </li>
                <li v-if="item.status == 'published'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Unpublish"
                    v-b-modal.modal-edit-admin
                    @click="unPublishPost(item.id)"
                  >
                    <i class="uil uil-info-circle font-size-18 text-danger"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-danger"
                    v-b-tooltip.hover
                    title="Delete"
                    v-b-modal.modal-delete-admin
                    @click="getPostInfo(item)"
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
