<template>

  <div class="v-catalog-item-detail">
    <router-link :to="{name:'catalog'}">
      <div class="v-catalog__link_to_cart">
        Каталог
      </div>
    </router-link>
    <img :src="anime.photo" class="v-catalog-item__image">
    <h2 class="v-catalog-item-detail__name">{{ anime.name }}</h2>
    <p class="v-catalog-item-detail__price">{{ anime.count_episode }}</p>
    <p>{{ anime.description }}</p>

    <div v-if="errorExist">
      <p>{{ errorMessage }}</p>
    </div>
    <div class="div_anime" v-for="recommended_anime in RECOMMENDED_ANIMES" :key="recommended_anime.id">
      <img :src="recommended_anime.photo" class="v-catalog-item__image" width="50">

      <p>{{ recommended_anime.name }}</p>

    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: "v-catalog-item-detail",
  data() {
    return {
      errorExist: false,
      errorMessage: "",
    }
  },
  props: {
    anime: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters([
      'RECOMMENDED_ANIMES',
    ])
  },
  methods: {
    ...mapActions([
      'GET_RECOMMENDED_ANIMES',
    ]),
  },
  mounted() {
    this.GET_RECOMMENDED_ANIMES(this.anime).then((response) => {
      console.log(response.response.status)
      if (response.response.status === 500) {
        this.errorExist = true;
        this.errorMessage = "Для просмотра рекомендательного контента пожалуйста авторизуйтесь"
      } else if (response.data) {
        console.log("recommedned data is getted")
        console.log(response.data)
      }
    });
  }
}
</script>

<style lang="scss">
.v-catalog-item-detail {
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;

  &__image {
    width: 100%;
  }

  &__name {
    float: left;
  }
}

#div_top_hypers {
  background-color: #eeeeee;
  display: inline;
}

.div_anime {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-top: 200px;
  float: left;
}
</style>
