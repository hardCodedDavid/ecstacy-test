<script>
/**
 * Top-users component
//  */
//  import SellingProduct from './selling-product'

export default {
  data() {
    return {
      dashboard: null,
    };
  },
  components: {
    // SellingProduct,
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
  mounted() {
    // this.getDashboardData();
  },
};
</script>

<template>
  <div class="col-xl-4">
    <SellingProduct />
  </div>
</template>
