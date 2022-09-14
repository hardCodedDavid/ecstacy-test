<script>
    import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, Multiselect, PageHeader, VueToastr },
      page: {
        title: "Edit Plan",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Edit Plan",
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
          options: [],
          defaultoptions: ["month", "year"],
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
            no_of_scans: this.no_of_scans,
            max_locations: this.max_locations,
          },
        };
      },
      middleware: "authentication",
      computed: {
      },
      mounted() {
        
        this.fetchFeature();
        this.getPlanDetails();

        console.log(this.options);
      },
      methods: {
        getPlanDetails(){
          this.axios.get('https://api.codedevents.com/admin/plans/' + this.$route.params.id + '/details')
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
            
        },
        editPlan() {
          let val = this.plan.features.map(({ id }) => id).join(', ');

          this.plan.features = val.split(", ");
          

          this.axios.put('https://api.codedevents.com/admin/plans/' + this.$route.params.id, this.plan)
            .then((res) => {
                console.log(res.data.data);
                this.$router.push('/plans');

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
                // console.log(res.data.data);
                this.options = res.data.data;
            })
            .catch((err) => {
                // this.error = true
                console.log(err);
            })
            .finally(() => {
                // this.isBusy =  false
            });
        },
      },
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        <vue-toastr ref="mytoast"></vue-toastr>

        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                
                <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="" class="m-2">Name: </label>
                        <input type="text" v-model="plan.name" id="horizontal-firstname-input" placeholder="Enter plan name..." class="m-2 form-control">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="" class="m-2">Price: </label>
                        <input type="number" v-model="plan.price" id="horizontal-firstname-input" placeholder="Enter plan price..." class="m-2 form-control">
                      </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="" class="m-2">Number of scans: </label>
                        <input type="number" v-model="plan.no_of_scans" id="horizontal-firstname-input" placeholder="Enter number of scans..." class="m-2 form-control">
                      </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="" class="m-2">Currency: </label>
                            <input type="text" v-model="plan.currency" id="horizontal-firstname-input" placeholder="Enter plan currency..." class="m-2 form-control">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="" class="m-2">Max Documents: </label>
                            <input type="number" v-model="plan.max_documents" id="horizontal-firstname-input" placeholder="Enter maximum documents..." class="m-2 form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="" class="m-2">Max Media: </label>
                            <input type="number" v-model="plan.max_media" id="horizontal-firstname-input" placeholder="Enter maximum media..." class="m-2 form-control">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="" class="m-2">Max Vendors: </label>
                        <input type="number" v-model="plan.max_vendors" id="horizontal-firstname-input" placeholder="Enter maximum vendor..." class="m-2 form-control">
                      </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="" class="m-2">Max Location: </label>
                            <input type="number" v-model="plan.max_locations" id="horizontal-firstname-input" placeholder="Enter maximum locations..." class="m-2 form-control">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                          <label for="" class="m-2">Link Validity Type: </label>
                          <multiselect
                              v-model="plan.link_validity_type"
                              :options="defaultoptions"
                              class="m-2"
                          ></multiselect>
                      </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="" class="m-2">Link Validity: </label>
                            <input type="number" v-model="plan.link_validity" id="horizontal-firstname-input" placeholder="Enter maximum validity..." class="m-2 form-control">
                        </div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="features" class="m-2">Features: </label>
                    <multiselect
                        v-model="plan.features"
                        :options="options"
                        track-by="id"
                        label="name"
                        :multiple="true"
                        class="m-2"
                    ></multiselect>
                </div>
                  <button @click="editPlan()" class="btn btn-primary m-2">Submit form</button>
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
















       
        
      </Layout>
    </template>
    