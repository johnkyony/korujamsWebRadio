<template>
  <div>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <a v-for="(genre , i) in genres" :key="i" @click="getGenreItems(genre)" class="nav-link active"  data-toggle="tab" href="#home">{{genre}}</a>
  </li>
  <!-- <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#profile">Profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="homedropdown-divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </div>
  </li> -->
</ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
    return {
      genres: [
        'hiphop', 
        'beats',
        'amapiano', 
        'gqom',
        'deepHouse'
      ], 
      query: ''
    }
  },
  updated(){
    if(!this.query && this.searchQuery){
      this.handleClearSearch()
    }
  },
  computed: {
    ...mapGetters({
      activeGenre: 'activeGenre',
      getTracksLoading: 'getTracksLoading',
      searchQuery: 'searchQuery', 
      searchTracksLoading: 'searchTracksLoading'
    })
  },
  methods: {
    getGenreItems(genre){
      this.$store.dispatch('setActiveTrack' , null)
      this.$store.dispatch('clearTracks')
      this.$store.dispatch('getTracks' , {genre , page: 1})
    }
  }  
}
</script>