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
    title: 'Provider',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'Manage Providers',
      isBusy: false,
      items: [
        {
          text: 'App',
        },
        {
          text: 'Providers',
          active: true,
        },
      ],
      providerData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [10, 20, 30, 50],
      filter: null,
      filterOn: [],
      sortBy: 'name',
      service_enabled: true,
      sortDesc: false,
      url: false,
      profile_photo: '',
      provider: {
        id: this.id,
        provider_name: this.name,
      },
      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'thumbnail',
          label: 'Thumbnail',
        },
        {
          key: 'name',
          label: 'Provider Name',
        },
        {
          key: 'products',
          label: 'Services ',
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'created_at',
          label: 'Date',
          sortable: true,
        },
        'action',
      ],
      admin: {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
      },
      options: null,
    }
  },
  middleware: 'authentication',
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.providerData.length
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.fetchData()
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.profile_photo = URL.createObjectURL(file)
    },
    fetchData() {
      this.isBusy = true
      this.axios
        .get(BASE_URL + '/admin/providers?per_page=10000')
        .then((res) => {
          //   console.log(res.data.data.data);
          const data = res.data?.data
          const dataArr = []
          //   console.log(data)
          data.forEach((user) => {
            let u = {}
            u.id = user.id
            u.thumbnail = user.logo
            u.name = user.name
            u.products = user.products.length
            u.status = user.status == 'enabled' ? 'enabled' : 'disabled'
            u.created_at = user.created_at

            dataArr.push(u)
          })
          //   console.log(dataArr)
          this.providerData = dataArr
          // this.fetchRoles();
        })
        .catch((err) => {
          //   console.log(err.response);
          this.$refs.mytoast.Add({
            msg: err.response.message || err.response.data.message,
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
    editProvider() {
      this.isBusy = true
      // provider: {
      //   id: this.id,
      //   provider_name: this.name,
      // },
      const formData = new FormData()
      // Append the method only if you are using a patch route in your server side
      // Append the file
      formData.append('provider_name', this.provider.provider_name)
      formData.append('photo', this.profile_photo)

      this.axios
        .post(
          BASE_URL + '/admin/providers/' + this.provider.id,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Provider Edited Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          // console.log(err);
          // console.log(this.role);
          this.$refs.mytoast.Add({
            msg: err.response.data.details,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
        })
        .finally(() => {
          this.isBusy = false
          this.url = ''
          this.profile_photo = ''
        })
    },
    deleteProvider(id) {
      this.isBusy = true
      this.axios
        .delete(BASE_URL + '/admin/providers/' + id)
        .then((res) => {
          this.$refs.mytoast.Add({
            msg: res.data.message,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
          this.fetchData()
        })
        .catch((err) => {
          this.$refs.mytoast.Add({
            msg: err.response.message || err.response.data.message,
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'error',
          })
          // console.log(err.response);
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    toggleServiceStatus(item){
      // console.log(id)
      // console.log(this.service_enabled)
      this.isBusy = true
      const status = item.status == 'enabled' ? 'disable':'enable'
      this.axios
        .put(BASE_URL + '/admin/providers/' + item.id +'/'+status)
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Service '+status+'d Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$refs.mytoast.Add({
            msg: err.response.data.message,
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
    enableProvider(id) {
      this.isBusy = true
      this.axios
        .put(BASE_URL + '/admin/providers/' + id + '/enable')
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Service enabled Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$refs.mytoast.Add({
            msg: err.response.data.message,
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
    disableProvider(id) {
      this.isBusy = true
      this.axios
        .put(BASE_URL + '/admin/providers/' + id + '/disable')
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Service disabled Successfully',
            clickClose: false,
            timeout: 5000,
            position: 'toast-top-right',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$refs.mytoast.Add({
            msg: err.response.data.details,
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
    getProviderInfo(item) {
      this.provider.id = item.id
      this.provider.provider_name = item.name
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
      id="modal-add-admin"
      title="Add Admin"
      title-class="font-18"
      hide-footer
    >
      <!-- <h5>Edit admin</h5> -->
      <label for="" class="m-2">Name: </label>
      <input
        type="text"
        v-model="admin.name"
        id="horizontal-firstname-input"
        placeholder="Enter admin name..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Email: </label>
      <input
        type="text"
        v-model="admin.email"
        id="horizontal-firstname-input"
        placeholder="Enter admin email..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Phone: </label>
      <input
        type="number"
        v-model="admin.phone"
        id="horizontal-firstname-input"
        placeholder="Enter admin phone..."
        class="m-2 form-control"
      />
      <label for="" class="m-2">Role: </label>
      <multiselect
        class="m-2"
        v-model="admin.role"
        :options="options"
        track-by="id"
        label="name"
      ></multiselect>

      <!-- <textarea v-model="admin.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button
          @click="addAdmin(), $bvModal.hide('modal-add-admin')"
          type="button"
          class="btn btn-primary"
        >
          Save changes
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-add-admin')"
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
      <p>Are you sure you want to delete "{{ admin.name }}"</p>

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

    <!-- ::START EDIT Role Modal -->
    <b-modal
      id="modal-edit-role"
      title="Edit Role"
      title-class="font-18"
      hide-footer
    >
      <label for="" class="m-2">Provider Name: </label>
      <input
        type="text"
        v-model="provider.provider_name"
        id="horizontal-firstname-input"
        placeholder="Enter provider name..."
        class="m-2 form-control"
      />

      <img
        class="avatar-lg rounded-circle img-thumbnail"
        :src="url"
        alt="Card image cap"
      />
      <b-form-file
        placeholder="Choose an image here..."
        @change="onFileChange"
        v-model="profile_photo"
        :state="Boolean(profile_photo)"
      ></b-form-file>

      <!-- <textarea v-model="role.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
      <div class="modal-footer">
        <button
          @click="editProvider(), $bvModal.hide('modal-edit-role')"
          type="button"
          class="btn btn-primary"
        >
          Save changes
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-edit-role')"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <!-- ::END EDIT Role Modal -->

    <div class="row">
      <div class="col-12">
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
            :items="providerData"
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

            <template v-slot:cell(name)="data">
              <router-link
                :to="{ name: 'user-details', params: { id: data.item.id } }"
                style="color: #761300; max-width: 250px;"
                class="d-inline-block text-truncate text-dark"
                >{{ data.item.name }}</router-link
              >
            </template>

            <template v-slot:cell(created_at)="data">
              <div>
                {{ data.item.created_at | formatDate }}
              </div>
            </template>

            <template v-slot:cell(status)="data">
              <div
                class="badge bg-pill font-size-12"
                :class="{
                  'bg-soft-success': data.item.status === 'enabled',
                  'bg-soft-danger': data.item.status === 'disabled',
                }"
              >
                <span v-if="data.item.status">{{ data.item.status }}</span>
                <!-- <span v-if="!data.item.status">Unverified</span> -->
              </div>
            </template>

            <!-- <template v-slot:cell(status)="data">
                  <div
                    class="badge bg-pill font-size-12"
                    :class="{
                      'bg-soft-success': data.item.status == 'approved',
                      'bg-soft-danger': data.item.status == 'restricted',
                      'bg-soft-warning': data.item.status == 'pending',
                    }"
                  >
                    <span>{{data.item.status}}</span>
                  </div>
                </template> -->

            <template v-slot:cell(start_date)="data">
              <p>{{ data.item.start_date | formatDate }}</p>
            </template>
            <template v-slot:cell(action)="{ item }">
              <ul class="list-inline mb-0">
                <li
                  class="list-inline-item"
                  v-if="
                    item.name === 'mysimhosting.cloud' ||
                      item.name == 'Mysimhosting' ||
                      item.name == 'mysimhosting'
                  "
                >
                  <a
                    href="javascript:void(0);"
                    class="text-info"
                    v-b-tooltip.hover
                    title="Provider"
                    ><router-link
                      class="text-info"
                      :to="{
                        name: 'mysimhosting-details'
                      }"
                      v-b-tooltip.hover
                      title="Provider"
                      ><i class="uil uil-eye font-size-18"></i
                    ></router-link>
                  </a>
                </li>
                <li class="list-inline-item" v-else>
                  <a
                    href="javascript:void(0);"
                    class="text-info"
                    v-b-tooltip.hover
                    title="Provider"
                    ><router-link
                      class="text-info"
                      :to="{
                        name: 'provider-details',
                        params: { id: item.id },
                      }"
                      v-b-tooltip.hover
                      title="Provider"
                      ><i class="uil uil-eye font-size-18"></i
                    ></router-link>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                    @click="getProviderInfo(item)"
                    v-b-modal.modal-edit-role
                  >
                    <i class="uil uil-pen font-size-18"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                 <toggle-button @change="toggleServiceStatus(item)" :sync="true" :value="item.status=='disabled'?false:true" :labels="{checked: 'On', unchecked: 'Off'}"/>
                </li>
                <!-- <li v-if="item.status == 'disabled'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Enable"
                    v-b-modal.modal-edit-admin
                    @click="enableProvider(item.id)"
                  >
                    <i
                      class="uil uil-check-circle font-size-18 text-success"
                    ></i>
                  </a>
                </li> -->
                <!-- <li v-if="item.status == 'enabled'" class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Disable"
                    v-b-modal.modal-edit-admin
                    @click="disableProvider(item.id)"
                  >
                    <i class="uil uil-info-circle font-size-18 text-danger"></i>
                  </a>
                </li> -->
                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Delete"
                    v-b-modal.modal-edit-admin
                    @click="deleteProvider(item.id)"
                  >
                    <i class="uil uil-trash font-size-18 text-danger"></i>
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
