<template>
    <div class="container-fluid" style="margin-left: 10px;margin-top: 10px;">
        <userDashboardNav></userDashboardNav>
        <br>
        <div class="row">
                <div class="card" style="width: 18rem;margin: 10px 22px;" v-for="value in userScape" :key="value.id">
                    <div class="col-md-12">
                        <div class="card-body">
                            <h5 class="card-title">{{ value.main_category	}} - {{value.sub_category_name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"></h6>
                            <p class="card-text" style="color:blue;">{{  value.short_description	 }}</p>
                            <p class="card-text" style="color:red;">Date:{{  value.date	 }}</p>
                            <p class="card-text">{{  value.no_of_days	 }}</p>
                        </div>
                    </div>
                </div>       
        </div>
    </div>

</template>



<script>
import axios from 'axios';
import userDashboardNav from '@/components/userDashboardNav.vue';
export default {
    name: 'userHome',
    mounted() {
    document.title = "User Home| DailyTracker";
    this.getUserScape()
    },
    components:{
        userDashboardNav,
    },
    data(){
        return{
            userScape:[]
        }
    },
    methods: {
      async getUserScape(){
            
            const token = localStorage.getItem("token")
            const config = {
                headers :{
                    Authorization: "Bearer " + token
                }
            }
            await axios.get('/api/v1/user-scape/',config).then((response) =>{
                    // console.log(response.data.data)
                    this.userScape = response.data.data
                    console.log(this.userScape)
            })
        }
    }
}
</script>


<style scoped>
.card:hover
{
    background: rgb(213, 204, 219);
    color: white;
    background: linear-gradient(90deg, rgb(156, 149, 160) 0%, rgb(170, 146, 146) 50%, rgb(148, 12, 175) 100%);
}
</style>