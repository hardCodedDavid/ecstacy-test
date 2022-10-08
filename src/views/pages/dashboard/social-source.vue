<script>
<<<<<<< HEAD
    /**
     * Top-users component
     */
    export default {
        data() {
            return {
                dashboard: null,
            };
        },
        methods: {
            getDashboardData(){
                this.axios.get('https://api.codedevents.com/admin/dashboard')
                .then((res) => {
                    this.dashboard = res.data.data
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally({
    
                })
            }
        },
        mounted(){
            this.getDashboardData();
        }
    };
    </script>
    
=======
/**
 * Social-source component
 */
export default {};
</script>

>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
<template>
<div class="col-xl-4">
    <div class="card">
        <div class="card-body">
<<<<<<< HEAD
            <!-- <div class="float-end">
                <b-dropdown right toggle-class="p-0" variant="white" menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <span class="text-muted">
                            Recent
                            <i class="mdi mdi-chevron-down ms-1"></i>
                        </span>
                    </template>
                    <b-dropdown-item href="#">Recent</b-dropdown-item>
                    <b-dropdown-item href="#">By Users</b-dropdown-item>
                </b-dropdown>
            </div> -->

            <h4 class="card-title mb-4">Recent Comments</h4>

            <ol class="activity-feed mb-0 ps-2" data-simplebar style="max-height: 336px;">
                <li class="feed-item" v-for="comment in dashboard.recent_comments" :key="comment.id">
                    <div class="feed-item-list">
                        <p class="text-muted mb-1 font-size-13">
                            {{comment.created_at | formatDate}}
                            <!-- <small class="d-inline-block ms-1">12:20 pm</small> -->
                        </p>
                        <p class="mt-0 mb-0">
                            {{comment.message}}
                            <span class="text-primary">
                                {{comment.name}}
                            </span>
                        </p>
                    </div>
                </li>
            </ol>
=======
            <div class="float-end">
                <b-dropdown right variant="white" toggle-class="p-0" menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <span class="text-muted">
                            Monthly
                            <i class="mdi mdi-chevron-down ms-1"></i>
                        </span>
                    </template>
                    <b-dropdown-item href="#">Yearly</b-dropdown-item>
                    <b-dropdown-item href="#">Monthly</b-dropdown-item>
                    <b-dropdown-item href="#">Weekly</b-dropdown-item>
                </b-dropdown>
            </div>

            <h4 class="card-title">Social Source</h4>

            <div class="text-center">
                <div class="avatar-sm mx-auto mb-4">
                    <span class="avatar-title rounded-circle bg-soft-primary font-size-24">
                        <i class="mdi mdi-facebook text-primary"></i>
                    </span>
                </div>
                <p class="font-16 text-muted mb-2"></p>
                <h5>
                    <a href="#" class="text-dark">
                        Facebook -
                        <span class="text-muted font-16">125 sales</span>
                    </a>
                </h5>
                <p class="text-muted">Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.</p>
                <a href="#" class="text-reset font-16">
                    Learn more
                    <i class="mdi mdi-chevron-right"></i>
                </a>
            </div>
            <div class="row mt-4">
                <div class="col-4">
                    <div class="social-source text-center mt-3">
                        <div class="avatar-xs mx-auto mb-3">
                            <span class="avatar-title rounded-circle bg-primary font-size-16">
                                <i class="mdi mdi-facebook text-white"></i>
                            </span>
                        </div>
                        <h5 class="font-size-15">Facebook</h5>
                        <p class="text-muted mb-0">125 sales</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="social-source text-center mt-3">
                        <div class="avatar-xs mx-auto mb-3">
                            <span class="avatar-title rounded-circle bg-info font-size-16">
                                <i class="mdi mdi-twitter text-white"></i>
                            </span>
                        </div>
                        <h5 class="font-size-15">Twitter</h5>
                        <p class="text-muted mb-0">112 sales</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="social-source text-center mt-3">
                        <div class="avatar-xs mx-auto mb-3">
                            <span class="avatar-title rounded-circle bg-pink font-size-16">
                                <i class="mdi mdi-instagram text-white"></i>
                            </span>
                        </div>
                        <h5 class="font-size-15">Instagram</h5>
                        <p class="text-muted mb-0">104 sales</p>
                    </div>
                </div>
            </div>

            <div class="mt-3 text-center">
                <a href="#" class="text-primary font-size-14 fw-medium">
                    View All Sources
                    <i class="mdi mdi-chevron-right"></i>
                </a>
            </div>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
        </div>
    </div>
</div>
</template>
