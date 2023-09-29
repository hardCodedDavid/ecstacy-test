ag
<script>
/**
 * Top-users component
 */
export default {
  props: {
    recent_transactions: {
      default: [],
    },
  },
  data() {
    return {
      dashboard: null,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <div class="col-xl-6">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-4">Recent Transactions</h4>

        <div data-simplebar style="max-height: 336px;">
          <div class="table-responsive">
            <table class="table table-borderless table-centered table-nowrap">
              <tbody>
                <tr v-for="item in recent_transactions" :key="item.id">
                  <!-- <td style="width: 20px;">
                                        <img :src="item.banner" class="avatar-xs rounded-circle" alt="..." />
                                    </td> -->
                  <td>
                    <h6 class="font-size-15 mb-1 fw-normal">
                      {{ item.title }}
                    </h6>
                    <!-- <p class="text-muted font-size-13 mb-0">
                                            <i class="uil-user-circle"></i>
                                            {{item.title}}
                                        </p> -->
                  </td>
                  <td class="text-muted fw-semibold text-end">
                    <i
                      class="icon-xs icon me-2 text-success"
                      data-feather="trending-up"
                    ></i>
                    ₦{{
                      item.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                  <td>
                    <span
                      class="badge font-size-12"
                      :class="{
                        'bg-soft-success': item.status === 'delivered',
                        'bg-soft-danger': item.status === ('fail' || 'failed'),
                        'bg-soft-warning': item.status === 'pending',
                      }"
                      >{{ item.status }}</span
                    >
                  </td>
                  <td>
                    <span
                      class="badge font-size-12"
                      :class="{
                        'bg-soft-danger': item.transaction_type === 'outflow',
                        'bg-soft-success': item.status === 'inflow',
                      }"
                      >{{ item.transaction_type }}</span
                    >
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
