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
    title: "Categories",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Categories",
      items: [
        {
          text: "App",
        },
        {
          text: "Category",
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
          key: "check",
          label: "",
        },
        {
          key: "id",
          label: "Category ID",
        },
        {
          key: "name",
          label: "Category Name",
          sortable: true,
        },
        "action",
      ],
      categoryName: null,
      deleteModal: false,
      categoryInfo: '',
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
    this.fetchCategory();
    
  },
  methods: {
    fetchCategory(){
        this.toggleBusy();
        this.axios.get('https://api.codedevents.com/admin/categories?page=1&per_page=50')
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
    addCategory(){
        if(this.categoryName == null){
            return;
        } else {
            this.toggleBusy();
            this.axios.post('https://api.codedevents.com/admin/categories?name=' + this.categoryName)
            .then((res) => {
                console.log(res.data.data);
                this.fetchCategory();
                this.categoryName = null;
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
    editCategory(){
        if(this.categoryName == ''){
            return;
        } else {
            this.toggleBusy();
            this.axios.put('https://api.codedevents.com/admin/categories/' + this.categoryInfo.id + '?name=' + this.categoryName)
            .then((res) => {
                console.log(res.data.data);
                this.fetchCategory();
                this.categoryName = null;
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
    deleteCategory(){
        if(this.categoryName == ''){
            return;
        } else {
            this.toggleBusy();
            this.axios.delete('https://api.codedevents.com/admin/categories/' + this.categoryInfo.id + '?name=' + this.categoryName)
            .then((res) => {
                console.log(res.data.data);
                this.fetchCategory();
                this.categoryName = null;
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
    getCategoriesDetails(item){
        this.categoryInfo = item;
        this.categoryName = item.name;
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
            <form class="d-inline-flex mb-3">
              <label class="my-1 me-2" for="order-selectinput">Categories</label>
              <select class="form-select" id="order-selectinput">
                <option selected="">All</option>
                <option value="1">Active</option>
                <option value="2">Unpaid</option>
              </select>
            </form>
          </div>

          <!-- ::START ADD Category Modal -->

          <button
            type="button"
            class="btn btn-success mb-3"
            v-b-modal.modal-add-category
            data-toggle="modal"
          >
            <i class="mdi mdi-plus me-1"></i> Add New Category
          </button>

          <b-modal id="modal-add-category" title="Add New Category" title-class="font-18" hide-footer>
            <h5>New Category</h5>
            <input type="text" v-model="categoryName" id="horizontal-firstname-input" placeholder="Enter category name..." class="form-control">
            <div class="modal-footer">
                <button @click="addCategory(), $bvModal.hide('modal-add-category')" type="button" class="btn btn-primary">
                    Save changes
                </button>
                <b-button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="$bvModal.hide('modal-add-category')"
                    >
                    Close
                </b-button>
            </div>
          </b-modal>

          <!-- ::END ADD Category Modal -->

          <!-- ::START EDIT category Modal -->
            
            <b-modal id="modal-edit-category" title="Edit Category" title-class="font-18" hide-footer>
                <h5>Edit Category</h5>
                <input type="text" v-model="categoryName" id="horizontal-firstname-input" placeholder="Enter category name..." class="form-control">
                <div class="modal-footer">
                    <button @click="editCategory(), $bvModal.hide('modal-edit-category')" type="button" class="btn btn-primary">
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

          <!-- ::END EDIT category Modal -->

          <!-- ::START DELETE category Modal -->
            
            <b-modal id="modal-delete-category" title="Delete Category" title-class="font-18" hide-footer>
                <p>Are you sure you want to delete {{categoryName}} </p>
                
                <div class="modal-footer">
                    <button @click="deleteCategory(), $bvModal.hide('modal-delete-category')" type="button" class="btn btn-primary">
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
            <template v-slot:cell(action)="{ item }">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a
                    class="px-2 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                    @click="getCategoriesDetails(item)"
                    v-b-modal.modal-edit-category
                    data-toggle="modal"
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
                    @click="getCategoriesDetails(item)"
                    v-b-modal.modal-delete-category
                    data-toggle="modal"
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

