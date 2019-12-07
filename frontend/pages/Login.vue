<template>
<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="field">
              <label for="" class="label">Username</label>
              <div class="control has-icons-left">
                <input type="text" placeholder="FTP Username" v-model="username" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" v-model="password" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button @click="doAuth" class="button is-success">
                Login
              </button>
            </div>
            <div class="field">
              <i class="label">{{message}}</i>
            </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
const config = require('../../config');

export default {
  data () {
    return {
      username: '',
      password: '',
      message: '',
    }
  },
  methods: {
    doAuth() {
      const user = config.users.admin;
      if (user.username==this.username && user.password == this.password) {
        this.$router.push({path:'/FTP'});
      }
      else {
        this.message = "Wrong username or password.";
      }
    },
  },
}
</script>