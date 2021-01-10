<template>
  <div class="v-student-login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mt-5 mx-auto">
          <form v-on:submit.prevent="login" method="post">
            <h1 class="h3 mb-3 font-weight-normal">Авторизация</h1>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="username" v-model="username" class="form-control" name="username"
                     placeholder="Enter username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="password" class="form-control" name="password"
                     placeholder="Enter Password">
            </div>
            <button class="btn btn-lg btn-primary btn-block">Sign in</button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: "v-login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters([
      'ACCESS_TOKEN',
    ])
  },
  methods: {
    ...mapActions([
      'LOGIN',
    ]),
    login() {
      this.LOGIN({username: this.username, password: this.password}).then((response) => {
        console.log(response.data)
        if (response.data) {
          console.log("data is getted")
        }
      });
    }
  },
}
</script>

<style lang="scss">
.v-student-login {
  color: aliceblue;
  height: 1000px;

  &__login_form {
  }
}

.v-start {
  display: flex;
  color: aliceblue;
  font-size: 40px;
  padding: 25%;

  &__student_btn {
    background-color: #2c3e50;
    flex-basis: 50%;
    align-items: center;
    text-align: center;
  }

  &__student_login {
    flex-basis: 50%;
    color: aliceblue;
  }

  &__teacher_btn {
    flex-basis: 50%;
    align-items: center;
    text-align: center;
    background-color: brown;
  }

  &__teacher_login {
    color: aliceblue;
    text-align: center;
  }
}
</style>
