<template>
    <userDashboardNav></userDashboardNav>
<br>
<h2>Add User Scape!!</h2>
<div class="row">
        <br>
        <div class="col-md-5"></div>
        <div class="card col-md-7" style="width: 18rem; margin-left:10px;" v-if="this.errors.length > 0">
            <div class="card-body" style="color:red;width:100%">
                <p v-for="(error,index ) in errors" :key="index"><b> . </b>{{ error }}</p>
                
            </div>
        </div>
    </div>

<form @submit.prevent="submitForm()" ref="userForm">
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
            <label style="margin: 10px 10px;">Category</label>
            <select class="form-control" @change="getSubCategory($event.target.value)" v-model="category_post">
                <option value="">Choose Category</option>
                <option v-for="value in category" :key="value.id" v-bind:value="value.id">
                    {{ value.title }}
                </option>
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
            <label style="margin: 10px 10px;">Sub Category</label>
            <select class="form-control" v-model="subCategory_post">
                <option value="">Choose Category</option>
                <option v-for="value in subCategory" :key="value.id" v-bind:value="value.id">
                    {{ value.title }}
                </option>
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
            <label style="margin: 10px 10px;">Date</label>
            <datetime  format="YYYY-MM-DD h:i:s" v-model='dateTimeValue'  @input="dateTimeValue = $event" style="width: 100%;"></datetime>
            
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
            <label style="margin: 10px 10px;">Short description</label>
            <br>
            <textarea v-model="short_description" style="width: 100%"></textarea>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-6">
            <input type="submit" value="Add" class="btn btn-success">
        </div>
    </div>

    </form>
</template>

<script>
import axios from 'axios';
import '@vuepic/vue-datepicker/dist/main.css';
import datetime from 'vuejs-datetimepicker'; // Ensure this path is correct
import userDashboardNav from '@/components/userDashboardNav.vue';



export default {
    name:'AddUserScape',
    data () {
        return {
            errors: [],
            category: [],
            subCategory: [],
            category_post: "",
            subCategory_post: "",
            dateTimeValue: "",
            short_description: ""
        }
    },
    components: {
        datetime, userDashboardNav
    },
    watch: {
        dateTimeValue(newValue) {
        this.dateTimeValue = newValue
    }
    },
    mounted()   {
        this.getCategory()
    },
    methods: {
        getCategory() {
            const token = localStorage.getItem("token")
            const config = {
                headers :{
                    Authorization: "Bearer " + token
                }
            }
            axios.get('/api/v1/category', config).then((response) => {
                    this.category= response.data.data
            })
        },
        
        getSubCategory(id) {
            
            const token = localStorage.getItem("token")
            const config = {
                headers :{
                    Authorization: "Bearer " + token
                }
            }
            axios.get('/api/v1/sub-category/'+id, config).then((response) => {
              this.subCategory =  response.data.data
            })
        },

        submitForm() {
            const token = localStorage.getItem("token")
            this.errors = []
            const formData = {
                
                sub_category: this.subCategory_post,
                date: this.dateTimeValue,
                short_description: this.short_description
            }
            const config = {
                headers :{
                    Authorization: "Bearer " + token,
                    'Content-Type': 'multipart/form-data',
                }
            }
            
            if (this.category_post =='') {

                this.errors.push('Category Required')
            }

            if (this.subCategory_post == '') {

                this.errors.push('Sub Category Required')
            }
            
            if (this.short_description =='') {

                this.errors.push('Short Description Required')
            }

            if (this.dateTimeValue == '')
            {
                this.errors.push("Date Feild Required")
            }            
            console.log(this.errors.length)



            if (this.errors.length ==0)
            {
                axios.post('/api/v1/user-scape/',formData, config).then((response) => 
                {
                    console.log(response.data)
                    if (response.data.status ==201)
                    {
                        this.$refs.userForm.reset();
                        this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: 'Created',
                        text: 'Succesfully created',
                        showCancelButton: 'true'
                        })
                    }
                }).catch((error) => {

                    console.log(error.response.data.error)
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'error',
                        title: 'Failed',
                        text:error.response.data.error,
                        showCancelButton: 'true'
                        })

                })
            }
        }
    }
}
</script>