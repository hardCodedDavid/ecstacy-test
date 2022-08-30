<script>
import appConfig from "@/app.config";

/**
 * Recover-password component
 */
export default {
  page: {
    title: "ResetPassword",
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
      title: "ResetPassword",
      email: this.email,
      old_password: this.old_password,
      new_password: this.new_password,
      error: this.error,
      errorMsg: this.errorMsg,
      loading: false,
    };
  },
  methods: {
    changePassword() {
      this.loading = true
      this.error = false
      this.axios.post('https://api.codedevents.comadmin/auth/password/reset?email=' + this.email + '&password=' + this.new_password)
            .then((res) => {
                console.log(res.data);
                // if(res.data.status == 404){
                //   this.errorMsg = res.data.msg
                //   this.error = true
                // }
            })
            .catch(err => {
                console.log(err);
                // this.errorMsg = "Invalid Credential"
                // this.error = true
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
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div>
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
              <div class="card">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Change Password</h5>
                    <p class="text-muted">Change Password with Minible.</p>
                  </div>
                  <div class="p-2 mt-4">

                    <div class="loader" v-if="loading">
                      <p class="text-center text-success font-bold">Loading...</p>
                    </div>
                      <div class="mb-3">
                        <label for="password">New Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter password"
                          v-model="old_password"
                          v-if="!error"
                        />
                        <br>
                        <label for="password">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="useremail"
                          placeholder="Confirm Password"
                          v-model="new_password"
                          v-if="!error"
                        />
                        <span class="text-danger" v-if="error">{{errorMsg}}</span>
                      </div>

                      <div class="mt-3 text-end">
                        <button
                          class="btn btn-primary w-sm waves-effect waves-light"
                          type="submit"
                          @click="changePassword()"
                          >
                          Change Password
                        </button>
                      </div>

                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          Remember It ?

                          <router-link
                            to="/login"
                            class="fw-medium text-primary"
                            >Signin</router-link
                          >
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 text-center">
                <p>
                  © {{ new Date().getFullYear() }} Minible. Crafted with
                  <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
  </div>


</template>
