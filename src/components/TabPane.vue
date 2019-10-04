<template>
  <div id="myTabContent" class="tab-content">
  <div class="tab-pane fade show active" id="home">
    <div class="row" :style="`padding-bottom: ${currentTrack ? '70px' : '0'}`">
      <div class="column itemsWrapper">
        <div class="row">
          <track-item-grid v-for="(track , i) in searchResults.length > 0 ? searchResults: tracks"
          :key="i" :trackData="track" :onClick="handleClickTrack"/>
        </div>
      </div>
    </div>
    <div class="column">
      <h1 v-if="getTracksLoading || searchTracksLoading">
        Loading...
      </h1>
    </div>
  </div>
  <!-- <div class="tab-pane fade" id="profile">
    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
  </div>
  <div class="tab-pane fade" id="dropdown1">
    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
  </div>
  <div class="tab-pane fade" id="dropdown2">
    <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
  </div> -->
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import _ from 'lodash'
import TrackItemGrid from '@/components/TrackItemGrid'
import Player from '@/components/Player'

export default {
  data(){
    return {
      page: 1 , 
      currentTrack: null 
    }
  }, 
  mounted(){
    this.$store.dispatch('getTracks' , {
      genre: 'Hiphop',
      page: 1
    })
    window.addEventListener('scroll' , this.scroll)
  }, 
  watch: {
    tracks(nextTracks , prevTracks){
      if(nextTracks.length > 0 && !_.isEqual(nextTracks , prevTracks)){
        this.$store.dispatch('setPlayerTracks', nextTracks)
      }
    },
    searchResults(nextSearchResults , prevSearchResults){
      if(nextSearchResults.length > 0 && !_.isEqual(nextSearchResults , prevSearchResults)){
        this.$$store.dispatch('setPlayerTracks' , nextSearchResults)
      }else if (prevSearchResults.length > 0 && nextSearchResults.length === 0 ){
        this.$store.dispatch('setPlayerTracks' , this.tracks)
      }
    },
    destroyed(){
      window.removeEventListener('scroll' , this.scroll)
      this.$store.dispatch('pause')
      this.$store.dispatch('setPlayerTracks' , [])
      this.$store.dispatch('setPlayerCurrentTrack' , null)
    }
  }, 
  components: {
    TrackItemGrid,
    Player
  },
  computed: {
    ...mapGetters({
      getTracksLoading: 'getTracksLoading',
      tracks: 'tracks',
      activeGenre: ' activeGenre',
      lastPage: 'lastPage',
      searchTracksLoading: 'searchTracksLoading',
      searchResults: 'searchResults',
      searchQuery: 'searchQuery',
      lastSearchPage: 'lastSearchPage',
      playerCurrentTrack: 'playerCurrentTrack'
    })
  },
  methods: {
    scroll(){
      const page = this.lastPage ? this.lastPage + 1 : this.page += 1 
      const bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) > (document.documentElement.offsetHeight - 50)

      if(bottomOfWindow && !this.getTracksLoading){
        if(this.searchQuery){
          this.$store.dispatch('search' , {
            query: this.searchQuery , 
            page: this.lastSearchPage + 1
          })
        } else {
          this.$store.dispatch('getTracks' , {
            genre: this.activeGenre ? this.activeGenre : '#saHiphop' , page
          })
        }
      }
    }, 
    handleClickTrack(trackData){
      if(this.playerCurrentTrack && this.playerCurrentTrack.id === trackData.id){
        this.$store.dispatch('setPlayerCurrentTrack' , null)
      }else {
        this.$store.dispatch('setPlayerCurrentTrack' , trackData)
      }
    }
  }
  
}
</script>

<style scoped>
  .itemsWrapper {
    margin: 0 auto;
    float: none;
  }
</style>
