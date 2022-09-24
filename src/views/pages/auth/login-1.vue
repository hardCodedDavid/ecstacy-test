<script>
import appConfig from "@/app.config";

/**
 * Login-1 component
 */
export default {
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  data() {
    return {
      title: "Log in",
      user: {
                // email: this.email, 
                // password: this.paasword,
                email: "admin@codedevents.com", 
                password: "password",
            },
      loading: false,
      error: false,
      errorMsg: null,
    };
  },
  methods: {
      loginUser(e) {
          e.preventDefault();
          this.loading = true
          this.error = false

          // if (this.user.email == "") {
          //   this.error = true
          //   this.errorMsg = 'Email field'
          // }
          //::POST Login Request
          this.axios.post('https://api.codedevents.com/admin/auth/login', this.user)
          .then((res) => {
            //Store token to localStorage
              localStorage.setItem('user', JSON.stringify(res.data));
            //Add token to Authorization header
              this.axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
              this.$cookies.set("token", res.data.data.token, 60 * 60 * 2);
              
            //Redirect User when done
              this.$router.push('/');
              
              // console.log(res);
          })
          .catch((err) => {
              this.error = true
              this.errorMsg = "Invalid Credential"
              console.log(err);
          })
          .finally(() => {
                this.loading =  false
          });
      }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <router-link to="/" class="text-dark"
        ><i class="mdi mdi-home-variant h2"></i
      ></router-link>
    </div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="@/assets/images/logo-dark.png"
                  alt=""
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo-light.png"
                  alt=""
                  height="22"
                  class="logo logo-light"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 style="color: #761300;">Welcome Back !</h5>
                  <p class="text-muted">Sign in to continue to Coded Events.</p>
                </div>
                <div class="p-2 mt-4">
                  <form method="post" @submit="loginUser">
                    <div class="mb-3">
                        <label for="username">Email</label>
                      
                      <input
                        type="email"
                        class="form-control"
                        id="username"
                        placeholder="Enter email"
                        v-model="user.email"
                        v-if="!error"
                        required
                      />

                      <input
                        type="email"
                        class="form-control is-invalid"
                        id="username"
                        placeholder="Enter email"
                        v-model="user.email"
                        v-if="error"
                        required
                      />
                      <span class="text-danger" v-if="error">{{errorMsg}}</span>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted">
                          Forgot password?</router-link
                        >
                      </div>
                      <label for="userpassword">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="userpassword"
                        placeholder="Enter password"
                        v-model="user.password"
                        required
                      />
                    </div>

                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div>

                    <div v-if="!loading" class="mt-3 text-end">
                      <button
                        class="brand-primary btn btn-primary w-sm waves-effect waves-light"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>

                    <div v-if="loading" class="mt-3 text-end">
                      <div class="brand-primary btn btn-primary w-sm waves-effect waves-light">
                        <b-spinner small variant="white" role="status" class="me-2"></b-spinner>
                        <span>Loading...</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <p>
                <!-- © {{ new Date().getFullYear() }} © All rights reserved Coded Events -->
                <span>© All rights reserved Coded Events</span> 
                <br>
                <span>Produced by <a href="https://softwebdigital.com/" target="_blank" class="text-primary font-bold">Soft-Web Digital</a></span>
              </p>
            </div>

            
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
  </div>
</template>
