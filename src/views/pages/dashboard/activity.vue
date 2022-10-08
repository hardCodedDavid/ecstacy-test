<script>
<<<<<<< HEAD
    /**
     * Top-users component
     */
    export default {
        data() {
            return {
                users: [{
                        profile: require("@/assets/images/users/avatar-4.jpg"),
                        name: "Glenn Holden",
                        location: "Nevada",
                        status: "Cancel",
                        price: "$250.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-5.jpg"),
                        name: "Lolita Hamill",
                        location: "Texas",
                        status: "Success",
                        price: "$110.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-6.jpg"),
                        name: "Robert Mercer",
                        location: "California",
                        status: "Active",
                        price: "$420.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-7.jpg"),
                        name: "Marie Kim",
                        location: "Montana",
                        status: "Pending",
                        price: "$120.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-8.jpg"),
                        name: "Sonya Henshaw",
                        location: "Colorado",
                        status: "Active",
                        price: "$112.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-2.jpg"),
                        name: "Marie Kim",
                        location: "Australia",
                        status: "Success",
                        price: "$120.00",
                    },
                    {
                        profile: require("@/assets/images/users/avatar-1.jpg"),
                        name: "Sonya Henshaw",
                        location: "India",
                        status: "Cancel",
                        price: "$112.00",
                    },
                ],
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
    
    <template>
    <div class="col-xl-4">
        <div class="card">
            <div class="card-body">
                <!-- <div class="float-end">
                    <b-dropdown variant="white" toggle-class="p-0" menu-class="dropdown-menu-end">
                        <template v-slot:button-content>
                            <span class="text-muted">
                                All Members
                                <i class="mdi mdi-chevron-down ms-1"></i>
                            </span>
                        </template>
                        <b-dropdown-item href="#">Locations</b-dropdown-item>
                        <b-dropdown-item href="#">Revenue</b-dropdown-item>
                        <b-dropdown-item href="#">Join Date</b-dropdown-item>
                    </b-dropdown>
                </div> -->
                <h4 class="card-title mb-4">New events </h4>
    
                <div data-simplebar style="max-height: 336px;">
                    <div class="table-responsive">
                        <table class="table table-borderless table-centered table-nowrap">
                            <tbody>
                                <tr v-for="(item, index) in dashboard.new_events" :key="index">
                                    <td style="width: 20px;">
                                        <img :src="item.banner" class="avatar-xs rounded-circle" alt="..." />
                                    </td>
                                    <td>
                                        <h6 class="font-size-15 mb-1 fw-normal">{{item.title}}</h6>
                                        <p class="text-muted font-size-13 mb-0">
                                            <i class="uil-user-circle"></i>
                                            {{item.user.name}}
                                        </p>
                                    </td>
                                    <td>
                                        <span class="badge font-size-12" :class="{
                                            'bg-soft-success': item.status === 'active',
                                            'bg-soft-danger': item.status === 'restricted',
                                            'bg-soft-info': item.status === 'draft',
                                            'bg-soft-warning': item.status === 'pending'}">{{item.status}}</span>
                                    </td>
                                    <td class="text-muted fw-semibold text-end">
                                        <i class="icon-xs icon me-2 text-success" data-feather="trending-up"></i>
                                        {{item.amount}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- enbd table-responsive-->
                </div>
                <!-- data-sidebar-->
            </div>
            <!-- end card-body-->
        </div>
        <!-- end card-->
    </div>
    <!-- end col -->
    </template>
    
=======
/**
 * Activity component
 */
export default {};
</script>

<template>
<div class="col-xl-4">
    <div class="card">
        <div class="card-body">
            <div class="float-end">
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
            </div>

            <h4 class="card-title mb-4">Recent Activity</h4>

            <ol class="activity-feed mb-0 ps-2" data-simplebar style="max-height: 336px;">
                <li class="feed-item">
                    <div class="feed-item-list">
                        <p class="text-muted mb-1 font-size-13">
                            Today
                            <small class="d-inline-block ms-1">12:20 pm</small>
                        </p>
                        <p class="mt-0 mb-0">
                            Andrei Coman magna sed porta finibus, risus
                            posted a new article:
                            <span class="text-primary">
                                Forget UX
                                Rowland
                            </span>
                        </p>
                    </div>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        22 Jul, 2020
                        <small class="d-inline-block ms-1">12:36 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Andrei Coman posted a new article:
                        <span class="text-primary">Designer Alex</span>
                    </p>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        18 Jul, 2020
                        <small class="d-inline-block ms-1">07:56 am</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, sed porta finibus, risus Chris Wallace
                        Commented
                        <span class="text-primary">Developer Moreno</span>
                    </p>
                </li>
                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        10 Jul, 2020
                        <small class="d-inline-block ms-1">08:42 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, Chris combined Commented
                        <span class="text-primary">UX Murphy</span>
                    </p>
                </li>

                <li class="feed-item">
                    <p class="text-muted mb-1 font-size-13">
                        23 Jun, 2020
                        <small class="d-inline-block ms-1">12:22 am</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, sed porta finibus, risus Chris Wallace
                        Commented
                        <span class="text-primary">Developer Moreno</span>
                    </p>
                </li>
                <li class="feed-item pb-1">
                    <p class="text-muted mb-1 font-size-13">
                        20 Jun, 2020
                        <small class="d-inline-block ms-1">09:48 pm</small>
                    </p>
                    <p class="mt-0 mb-0">
                        Zack Wetass, Chris combined Commented
                        <span class="text-primary">UX Murphy</span>
                    </p>
                </li>
            </ol>
        </div>
    </div>
</div>
</template>
>>>>>>> fa72f8d02fa6a3d0881114fc34d75efa15ce1e68
