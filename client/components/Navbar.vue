<template>
  <nav>
    <div style="position: fixed; z-index: 999; width: 100%;">
      <div class="my-nav black">
        <div style="width: 18%;">
          <router-link class="navbar-brand" style="width: 1.5em;" to="/">
            <span style="color: #fff;">GameStation</span>
          </router-link>
        </div>

        <div style="width: 70%;">
          <ul class="category">
            <router-link to="/product/category?category=action">
              <li>ACTION</li>
            </router-link>
            <router-link to="/product/category?category=rpg">
              <li>RPG</li>
            </router-link>
            <router-link to="/product/category?category=puzzle">
              <li>PUZZLE</li>
            </router-link>
            <router-link to="/product/category?category=fps">
              <li>FPS</li>
            </router-link>
            <router-link to="/product/category?category=casual">
              <li>CASUAL</li>
            </router-link>
          </ul>
        </div>

        <div v-if="isLoggedIn">
          <div v-if="!isAdministrator" class="d-flex">
            <ul class="navbar-nav">
              <li class="nav-item" style="width: 40px; align-self: center;">
                <router-link to="/cart" style="color: #fff;">
                  <div class="cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="count">{{cartLength}}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <div v-if="!isAdministrator" class="nav-item dropdown">
              <span class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{user ? user.name : ''}}
              </span>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="left: -6em;">

                <router-link class="dropdown-item" :to="`/user/${userId}`">Profile & Orders</router-link>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item cursor-pointer" @click="clickLogout">Logout</span>
              </div>
            </div>
          </div>

          <div v-else style="d-flex">
            <ul class="navbar-nav">
              <li class="nav-item dropdown cursor-pointer">
                <span class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">Dashboard Admin</span>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" to="/admin/product">Products</router-link>
                  <router-link class="dropdown-item" to="/admin/transaction">Transactions</router-link>
                  <div class="dropdown-divider"></div>
                  <span class="dropdown-item" @click="clickLogout">Logout</span>
                </div>
              </li>

            </ul>
          </div>
        </div>

        <div v-else class="d-flex" style="width: 12%; justify-content: space-between;">
          <div style="margin-right: 15px;">
            <router-link to="/login" style="color: #fff;">Login</router-link>
          </div>
          <div>
            <router-link to="/register" style="color: #fff;">Register</router-link>
          </div>
        </div>
      </div>
      <div class="sub-nav">
        <div class="input-group">
          <form @submit.prevent="submitSearchProduct" style="display: flex;">
            <div class="input-group">
              <input 
                class="form-control" 
                type="search" 
                placeholder="search in gamestation"
                aria-label="search in gamestation" 
                v-model.trim="searchValue"
              >
              <div class="input-group-append">
                <button class="btn btn-light" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 5em;">&nbsp;</div>
  </nav>
</template>

<script>
  import {getCookieByName} from '@/helpers/cookie'
  import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    methods: { getCookieByName },
    data() {
      return {
        searchValue: ''
      }
    },
    computed: {
      user() {
        return this.$store.state.users.user
      },
      cartLength() {
        return this.$store.state.carts ? this.$store.state.carts.length : 0
      },
      isLoggedIn() {
        return this.$store.state.users.isLoggedIn
      },
      isAdministrator() {
        return this.$store.state.users.isAdministrator
      },
      userId() {
        return getCookieByName('id')
      }
    },
    mounted() {
      if ( getCookieByName('token') ) {
        this.$store.dispatch('carts/fetchCarts')
      }
    },
    methods: {
      clickLogout() {
        this.$store.dispatch('users/logout')
      },
      submitSearchProduct() {
        if (this.searchValue.trim()) {
          this.$router.push(`/search?q=${this.searchValue}`)
        }
      }
    },
  }

</script>

<style scoped>
  .navbar {
    padding: 11px 7em;
    border-bottom: solid 1px #ededed;
  }

  .navbar-nav {
    flex-direction: row;
  }

  .category {
    display: flex;
    justify-content: space-around;
  }

  .category {
    padding: 10px 0px;
    color: #fff;
    font-weight: 500;
    margin: 0px;
    padding: 0;
  }

  .category li {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    flex-shrink: inherit;
    justify-items: self-end;

  }

  .category li:hover {
    cursor: pointer;
  }

  .cart {
    position: relative;
  }

  .cart>.count {
    border-radius: 50%;
    background-color: #ed591f;
    padding: 0px 6px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: -8px;
    left: 31%;
  }

  .sub-nav {
    background-color: #000;
    border-bottom: solid 1px #616161;
    display: flex;
    justify-content: space-between;
    padding: 10px 5rem;
  }

  .category a {
    color: #fff;
  }

  .category a:hover {
    font-weight: 700;
    text-decoration: unset;
    color: #fff;
  }

</style>
