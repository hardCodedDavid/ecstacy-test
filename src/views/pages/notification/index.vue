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
            <div class="card">
              <div class="card-body">
                <!-- <h4 class="card-title mb-4">Send Notification to Users</h4> -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="validationCustom01">Channel</label>
                        <multiselect
                          v-model="notify.channel"
                          :options="channelOption"
                          class="m-2"
                          :class="{
                            'is-invalid': submitted && !notify.channel,
                          }"
                        >
                        </multiselect>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="validationCustom02">Recipient</label>
                        <multiselect
                          v-model="notify.recipient"
                          :options="recipientOption"
                          class="m-2"
                          :class="{
                            'is-invalid': submitted && !notify.recipient,
                          }"
                        >
                        </multiselect>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                      <div class="mb-3">
                        <label for="validationCustom03">Subject</label>
                        <input
                          id="validationCustom03"
                          type="text"
                          class="form-control m-2"
                          placeholder="Subject..."
                          :class="{
                            'is-invalid': submitted && !notify.subject,
                          }"
                          v-model="notify.subject"
                        />
                        <div
                          v-if="submitted && $v.notify.subject.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.notify.subject.required"
                            >This value is required.</span
                          >
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="validationCustom04">Message</label>
                        <textarea 
                          class="form-control m-2" 
                          name="message" 
                          id="" cols="30" 
                          rows="10"
                          :class="{
                            'is-invalid': submitted && !notify.message,
                          }"
                          v-model="notify.message"
                        ></textarea>
                        <div
                          v-if="submitted && $v.form.state.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.state.required"
                            >This value is required.</span
                          >
                        </div>
                      </div>
                  </div>
                  <button @click="submitForm()" class="btn btn-primary m-2">Submit form</button>
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
      </Layout>
    </template>