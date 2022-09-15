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
        title: "Permissions",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Permissions",
          items: [
            {
              text: "App",
            },
            {
              text: "Permissions",
              active: true,
            },
          ],
          orderData: [],
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
              key: "name",
              label: "Name",
              sortable: true,
            },
            {
              key: "description",
              label: "Description",
              sortable: true,
            },
            "action",
          ],
          permissionName: null,
          permissionDesc: null,
          deleteModal: false,
          permissionInfo: '',
          isBusy: false,
        };
      },
      middleware: "authentication",
      computed: {
        /**
         * Total no. of records
         */
        rows() {
          return this.orderData.length;
        },
      },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.fetchPermission();
        
      },
      methods: {
        fetchPermission(){
            this.toggleBusy();
            this.axios.get('https://api.codedevents.com/admin/plans/permissions')
            .then((res) => {
                console.log(res.data.data);
                this.orderData = res.data.data;
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        
        editPermission(){
            if(this.permissionDesc == ''){
                return;
            } else {
                this.toggleBusy();
                this.axios.put('https://api.codedevents.com/admin/permissions/' + this.permissionInfo.id + '?description=' + this.permissionDesc)
                .then((res) => {
                    console.log(res.data.data);
                    this.fetchPermission();
                })
                .catch((err) => {
                    // this.error = true
                    console.log(err);
                })
                .finally(() => {
                    this.isBusy =  false
                });
            }
        },
        
        getPermissionDetails(item){
            this.permissionInfo = item;
            this.permissionName = item.name;
            this.permissionDesc = item.description;
        },
        /**
         * Search the table data with search input
         */
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
    
    
              <!-- ::START EDIT permission Modal -->
                
                <b-modal id="modal-edit-category" title="Edit Permission" title-class="font-18" hide-footer>
                    <!-- <h5>Edit Category</h5> -->
                    <input type="text" v-model="permissionName" id="horizontal-firstname-input" placeholder="" class="form-control m-2" disabled>
                    <input type="text" v-model="permissionDesc" id="horizontal-firstname-input" placeholder="" class="form-control m-2">
                    <div class="modal-footer">
                        <button @click="editPermission(), $bvModal.hide('modal-edit-category')" type="button" class="btn btn-primary">
                            Save changes
                        </button>
                        <b-button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            @click="$bvModal.hide('modal-edit-category')"
                            >
                            Close
                        </b-button>
                    </div>
                </b-modal>
    
              <!-- ::END EDIT permission Modal -->
    
              <!-- ::START VIEW permission Modal -->
                
                <b-modal id="modal-permission-detail" title="Permission Details" title-class="font-18" hide-footer>
                    
                    <p>Name: <strong>{{ permissionName }}</strong></p> 
                    <p>Description:  <strong>{{ permissionDesc }}</strong></p>
                    
                    <div class="modal-footer">
                        
                        <b-button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                            @click="$bvModal.hide('modal-permission-detail')"
                            >
                            Close
                        </b-button>
                    </div>
                </b-modal>
    
              <!-- ::END VIEW permission Modal -->
    
    
            </div>
            <div class="table table-centered datatable dt-responsive nowrap table-card-list dataTable no-footer dtr-inline">
              
              <!-- Table -->
              <b-table
                :busy="isBusy"
                table-class="table table-centered datatable table-card-list"
                thead-tr-class="bg-transparent"
                :items="orderData"
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
                <template v-slot:cell(name)="data">
                    <a 
                        class="px-2 text-primary"
                        @click="getPermissionDetails(data.item)"
                        v-b-modal.modal-permission-detail
                        data-toggle="modal"
                    >
                        {{ data.item.name }}
                    </a>
                </template>
                <template v-slot:cell(description)="data">
                    <div class="d-inline-block text-truncate" style="max-width: 450px; max-height: 60px;">{{data.item.description}}</div>
                </template>
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Edit"
                        @click="getPermissionDetails(item)"
                        v-b-modal.modal-edit-category
                        data-toggle="modal"
                      >
                        <i class="uil uil-pen font-size-18"></i>
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
    
    