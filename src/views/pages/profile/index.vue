<script>
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    // import Switches from "vue-switches";
    import VueToastr from "vue-toastr";
    import appConfig from "@/app.config";
    
    /**
     * Profile component
     */
    export default {
        components: {Layout, PageHeader, VueToastr },
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
                admin: {
                    name: this.name,
                    phone: this.phone
                },
                password: {
                    current: this.current,
                    new: this.new,
                },
                profile_photo: '',
                user: null,
                login2FA: false,
                transaction2FA: false,
                isLoading: false,
                Loading: false,
                loadings: false,
                url: false,
            };
        },
        methods: {
            resetPassword(e){
                e.preventDefault();
                this.loadings = true
                
                if(this.password.current == null && this.password.new == null) {
                    this.$refs.mytoast.Add({
                        msg: 'Password field is required',
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "error",
                    });
                    this.loadings = false
                } else {
                    this.loadings = true
                    this.axios.post('https://api.codedevents.com/admin/auth/password/change?old_password='+ this.password.current + '&new_password='+ this.password.new)
                    .then((res) => {
                        console.log(res.data.data);
                        this.$refs.mytoast.Add({
                            msg: "Password Reset Successfully",
                            clickClose: false,
                            timeout: 5000,
                            position: "toast-top-right",
                            type: "success",
                        })
                    })
                    .catch((err) => {
                        // this.error = true
                        console.log(err);

                        this.$refs.mytoast.Add({
                            msg: err.response.data.error,
                            clickClose: false,
                            timeout: 5000,
                            position: "toast-top-right",
                            type: "error",
                        });
                    })
                    .finally(() => {
                        this.getUser();
                        this.loadings = false

                    });
                }
            },
            enable2FA(){
                this.loadings = true
                this.axios.post('https://api.codedevents.com/admin/auth/2fa/enable')
                .then((res) => {
                    console.log(res.data.data);
                    this.$refs.mytoast.Add({
                        msg: "Login 2FA Active",
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "success",
                    })
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
                    this.getUser();
                    this.loadings = false

                });
            },
            disable2FA(){
                this.loadings = true
                this.axios.post('https://api.codedevents.com/admin/auth/2fa/disable')
                .then((res) => {
                    console.log(res.data.data);
                    this.$refs.mytoast.Add({
                        msg: "Login 2FA Inactive",
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "success",
                    })
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
                    this.getUser();
                    this.loadings = false
                });
            },
            updateProfile(e){
                e.preventDefault();
                this.isLoading = true
                this.axios.post('https://api.codedevents.com/admin/auth/profile/update', this.admin)
                .then((res) => {
                    console.log(res);
                    this.getUser();
                    this.$refs.mytoast.Add({
                        msg: "Profile Updated Successfully",
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "success",
                    })
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
                        this.isLoading =  false
                });
            },
            updateProfilePhoto(e) {
                e.preventDefault();
                this.Loading =  true
                // Set formData
                const formData = new FormData()
                // Append the method only if you are using a patch route in your server side
                formData.append('_method', 'POST')
                // Append the file
                formData.append('photo', this.profile_photo)
                
                this.axios.post('https://api.codedevents.com/admin/auth/profile/photo', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                .then((res) => {
                    console.log(res);
                    this.getUser();

                    this.$refs.mytoast.Add({
                        msg: "Profile Photo Updated Successfully",
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "success",
                    })
                })
                .catch((err) => {
                    // this.error = true
                    console.log(err);
                    this.$refs.mytoast.Add({
                        msg: err.response.data.details.photo[0],
                        clickClose: false,
                        timeout: 5000,
                        position: "toast-top-right",
                        type: "error",
                    });
                })
                .finally(() => {
                    this.Loading =  false
                });
            },
            getUser() {
                if (this.$cookies.get("token")) {
                this.axios.get('https://api.codedevents.com/admin/auth/user')
                .then((res) => {
                    console.log(res);
                    this.user = res.data.data
                    this.admin.name = res.data.data.name
                    this.admin.phone = res.data.data.phone
                    this.url = res.data.data.profile_photo
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
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
                
                this.profile_photo = URL.createObjectURL(file);
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
                            <!-- <b-dropdown class="float-end" variant="white" right menu-class="dropdown-menu-end" toggle-class="font-size-16 text-body p-0">
                                <template v-slot:button-content>
                                    <i class="uil uil-ellipsis-v"></i>
                                </template>
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </b-dropdown> -->
                            <div class="clearfix"></div>
                            <div v-if="user.profile_photo">
                                <img :src="user.profile_photo" alt class="avatar-lg rounded-circle img-thumbnail" />
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
                            <div data-simplebar style="max-height: 500px;">
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
                                <div>
                                    
                                    <h5 class="mb-3">Profile Photo</h5>
                                    <form @submit="updateProfilePhoto" method="post" enctype="multipart/form-data">
                                        <div class="card p-3">
                                            <img
                                            class="avatar-lg rounded-circle img-thumbnail"
                                            :src="url"
                                            alt="Card image cap"
                                            />
                                        
                                            <b-form-file
                                                placeholder="Choose an image here..."
                                                @change="onFileChange"
                                                v-model="profile_photo"
                                                :state="Boolean(profile_photo)"
                                            ></b-form-file>

                                            <button v-if="!Loading" @click="updateProfilePhoto" class="btn btn-primary mt-4">Submit</button>
                                            <button v-if="Loading" class="btn btn-primary mt-4">
                                                <b-spinner small variant="white" role="status" class="me-2"></b-spinner>
                                                <span>Loading...</span>
                                            </button>
                                        </div>
                                    </form>

                                    <h5 class="mt-5 mb-3">Update Profile</h5>
                                    <form method="post" @submit="updateProfile">
                                        <div class="card p-3 mb-3">
                                            <label for="validationCustom03">Name</label>
                                            <input
                                            id="validationCustom03"
                                            type="text"
                                            class="form-control mb-4"
                                            placeholder="Enter Name"
                                            v-model="admin.name"
                                            />
                                            <label for="validationCustom03">Phone</label>
                                            <input
                                            id="validationCustom03"
                                            type="number"
                                            class="form-control mb-4"
                                            placeholder="Enter Phone Number"
                                            v-model="admin.phone"
                                            />
                                            <button v-if="!isLoading" type="submit" class="btn btn-primary">Submit</button>
                                            <button v-if="isLoading" class="btn btn-primary">
                                                <b-spinner small variant="white" role="status" class="me-2"></b-spinner>
                                                <span>Loading...</span>
                                            </button>
                                        </div>
                                    </form>

                                    <div class="card p-3">
                                        <p class="mt-5 mb-3 font-bold">Update 2FA </p>
                                        <button v-if="!user.two_factor_enabled && !loadings" class="btn btn-success" @click="enable2FA">Enable 2FA</button>
                                        <button v-if="user.two_factor_enabled && !loadings" class="btn btn-danger" @click="disable2FA">Disable 2FA</button>
                                        <button v-if="loadings" class="btn btn-primary">Loading...</button>
                                    </div>
                                    
                                </div>

                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil uil-lock-alt font-size-20"></i>
                                <span class="d-none d-sm-block">Security</span>
                            </template>
                            <div>
                                <div>
                                    
                                    <h5 class="mb-3">Reset Password</h5>
                                    <form method="post" @submit="resetPassword">
                                        <div class="card p-3 mb-3">
                                            <label for="validationCustom03">Current Password</label>
                                            <input
                                            id="validationCustom03"
                                            type="password"
                                            class="form-control mb-4"
                                            placeholder="Enter Current Password"
                                            v-model="password.current"
                                            />
                                            <label for="validationCustom03">New Password</label>
                                            <input
                                            id="validationCustom03"
                                            type="password"
                                            class="form-control mb-4"
                                            placeholder="Enter New Password"
                                            v-model="password.new"
                                            />
                                            <button v-if="!isLoading" type="submit" class="btn btn-primary">Submit</button>
                                            <button v-if="isLoading" class="btn btn-primary">
                                                <b-spinner small variant="white" role="status" class="me-2"></b-spinner>
                                                <span>Loading...</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>

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
    