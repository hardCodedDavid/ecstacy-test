<script>
import appConfig from "@/app.config";

/**
 * Recover-password component
 */
export default {
  page: {
    title: "Recoverpwd",
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
      title: "Recoverpwd",
      forgotPassword: true,
      verifyPassword: false,
      changePassword: false,

      email: this.email,
      sentMsg: this.sentMsg,
      messageSent: false,
      error: this.error,
      errorMsg: this.errorMsg,

      old_password: null,
      new_password: null,

      loading: false,
      token: this.token,
    };
  },
  methods: {
    forgotPasswords() {
      this.loading = true
      this.error = false
      this.messageSent = false
      this.axios.post('https://api.codedevents.com/admin/auth/password/email?email=' + this.email)
            .then((res) => {
                console.log(res.data);
                this.sentMsg = res.data.message
                this.messageSent = true

                this.forgotPassword = false
                this.verifyPassword = true
                this.changePassword = false

                if(res.data.status == 404){
                  this.errorMsg = res.data.msg
                  this.error = true
                }
            })
            .catch(err => {
                console.log(err);
                this.errorMsg = "Invalid Credential"
                this.error = true
                this.messageSent = false

                this.forgotPassword = true
                this.verifyPassword = false
                this.changePassword = false
            })
            .finally(() => {
              this.loading =  false
            });
    },

    verifyToken() {
      this.loading = true
      this.error = false
      this.messageSent = true
      this.axios.post('https://api.codedevents.com/admin/auth/password/token?email=' + this.email + '&token=' + this.token)
            .then((res) => {
                console.log(res.data);
                this.messageSent = true

                this.forgotPassword = false
                this.verifyPassword = false
                this.changePassword = true
            })
            .catch(err => {
                console.log(err);
                this.messageSent = true
                this.error = true
                this.errorMsg = 'Token is invalid '

                this.forgotPassword = false
                this.verifyPassword = true
                this.changePassword = false
            })
            .finally(() => {
              this.loading =  false
            });
    },

    changePasswords() {
      this.loading = true
      this.error = false

      if (this.old_password !== this.new_password) {
        this.error = true
        this.errorMsg = 'Password does not match'
        this.loading = false
      } else if(this.old_password == null && this.new_password == null) {

        this.error = true
        this.errorMsg = 'Password is required'
        this.loading = false
      } else {
          this.axios.post('https://api.codedevents.com/admin/auth/password/reset?email=' + this.email + '&password=' + this.new_password)
          .then((res) => {
              console.log(res);
              this.$router.push('/login');
              if (res.data.status == 200) {
                  console.log('success');
              } else if(res.data.status == 404) {
                  this.errorMsg = res.data.msg
                  this.error = true
              }
          })
          .catch(err => {
              console.log(err);
          })
          .finally(() => {
            this.loading =  false
          });
      }
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

              <div class="card" v-if="forgotPassword">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Reset Password</h5>
                    <p class="text-muted">Reset Password with Minible.</p>
                  </div>
                  <div class="p-2 mt-4">
                    <div
                      class="alert alert-success text-center mb-4"
                      role="alert" v-if="messageSent"
                    >
                      {{sentMsg}}
                    </div>

                    <div class="loader" v-if="loading">
                      <p class="text-center text-success font-bold">Loading...</p>
                    </div>

                      <div class="mb-3">
                        <label for="useremail" v-if="!messageSent">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-bind:class="{ 'is-invalid': error }"
                          id="useremail"
                          placeholder="Enter email"
                          v-model="email"
                        />
                        <span class="text-danger" v-if="error">{{errorMsg}}</span>
                      </div>

                      <div class="mt-3 text-end" v-if="!messageSent">
                        <button
                          class="btn btn-primary w-sm waves-effect waves-light"
                          type="submit"
                          @click="forgotPasswords()">
                          Reset
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
                    <!-- </form> -->
                  </div>
                </div>
              </div>

              <div class="card" v-if="verifyPassword">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Reset Password</h5>
                    <p class="text-muted">Reset Password with Minible.</p>
                  </div>
                  <div class="p-2 mt-4">
                    <div
                      class="alert alert-success text-center mb-4"
                      role="alert" v-if="messageSent"
                    >
                      {{sentMsg}}
                    </div>

                    <div class="loader" v-if="loading">
                      <p class="text-center text-success font-bold">Loading...</p>
                    </div>

                      <div class="mb-3">

                        <label v-if="messageSent" for="useremail">Verify OTP</label>
                        <input
                          type="number"
                          class="form-control"
                          v-bind:class="{ 'is-invalid': error }"
                          id="useremail"
                          placeholder="Enter OTP"
                          v-model="token"
                        />
                        <span class="text-danger" v-if="error">{{errorMsg}}</span>
                      </div>

                      <div class="mt-3 text-end" v-if="messageSent">
                        <button
                          class="btn btn-primary w-sm waves-effect waves-light"
                          type="submit"
                          @click="verifyToken()">
                          Verify OTP
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
                    <!-- </form> -->
                  </div>
                </div>
              </div>

              <div class="card" v-if="changePassword">
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
                          v-bind:class="{ 'is-invalid': error }"
                          id="useremail"
                          placeholder="Enter password"
                          v-model="old_password"
                          required
                        />
                        <span class="text-danger" v-if="error">{{errorMsg}}</span>

                        <br>

                        <label for="password">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          v-bind:class="{ 'is-invalid': error }"
                          id="useremail"
                          placeholder="Confirm Password"
                          v-model="new_password"
                          required
                        />
                        
                      </div>

                      <div class="mt-3 text-end">
                        <button
                          class="btn btn-primary w-sm waves-effect waves-light"
                          type="submit"
                          @click="changePasswords()"
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
