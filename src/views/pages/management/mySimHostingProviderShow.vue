<script>
// import Multiselect from 'vue-multiselect'
import VueToastr from 'vue-toastr'

import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import { BASE_URL } from '../../../baseconstant'

/**
 * Orders component
 */
export default {
  components: { Layout, PageHeader, VueToastr },
  page: {
    title: 'Service',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'Manage Services',
      isBusy: false,
      items: [
        {
          text: 'App',
        },
        {
          text: 'Services',
          active: true,
        },
      ],
      providerData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 40,
      pageOptions: [40, 100, 200, 400],
      filter: null,
      filterOn: [],
      sortBy: 'name',
      sortDesc: false,
      url: false,
      profile_photo: null,
      product: {
        id: this.id,
        name: this.plan,
        amount: this.amount,
        type: this.type
      },
      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        // {
        //   key: 'plan_id',
        //   label: 'Plan ID',
        // },
        {
          key: 'thumbnail',
          label: 'Thumbnail',
        },
        {
          key: 'network',
          label: 'Network',
        },
        {
          key: 'plan',
          label: 'Name',
        },
        {
          key: 'amount',
          label: 'Amount',
        },
        {
          key: 'type',
          label: 'Plan Type',
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
    // console.log(this.$route.params.id)
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.profile_photo = URL.createObjectURL(file)
    },
    getProductInfo(item) {
      this.product.id = item.id
      this.product.name = item.network
      this.product.type = item.type
      this.product.amount = item.amount
    },
    editProduct() {
      this.isBusy = true
      // provider: {
      //   id: this.id,
      //   provider_name: this.name,
      // },
      const formData = new FormData()
      // Append the method only if you are using a patch route in your server side
      // Append the file
    //   formData.append('service_name',this.product.name)
    //   formData.append('type', this.product.type)
    if(this.profile_photo != '') {
      formData.append('logo', this.profile_photo)
    }
      // formData.append('product_id', this.product.id)
      formData.append('amount', this.product.amount)

      this.axios
        .post(
          BASE_URL + '/admin/provider/' + this.product.id+'/products/update',
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        )
        .then(() => {
          this.fetchData()

          this.$refs.mytoast.Add({
            msg: 'Product Edited Successfully',
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
            msg: err.response?.data?.error,
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
    fetchData() {
      this.isBusy = true
      // console.log('check')
      this.axios
        .get(
          BASE_URL +
            '/admin/provider/mysimhosting/products?per_page=10000'
        )
        .then((res) => {
          //   console.log(res.data.data.data);
          const data = res.data.data
          
          const dataArr = []
            console.log(data)
          data.forEach((user) => {
            let u = {}
            u.id = user.id
            // u.plan_id = user.plan_id
            u.thumbnail = user.thumbnail
            u.network = user.network
            u.plan = user.plan
            u.amount = user.amount
            u.type = user.type
            u.status = user.status == 'enable' ? 'enabled' : 'disabled'
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
            msg: err.response.message || err.response?.data?.error,
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
            msg: err.response?.message || err.response.data.error,
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
      const status = item.status == 'enabled' ? 'disable-mysimhosting':'enable-mysimhosting'
      const showStatus = item.status == 'enabled' ? 'disabled':'enabled'
      this.axios
        .put(BASE_URL + '/admin/providers/' + item.id + '/products/'+status)
        .then(() => {
          // console.log(res.data.data);
          this.fetchData()
          this.$refs.mytoast.Add({
            msg: 'Service '+showStatus+' Successfully',
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
    enableService(id) {
      this.isBusy = true
      this.axios
        .put(BASE_URL + '/admin/providers/' + id + '/products/enable-mysimhosting')
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
    disableService(id) {
      this.isBusy = true
      console.log(id)
      this.axios
        .put(BASE_URL + '/admin/providers/' + id + '/products/disable-mysimhosting')
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

    <!-- ::START EDIT Role Modal -->
    <b-modal
      id="modal-edit-product"
      title="Edit Service"
      title-class="font-18"
      hide-footer
    >
      <label for="" class="m-2">Product Name: </label>
      <input
        type="text"
        v-model="product.name"
        readonly
        id="horizontal-firstname-input"
        placeholder="Enter product name..."
        class="m-2 form-control"
      />

      <label for="" class="m-2">Product Type: </label>
      <input
        type="text"
        v-model="product.type"
        readonly
        id="horizontal-firstname-input"
        placeholder="Enter product type..."
        class="m-2 form-control"
      />

      <label for="" class="m-2">Amount: </label>
      <input
        type="text"
        v-model="product.amount"
        id="horizontal-firstname-input"
        placeholder="Enter product amount..."
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
          @click="editProduct(), $bvModal.hide('modal-edit-product')"
          type="button"
          class="btn btn-primary"
        >
          Save changes
        </button>
        <b-button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="$bvModal.hide('modal-edit-product')"
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
                <!-- <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="text-info"
                        v-b-tooltip.hover
                        title="Provider"
                      ><router-link 
                        class="text-info"
                        :to="{ name: 'provider-details', params: { id: item.id }}"
                        v-b-tooltip.hover
                        title="Provider"
                      ><i class="uil uil-eye font-size-18"></i></router-link>
                        
                      </a>
                    </li> -->

                <li class="list-inline-item">
                  <a
                    href="javascript:void(0);"
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                    @click="getProductInfo(item)"
                    v-b-modal.modal-edit-product
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
                    title="Enable service"
                    v-b-modal.modal-edit-admin
                    @click="enableService(item.id)"
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
                    title="Disable service"
                    v-b-modal.modal-edit-admin
                    @click="disableService(item.id)"
                  >
                    <i class="uil uil-info-circle font-size-18 text-danger"></i>
                  </a>
                </li> -->
                <!-- <li class="list-inline-item">
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
                    </li> -->
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
