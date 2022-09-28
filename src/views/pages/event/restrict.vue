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
        title: "Restricted Events",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Restricted Events",
          isBusy: false,
          items: [
            {
              text: "App",
            },
            {
              text: "Restricted Events",
              active: true,
            },
          ],
          eventData: [],
          totalRows: 1,
          currentPage: 1,
          perPage: 50,
          pageOptions: [50, 100, 200, 500],
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
              key: "banner",
              label: "Image",
            },
            {
              key: "title",
              label: "Name",
              sortable: true,
            },
            {
              key: "category.name",
              label: "Category",
              sortable: true,
            },
            {
              key: "user",
              label: "User",
              sortable: true,
            },
            {
              key: "user.email",
              label: "Email",
              sortable: true,
            },
            {
              key: "plans",
              label: "Plan",
              sortable: true,
            },
            {
              key: "status",
              label: "Event Status",
              sortable: true,
            },
            {
              key: "start_date",
              label: "Start Date",
              sortable: true,
            },
            "action",
          ],
          eventName: null,
          eventInfo: null,
        };
      },
      middleware: "authentication",
      computed: {
        /**
         * Total no. of records
         */
        rows() {
          return this.eventData.length;
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
          this.axios.get('https://api.codedevents.com/admin/events?page=1&per_page=10000&status=restricted')
          .then((res) => {
              console.log(res.data.data);
              this.eventData = res.data.data
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              this.isBusy =  false
          });
        },
        getEventDetails(item){
            this.eventInfo = item;
            this.eventName = item.title;
        },
        restrictEvent() {
          this.axios.post('url')
          .then((res) => {
              console.log(res.data.data);
              this.fetchData();
          })
          .catch((err) => {
              console.log(err);
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
        <div class="row">
          <div class="col-12">
            <div>
              <!-- ::START RESTRICT event Modal -->
                  
              <b-modal id="modal-restrict-event" title="Restrict Event" title-class="font-18" hide-footer>
                      <p>Are you sure you want to restrict "{{eventName}}" </p>
                      
                      <div class="modal-footer">
                          <button @click="restrictEvent(), $bvModal.hide('modal-restrict-event')" type="button" class="btn btn-success">
                              Confirm
                          </button>
                          <b-button
                              type="button"
                              class="btn btn-danger"
                              data-dismiss="modal"
                              @click="$bvModal.hide('modal-restrict-event')"
                              >
                              Close
                          </b-button>
                      </div>
                  </b-modal>
      
                <!-- ::END RESTRICT event Modal -->
            </div>
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
                :items="eventData"
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
                <template v-slot:cell(banner)="data">
                <img
                      v-if="data.item.banner"
                      :src="data.item.banner"
                      alt
                      class="avatar-xs rounded-circle me-2"
                    />
                    <div
                      v-if="!data.item.banner"
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
                  <router-link :to="{ name: 'event-details', params: { id: data.item.id }}" style="max-width: 250px;"  class="d-inline-block text-truncate text-primary">{{data.item.title}}</router-link>
                </template>

                <template v-slot:cell(user)="data">
                  <router-link :to="{ name: 'user-details', params: { id: data.item.id }}" style="max-width: 250px;"  class="d-inline-block text-truncate text-primary">{{data.item.user.name}}</router-link>
                </template>
  
                <template v-slot:cell(plans)>
                  <p>Premium Plan</p>
                </template>
  
                <template v-slot:cell(status)="data">
                  <div
                    class="badge bg-pill font-size-12"
                    :class="{
                      'bg-soft-success': data.item.status === 'active',
                      'bg-soft-danger': data.item.status === 'expired',
                      'bg-soft-danger': data.item.status === 'restricted',
                      'bg-soft-warning': data.item.status === 'pending',
                      'bg-soft-primary': data.item.status === 'completed',
                      'bg-soft-info': data.item.status === 'draft',
                    }"
                  >
                    {{ data.item.status }}
                  </div>
                </template>
                <template v-slot:cell(start_date)="data">
                  <p>{{data.item.start_date | formatDate}}</p>
                </template>
                <template v-slot:cell(action)="{ item }">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <router-link 
                        class="text-primary" 
                        :to="{ name: 'event-details', params: { id: item.id }}"
                        v-b-tooltip.hover
                        title="View"
                      ><i class="uil uil-eye font-size-18"></i></router-link>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="text-info"
                        v-b-tooltip.hover
                        title="User"
                      ><router-link 
                        class="text-info"
                        :to="{ name: 'event-details', params: { id: item.id }}"
                        v-b-tooltip.hover
                        title="User"
                      ><i class="uil uil-user-circle font-size-18"></i></router-link>
                        
                      </a>
                    </li>
                    <!-- <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="text-danger"
                        v-b-tooltip.hover
                        title="Restrict Event"
                        @click="getEventDetails(item)"
                        v-b-modal.modal-restrict-event
                        data-toggle="modal"
                      >
                        <i class="uil uil-info-circle font-size-18"></i>
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
    