<script>
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import Switches from "vue-switches";
    import VueToastr from "vue-toastr";
    import appConfig from "@/app.config";
    
    /**
     * Profile component
     */
    export default {
        components: {Layout, Switches, PageHeader, VueToastr },
         page: {
        title: "Profile",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
        data() {
            return {
                title: "Profile",
                items: [{
                        text: "Contacts",
                    },
                    {
                        text: "Profile",
                        active: true,
                    },
                ],
                user: null,
                login2FA: false,
                transaction2FA: false,
            };
        },
        methods: {
            enableLogin2FA(){
                this.transaction2FA = true
                // this.axios.get('https://api.codedevents.com/admin/auth/2fa/login/enable')
                // .then((res) => {
                //     console.log(res.data.data);
                //     this.$refs.mytoast.Add({
                //         msg: "Login 2FA Active",
                //         clickClose: false,
                //         timeout: 5000,
                //         position: "toast-top-right",
                //         type: "success",
                //     })
                // })
                // .catch((err) => {
                //     // this.error = true
                //     console.log(err);

                //     this.$refs.mytoast.Add({
                //         msg: err.response.data.details,
                //         clickClose: false,
                //         timeout: 5000,
                //         position: "toast-top-right",
                //         type: "error",
                //     });
                // })
                // .finally(() => {
                //     this.getUser();
                // });
            },
            getUser() {
                if (this.$cookies.get("token")) {
                this.axios.get('https://api.codedevents.com/admin/auth/user')
                .then((res) => {
                    console.log(res);
                    this.user = res.data.data
                })
                .catch((err) => {
                    // this.error = true
                    console.log(err);
                })
                .finally(() => {
                        // this.loading =  false
                });
                } else {
                    localStorage.removeItem('user');
                }
            }
        },
        mounted() {
            this.getUser();
        }
        
    };
    </script>
    
    <template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <vue-toastr ref="mytoast"></vue-toastr>
    
        <div class="row" v-if="!user">
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

        <div class="row mb-4" v-if="user">
            <div class="col-xl-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="text-center">
                            <b-dropdown class="float-end" variant="white" right menu-class="dropdown-menu-end" toggle-class="font-size-16 text-body p-0">
                                <template v-slot:button-content>
                                    <i class="uil uil-ellipsis-v"></i>
                                </template>
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </b-dropdown>
                            <div class="clearfix"></div>
                            <div v-if="user.profile_photo">
                                <img :src="user.profile" alt class="avatar-lg rounded-circle img-thumbnail" />
                            </div>
                            <div v-else>
                                <img :src="user.thumbnail" alt class="avatar-lg rounded-circle img-thumbnail" />
                            </div>
                            <h5 class="mt-3 mb-1">{{user.name}}</h5>
                            <p class="text-muted">{{user.email}}</p>
    
                            <div class="mt-4">
                                <p 
                                    class="badge bg-pill"
                                    :class="{
                                        'bg-soft-success': user.status === 'approved',
                                        'bg-soft-danger': user.status === 'declined',
                                        'bg-soft-warning': user.status === 'pending',
                                    }"
                                    >{{user.status}}</p>
                            </div>
                        </div>
    
                        <hr class="my-4" />
    
                        <div class="text-muted">
                            <!-- <h5 class="font-size-16">About</h5>
                            <p>{{user}}</p> -->
                            <div class="table-responsive mt-4 mb-0">
                                <div>
                                    <p class="mb-1">Name :</p>
                                    <h5 class="font-size-16">{{user.name || 'null'}}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Mobile :</p>
                                    <h5 class="font-size-16">{{user.phone || '+2348012345'}}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">E-mail :</p>
                                    <h5 class="font-size-16">{{user.email}}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Role :</p>
                                    <h5 class="font-size-16">{{user.role.name}}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-xl-8">
                <div class="card mb-0">
                    <b-tabs content-class="p-4" justified class="nav-tabs-custom">
                        <b-tab active>
                            <template v-slot:title>
                                <i class="uil uil-user-circle font-size-20"></i>
                                <span class="d-none d-sm-block">Permissions</span>
                            </template>
                            <div>
                                <!-- <div>
                                    <h5 class="font-size-16 mb-4">Experience</h5>
    
                                    <ul class="activity-feed mb-0 ps-2">
                                        <li class="feed-item">
                                            <div class="feed-item-list">
                                                <p class="text-muted mb-1">2019 - 2020</p>
                                                <h5 class="font-size-16">UI/UX Designer</h5>
                                                <p>Abc Company</p>
                                                <p class="text-muted">To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual</p>
                                            </div>
                                        </li>
                                        <li class="feed-item">
                                            <div class="feed-item-list">
                                                <p class="text-muted mb-1">2017 - 2019</p>
                                                <h5 class="font-size-16">Graphic Designer</h5>
                                                <p>xyz Company</p>
                                                <p class="text-muted">It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div> -->
    
                                <div>
                                    <!-- <h5 class="font-size-16 mb-4">Permissions</h5> -->
    
                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Names</th>
                                                    <!-- <th scope="col">Date</th> -->
                                                    <th scope="col">Status</th>
                                                    <!-- <th scope="col" style="width: 120px;">Action</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="role in user.role.permissions" :key="role.id">
                                                    <th scope="row">{{role.id}}</th>
                                                    <td>
                                                        <a href="#" class="text-dark">{{role.name}}</a>
                                                    </td>
                                                    <!-- <td>18 Jun, 2020</td> -->
                                                    <td>
                                                        <span class="badge bg-soft-success font-size-12">Active</span>
                                                    </td>
                                                    <!-- <td>
                                                        <b-dropdown right toggle-class="text-muted font-size-18 px-2 p-0" variant="white" menu-class="dropdown-menu-end">
                                                            <template v-slot:button-content>
                                                                <i class="uil uil-ellipsis-v"></i>
                                                            </template>
    
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </b-dropdown>
                                                    </td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil-cog toggle-right font-size-20"></i>
                                <span class="d-none d-sm-block">Settings</span>
                            </template>
                            <div>
                                <div data-simplebar style="max-height: 430px;">
                                    <div class="mb-3">
                                        <label for="validationCustom03">Name</label>
                                        <input
                                        id="validationCustom03"
                                        type="text"
                                        class="form-control mb-4"
                                        placeholder="Enter Name"
                                        v-model="user.name"
                                        />
                                        <label for="validationCustom03">Phone</label>
                                        <input
                                        id="validationCustom03"
                                        type="number"
                                        class="form-control mb-4"
                                        placeholder="Enter Phone Number"
                                        v-model="user.phone"
                                        />
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil uil-lock-alt font-size-20"></i>
                                <span class="d-none d-sm-block">2FA</span>
                            </template>

                            <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Login 2FA</a>
                                                    </td>
                                                    <tb>
                                                        <span v-if="login2FA" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!login2FA" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </tb>
                                                    <td>
                                                        <switches
                                                        type-bold="false"
                                                        color="primary"
                                                        class="ms-1 mb-0"
                                                        v-model="login2FA"
                                                        :onclick="enableLogin2FA()"
                                                        ></switches>
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction 2FA</a>
                                                    </td>
                                                    <tb>
                                                        <span v-if="transaction2FA" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!transaction2FA" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </tb>
                                                    <td>
                                                        <switches
                                                        type-bold="false"
                                                        color="primary"
                                                        class="ms-1 mb-0"
                                                        v-model="transaction2FA"
                                                        ></switches>
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            <div>
                                <!-- <div data-simplebar style="max-height: 430px;"> -->
                                    <!-- <p class="mb-5">Set 2 Factor Authentication</p>


                                    <div style="display: flex; align-items: center; justify-content: space-around;">
                                        <p>Login 2FA</p>
                                        <switches
                                        type-bold="false"
                                        color="primary"
                                        class="ms-1 mb-0"
                                        v-model="login2FA"
                                        ></switches>
                                    </div>
                                    


                                    <switches
                                    type-bold="false"
                                    color="primary"
                                    class="ms-1 mb-0"
                                    v-model="transaction2FA"
                                    ></switches> -->
                                <!-- </div> -->
                            </div>
                        </b-tab>
                    </b-tabs>
                    <!-- Nav tabs -->
                    <!-- Tab content -->
                </div>
            </div>
        </div>
        <!-- end row -->
    </Layout>
    </template>
    