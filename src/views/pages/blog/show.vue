<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { productData } from "../ecommerce/data-products";
import appConfig from "@/app.config";

/**
 * Product-detail component
 */
export default {
  components: { Layout, PageHeader },
  page: {
    title: "Blog Detail",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  created() {
    this.productDetail = productData.filter((product) => {
      return product.id === parseInt(this.$route.params.id);
    });
  },
  data() {
    return {
      productDetail: null,
      productData: productData,
      title: "Blog Detail",
      blogData: null,
      items: [
        {
          text: "App",
        },
        {
          text: "Blog Detail",
          active: true,
        },
      ],
    };
  },
  methods: {
        fetchData(){
            this.axios.get('https://api.codedevents.com/admin/blog/'+ this.$route.params.id)
            .then((res) => {
                console.log(res.data.data);
                this.blogData = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                // this.isBusy =  false
            });
        }
  },
  mounted(){
        this.fetchData();
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <template v-if="!blogData">
                <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
                </div>
            </template>
            <div class="row" v-if="blogData">
              <div class="col-xl-5">
                <div class="product-detail">
                  <div class="product-img">
                        <img
                          :src="blogData.image"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                </div>
              </div>

              <div class="col-xl-7">
                <div class="mt-4 mt-xl-3 pl-xl-4">
                  <h5 class="font-size-14">
                    <a href="#" class="text-muted">{{blogData.category.name}}</a>
                  </h5>
                  <h4 class="font-size-20 mb-3">{{blogData.title}}</h4>
                  
                  <div class="text-muted mb-4" v-html="blogData.body"></div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
