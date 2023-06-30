<script>
import countTo from "vue-count-to";
// import SellingProduct from './selling-product'

/**
 * Sales-analytics component
 */
export default {
  components: {
    countTo,
    // SellingProduct,
  },
  data() {
    return {
      series: [
        {
          name: "Desktops",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: "Laptops",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "Tablets",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
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
          width: [0, 2, 4],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        colors: ["#5b73e8", "#dfe2e6", "#f1b44c"],
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
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
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
};
</script>

<template>
  <div class="row">
    <div class="col-lg-7">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
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
          </div>
          <h4 class="card-title mb-4">Sales Analytics</h4>

          <div class="mt-1">
            <ul class="list-inline main-chart mb-0">
              <li class="list-inline-item chart-border-left me-0 border-0">
                <h3 class="text-primary">
                  $
                  <span data-plugin="counterup">
                    <countTo
                      :startVal="1"
                      :endVal="2371"
                      :duration="2000"
                    ></countTo>
                  </span>
                  <span class="text-muted d-inline-block font-size-15 ms-3"
                    >Income</span
                  >
                </h3>
              </li>
              <li class="list-inline-item chart-border-left me-0">
                <h3>
                  <span data-plugin="counterup">
                    <countTo
                      :startVal="1"
                      :endVal="258"
                      :duration="2000"
                    ></countTo>
                  </span>
                  <span class="text-muted d-inline-block font-size-15 ms-3"
                    >Sales</span
                  >
                </h3>
              </li>
              <li class="list-inline-item chart-border-left me-0">
                <h3>
                  <span data-plugin="counterup">3.6</span>%
                  <span class="text-muted d-inline-block font-size-15 ms-3"
                    >Conversation Ratio</span
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
            <div class="card-body">

                <div class="float-end">
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="text-muted">Monthly<i class="mdi mdi-chevron-down ms-1"></i></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton4">
                            <a class="dropdown-item" href="#">Yearly</a>
                            <a class="dropdown-item" href="#">Monthly</a>
                            <a class="dropdown-item" href="#">Weekly</a>
                        </div>
                    </div>
                </div>

                <h4 class="card-title">Social Source</h4>

                <div class="text-center">
                    <div class="avatar-sm mx-auto mb-4">
                        <span class="avatar-title rounded-circle bg-primary-subtle font-size-24">
                          <img src="https://seeklogo.com/images/M/MTN-logo-459AAF9482-seeklogo.com.png" style="width: 100%; border-radius: 999px;" alt="...">
                            </span>
                    </div>
                    <p class="font-16 text-muted mb-2"></p>
                    <h5><a href="#" class="text-dark">MTN - <span class="text-muted font-16">125 sales</span> </a></h5>
                    <p class="text-muted">Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.</p>
                    <a href="#" class="text-reset font-16">Learn more <i class="mdi mdi-chevron-right"></i></a>
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
                            <p class="text-muted mb-0">125 sales</p>
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
                            <p class="text-muted mb-0">112 sales</p>
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
                            <p class="text-muted mb-0">104 sales</p>
                        </div>
                    </div>
                </div>

                <div class="mt-3 text-center">
                    <a href="#" class="text-primary font-size-14 fw-medium">View All Sources <i class="mdi mdi-chevron-right"></i></a>
                </div>

            </div>
        </div>
    </div>
  </div>
  
  <!-- end col-->
</template>
