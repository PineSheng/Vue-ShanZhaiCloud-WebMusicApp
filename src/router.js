import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name:'发现音乐',
      path:'',
      redirect:'/findMusic'
    },
    {
      path:'/findMusic',
      component: () => import('./views/findMusic/FindMusic.vue'),
      children:[
        {
          path:'',
          redirect:'/findMusic/recommend'
        },
        {
          name:'个性推荐',
          path:'/findMusic/recommend',
          component: () => import('./views/findMusic/recommend/recommend.vue')
        },       
        {
          name:'歌单',
          path:'/findMusic/songSheet',
          component: () => import('./views/findMusic/songSheet/SongSheet.vue')
        },
        {
          name:'排行榜',
          path:'/findMusic/rankingList',
          component: () => import('./views/findMusic/rankingList/RankingList.vue')
        },
        {
          name:'歌手',
          path:'/findMusic/singer',
          component: () => import('./views/findMusic/singer/singer.vue')
        },
        {
          name:'最新音乐',
          path:'/findMusic/latestMusic',
          component: () => import('./views/findMusic/latestMusic/LatestMusic.vue')
        },
      ] 
    },
    {
      name:'推荐视频',
      path:'/recommendVideo',
      component: () => import('./views/recomVideo/RecommendVideo.vue')
    },
    {
      name:'我的音乐云盘',
      path:'/cloudDisk',
      component: () => import('./views/cloudDisk/CloudDisk.vue')
    },
    //搜索详情页
    {
      path:'/searchPage',
      component: () => import('./views/searchPage/SearchPage.vue'),
      children:[
        {
          path:'',
          redirect:'/searchPage/searchBySong'
        },
        //搜索单曲页
        {
          name:'searchBySong',
          path:'/searchPage/searchBySong',
          component: () => import('./views/searchPage/searchBySong/SearchBySong.vue')
        },
        //搜索歌手页       
        {
          name:'searchBySinger',
          path:'/searchPage/searchBySinger',
          component: () => import('./views/searchPage/searchBySinger/SearchBySinger.vue')
        },
        //搜索专辑页
        {
          name:'searchByAlbum',
          path:'/searchPage/searchByAlbum',
          component: () => import('./views/searchPage/searchByAlbum/SearchByAlbum.vue')
        },
        //搜索视频页
        {
          name:'searchByVideo',
          path:'/searchPage/searchByVideo',
          component: () => import('./views/searchPage/searchByVideo/SearchByVideo.vue')
        },
        //搜索歌单页
        {
          name:'searchBySongList',
          path:'/searchPage/searchBySongList',
          component: () => import('./views/searchPage/searchBySongList/SearchBySongList.vue')
        },
      ]
    },
    //歌手信息详情页
    {
      name:'ArtistPage',
      path:'/artistPage',
      component: () => import('./views/artistPage/ArtistPage.vue')
    },
    //专辑内容页
    {
      name:'AlbumPage',
      path:'/albumPage',
      component: () => import('./views/albumPage/AlbumPage.vue')
    },
    //歌单内容页
    {
      name:'SongSheetDetails',
      path:'/songSheetDetails',
      component: () => import('./views/findMusic/songSheet/SongSheetDetails.vue')
    }
  ]
})
