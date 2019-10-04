<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <div class="mainTrackWrapper">
          <h4 v-if="getTrackLoading">Loading...</h4>
          <track-item-row v-if="!getTrackLoading && trackData"
          :trackData="trackData"
          :onPlayTrack="handlePlayTrack"
          :main="true"></track-item-row>
        </div>
        <div class="row userMusicsWrapper">
          <h4 v-if="getUserTracksLoading">Loading ...</h4>
          <track-item-row v-if="(!getUserTracksLoading && !getTrackLoading) && (userTracksData.length > 0)"
          v-for="(track , i ) in userTracksData"
          :key="i" :trackData="track"
          :onPlayTrack="handlePlayTrack"></track-item-row>
        </div>
      </div>
      <div :class="`stickyWrapper${playerCurrentTrack ? 'playedOpened' : ''}`">
        <div class="column followingWrapper">
          <h4 v-if="!getTrackCommentsLoading">Comments</h4>
          <h4 v-if="getTrackCommentsLoading">Loading...</h4>
          <comment-item v-if="!getTrackCommentsLoading"
          v-for="(comment , i) in trackCommentsData" :key="i" :commentData ="comment"></comment-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Sticky from 'vue-sticky-directive'
import _ from 'lodash'
import CommentItem from '@/components/CommentItem'
import TrackItemRow from '@/components/TrackItemRow'
import Player from '@/components/Player'
import numberSeparator from '@/utils/number'
export default {
  computed: {
    ...mapGetters({
      getTrackLoading: 'getTrackLoading',
      trackData: 'trackData',
      getTrackFail: 'getTrackFail',
      getTrackCommentsFail: 'getTrackCommentsFail',
      getUserTracksLoading: 'getUserTracksLoading' , 
      userTracksData: 'userTracksData',
      getUserTracksFail: 'getUserTracksFail',
      playerCurrentTrack: 'playerCurrentTrack'
    })
  },
  mounted() {
    const {params: {id}} = this.$route 
    this.$store.dispatch('getTrack' , id)
    this.$store.dispatch('getTrackComments' , id)
   },
   components: {
     CommentItem,
     TrackItemRow,
     Player
   },
   watch: {
     $route({params:{id: nextUserId}} , {params: {id: prevUserId}}){
       if(nextUserId !== prevUserId){
         this.$store.dispatch('getTrack' , nextUserID)
         this.$store.dispatch('getTrackComments' , nextUserID)
       }
     },
     trackData(nextTrackData , prevTrackData){
       if(nextTrackData && !_.isEqual(nextTrackData , prevTrackData)){
         this.$store.dispatch('getUserTracks' , nextTrackData.user.id)
       }
     },
     destroyed(){
       this.$store.dispatch('pause')
       this.$store.dispatch('setPlayerTracks' , [])
       this.$store.dispatch('setPlayerCurrentTrack' , null)
     }, 
     directives: {
       Sticky
     }, 
     methods: {
       handlePlayTrack(trackData , main){
         setTimeout(() => {
           if(this.playerCurrentTrack && this.playerCurrentTrack.id === trackData.id){
             this.$store.dispatch('setPlayerCurrentTrack' , null)
             this.$store.dispatch('setPlayerTracks' , [])
           } else {
             this.$store.dispatch('setPlayerCurrentTracks' , trackData)
             if(main){
               this.$store.dispatch('setPlayerTracks' , [])
             }else {
               this.$store.dispatch('setPlayerTracks' , this.userTracksData)
             }
           }
         }, 100)
       },
       numberSeparator
     }
   }
  
}
</script>

<style scoped>
  .container {
    margin: 0 auto;
    float: none;
    height: calc(100vh - 100px);
  }
  .followingWrapper {
    background: #fff;
    overflow-y: scroll;
    height: 100vh;
    position: absolute;
    right: 0;
  }
  .mainTrackWrapper {
    margin: 0 0 20px;
    width: 100%;
    display: flex;
  }
  .userMusicsWrapper {
    margin: 0 !important;
  }
  .stickyWrapper.top-sticky > div {
    height: calc(100vh - 20px);
  }
  .stickyWrapper.playerOpened.top-sticky > div {
    height: calc(100vh - 90px);
  }
</style>
