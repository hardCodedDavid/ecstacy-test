<script>
    // import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, PageHeader, VueToastr },
    //   components: { Layout, Multiselect, PageHeader, VueToastr },
      page: {
        title: "Notifiaction",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Notifiaction",
          items: [
            {
              text: "App",
            },
            {
              text: "Notifiaction",
              active: true,
            },
          ],
          channelOption: ['all'],
          recipientOption: ['all'],
          notify: {
            channel: this.channel,
            recipient: this.recipient,
            subject: this.subject,
            message: this.message,
          },
          submitted: false,
        };
      },
      middleware: "authentication",
      computed: {
      },
      mounted() {
        
      },
      methods: {
        submitForm() {
          this.submitted = true;
          this.axios.post('https://api.codedevents.com/admin/notifications/send', this.notify)
          .then((res) => {
                console.log(res.data);
                this.submitted = false;
                this.notify = ""

                this.$refs.mytoast.Add({
                msg: "Notification Posted Successfully",
                clickClose: false,
                timeout: 5000,
                position: "toast-top-right",
                type: "success",
              });
            })
            .catch((err) => {
                this.submitted = true;
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
                // this.isBusy =  false
            });
        }
      }
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        <vue-toastr ref="mytoast"></vue-toastr>
        <div class="row">
          <div class="col-lg-8">
            <div class="mt-4">
                <div class="product-desc">
                    <b-tabs
                        class="nav-tabs-custom"
                        content-class="border border-top-0 p-4"
                    >
                        <b-tab title="All">
                        <div class="row">
                            <div class="card col-sm-9 col-md-10">
                            <div class="text-muted p-2">
                                <h6>Welcome to Coded Events</h6>
                                <p>Dear David, You are welcome to Coded Events. It is great to have you on board. Explore our world!</p>
                                <p>Sep 29, 2022|04:28 am</p>
                            </div>
                            </div>
                            <div class="card col-sm-9 col-md-10">
                            <div class="text-muted p-2">
                                <h6>Welcome to Coded Events</h6>
                                <p>Dear David, You are welcome to Coded Events. It is great to have you on board. Explore our world!</p>
                                <p>Sep 29, 2022|04:28 am</p>
                            </div>
                            </div>
                        </div>
                        </b-tab>
                        <b-tab title="Unread" active>
                            <div class="row">
                                <div class="card col-sm-9 col-md-10">
                                <div class="text-muted p-2">
                                    <h6>Welcome to Coded Events</h6>
                                    <p>Dear David, You are welcome to Coded Events. It is great to have you on board. Explore our world!</p>
                                    <p>Sep 29, 2022|04:28 am</p>
                                </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Read">
                            <div class="row">
                                <div class="card col-sm-9 col-md-10">
                                <div class="text-muted p-2">
                                    <h6>Welcome to Coded Events</h6>
                                    <p>Dear David, You are welcome to Coded Events. It is great to have you on board. Explore our world!</p>
                                    <p>Sep 29, 2022|04:28 am</p>
                                </div>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                    </div>
                </div>
            </div>
        </div>
      </Layout>
    </template>

