<script>
    import Layout from "../../layouts/main";
    import PageHeader from "@/components/page-header";
    import appConfig from "@/app.config";
    
    /**
     * Profile component
     */
    export default {
        components: {Layout,PageHeader },
         page: {
        title: "User Detail",
        meta: [
          {
            name: "description",
            content: appConfig.description,
          },
        ],
      },
        data() {
            return {
                title: "User Detail",
                items: [{
                        text: "Contacts",
                    },
                    {
                        text: "User Detail",
                        active: true,
                    },
                ],
                user: null,
                wallet: null,
            };
        },
        methods: {
            fetchWallet(){
                this.axios.get('https://api.codedevents.com/admin/users/' + this.$route.params.id + '/wallet')
                .then((res) => {
                    console.log(res);
                    this.wallet = res.data.data
                })
                .catch((err) => {
                    // this.error = true
                    console.log(err);
                })
                .finally(() => {
                        // this.loading =  false
                });
            }
        },
        mounted() {
            this.fetchWallet();
            if (this.$cookies.get("token")) {
            this.axios.get('https://api.codedevents.com/admin/users/' + this.$route.params.id)
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
        
    };
    </script>
    
    <template>
    <Layout>
        <PageHeader :title="title" :items="items" />
    
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
                                <img :src="profile_photo" alt class="avatar-lg rounded-circle img-thumbnail" />
                            </div>
                            <div v-else>
                                <div class="avatar-md d-inline-block me-2">
                                    <div class="avatar-title bg-soft-primary rounded-circle text-primary">
                                        <i class="mdi mdi-account-circle"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 class="mt-3 mb-1">{{user.name}}</h5>
                            <p class="text-muted">{{user.email}}</p>
    
                            <div class="mt-4">
                                <p 
                                    class="badge bg-pill"
                                    :class="{
                                        'bg-soft-success': user.status === 'approved',
                                        'bg-soft-danger': user.status === 'restricted',
                                        'bg-soft-warning': user.status === 'pending',
                                    }"
                                    >
                                    <span>{{user.status}}</span>
                                </p>
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
                                    <p class="mb-1">Country :</p>
                                    <h5 class="font-size-16">{{user.country}}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">City :</p>
                                    <h5 class="font-size-16">{{user.city}}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Address :</p>
                                    <h5 class="font-size-16">{{user.address || "no address"}}</h5>
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
                                <span class="d-none d-sm-block">Information</span>
                            </template>
                            <div>
                                <div>
                                    <!-- <h5 class="font-size-16 mb-4">Permissions</h5> -->
    
                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            
                                            <tbody>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Registerd Date</a>
                                                    </td>
                                                    <td><p>{{user.created_at | formatDate }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Wallet Balance</a>
                                                    </td>
                                                    <td><p>{{ wallet.wallet_balance }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Email Verified</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.email_verified" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.email_verified" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction Pin</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.has_transaction_pin" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.has_transaction_pin" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Login 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.login" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.login" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.transaction" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.transaction" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil uil-money-bill-stack font-size-20"></i>
                                <span class="d-none d-sm-block">Transactions</span>
                            </template>
                            <div>
                                <div>
                                    <!-- <h5 class="font-size-16 mb-4">Permissions</h5> -->
    
                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            
                                            <tbody>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Registerd Date</a>
                                                    </td>
                                                    <td><p>{{user.created_at | formatDate }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Wallet Balance</a>
                                                    </td>
                                                    <td><p>{{ wallet.wallet_balance }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Email Verified</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.email_verified" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.email_verified" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction Pin</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.has_transaction_pin" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.has_transaction_pin" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Login 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.login" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.login" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.transaction" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.transaction" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <i class="uil uil-file-alt font-size-20"></i>
                                <span class="d-none d-sm-block">Events</span>
                            </template>
                            <div>
                                <div>
                                    <!-- <h5 class="font-size-16 mb-4">Permissions</h5> -->
    
                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            
                                            <tbody>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Registerd Date</a>
                                                    </td>
                                                    <td><p>{{user.created_at | formatDate }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Wallet Balance</a>
                                                    </td>
                                                    <td><p>{{ wallet.wallet_balance }}</p></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Email Verified</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.email_verified" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.email_verified" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction Pin</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.has_transaction_pin" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.has_transaction_pin" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <!-- <th scope="row">{{role.id}}</th> -->
                                                    <td>
                                                        <a href="#" class="text-dark">Login 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.login" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.login" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="text-dark">Transaction 2FA</a>
                                                    </td>
                                                    <td>
                                                        <span v-if="user.two_factor_enabled.transaction" class="badge bg-soft-success font-size-12">Active</span>
                                                        <span v-if="!user.two_factor_enabled.transaction" class="badge bg-soft-danger font-size-12">Inactive</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
    