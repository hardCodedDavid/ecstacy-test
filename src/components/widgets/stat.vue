<script>
import countTo from "vue-count-to";
/**
 * Stat component
 */
export default {
    props:{
        total_users: {
            default: 0
        },
        total_transactions: {
            default: 0
        },
        total_topup_amount: {
            default: 0
        }
    },
    components: {
        countTo
    },
    data() {
        return {
            series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
            }],
            chartOptions: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            growthChartOptions: {
                fill: {
                    colors: ["#f1b44c"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            orderseries: [70],
            orderRadial: {
                fill: {
                    colors: ["#34c38f"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            },
            customerseries: [55],
            customerRadial: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            },
            dashboard: 888,
        };
    },
    methods: {
        // getDashboardData(){
        //     this.axios.get(BASE_URL+'/api/v1/admin/dashboard')
        //     .then((res) => {
        //         // console.log(res.data.data)
        //         this.dashboard = res.data.data
        //     })
        //     .catch((err) => {
        //         // console.log(err.response);
        //         this.$refs.mytoast.Add({
        //           msg: err.response.data.message,
        //           clickClose: false,
        //           timeout: 5000,
        //           position: "toast-top-right",
        //           type: "error",
        //       });
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
<div class="row">
    <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2">
                    <apexchart class="apex-charts" dir="ltr" width="70" height="40" :options="chartOptions" :series="series"></apexchart>
                </div>
                <div>
                    <h4 class="mb-1 mt-1">
                        <span data-plugin="counterup">
                            <countTo :startVal="10" :endVal="total_users" :duration="2000"></countTo>
                        </span>
                    </h4>
                    <p class="text-muted mb-0">Total Users</p>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2">
                    <apexchart class="apex-charts" type="radialBar" dir="ltr" width="45" height="45" :options="orderRadial" :series="orderseries"></apexchart>
                </div>
                <div>
                    <h4 class="mb-1 mt-1">
                        ₦
                        <span data-plugin="counterup">
                            <countTo :startVal="10" :endVal="total_topup_amount" :duration="2000"></countTo>
                        </span>
                    </h4>
                    <p class="text-muted mb-0">Total Wallet Topup</p>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2">
                    <apexchart class="apex-charts" type="radialBar" dir="ltr" width="45" height="45" :options="orderRadial" :series="orderseries"></apexchart>
                </div>
                <div>
                    <h4 class="mb-1 mt-1">
                        ₦
                        <span data-plugin="counterup">
                            <countTo :startVal="10" :endVal="dashboard.total_active_subscriptions_amount" :duration="2000"></countTo>
                        </span>
                    </h4>
                    <p class="text-muted mb-0">Total Withdrawals</p>
                </div>
            </div>
        </div>
    </div>
    <!-- end col-->

    <!-- <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2">
                    <apexchart class="apex-charts" dir="ltr" width="70" height="40" :options="growthChartOptions" :series="series"></apexchart>
                </div>
                <div>
                    <h4 class="mb-1 mt-1">
                        ₦
                        <span data-plugin="counterup">
                            <countTo :startVal="10" :endVal="dashboard.total_pending_withdrawals" :duration="2000"></countTo>
                        </span>
                    </h4>
                    <p class="text-muted mb-0">Pending Withdrawals</p>
                </div>
            </div>
        </div>
    </div> -->
    <!-- end col-->


    <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2">
                    <apexchart class="apex-charts" type="radialBar" dir="ltr" width="45" height="45" :options="customerRadial" :series="customerseries"></apexchart>
                </div>
                <div>
                    <h4 class="mb-1 mt-1">
                        <span data-plugin="counterup">
                            <countTo :startVal="1000" :endVal="total_transactions" :duration="2000"></countTo>
                        </span>
                    </h4>
                    <p class="text-muted mb-0">Total Transactions</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- end col-->
</div>
<!-- end row-->
</template>
