<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Korujams Radio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Featured Artists</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Bookings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" @submit.prevent="handleSearch" clearable>
      <input class="form-control mr-sm-2" type="text" placeholder="Search music" v-model="query">
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  </div>

</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      query: ''
    }
  },
  methods: {
    handleSearch(){
      if(this.query &&  (!this.query || (this.searchQuery !== this.query))){
        this.$store.dispatch('search' , {
          query: this.query ,
          page:  1, 
        })
      }
    },
    handleClearSearch(){
      this.$store.dispatch('clearSearch')
    }
  },
  computed: {
    ...mapGetters({
      searchQuery: 'searchQuery', 
      searchTracksLoading: 'searchTracksLoading'
    })
  }, 
  updated(){
    if(!this.query && this.searchQuery){
      this.handleClearSearch()
    }
  }
}
</script>
