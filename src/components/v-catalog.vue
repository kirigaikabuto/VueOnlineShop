<template>
<div class="v-catalog">
    <h1>Список Аниме</h1>
    <div class="v-catalog__list">
    <v-catalog-item
            v-for="product in ANIMES"
            :key="product.id"
            :product_data="product"
            @addToCart="addToCart"/>
    </div>
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
                'PRODUCTS',
                'CART',
                'ANIMES',
            ])
        },
        methods:{
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART',
                'GET_ANIMES_FROM_API',
            ]),
            addToCart(data){
                this.ADD_TO_CART(data)
            }
        },
        mounted() {
            this.GET_ANIMES_FROM_API().then((response)=>{
              if(response.data){
                console.log("data anime is getted")
              }
              console.log(response.data)
            });
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
    &__link_to_cart{
        position: absolute;
        top:10px;
        right: 10px;
        padding: $padding*2;
        border:1px solid #000;
    }
}
</style>
