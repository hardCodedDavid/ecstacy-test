<script>
<<<<<<< HEAD
    import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
    
    /**
     * Orders component
     */
    export default {
<<<<<<< HEAD
      components: { Layout, Multiselect, PageHeader, VueToastr },
=======
      components: { Layout, PageHeader },
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
          options: null,
          defaultoptions: ["month", "year"],
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
            no_of_scans: this.no_of_scans,
            max_locations: this.max_locations,
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
        this.fetchFeature();
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
          this.axios.get('https://api.codedevents.com/admin/plans/' + data.id + '/details')
          .then((res) => {
            console.log(res.data);
              this.plan.name = res.data.data.name;
              this.plan.price = res.data.data.price;
              this.plan.currency = res.data.data.currency;
              this.plan.max_documents = res.data.data.max_documents;
              this.plan.max_media = res.data.data.max_media;
              this.plan.max_vendors = res.data.data.max_vendors;
              this.plan.link_validity = res.data.data.link_validity;
              this.plan.link_validity_type = res.data.data.link_validity_type;
              this.plan.no_of_scans = res.data.data.no_of_scans;
              this.plan.max_locations = res.data.data.max_locations;
              
              
              this.plan.features = res.data.data.features;
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            this.planInfo = data.name;
            this.planInfoId = data.id;

            console.log(data);
<<<<<<< HEAD
            
=======
            this.plan.name = data.name;
            this.plan.price = data.price;
            this.plan.currency = data.currency;
            // let dataFeat = JSON.stringify(data.features);
            this.plan.features = data.features.map(({ id }) => id).join(', ');
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
        },
        deletePlan(){
            this.toggleBusy();
            this.axios.delete('https://api.codedevents.com/admin/plans/' + this.planInfoId)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
<<<<<<< HEAD

                this.$refs.mytoast.Add({
                msg: "Plan Deleted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
<<<<<<< HEAD
                this.$refs.mytoast.Add({
                msg: err.response.data.details,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        addPlan() {
<<<<<<< HEAD
          let val = this.plan.features.map(({ id }) => id).join(', ');

          this.plan.features = val.split(", ");

          // console.log(this.plan);
=======
          this.plan.features = this.plan.features.split(", ");
          this.plan.max_documents = 20,
          this.plan.max_media = 50,
          this.plan.max_vendors = 20,
          this.plan.link_validity = 5,
          this.plan.link_validity_type = 'month',

>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
          this.axios.post('https://api.codedevents.com/admin/plans', this.plan)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
<<<<<<< HEAD

                this.$refs.mytoast.Add({
                msg: "Plan Created Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
<<<<<<< HEAD
                this.plan.features = ""

                this.$refs.mytoast.Add({
                msg: err.response.data.details,
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "error",
              });
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
        editPlan() {
<<<<<<< HEAD
          let val = this.plan.features.map(({ id }) => id).join(', ');

          this.plan.features = val.split(", ");
          
=======
          this.plan.features = this.plan.features.split(", ");
          this.plan.max_documents = 20,
          this.plan.max_media = 50,
          this.plan.max_vendors = 20,
          this.plan.link_validity = 5,
          this.plan.link_validity_type = 'month',
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68

          this.axios.put('https://api.codedevents.com/admin/plans/' + this.planInfoId, this.plan)
            .then((res) => {
                console.log(res.data.data);
                this.fetchPlan();
<<<<<<< HEAD
                this.$refs.mytoast.Add({
                msg: "Plan Edited Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
            })
            .catch((err) => {
                // this.error = true
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
        fetchFeature(){
          this.axios.get('https://api.codedevents.com/admin/plans/permissions')
          .then((res) => {
                console.log(res.data.data);
                this.options = res.data.data;
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                this.isBusy =  false
            });
        },
<<<<<<< HEAD
        // defaultPlanInfo() {
        //   this.plan = ""
        // }
=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
      },
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
<<<<<<< HEAD
        <vue-toastr ref="mytoast"></vue-toastr>
        

        <button type="button" class="brand-primary text-white btn btn-success mb-3" >
          <router-link :to="{ name: 'create-plans'}" class="text-white"><i class="mdi mdi-plus me-1"></i> Add New Plan</router-link>
=======
        
        <button type="button" class="text-white btn btn-success mb-3" v-b-modal.modal-add-plan>
            <i class="mdi mdi-plus me-1"></i> Add New Plan
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
              <label for="" class="m-2">Max Documents: </label>
              <input type="number" v-model="plan.max_documents" id="horizontal-firstname-input" placeholder="Enter maximum documents..." class="m-2 form-control">
              <label for="" class="m-2">Max Media: </label>
              <input type="number" v-model="plan.max_media" id="horizontal-firstname-input" placeholder="Enter maximum media..." class="m-2 form-control">
              <label for="" class="m-2">Max Vendors: </label>
              <input type="number" v-model="plan.max_vendors" id="horizontal-firstname-input" placeholder="Enter maximum vendor..." class="m-2 form-control">
              <label for="" class="m-2">Max Location: </label>
              <input type="number" v-model="plan.max_locations" id="horizontal-firstname-input" placeholder="Enter maximum locations..." class="m-2 form-control">
              <label for="" class="m-2">Number of scans: </label>
              <input type="number" v-model="plan.no_of_scans" id="horizontal-firstname-input" placeholder="Enter number of scans..." class="m-2 form-control">
              <label for="" class="m-2">Link Validity: </label>
              <input type="number" v-model="plan.link_validity" id="horizontal-firstname-input" placeholder="Enter maximum validity..." class="m-2 form-control">
              <label for="" class="m-2">Link Validity Type: </label>
              <multiselect
                v-model="plan.link_validity_type"
                :options="defaultoptions"
                class="m-2"
              ></multiselect>
              <!-- <input type="text" v-model="plan.link_validity_type" id="horizontal-firstname-input" placeholder="Enter maximum validity type..." class="m-2 form-control"> -->
              <label for="features" class="m-2">Features: </label>
              <multiselect
                v-model="plan.features"
                :options="options"
                track-by="id"
                label="name"
                :multiple="true"
                class="m-2"
              ></multiselect>
              <!-- <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
=======
              <label for="features" class="m-2">Features: </label>
              <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
              <div class="modal-footer">
                  <button @click="addPlan(), $bvModal.hide('modal-add-plan')" type="button" class="btn btn-primary">
                      Save changes
                  </button>
                  <b-button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
<<<<<<< HEAD
                      @click="$bvModal.hide('modal-add-plan')"
=======
                      @click="$bvModal.hide('modal-edit-plan')"
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
              <label for="" class="m-2">Max Documents: </label>
              <input type="number" v-model="plan.max_documents" id="horizontal-firstname-input" placeholder="Enter maximum documents..." class="m-2 form-control">
              <label for="" class="m-2">Max Media: </label>
              <input type="number" v-model="plan.max_media" id="horizontal-firstname-input" placeholder="Enter maximum media..." class="m-2 form-control">
              <label for="" class="m-2">Max Vendors: </label>
              <input type="number" v-model="plan.max_vendors" id="horizontal-firstname-input" placeholder="Enter maximum vendor..." class="m-2 form-control">
              <label for="" class="m-2">Max Location: </label>
              <input type="number" v-model="plan.max_locations" id="horizontal-firstname-input" placeholder="Enter maximum locations..." class="m-2 form-control">
              <label for="" class="m-2">Number of scans: </label>
              <input type="number" v-model="plan.no_of_scans" id="horizontal-firstname-input" placeholder="Enter number of scan..." class="m-2 form-control">
              <label for="" class="m-2">Link Validity: </label>
              <input type="number" v-model="plan.link_validity" id="horizontal-firstname-input" placeholder="Enter maximum validity..." class="m-2 form-control">
              <label for="" class="m-2">Link Validity Type: </label>
              <multiselect
                v-model="plan.link_validity"
                :options="defaultoptions"
                class="m-2"
              ></multiselect>
              <label class="mt-3">Features: </label>
              <multiselect
                v-model="plan.features"
                :options="options"
                track-by="id"
                label="name"
                :multiple="true"
              ></multiselect>
              <!-- <label for="features" class="m-2">Features: </label> -->
              <!-- <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea> -->
=======
              <label for="features" class="m-2">Features: </label>
              <textarea v-model="plan.features" name="features" id="horizontal-firstname-input" cols="55" rows="10" class="m-2 form-control"></textarea>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
              <h4>Pricing plan</h4>
              <!-- <p class="text-muted mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo veritatis
              </p> -->
=======
              <h4>Choose your Pricing plan</h4>
              <p class="text-muted mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo veritatis
              </p>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
            </div>
          </div>
        </div>
        <!-- end row -->

<<<<<<< HEAD
        <div class="row" v-if="isBusy">
          <div class="col-xl-12">
            <div class="text-center my-3">
              <a href="javascript:void(0);" class="text-primary"
                ><i
                  class="mdi mdi-loading mdi-spin font-size-20 align-middle me-2"
                ></i>
                Loading
              </a>
            </div>
          </div>
        </div>

=======
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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

<<<<<<< HEAD
                    <div>
=======
                    <div style="height: 500px;">
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
<<<<<<< HEAD
                            <b-dropdown-item :to="{ name: 'edit-plans', params: { id: data.id }}">Edit</b-dropdown-item>
=======
                            <b-dropdown-item v-b-modal.modal-edit-plan @click="getPlanDetails(data)">Edit</b-dropdown-item>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
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
    