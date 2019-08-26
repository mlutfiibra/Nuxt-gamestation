<template>
  <div>
    <div class="row" style="margin-top: 8em;">
      <div class="col-md-7">
        <Carousel class="mb-5" />
      </div>
      <div class="col-md-5">
        <Voucher v-if="!isAdministrator" :voucherlist="voucherGames" />
      </div>
    </div>
    <CategoryList :categories="actionGames" class="mb-5">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h5>Action Games</h5>
        <router-link to="/product/category?category=action">
          <div class="color-green">See more</div>
        </router-link>
      </div>
    </CategoryList>
    <CategoryList :categories="rpgGames" class="mb-5">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h5>RPG Games</h5>
        <router-link to="/product/category?category=rpg">
          <div class="color-green">See more</div>
        </router-link>
      </div>
    </CategoryList>
    <CategoryList :categories="puzzleGames" class="mb-5">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h5>Puzzle Games</h5>
        <router-link to="/product/category?category=puzzle">
          <div class="color-green">See more</div>
        </router-link>
      </div>
    </CategoryList>
    <CategoryList :categories="fpsGames" class="mb-5">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h5>FPS Games</h5>
        <router-link to="/product/category?category=fps">
          <div class="color-green">See more</div>
        </router-link>
      </div>
    </CategoryList>
    <CategoryList :categories="casualGames" class="mb-5">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h5>Casual Games</h5>
        <router-link to="/product/category?category=casual">
          <div class="color-green">See more</div>
        </router-link>
      </div>
    </CategoryList>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import Carousel from '@/components/Carousel.vue'
import CategoryList from '@/components/CategoryList.vue'
import Card from '@/components/Card.vue'
import Voucher from '@/components/Voucher.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Card,
    Voucher,
    CategoryList
  },
  data() {
    return {
      products: [],
      rpgGames: [],
      fpsGames: [],
      voucherGames: [],
      actionGames: [],
      puzzleGames: [],
      casualGames: []
    }
  },
  head() { // <-- property used by vue-meta to add header tags
    return {
      title: 'Gamestation - Your one stop game solution', // <-- For our title tag
    }
  },
  computed: {
    getUserRole() {
      return this.$store.getters.getUserRole
    },
    isAdministrator() {
      return this.$store.getters.isAdministrator
    }
  },
  methods: {
    fetchProductByCategory() {
      ProductService.getProducts()
        .then(({
          data
        }) => {
          data.forEach(cat => {
            if (cat.category === 'fps' && this.fpsGames.length < 4) {
              this.fpsGames.push(cat)
            } else if (cat.category === 'action' && this.actionGames.length < 4) {
              this.actionGames.push(cat)
            } else if (cat.category === 'rpg' && this.rpgGames.length < 4) {
              this.rpgGames.push(cat)
            } else if (cat.category === 'puzzle' && this.puzzleGames.length < 4) {
              this.puzzleGames.push(cat)
            } else if (cat.category === 'casual' && this.casualGames.length < 4) {
              this.casualGames.push(cat)
            } else if (cat.category === 'voucher' && this.voucherGames.length < 4) {
              this.voucherGames.push(cat)
            }
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    },
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('events/fetchEvents')
    }catch(e) {
      error({ statusCode: 503, message: 'Unable to fetch events at this time, please try again' })
    }
  },
  mounted() {
    this.fetchProductByCategory()
  }
}
</script>
