<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Invoice Detail component
 */
export default {
  page: {
    title: "Event Detail",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Event Detail",
      items: [
        {
          text: "Event",
        },
        {
          text: "Event Detail",
          active: true,
        },
      ],
      eventData: null,
    };
  },
  middleware: "authentication",
  methods: {
        fetchData(){
            this.axios.get('https://api.codedevents.com/admin/events/'+ this.$route.params.id)
            .then((res) => {
                console.log(res.data.data);
                this.eventData = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                // this.isBusy =  false
            });
        }
  },
  mounted(){
        this.fetchData();
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row" v-if="eventData">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-5">
                <div class="product-detail">
                  <b-tabs pills vertical nav-wrapper-class="col-3">
                    <b-tab>
                      <template v-slot:title>
                        <img
                          :src="eventData.banner"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img">
                        <img
                          :src="eventData.banner"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                    <b-tab  v-for="media in eventData.media" :key="media.id">
                      <template v-slot:title>
                        <img
                          :src="media.path"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img">
                        <img
                          :src="media.path"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>

              <div class="col-xl-7">
                <div class="mt-4 mt-xl-3 pl-xl-4">
                  <h5 class="font-size-14">
                    {{eventData.host}}
                  </h5>
                  <h4 class="font-size-20 mb-3">{{ eventData.title }}</h4>
                  <div class="text-muted">
                    <span v-if="eventData.status == 'draft'" class="badge bg-success font-size-14 ms-2">{{eventData.status}}</span>
                <span v-if="eventData.status == 'pending'" class="badge bg-warning font-size-14 ms-2">{{eventData.status}}</span>
                <span v-if="eventData.status == 'expired'" class="badge bg-danger font-size-14 ms-2">{{eventData.status}}</span>
                    
                    234 Reviews
                  </div>

                  <!-- <h5 class="mb-4 pt-2">
                    <del class="text-muted me-2"
                      >$3456</del
                    >$34567
                    <span class="text-danger font-size-14 ms-2"
                      >- 11 % Off</span
                    >
                  </h5> -->
                  <p class="text-muted mb-4">
                    {{eventData.description}}
                  </p>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mt-3">
                        <h5 class="font-size-14">Overview :</h5>
                          <p>
                            <i
                              class="uil uil-eye text-primary me-2 font-size-16 align-middle"
                            ></i>
                             Event Link: <a href="javascript:void(0)">{{eventData.link}}</a>
                          </p>
                          <p>
                            <i
                              class="uil uil-clock-eight text-primary me-2 font-size-16 align-middle"
                            ></i>
                            Start Date: {{eventData.start_date | formatDate}}
                          </p>
                          <p>
                            <i
                              class="uil uil-play-circle text-primary me-2 font-size-16 align-middle"
                            ></i>
                            Video Url: 
                            <a :href="eventData.video_url" target="_blank" v-if="eventData.video_url">{{eventData.video_url}}</a>
                            <a href="#" v-if="!eventData.video_url">None</a>
                          </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mt-3">
                        <h5 class="font-size-14">Specifications :</h5>

                        <p><span class="me-2">Category: </span>{{eventData.category.name}}</p>
                        <p><span class="me-2">Visitors: </span>{{eventData.visitors}}</p>
                        <p><span class="me-2">Accept Donations: </span>
                          <span v-if="eventData.accept_donations" class="badge bg-success ms-1">Active</span>
                          <span v-if="!eventData.accept_donations" class="badge bg-danger ms-1">Inactive</span>
                        </p>
                        <p><span class="me-2">Allow Comments: </span>
                          <span v-if="eventData.allow_comments" class="badge bg-success ms-1">Active</span>
                          <span v-if="!eventData.allow_comments" class="badge bg-danger ms-1">Inactive</span>
                        </p>
                        <p><span class="me-2">Access Code Activated: </span>
                          <span v-if="eventData.access_code_activated" class="badge bg-success ms-1">Active</span>
                          <span v-if="!eventData.access_code_activated" class="badge bg-danger ms-1">Inactive</span>
                        </p>
                        <!-- <ul v-for="location in eventData.locations" :key="location.id" class="list-unstyled product-desc-list text-muted" >
                          <li>
                            <i
                              class="uil uil-location-pin-alt text-primary me-1 font-size-20 align-middle"
                            ></i>
                            {{location.title}} ({{location.type}})
                            <p style="margin-left: 25px;" class="mb-1">{{location.address}}</p>
                            <p style="margin-left: 25px;" class="mb-1">{{location.description}}</p>
                          </li>
                          <li>
                            <i
                              class="uil uil-calendar-alt text-primary me-2 font-size-20 align-middle"
                            ></i>{{location.date | formatDay}}
                          </li>
                          <li class="mb-4">
                            <i
                              class="uil uil-clock-eight text-primary me-2 font-size-20 align-middle"
                            ></i>{{location.time}}
                          </li>
                        </ul> -->
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="mt-4">
              <h5 class="font-size-14 mb-3">Event Details:</h5>
              <div class="product-desc">
                <b-tabs
                  class="nav-tabs-custom"
                  content-class="border border-top-0 p-4"
                >
                  <b-tab title="Vendors" active>
                    <div class="row">
                      <div class="col-sm-9 col-md-10">
                        <div class="text-muted p-2">
                        <ul v-for="vendor in eventData.vendors" :key="vendor.id" class="list-unstyled product-desc-list text-muted">
                          <li><i class="uil uil-store me-1"></i> {{vendor.name}}</li>
                          <p><i class="uil uil-phone me-1"></i> {{vendor.contact}}</p>
                        </ul>

                          <!-- <div>
                            <h5 class="font-size-16 mb-1">Documnts:</h5>
                            <ul class="list-unstyled product-desc-list text-muted" v-for="document in eventData.documents" :key="document.id">
                              <li>
                                <p>{{document.filename}}<a :href="document.path" class="btn sm btn-soft-primary font-size-12 ms-2">View</a></p>
                                
                              </li>
                            </ul>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Locations">
                    <div class="table-responsive">
                      <table class="table table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 20%">Title</th>
                            <th scope="row" style="width: 20%">Type</th>
                            <th scope="row" style="width: 20%">Description</th>
                            <th scope="row" style="width: 20%">Date</th>
                            <th scope="row" style="width: 20%">Time</th>
                          </tr>
                          <tr v-for="location in eventData.locations" :key="location.id">
                            <td>{{location.title}}</td>
                            <td>{{location.type}}</td>
                            <td v-if="location.description">{{location.description}}</td>
                            <td v-if="!location.description">None</td>
                            <td>{{location.date | formatDay}}</td>
                            <td>{{location.time}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-tab>
                  <b-tab title="Documents">
                    <div class="table-responsive">
                      <table class="table table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style="width: 20%">Name</th>
                            <th scope="row" style="width: 20%">Action</th>
                          </tr>
                          <tr v-for="document in eventData.documents" :key="document.id">
                            <td>{{document.filename}}</td>
                            <td><a :href="document.path" class="btn sm btn-soft-primary font-size-12 ms-2">View</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div>

            <div class="mt-4">
              <h5 class="font-size-14 mb-3">Reviews :</h5>
              <!-- <div class="text-muted mb-3">
                <span class="badge bg-success font-size-14 me-1"
                  ><i class="mdi mdi-star"></i> 4.2</span
                >
                234 Reviews
              </div> -->
                  <b-tabs
                    class="nav-tabs-custom"
                    content-class="border border-top-0 p-4"
                  >
                  <b-tab title="Donations" active>
                    <div class="border p-4 rounded" v-for="donation in eventData.donations" :key="donation.id">
                      <div class="border-bottom pb-3">
                        <p class="float-sm-right text-muted font-size-13">
                          {{donation.created_at | formatDate}}
                        </p>
                        <div class="badge bg-success mb-2" :class="{
                          'bg-soft-danger': donation.status === 'failed',
                          'bg-soft-warning': donation.status === 'pending',
                          'bg-soft-success': donation.status === 'success',
                        }">
                          {{donation.status}}
                        </div>
                        <div class=" mt-2 media">
                          <div class="media-body">
                            <h5 class="font-size-15 mb-0">{{donation.name}}</h5>
                          </div>
                        </div>
                        <p class="text-muted mt-4">
                          Email: {{donation.email}}
                        </p>
                        <p class="text-muted mt-2">
                          Phone: {{donation.phone}}
                        </p>
                        <p class="text-muted mb-4 mt-2">
                          Amount: {{donation.amount}}
                        </p>
                        
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Comments">
                    <div class="border p-4 rounded" v-for="donation in eventData.donations" :key="donation.id">
                      <div class="border-bottom pb-3">
                        <p class="float-sm-right text-muted font-size-13">
                          {{donation.created_at | formatDate}}
                        </p>
                        <div class="badge bg-success mb-2" :class="{
                          'bg-soft-danger': donation.status === 'failed',
                          'bg-soft-warning': donation.status === 'pending',
                          'bg-soft-success': donation.status === 'success',
                        }">
                          {{donation.status}}
                        </div>
                        <div class=" mt-2 media">
                          <div class="media-body">
                            <h5 class="font-size-15 mb-0">{{donation.name}}</h5>
                          </div>
                        </div>
                        <p class="text-muted mt-4">
                          Email: {{donation.email}}
                        </p>
                        <p class="text-muted mt-2">
                          Phone: {{donation.phone}}
                        </p>
                        <p class="text-muted mb-4 mt-2">
                          Amount: {{donation.amount}}
                        </p>
                        
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>

    <div class="row" v-if="!eventData">
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
    <!-- end row -->
  </Layout>
</template>
