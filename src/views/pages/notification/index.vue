<script>
    import Multiselect from "vue-multiselect";
    import VueToastr from "vue-toastr";

    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
import { BASE_URL } from "../../../baseconstant"
    
    /**
     * Orders component
     */
    export default {
      components: { Layout, Multiselect, PageHeader, VueToastr },
      page: {
        title: "Notification",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
      data() {
        return {
          title: "Notification",
          items: [
            {
              text: "App",
            },
            {
              text: "Notification",
              active: true,
            },
          ],
          channelOption: ['email'],
          recipientOption: ['all'],
          channel: '',
          recipient: '',
          subject: '',
          message: '',
          // notify: {
          //   channel: this.channel,
          //   recipient: this.recipient,
          //   subject: this.subject,
          //   message: this.message,
          // },
          submitted: false,
        };
      },
      middleware: "authentication",
      computed: {
      },
      methods: {
        submitForm() {
          this.submitted = true;
          const notify = {
            channel: this.channel,
            subject: this.subject,
            recipient: this.recipient,
            message: this.message
          }
          this.axios.post(BASE_URL+'/api/v1/admin/notifications/send', notify)
          .then((res) => {
                console.log(res.data);
                this.submitted = false;
                // this.notify = ""
                // console.log(this.notify)
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
              this.channel = ''
              this.subject = ''
              this.recipient = ''
              this.message = ''
                // this.submitted = false;
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
                          v-model="channel"
                          :options="channelOption"
                          class="m-2"
                          :class="{
                            'is-invalid': submitted && !channel,
                          }"
                        >
                        </multiselect>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="validationCustom02">Recipient</label>
                        <multiselect
                          v-model="recipient"
                          :options="recipientOption"
                          class="m-2"
                          :class="{
                            'is-invalid': submitted && !recipient,
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
                            'is-invalid': submitted && !subject,
                          }"
                          v-model="subject"
                        />
                        <!-- <div
                          v-if="submitted && $v.subject.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.subject.required"
                            >This value is required.</span
                          >
                        </div> -->
                      </div>
                      <div class="mb-3">
                        <label for="validationCustom04">Message</label>
                        <textarea 
                          class="form-control m-2" 
                          name="message" 
                          id="" cols="30" 
                          rows="10"
                          :class="{
                            'is-invalid': submitted && !message,
                          }"
                          v-model="message"
                        ></textarea>
                        <!-- <div
                          v-if="submitted && $v.form.state.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.state.required"
                            >This value is required.</span
                          >
                        </div> -->
                      </div>
                  </div>
                  <button @click="submitForm()" :disabled="submitted" class="btn btn-primary m-2">
                    Submit form</button>
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
      </Layout>
    </template>