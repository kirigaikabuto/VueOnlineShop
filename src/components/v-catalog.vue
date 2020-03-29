<template>
<div class="v-catalog">
    <h1>Catalog</h1>
    <v-catalog-item
            v-for="product in PRODUCTS "
            :key="product.article"
            :product_data="product"
            @addToCart="addToCart"
    />
</div>
</template>

<script>
    import vCatalogItem from "./v-catalog-item"
    import {mapActions,mapGetters} from "vuex"
    export default {
        name: "v-catalog",
        components:{
            vCatalogItem,
        },
        props:{},
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters([
                'PRODUCTS'
            ])
        },
        methods:{
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            addToCart(data){
                this.ADD_TO_CART(data)
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then((response)=>{
                if(response.data){
                    console.log("data is getted")
                }
            })
        }
    }
</script>

<style lang="scss">
.v-catalog{
    &__list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
}
</style>