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
        accessToken: {},
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
        SET_ACCESS_TOKEN: (state, accessToken) => {
            state.accessToken = accessToken
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
            return axios("http://127.0.0.1:8000/movies?count=100", {
                method: "GET"
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
            return axios("http://127.0.0.1:8000/movies/" + obj.id, {
                method: "GET"
            }).then((animes) => {
                commit("SET_RECOMMENDED_ANIMES_TO_STATE", animes.data);
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
        ACCESS_TOKEN(state) {
            return state.accessToken
        }
    }
});

export default store;
