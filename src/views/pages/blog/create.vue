<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Elements component
 */
export default {
  page: {
    title: "New Blog",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: { 
    Layout, 
    PageHeader,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      title: "New Blog",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "New Blog",
          active: true,
        },
      ],
      checked: true,
      smchecked: true,
      lgchecked: true,
      selectedToogle: "A",
      selectedDefault: "a",
      rightcheck: "accepted",
      status: "accepted",
      categoryData: null,
      url: null,
      form: {
        title: '',
        category: '',
        image: '',
        body: '',
      },
      error: {
        title: false,
        category: false,
        image: false,
        body: false,
      },
      editor: ClassicEditor,
    };
  },
  methods:{
    postBlog(e){
        e.preventDefault();

        this.error.title = false;
        this.error.category = false;
        this.error.image = false;
        this.error.body = false;

        if (this.form.title == "" || this.form.category == "" || this.form.image == "" || this.form.body == "") {
            if (this.form.title == "") {
                this.error.title = true;
            }
            if (this.form.category == "") {
                this.error.category = true;
            }
            if (this.form.image == "") {
                this.error.image = true;
            }
            if (this.form.body == "") {
                this.error.body = true;
            }
        } else {
            this.axios.post('https://api.codedevents.com/admin/blog', this.form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((res) => {
                this.categoryData = res.data.data;
                console.log(res.data.data);
                this.$router.push('/blog');
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        }
    },
    fetchCategory(){
        this.axios.get('https://api.codedevents.com/admin/categories?page=1&per_page=50')
        .then((res) => {
            this.categoryData = res.data.data;
        })
        .catch((err) => {
            console.log(err);
        })
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
  },
  mounted(){
    this.fetchCategory();
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Add Blog</h4>
            <form @submit="postBlog" method="post"  enctype="multipart/form-data">
                <div class="row">
                <div class="col-lg-5">
                    <div class="mt-4">
                    
                        <b-form-group
                        label="Title"
                        label-for="title"
                        class="mb-3"
                        >
                        <b-form-input
                            type="text"
                            id="title"
                            v-model="form.title"
                            v-bind:class="{ 'is-invalid': error.title }"
                        ></b-form-input>
                        </b-form-group>
                        <p class="text-danger" v-if="error.title">the title field is required</p>

                        <div class="row">
                        <div class="col-md-6">
                            <b-form-group
                            label="Category"
                            label-for="formrow-category"
                            class="mb-3"
                            >
                                <b-form-select v-model="form.category" class="mb-3" label-for="formrow-category" style="width: 100%; height: 38px;" v-bind:class="{ 'is-invalid': error.category }">
                                    <option :value="null" disabled>-- Please select an option --</option>
                                    <option v-for="data in categoryData" :key="data.id" :value="data.id">
                                        {{ data.name }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                            <p class="text-danger" v-if="error.category">the category field is required</p>
                        </div>
                        <div class="col-md-6">
                            <b-form-group
                            label="Image"
                            label-for="formrow-image"
                            class="mb-3"
                            >
                            <b-form-file
                                placeholder="Choose an image here..."
                                @change="onFileChange"
                                v-model="form.image"
                                :state="Boolean(form.image)"
                                v-bind:class="{ 'is-invalid': error.image }"
                            ></b-form-file>
                            </b-form-group>
                            <p class="text-danger" v-if="error.image">the image field is required</p>
                        </div>
                        <div class="row">
                            <div class="col-6" v-if="url">
                            <div class="card border shadow-none">
                                <img
                                class="card-img-top img-fluid"
                                :src="url"
                                alt="Card image cap"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 ms-lg-auto">
                    <div class="mt-5 mt-lg-4">
                        <b-form-group
                            label="Body"
                            label-for="formrow-body"
                            class="mb-3"
                            >
                            <ckeditor v-bind:class="{ 'is-invalid': error.body }" v-model="form.body" :editor="editor"></ckeditor>
                            <!-- <b-form-textarea v-bind:class="{ 'is-invalid': error.body }" id="formrow-body" rows="10" v-model="form.body"></b-form-textarea> -->
                            </b-form-group>
                        <p class="text-danger" v-if="error.body">the body field is required</p>
                    </div>
                </div>
                </div>

                <div class="mt-4">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End Form Layout -->
  </Layout>
</template>
