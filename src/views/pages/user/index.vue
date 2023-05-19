<script>
    import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
import { BASE_URL } from "../../../baseconstant"
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, PageHeader, Multiselect, VueToastr },
      page: {
        title: "User",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Manage Users",
          isBusy: false,
          items: [
            {
              text: "App",
            },
            {
              text: "Users",
              active: true,
            },
          ],
          adminData: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 20,
          pageOptions: [10, 20, 30, 50],
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
              key: "name",
              label: "Name",
            },
            {
              key: "email",
              label: "Email",
              sortable: true,
            },
            {
              key: "phone",
              label: "Phone",
              sortable: true,
            },
            {
              key: "country",
              label: "Country",
            },
            {
              key: "wallet_balance",
              label: "Wallet Balance",
            },
            {
              key: "total_transactions",
              label: "Total Transactions",
            },
            {
              key: "status",
              label: "Status",
            },
            {
              key: "created_at",
              label: "Date",
              sortable: true,
            },
            "action",
          ],
          admin: {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role
          },
          options: null,
        };
      },
      middleware: "authentication",
      computed: {
        /**
         * Total no. of records
         */
        rows() {
          return this.adminData.length;
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
          this.axios.get(BASE_URL+'/admin/users/all?per_page=2000',{})
          .then((res) => {
              const users = res.data?.data
              const userArr = []
              users.forEach(user => {
                let u = {}
                u.name = user.first_name+' '+user.last_name
                u.id = user.id
                u.email = user.email
                u.phone = user.phone
                u.country = user.country
                u.wallet_balance = user.wallet_balance
                u.total_transactions = user.total_transactions
                // u.status = user.email_verified_at !== null ? 'verified':'unverified'
                u.status = user.status === 'verified' ? 'verified':user.status === 'unverified' ? 'unverified':'restricted'
                u.created_at = user.created_at

                userArr.push(u)
              });
              this.adminData = userArr
              // this.fetchRoles();
          })
          .catch((err) => {
              console.log(err.response);
              this.$refs.mytoast.Add({
                msg: err.response?.message || err.response?.data?.message,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
          })
          .finally(() => {
              this.isBusy =  false
          });
      },
      deleteUser(id) {
        this.isBusy =  true
          this.axios.delete(BASE_URL+'/admin/delete-user/'+id,{})
          .then((res) => {
            this.$refs.mytoast.Add({
                msg: res.data.message,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
              this.fetchData()
          })
          .catch((err) => {
            this.$refs.mytoast.Add({
                msg: err.response.message || err.response?.data?.error,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
              // console.log(err.response);
          })
          .finally(() => {
              this.isBusy =  false
          });
      },
      approveUser(id) {
        this.isBusy =  true
        this.axios.put(BASE_URL+'/admin/user-action/' + id+'/approve')
        .then(() => {
              // console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "User Approved Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.details,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
          })
          .finally(() => {
              this.isBusy =  false
          });
      },
      restrictUser(id) {
        this.isBusy =  true
        this.axios.put(BASE_URL+'/admin/user-action/' + id+'/restrict')
        .then(() => {
              // console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "User Restricted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.details,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
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
        <vue-toastr ref="mytoast"></vue-toastr>
        <!-- ::START ADD admin Modal -->    
        <b-modal id="modal-add-admin" title="Add Admin" title-class="font-18" hide-footer>
              <!-- <h5>Edit admin</h5> -->
              <label for="" class="m-2">Name: </label>
              <input type="text" v-model="admin.name" id="horizontal-firstname-input" placeholder="Enter admin name..." class="m-2 form-control">
              <label for="" class="m-2">Email: </label>
              <input type="text" v-model="admin.email" id="horizontal-firstname-input" placeholder="Enter admin email..." class="m-2 form-control">
              <label for="" class="m-2">Phone: </label>
              <input type="number" v-model="admin.phone" id="horizontal-firstname-input" placeholder="Enter admin phone..." class="m-2 form-control">
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
                  <button @click="addAdmin(), $bvModal.hide('modal-add-admin')" type="button" class="btn btn-primary">
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
         <b-modal id="modal-delete-admin" title="Delete Admin" title-class="font-18" hide-footer>
            <p>Are you sure you want to delete "{{admin.name}}" </p>
            
            <div class="modal-footer">
                <button @click="deleteAdmin(), $bvModal.hide('modal-delete-admin')" type="button" class="btn btn-primary">
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
                <!-- <template v-slot:cell(thumbnail)="data">
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
              </template> -->
    
                <template v-slot:cell(name)="data">
                  <router-link :to="{ name: 'user-details', params: { id: data.item.id }}" style="color: #761300; max-width: 250px;"  class="d-inline-block text-truncate text-dark">{{data.item.name}}</router-link>
                </template>
  
                <template v-slot:cell(created_at)="data">
                  <div >
                    {{ data.item.created_at | formatDate }}
                  </div>
                </template>
  
                <template v-slot:cell(status)="data">
                  <div
                    class="badge bg-pill font-size-12"
                    :class="{
                      'bg-soft-success': data.item.status === 'verified',
                      'bg-soft-danger': data.item.status === 'unverified',
                      'bg-soft-warning': data.item.status === 'restricted',
                    }"
                  >
                    <span v-if="data.item.status">{{data.item.status}}</span>
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
                  <p>{{data.item.start_date | formatDate}}</p>
                </template>
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline no-wrap mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="text-info"
                        v-b-tooltip.hover
                        title="User"
                      ><router-link 
                        class="text-info"
                        :to="{ name: 'user-details', params: { id: item.id }}"
                        v-b-tooltip.hover
                        title="User"
                      ><i class="uil uil-eye font-size-18"></i></router-link>
                        
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Delete"
                        v-b-modal.modal-edit-admin
                        @click="deleteUser(item.id)"
                      >
                        <i class="uil uil-trash font-size-18 text-danger"></i>
                      </a>
                    </li>
                    <li v-if="item.status == 'unverified' || item.status == 'restricted' " class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Approve"
                        v-b-modal.modal-edit-admin
                        @click="approveUser(item.id)"
                      >
                        <i class="uil uil-check-circle font-size-18 text-success"></i>
                      </a>
                    </li>
                    <li v-if="item.status == 'verified'" class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Restrict"
                        v-b-modal.modal-edit-admin
                        @click="restrictUser(item.id)"
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
    