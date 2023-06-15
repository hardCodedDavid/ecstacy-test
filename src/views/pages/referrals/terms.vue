<script>
    import VueToastr from "vue-toastr";
    
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
import { BASE_URL } from '../../../baseconstant';
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, PageHeader, VueToastr },
      page: {
        title: "Referrals Terms",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Referrals Terms",
          isBusy: false,
          items: [
            {
              text: "App",
            },
            {
              text: "Referrals",
              active: true,
            },
          ],
          termsData: [],
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
              key: "title",
              label: "Title",
            },
            {
              key: "body",
              label: "Body",
            },
            "action",
          ],
          terms: {
            title: this.title,
            body: this.body,
          },
          role: {
            id: this.id,
            name: this.name,
            permissions: this.permissions,
          },
          options: [],
          permissions: [],
          allSelected: false,
          indeterminate: false,
        };
      },
      middleware: "authentication",
      computed: {
        /**
         * Total no. of records
         */
        rows() {
          return this.termsData.length;
        },
      },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.fetchData();
        this.fetchPermission();
      },
      methods: {
        toggleAll(checked) {
          this.permissions = checked ? this.options.slice() : []
        },
        fetchData() {
            this.isBusy =  true
            this.axios.get(BASE_URL+'/admin/terms/all')
            .then((res) => {
                // console.log(res.data.data);
                this.termsData = res.data.data
            })
            .catch((err) => {
                // console.log(err.response?.data?.error);
                this.$refs.mytoast.Add({
                msg: err.response?.data?.error,
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
        addTerms() {
            this.isBusy =  true

            this.axios.post(BASE_URL+'/admin/terms/create', this.terms)
            .then(() => {
                // console.log(res.data.data);
                this.fetchData();

                this.$refs.mytoast.Add({
                msg: "Terms Created Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
            })
            .catch((err) => {
                // console.log(err.response);
                this.$refs.mytoast.Add({
                msg: err.response?.data?.error,
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
        editTerms() {
            this.isBusy =  true

            this.axios.put(BASE_URL+'/admin/terms/update', this.terms)
            .then(() => {
                this.fetchData();

                this.$refs.mytoast.Add({
                msg: "Terms Edited Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              })
            })
            .catch((err) => {
                console.log(err);
                console.log(this.role);

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
        deleteRole() {
          console.log(this.role.id)
            this.axios.delete(BASE_URL+'/admin/terms/delete/' + this.terms.id)
            .then(() => {
                this.fetchData();

                this.$refs.mytoast.Add({
                msg: "Terms Deleted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              })
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
        fetchPermission(){
          this.axios.get(BASE_URL+'/admin/permissions')
          .then((res) => {
                // console.log(res.data.data);
                this.options = res.data.data;
            })
            .catch((err) => {
                // this.error = true
                // console.log(err);
                this.$refs.mytoast.Add({
                msg: err.response?.data?.error,
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
        emptyVal() {
            this.role.name = null;
            this.role.permissions = null;
            this.fetchPermission();
        },
        getRoleInfo(item) {
            // this.options = item.permissions
            this.terms.id = item.id
            this.terms.title = item.title
            this.terms.body = item.body
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
      watch: {
        permissions(newValue) {
        // Handle changes in individual flavour checkboxes
        if (newValue.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newValue.length === this.options.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      }
    }
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        <vue-toastr ref="mytoast"></vue-toastr>
        <!-- ::START ADD Terms Modal -->    
        <b-modal id="modal-add-terms" title="Add Terms" title-class="font-18" hide-footer>
              <label for="" class="m-2">Title: </label>
              <input type="text" v-model="terms.title" id="horizontal-firstname-input" placeholder="Enter title..." class="m-2 form-control">
              <label class="m-2">Body: </label>
              <textarea name="body" v-model="terms.body"  class="m-2 form-control" id="" cols="30" rows="10"></textarea>
              <div class="modal-footer">
                  <button @click="addTerms(), $bvModal.hide('modal-add-terms')" type="button" class="btn btn-primary">
                      Save changes
                  </button>
                  <b-button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="$bvModal.hide('modal-add-terms')"
                      >
                      Close
                  </b-button>
              </div>
          </b-modal>
        <!-- ::END ADD Terms Modal -->

        <!-- ::START EDIT Terms Modal -->    
        <b-modal id="modal-edit-terms" title="Edit Terms" title-class="font-18" hide-footer>
            <label for="" class="m-2">Title: </label>
              <input type="text" v-model="terms.title" id="horizontal-firstname-input" placeholder="Enter title..." class="m-2 form-control">
              <label class="m-2">Body: </label>
              <textarea name="body" v-model="terms.body"  class="m-2 form-control" id="" cols="30" rows="10"></textarea>
          
              
          <div class="modal-footer">
              <button @click="editTerms(), $bvModal.hide('modal-edit-terms')" type="button" class="btn btn-primary">
                  Save changes
              </button>
              <b-button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="$bvModal.hide('modal-edit-terms')"
                  >
                  Close
              </b-button>
          </div>
        </b-modal>
        <!-- ::END EDIT Terms Modal -->

        <!-- ::START GET Terms Modal -->    
        <b-modal id="modal-get-role" title="Role Details" title-class="font-18" hide-footer>
            <div>
              
              <p>Name: <strong>{{role.name}}</strong></p> 
              <p>Permissions: </p>
              <ul v-for="permission in role.permissions" :key="permission.id">
                  <li>
                      <strong>{{permission.name}}</strong>
                  </li>
              </ul> 
            </div>
            <div class="modal-footer">
                <b-button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="$bvModal.hide('modal-get-role')"
                    >
                    Close
                </b-button>
            </div>
        </b-modal>
        <!-- ::END GET Terms Modal -->

        <!-- ::START DELETE Terms Modal -->
        <b-modal id="modal-delete-terms" title="Delete Terms" title-class="font-18" hide-footer>
            <p>Are you sure you want to delete "{{terms.title}}" </p>
            
            <div class="modal-footer">
                <button @click="deleteRole(), $bvModal.hide('modal-delete-terms')" type="button" class="btn btn-primary">
                    Delete
                </button>
                <b-button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="$bvModal.hide('modal-delete-terms')"
                    >
                    Close
                </b-button>
            </div>
        </b-modal>
        <!-- ::END DELETE Terms Modal -->

        <div class="row">
          <div class="col-12">
            <button
            type="button"
            class="btn btn-primary mb-3 brand-primary"
            v-b-modal.modal-add-terms
            @click="emptyVal()"
          ><i class="mdi mdi-plus me-1"></i> Add New Terms
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
                :items="termsData"
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
    
                <template v-slot:cell(name)="data">
                  <a href="javascript:void(0)" v-b-modal.modal-get-role @click="getRoleInfo(data.item)">{{data.item.name}}</a>
                </template>
                
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Edit"
                        @click="getRoleInfo(item)"
                        v-b-modal.modal-edit-terms
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
                        @click="getRoleInfo(item)"
                        v-b-modal.modal-delete-terms
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
    