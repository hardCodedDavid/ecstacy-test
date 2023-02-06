<script>
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
            // getDashboardData(){
            //     this.axios.get('https://api.codedevents.com/admin/dashboard')
            //     .then((res) => {
            //         this.dashboard = res.data.data
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
            //     .finally({
    
            //     })
            // }
        },
        mounted(){
            // this.getDashboardData();
        }
    };
    </script>
    
<template>
<div class="col-xl-4">
    <div class="card">
        <div class="card-body">
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

            <!-- <ol class="activity-feed mb-0 ps-2" data-simplebar style="max-height: 336px;">
                <li class="feed-item" v-for="comment in dashboard.recent_comments" :key="comment.id">
                    <div class="feed-item-list">
                        <p class="text-muted mb-1 font-size-13">
                            {{comment.created_at | formatDate}}
                        </p>
                        <p class="mt-0 mb-0">
                            {{comment.message}}
                            <span class="text-primary">
                                {{comment.name}}
                            </span>
                        </p>
                    </div>
                </li>
            </ol> -->
        </div>
    </div>
</div>
</template>
