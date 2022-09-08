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
        title: "Plans",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Plans",
          items: [
            {
              text: "App",
            },
            {
              text: "Plans",
              active: true,
            },
          ],
          datas: [],
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
            // {
            //   key: "id",
            //   label: "ID",
            // },
            {
              key: "name",
              label: "Name",
              sortable: true,
            },
            {
              key: "price",
              label: "Price",
              sortable: true,
            },
            {
              key: "currency",
              label: "Currency",
              sortable: true,
            },
            "action",
          ],
          isBusy: false,
          planInfo: null,
          planInfoId: null,
          plan:{ 
            name: this.name,
            price: this.price,
            currency: this.currency,
            features: this.features,
            max_documents: this.max_documents,
            max_media: this.max_media,
            max_vendors: this.max_vendors,
            link_validity: this.link_validity,
            link_validity_type: this.link_validity_type,
          },
        };
      },
      middleware: "authentication",
      computed: {
        /**
         * Total no. of records
         */
        rows() {
          return this.data.length;
        },
      },
      mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
        this.fetchPlan();
      },
      methods: {
        fetchPlan(){
            this.toggleBusy();
            this.axios.get('https://api.codedevents.com/admin/plans')
            .then((res) => {
                console.log(res.data.data);
                this.datas = res.data.data;
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
        },
        toggleBusy() {
            this.isBusy = !this.isBusy
        },
        getPlanDetails(data){
            this.planInfo = data.name;
            this.planInfoId = data.id;

            console.log(data);
            this.plan.name = data.name;
            this.plan.price = data.price;
            this.plan.currency = data.currency;
            // let dataFeat = JSON.stringify(data.features);
            this.plan.features = data.features.map(({ id }) => id).join(', ');
        },
        deletePlan(){
            this.toggleBusy();
            this.axios.delete('https://api.codedevents.com/admin/plans/' + this.planInfoId)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        addPlan() {
          this.plan.features = this.plan.features.split(", ");
          this.plan.max_documents = 20,
          this.plan.max_media = 50,
          this.plan.max_vendors = 20,
          this.plan.link_validity = 5,
          this.plan.link_validity_type = 'month',

          this.axios.post('https://api.codedevents.com/admin/plans', this.plan)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        editPlan() {
          this.plan.features = this.plan.features.split(", ");
          this.plan.max_documents = 20,
          this.plan.max_media = 50,
          this.plan.max_vendors = 20,
          this.plan.link_validity = 5,
          this.plan.link_validity_type = 'month',

          this.axios.put('https://api.codedevents.com/admin/plans/' + this.planInfoId, this.plan)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
      },
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        
        <button type="button" class="text-white btn btn-success mb-3" v-b-modal.modal-add-plan>
            <i class="mdi mdi-plus me-1"></i> Add New Plan
        </button>

        <!-- ::START ADD Plan Modal -->    
        <b-modal id="modal-add-plan" title="Add Plan" title-class="font-18" hide-footer>
              <!-- <h5>Edit Plan</h5> -->
              <label for="" class="m-2">Name: </label>
              <input type="text" v-model="plan.name" id="horizontal-firstname-input" placeholder="Enter plan name..." class="m-2 form-control">
              <label for="" class="m-2">Price: </label>
              <input type="number" v-model="plan.price" id="horizontal-firstname-input" placeholder="Enter plan price..." class="m-2 form-control">
              <label for="" class="m-2">Currency: </label>
              <input type="text" v-model="plan.currency" id="horizontal-firstname-input" placeholder="Enter plan currency..." class="m-2 form-control">
              <label for="features" class="m-2">Features: </label>
              <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea>
              <div class="modal-footer">
                  <button @click="addPlan(), $bvModal.hide('modal-add-plan')" type="button" class="btn btn-primary">
                      Save changes
                  </button>
                  <b-button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="$bvModal.hide('modal-edit-plan')"
                      >
                      Close
                  </b-button>
              </div>
          </b-modal>
        <!-- ::END ADD Plan Modal -->

        <!-- ::START EDIT Plan Modal -->    
          <b-modal id="modal-edit-plan" title="Edit Plan" title-class="font-18" hide-footer>
              <!-- <h5>Edit Plan</h5> -->
              <label for="" class="m-2">Name: </label>
              <input type="text" v-model="plan.name" id="horizontal-firstname-input" placeholder="Enter plan name..." class="m-2 form-control">
              <label for="" class="m-2">Price: </label>
              <input type="number" v-model="plan.price" id="horizontal-firstname-input" placeholder="Enter plan price..." class="m-2 form-control">
              <label for="" class="m-2">Currency: </label>
              <input type="text" v-model="plan.currency" id="horizontal-firstname-input" placeholder="Enter plan currency..." class="m-2 form-control">
              <label for="features" class="m-2">Features: </label>
              <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea>
              <div class="modal-footer">
                  <button @click="editPlan(), $bvModal.hide('modal-edit-plan')" type="button" class="btn btn-primary">
                      Save changes
                  </button>
                  <b-button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="$bvModal.hide('modal-edit-plan')"
                      >
                      Close
                  </b-button>
              </div>
          </b-modal>
        <!-- ::END EDIT Plan Modal -->

        <!-- ::START DELETE Plan Modal -->      
        <b-modal id="modal-delete-category" title="Delete Blog" title-class="font-18" hide-footer>
            <p>Are you sure you want to delete "{{planInfo}}" </p>
            
            <div class="modal-footer">
                <button @click="deletePlan(), $bvModal.hide('modal-delete-category')" type="button" class="btn btn-primary">
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
        <!-- ::END DELETE Plan Modal -->


        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="text-center mb-5">
              <h4>Choose your Pricing plan</h4>
              <p class="text-muted mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo veritatis
              </p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-lg-9">
            <div class="row">
              <div class="col-xl-4" v-for="data in datas" :key="data.id">
                <div class="card pricing-box text-center">
                  <div class="card-body p-4">
                    <div>
                      <div class="mt-3">
                        <h5 class="mb-1">{{data.name}}</h5>
                        <!-- <p class="text-muted">Starter plans</p> -->
                      </div>

                      <div class="py-3">
                        <i class="uil uil-edit h1 text-primary"></i>
                      </div>
                    </div>

                    <div style="height: 500px;">
                      <div v-for="feature in data.features" :key="feature.id" class="list-unstyled plan-features mt-3">
                        
                        <p style="font-size: 14px;">
                          {{feature.name}}
                        </p>
                      </div>
                    </div>
                    

                    <div class="py-4">
                      <h3>
                        <sup><small>{{data.currency}}</small></sup> {{data.price}}/
                        <span class="font-size-13 text-muted">Per month</span>
                      </h3>
                    </div>

                    <div class="text-center plan-btn my-2">
                          <b-dropdown variant="primary">
                            <template v-slot:button-content>
                              Action
                              <i class="mdi mdi-chevron-down"></i>
                            </template>
                            <b-dropdown-item v-b-modal.modal-edit-plan @click="getPlanDetails(data)">Edit</b-dropdown-item>
                            <b-dropdown-item v-b-modal.modal-delete-category @click="getPlanDetails(data)">Delete</b-dropdown-item>
                          </b-dropdown>
                      <!-- <a 
                      href="javascript:void(0);" 
                      v-b-modal.modal-edit-plan 
                      @click="getPlanDetails(data)"
                      class="btn btn-primary waves-effect waves-light m-3"
                        >Edit Plan</a
                      >
                      <a 
                      href="javascript:void(0);" 
                      v-b-modal.modal-delete-category 
                      class="btn btn-danger waves-effect waves-light"
                      @click="getPlanDetails(data)"
                        >Delete Plan</a
                      > -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end row -->
      </Layout>
    </template>
    