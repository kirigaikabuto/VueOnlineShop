<template>
  <div>
  <div class="menu">
    <ul>
      <router-link :to="{name:'login'}">
          <li><a>Авторизация</a></li>
      </router-link>

      <li><a>Регистрация</a></li>
    </ul>
  </div>
    <div class="v-main-wrapper">

        <keep-alive>
            <router-view>

            </router-view>
        </keep-alive>



    </div>
  </div>
</template>
<script>

    export default{
        name:"v-main-wrapper",

        props:{},
        data(){
            return{
                title:"AnimeVost"
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
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      float: right;
    }

    li {
      float: left;
    }

    li a {
      display: block;
      color: black;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    /* Change the link color to #111 (black) on hover */
    li a:hover {
      background-color: #eeeeee;
    }
</style>
