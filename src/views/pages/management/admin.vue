<script>
    import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
import { BASE_URL } from '../../../baseconstant';
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, PageHeader, Multiselect, VueToastr },
      page: {
        title: "Admin",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Admin",
          isBusy: false,
          items: [
            {
              text: "App",
            },
            {
              text: "Admin",
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
          sortBy: "age",
          sortDesc: false,
          fields: [
            {
              key: "index",
              label: "S/N",
            },
            {
              key: "thumbnail",
              label: "Image",
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
              key: "role",
              label: "Role",
            },
            {
              key: "status",
              label: "Status",
            },
            "action",
          ],
          admin: {
            // id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role
          },
          options: [{name: 'admin', id:'admin'}],
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
          this.axios.get(BASE_URL+'/api/v1/admin/all?per_page=10000')
          .then((res) => {
              console.log(res.data.data);
              // this.totalRows = res.data.data.total
              res.data.data.data.map((g) => {
                g.role = g.roles.length > 0 ? g.roles[0].name:''
              })
              console.log(res.data.data.data)
              this.adminData = res.data.data.data
              this.fetchRoles();
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              this.isBusy =  false
          });
      },
      addAdmin() {
        this.admin.role = this.admin.role.id
        this.isBusy =  true
        console.log(this.admin)
        // return
        this.axios.post(BASE_URL+'/api/v1/admin/create', this.admin)
        .then(() => {
              // console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Admin Created Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              // console.log(err.response);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
          })
          .finally(() => {
              this.fetchData();
              this.isBusy =  false
          });
      },
      fetchRoles() {
        this.isBusy =  true
        this.axios.get(BASE_URL+'/api/v1/admin/roles')
        .then((res) => {
              console.log(res.data.data);
              this.options = res.data.data;
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              this.isBusy =  false
          });
      },
      getAdminInfo(item) {
        this.admin.id = item.id;
        this.admin.name = item.name;
        this.admin.email = item.email;
        this.admin.phone = item.phone;
        this.admin.role = item.role;
      },
      deleteAdmin() {
        this.isBusy =  true
        this.axios.delete(BASE_URL+'/api/v1/admin/' + this.admin.id + '/delete')
        .then((res) => {
              console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Admin Deleted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
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
      approveAdmin(id) {
        this.isBusy =  true
        this.axios.post(BASE_URL+'/api/v1/admin/' + id + '/approve')
        .then((res) => {
              console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Admin Approved Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
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
      restrictAdmin(id) {
        this.isBusy =  true
        this.axios.put(BASE_URL+'/api/v1/admin/' + id + '/restrict')
        .then((res) => {
              console.log(res.data.data);
              this.fetchData();
              this.$refs.mytoast.Add({
                msg: "Admin Restricted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
          })
          .catch((err) => {
              // console.log(err);
              this.$refs.mytoast.Add({
                msg: err.response.data.message,
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
            <button
            type="button"
            class="btn btn-primary mb-3 brand-primary"
            v-b-modal.modal-add-admin
          ><i class="mdi mdi-plus me-1"></i> Add New Admin
          </button>
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
                  <router-link :to="{ name: 'event-details', params: { id: data.item.id }}" style="color: #761300; max-width: 250px;"  class="d-inline-block text-truncate">{{data.item.title}}</router-link>
                </template>
  
                <!-- <template v-slot:cell(plans)>
                  <p>Premium Plan</p>
                </template> -->
  
                <template v-slot:cell(status)="data">
                  <div
                    class="badge bg-pill font-size-12"
                    :class="{
                      'bg-soft-success': data.item.status === 'active',
                      'bg-soft-danger': data.item.status === 'restricted',
                      'bg-soft-warning': data.item.status === 'pending',
                    }"
                  >
                    {{ data.item.status }}
                  </div>
                </template>
                <template v-slot:cell(start_date)="data">
                  <p>{{data.item.start_date | formatDate}}</p>
                </template>
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline mb-0" v-if="item.role == 'admin'">
                    <li v-if="item.status == 'restricted'" class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Approve"
                        v-b-modal.modal-edit-admin
                        @click="approveAdmin(item.id)"
                      >
                        <i class="uil uil-check-circle font-size-18 text-success"></i>
                      </a>
                    </li>
                    <li v-if="item.status == 'active'" class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Restrict"
                        v-b-modal.modal-edit-admin
                        @click="restrictAdmin(item.id)"
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
    