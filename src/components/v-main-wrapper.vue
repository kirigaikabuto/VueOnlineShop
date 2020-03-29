<template>
    <div class="v-main-wrapper">
        <p>{{title}}</p>
        <keep-alive>
            <router-view>

            </router-view>
        </keep-alive>



    </div>
</template>
<script>

    export default{
        name:"v-main-wrapper",

        props:{},
        data(){
            return{
                title:"Онлайн магазин"
            }
        },
        computed:{

        },
        methods:{

        },
        watch:{

        },
        mounted(){
            console.log("Hello from mounted")
        },
    }
</script>

<style scoped>
    .v-main-wrapper{

        max-width: 900px;

        margin:0 auto;
    }
</style>