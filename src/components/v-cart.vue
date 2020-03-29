<template>
    <div class="v-cart">
        <h1>Корзина</h1>
        <v-cart-item
               v-for="(item,index) in cart_data"
               :cart_item_data="item"
               :key="item.article"
               @deleteFromCart="deleteFromCart(index)"
        />
    </div>
</template>

<script>
    import vCartItem from './v-cart-item'
    import {mapActions} from 'vuex'
    export default {
        name: "v-cart.vue",
        components:{
          vCartItem
        },
        props:{
            cart_data:{
                type:Array,
                default() {
                    return [];
                }
            }
        },
        data(){
            return{

            }
        },
        computed:{

        },
        methods:{
            ...mapActions([
               "DELETE_FROM_CART"
            ]),
            deleteFromCart(index){
                this.DELETE_FROM_CART(index);
            }
        }
    }
</script>

<style scoped>

</style>