import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        animes: [],
        recommendedAnimes: [],
        contentBasedAnimes: [],
        accessToken: {},
        accessKey: "",
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products
        },
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExist = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {
                        isProductExist = true;
                        item.quantity += 1;
                    }
                })
                if (!isProductExist) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product);
            }

        },
        REMOVE: (state, index) => {
            state.cart.splice(index, 1)
        },
        SET_ANIMES_TO_STATE: (state, animes) => {
            state.animes = animes
        },
        SET_RECOMMENDED_ANIMES_TO_STATE: (state, animes) => {
            state.recommendedAnimes = animes
        },
        SET_CONTENT_BASED_ANIMES_TO_STATE: (state, animes) => {
            state.contentBasedAnimes = animes
        },
        SET_ACCESS_TOKEN: (state, accessToken) => {
            state.accessToken = accessToken
        },
        SET_ACCESS_KEY: (state, token) => {
            state.accessKey = token.access_key
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios("http://localhost:3000/products", {
                method: "GET"
            })
                .then((products) => {
                    commit("SET_PRODUCTS_TO_STATE", products.data);
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_ANIMES_FROM_API({commit}) {
            let obj = {
                username: "user1",
                password: "123456"
            }
            axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/auth/login",
                    data: {
                        "username": obj.username,
                        "password": obj.password
                    },
                }
            )
                .then((accessToken) => {
                    commit("SET_ACCESS_KEY", accessToken.data)
                    console.log("access token", accessToken)
                    return accessToken
                })
                .catch((error) => {
                    console.log(error.response.data);
                    return error;
                })
            return axios("http://localhost:8000/movies?count=100", {
                method: "GET",
            }).then((animes) => {
                commit("SET_ANIMES_TO_STATE", animes.data);
                return animes;
            }).catch((error) => {
                console.log(error);
                return error;
            })
        },
        ADD_TO_CART({commit}, product) {
            commit("SET_CART", product)
        },
        DELETE_FROM_CART({commit}, index) {
            commit("REMOVE", index)
        },
        GET_RECOMMENDED_ANIMES({commit}, obj) {
            return axios("http://localhost:8000/movies/collrec?id=" + obj.id + "&count=10", {
                method: "GET",
                headers: {"Authorization": "Bearer " + obj.access_key}
            }).then((animes) => {
                commit("SET_RECOMMENDED_ANIMES_TO_STATE", animes.data.recommended_movies);
                return animes
            }).catch((error) => {
                console.log(error);
                return error
            })
        },
        GET_CONTENT_BASED_ANIMES({commit}, obj) {
            return axios("http://localhost:8000/movies/content?id=" + obj.id + "&count=10", {
                method: "GET",
                headers: {"Authorization": "Bearer " + obj.access_key}
            }).then((animes) => {
                commit("SET_CONTENT_BASED_ANIMES_TO_STATE", animes.data.recommended_movies);
                return animes
            }).catch((error) => {
                console.log(error);
                return error
            })
        },
        LOGIN({commit}, obj) {
            return axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/login",
                    data: {
                        "username": obj.username,
                        "password": obj.password
                    },
                }
            )
                .then((accessToken) => {
                    console.log(accessToken)
                    commit("SET_ACCESS_TOKEN", accessToken.data)
                    return accessToken
                })
                .catch((error) => {
                    console.log(error.response.data);
                    return error;
                })
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        CART(state) {
            return state.cart;
        },
        ANIMES(state) {
            return state.animes;
        },
        RECOMMENDED_ANIMES(state) {
            return state.recommendedAnimes
        },
        CONTENT_BASED_ANIMES(state) {
            return state.contentBasedAnimes
        },
        ACCESS_TOKEN(state) {
            return state.accessToken
        },
        ACCESS_KEY(state) {
            return state.accessKey
        }
    }
});

export default store;
