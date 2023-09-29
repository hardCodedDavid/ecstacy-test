<script>
import countTo from "vue-count-to";
// import { BASE_URL } from '../../../baseconstant'
// import SellingProduct from './selling-product'

/**
 * Sales-analytics component
 */
export default {
  components: {
    countTo,
    // SellingProduct,
  },
  props:{
    social_analysis: {},
  },
  data() {
    return {
      series: [
        // {
        //   name: "Desktops",
        //   type: "column",
        //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        // },
        {
          name: "Airtime",
          type: "area",
          data: [],
        },
        {
          name: "Data Bundle",
          type: "line",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [ 2, 4],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        colors: ["#09a3273d", "#ff7800"],
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
        ],
        markers: {
          size: 0,
        },

        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Points",
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  },
  watch: {
    social_analysis: {
      handler: function (newData) {
        const airtimeData = newData.airtime_monthly_count.map((item) => item.count);
        const dataBundleData = newData.data_monthly_count.map((item) => item.count);

        // Update chart series
        this.series = [
          {
            name: 'Airtime',
            data: airtimeData,
          },
          {
            name: 'Data Bundle',
            data: dataBundleData,
          },
        ];

        // Update x-axis labels
        // this.chartOptions.labels = months;

        this.chartOptions.labels = [
          "04/02/2023",
          "05/02/2023",
          "06/02/2023",
          "07/02/2023",
          "08/02/2023",
          "09/02/2023",
        ];
      },
      immediate: true, // Trigger the watcher immediately with the initial props value
    },
  },
};
</script>

<template>
  <div class="row">
    <div class="col-lg-7">
      <div class="card">
        <div class="card-body">
          <!-- <div class="float-end">
            <b-dropdown
              variant="white"
              toggle-class="text-reset p-0"
              menu-class="dropdown-menu-end"
            >
              <template v-slot:button-content>
                <span class="fw-semibold">Sort By:</span>
                <span class="text-muted">
                  Yearly
                  <i class="mdi mdi-chevron-down ms-1"></i>
                </span>
              </template>
              <a class="dropdown-item" href="#">Monthly</a>
              <a class="dropdown-item" href="#">Yearly</a>
              <a class="dropdown-item" href="#">Weekly</a>
            </b-dropdown>
          </div> -->
          <h4 class="card-title mb-4">Sales Analytics</h4>

          <div class="mt-1">
            <ul class="list-inline main-chart mb-0">
              <li class="list-inline-item chart-border-left me-0 border-0">
                <h3 class="text-primary">
                  ₦
                  <span data-plugin="counterup">
                    <countTo
                      :startVal="1"
                      :endVal="social_analysis.airtime_sum"
                      :duration="2000"
                    ></countTo>
                  </span>
                  <span class="text-muted d-inline-block font-size-15 ms-3"
                    >Airtime</span
                  >
                </h3>
              </li>
              <li class="list-inline-item chart-border-left me-0">
                <h3>
                  ₦
                  <span data-plugin="counterup">
                    <countTo
                      :startVal="1"
                      :endVal="social_analysis.data_sum"
                      :duration="2000"
                    ></countTo>
                  </span>
                  <span class="text-muted d-inline-block font-size-15 ms-3"
                    >Data Bundle</span
                  >
                </h3>
              </li>
            </ul>
          </div>

          <div class="mt-3">
            <apexchart
              type="line"
              class="apex-charts"
              dir="ltr"
              height="339"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
        <!-- end card-body-->
      </div>
      <!-- end card-->
    </div>
    <div class="col-lg-5">
        <div class="card">
            <div class="card-body" style="height: 480px;">

                <h4 class="card-title">Social Source</h4>

                <div class="text-center">
                    <div class="avatar-sm mx-auto mb-4">
                        <span class="avatar-title rounded-circle bg-primary-subtle font-size-24">
                          <img src="https://seeklogo.com/images/M/MTN-logo-459AAF9482-seeklogo.com.png" style="width: 100%; border-radius: 999px;" alt="...">
                            </span>
                    </div>
                    <p class="font-16 text-muted mb-2"></p>
                    <h5><a href="#" class="text-dark">MTN - <span class="text-muted font-16">{{ social_analysis.total_mtn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} sales</span> </a></h5>
                    <p class="text-muted">Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.</p>
                    <!-- <a href="#" class="text-reset font-16">Learn more <i class="mdi mdi-chevron-right"></i></a> -->
                </div>
                <div class="row mt-4">
                    <div class="col-4">
                        <div class="social-source text-center mt-3">
                            <div class="avatar-xs mx-auto mb-3">
                                <span class="avatar-title rounded-circle bg-primary font-size-16">
                                    <img src="https://seeklogo.com/images/M/MTN-logo-459AAF9482-seeklogo.com.png" style="width: 100%; border-radius: 999px;" alt="...">
                                </span>
                            </div>
                            <h5 class="font-size-15">MTN</h5>
                            <p class="text-muted mb-0">{{ social_analysis.total_mtn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} sales</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="social-source text-center mt-3">
                            <div class="avatar-xs mx-auto mb-3">
                                <span class="avatar-title rounded-circle bg-info font-size-16">
                                  <img src="https://1.bp.blogspot.com/-zUhUG9NDTQo/XwDDR3l0lsI/AAAAAAAALkY/V8DkFAgXNhMxLbQzEIlacyGrXpQWE60jQCLcBGAsYHQ/s1600/airtel.jpg" style="width: 100%; height: 100%; border-radius: 999px;" alt="...">
                                </span>
                            </div>
                            <h5 class="font-size-15">Airtel</h5>
                            <p class="text-muted mb-0">{{ social_analysis.total_airtel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} sales</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="social-source text-center mt-3">
                            <div class="avatar-xs mx-auto mb-3">
                                <span class="avatar-title rounded-circle bg-pink font-size-16">
                                  <img src="https://mir-s3-cdn-cf.behance.net/projects/404/40dd9197247519.5ec157b829648.png" style="width: auto; height: 100%; border-radius: 999px;" alt="...">
                                </span>
                            </div>
                            <h5 class="font-size-15">GLO</h5>
                            <p class="text-muted mb-0">{{ social_analysis.total_glo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} sales</p>
                        </div>
                    </div>
                </div>

                <div class="mt-3 text-center" style="padding-top: 30px;">
                      <router-link
                        to="/transactions"
                        class="text-primary font-size-14 fw-medium"
                      >
                        View Transactions <i class="mdi mdi-chevron-right"></i>
                      </router-link>
                </div>

            </div>
        </div>
    </div>
  </div>
  
  <!-- end col-->
</template>
