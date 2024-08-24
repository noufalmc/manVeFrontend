<template>
<NavbarComponents></NavbarComponents>

<section>
    <br>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-3 col-lg-3 d-none d-md-block">
             
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form @submit.prevent="loginUser()">

                 

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="username" v-model="username" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="pwd" v-model="password" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="/register"
                      style="color: #393f81;">Register here</a></p>
                  
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>



<script>
import axios from 'axios';
import NavbarComponents from '@/components/NavbarComponents.vue';
export default {
    name: 'LoginPageView',
    components: {
        NavbarComponents
    },
    mounted() {
    document.title = "Log In | DailyTracker";
    },
    data(){
        return {
            username: "",
            password: "",
            errors: []
        }
    },
    methods:{
        async loginUser(){

            console.log(this.$store.state.isAuthenticated)
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("token")

            this.errors =[]

            if (this.username == "")
            {
                this.errors.push("Username field is required")
            }
            if (this.password == "")
            {
                this.errors.push("Password field is required")

            }
            if (this.errors.length == 0)
            {
                const formData = {
                    username: this.username,
                    password: this.password
                }
                await axios
                .post('/api/v1/login/',formData).then((response)=>{
                    console.log(response)
                    if (response.data.status == 200)
                    {
                        const token = response.data.access
                        console.log(this.$store.isAuthenticated)
                        this.$store.commit("setToken", token)
                        console.log(this.$store.isAuthenticated)
                        axios.defaults.headers.common["Authorization"] = "token" + token
                        localStorage.setItem("token", token)
                        const toPath = this.$route.query.to || "/dashboard";
                        this.$router.push(toPath);

                    }
                }).catch((error) => {
                  
                  
                  this.$swal({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'error',
                  title: error.response.data.message,
                  text: '',
                  showCancelButton: 'true'
                  })


                })
            }
        }
    }
}
</script>