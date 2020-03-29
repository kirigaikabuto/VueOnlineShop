<template>
    <div class="v-main-wrapper">
        <p>{{title}}</p>
        <v-cart
                v-if="CART.length"
                :cart_data="CART"
        />
        <v-catalog/>

    </div>
</template>
<script>
    import vCatalog from './v-catalog'
    import vCart from "./v-cart"
    import {mapGetters} from  "vuex"
    export default{
        name:"v-main-wrapper",
        components:{
            vCatalog,
            vCart
        },
        props:{},
        data(){
            return{
                title:"Онлайн магазин"
            }
        },
        computed:{
            ...mapGetters([
                "CART"
            ])
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