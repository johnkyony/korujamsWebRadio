<template>
  <div class="container">
    <div class="row">
      <div class="column">

        <div class="row">
          <div class="column">

            <div class="card mainUserCardWrapper">
              <h4 v-if="getUserProfileLoading"> Loading ...</h4>
              <div v-if="userProfileData && !getUserProfileLoading">
                <img :src="userProfileData.avatar_url" :alt="userProfileData.username" class="avatar">
                <h3>{{userProfileData.username}}</h3>
                <div class="otherDetailsWrapper">
                  <p>
                    <font-awesome-icon icon="map-marker-alt"/>
                    {{userProfileData.country || 'Earth'}}
                  </p>
                  <p>
                    <font-awesome-icon icon="users"/>
                    {{numberSeparator(userProfileData.followers_count)}}
                  </p>
                  <a :href="userProfileData.website" target="_blank">
                    <font-awesome-icon icon="globe"/>
                      {{userProfileData.website_title}}
                  </a>
                </div>
                <p class="description" v-html="userProfileData.description"></p>
              </div>
            </div>
            <div class="row userMusicWrapper">
              <h4 v-if="getUserTracksLoading">Loading...</h4>
              <track-item-row 
              v-if="!getUserTracksLoading && (userTracksData && userTracksData.length > 0)"
              v-for="(track , i) in userTracksData"
              :key="i" :trackData="track"
              :onPlayTrack="handlePlayTrack"></track-item-row>
            </div>
          </div>
        </div>
        <div :class="`stickyWrapper${playerCurrentTrack ? 'playerOpened' : ''}`">
          <div class="column followingWrapper">
            <h4 v-if="getUserFollowingsLoading">Loading...</h4>
            <h4 v-if="!getUserFollowingsLoading">
              Following 
              {{userFollowingsData && userFollowingsData.length}}
              Users
            </h4>
            <follower-item v-if="!getUserFollowingsLoading" v-for="(user , i) in userFollowingsData" :key="i" :userData="user"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Sticky from 'vue-sticky-directive'
import _ from 'lodash'
import FollowerItem from '@/components/FollowerItem'
import TrackItemRow from '@/components/TrackItemRow'
import Player from '@/components/Player'
import numberSeparator from '@/utils/number'
export default {
  mounted () {
    const {params: {id}} = this.$route 
    this.$store.dispatch('getUserProfile' , id )
    this.$store.dispatch('getUserFollowings' , id)
    this.$store.dispatch('getUserTracks' , id)
  }, 
  components: {
    FollowerItem, 
    TrackItemRow,
    Player
  }, 
  watch: {
    $route({params: {id: nextUserID}} , {params: {id: prevUserID}}){
      if(nextUserID !== prevUserID){
        this.$store.dispatch('getUserProfile' , nextUserID)
        this.$store.dispatch('getUserFollowings' , nextUserID)
        this.$store.dispatch('getUserTracks' , nextUserID)
      }
    }, 
    userTracksData(nextUserTracksData , prevUserTracksData){
      if(nextUserTracksData.length > 0 && !_.isEqual(nextUserTracksData , prevUserTracksData)){
        this.$store.dispatch('setPlayerTracks' , nextUserTracksData)
      }
    }
  }, 
  computed: {
    ...mapGetters({
      getUserProfileLoading: 'getUserProfileLoading' ,
      userProfileData: 'userProfileData',
      getUserProfileFail: 'getUserProfileFail',
      getUserFollowingsLoading: 'getUserFollowingsLoading',
      userFollowingsData: 'userFollowingsFail',
      getUserFollowingsFail: 'getUserFollowingsFail',
      getUserTracksLoading: 'getUserTracksLoading',
      userTracksData: 'userTracksData',
      getUserTracksFail: 'getUserTracksFail',
      playerCurrentTrack: 'playerCurrentTrack'
    })
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
    handlePlayTrack(trackData){
      setTimeout(() => {
        if(this.playerCurrentTrack && this.playerCurrentTrack.id === trackData.id){
          this.$store.dispatch('setPlayerCurrentTrack' , null)
        }else {
          this.$store.dispatch('setPlayerCurrentTrack' , trackData)
        }
      } , 100)
    },
    numberSeparator
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
  .mainUserCardWrapper .avatar {
    border-radius: 50px;
  }
  .mainUserCardWrapper .otherDetailsWrapper {
    text-align: center;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * {
    display: inline-block;
    margin: 0 20px;
    color: #a1a1a1;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * > svg {
    margin-right: 5px;
  }
  .userMusicsWrapper {
    margin: 20px 0 0 !important;
  }
  .description {
    font-size: 14px;
  }
  .stickyWrapper.top-sticky > div {
    height: calc(100vh - 20px);
  }
  .stickyWrapper.playerOpened.top-sticky > div {
    height: calc(100vh - 90px);
  }
</style>
