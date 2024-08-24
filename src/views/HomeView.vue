<template>
  <NavbarComponents></NavbarComponents>
  <br>
  <div class="row">
        <br>
        <div class="col-md-5"></div>
        <div class="card col-md-7" style="width: 18rem; margin-left:10px;" v-if="this.errors.length > 0">
            <div class="card-body" style="color:red;width:100%">
                <p v-for="(error,index ) in errors" :key="index"><b> . </b>{{ error }}</p>
                
            </div>
        </div>
    </div>
  <form @submit.prevent="submitForm()" ref="UserForm">
   
    <div class="row">
    <div class="col">
      <input type="text" class="form-control" id="fname" placeholder="Enter firstname" v-model="first_name">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Enter lastname" id="lname" v-model="last_name">
    </div>
  </div>
<br>

  <div class="row">
    <div class="col-6">
      <input type="text" class="form-control" id="email" placeholder="Enter email" v-model="email">
    </div>
    <div class="col-3">
      <input type="password" class="form-control" placeholder="Enter password" id="pswd" v-model="password">
    </div>

    <div class="col-3">
      <input type="password" class="form-control" placeholder="Enter password confirmation" id="pwd1" v-model="password1">
    </div>

  </div>

  <br>
  <input type="submit" value="Register" class="btn btn-success">
</form>
  </template>

<script>
// @ is an alias to /src

import axios from "axios";
import NavbarComponents from '@/components/NavbarComponents.vue';
import store from "@/store";
import { mapGetters } from 'vuex';


export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  components:{
    NavbarComponents
  },
  data() {
    return {
     email: "",
     first_name: "",
     last_name: "",
     password: "",
     password1: "",
     errors: []
    }
  },
  methods:{
    submitForm() {
      const formData = {
        username: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        password1: this.password1
      }
      
      this.errors = [];

      console.log(store.state.isAuthenticated)

      if (this.username === "")
      {
        this.errors.push("Email field is required")
      }

      if (this.first_name === "")
      {
        this.errors.push("Firstname is required")
      }

      if (this.last_name === "")
      {
        this.errors.push("Lastname field is required")
      }

      if (this.password === "")
      {
        this.errors.push("Password field is required")
      }

      else if (this.password1 === "")
      {
        this.errors.push("Confirmation password field is required")
      }
      else if (this.password != this.password1)
      {
        this.errors.push("Password field and Password confirmation must match")
      }
      if (this.errors.length == 0)
      {

        axios.post('/api/v1/signup/', formData).then((response)=>{
        if (response['status']==201)
        {
          this.$refs.UserForm.reset();
          this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
          title: response['message'],
          text: 'Succesfully created',
          showCancelButton: 'true'
       });
        }
      }).catch((error =>{
        if (error.response) {
          
        
         this.$swal({
          
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: error.response.data.error,
          text: '',
          showCancelButton: 'true'

       });
            }

      }))
      }
    }
  }

  
}
</script>
