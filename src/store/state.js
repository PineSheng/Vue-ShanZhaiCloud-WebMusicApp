const state = {
  //播放状态
  playState:false,

  //播放音乐的ID
  playSongId:'',

  //播放模式
  playMode:'sequence', //sequence顺序播放 listLoop列表循环 singleLoop单曲循环  randomPlay随机播放

  //音乐播放列表
  palySongList:[],

  //历史播放记录列表
  songHistoryList:[],

  //搜索历史记录
  searchHistoryData:[]
}

export default state