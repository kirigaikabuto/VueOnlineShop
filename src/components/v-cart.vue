<template>
    <div class="v-cart">
        <h1>Корзина</h1>
        <v-cart-item
               v-for="item in cart_data"
               :cart_item_data="item"
               :key="item.article"
        />
    </div>
</template>

<script>
    import vCartItem from './v-cart-item'
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
    }
</script>

<style scoped>

</style>