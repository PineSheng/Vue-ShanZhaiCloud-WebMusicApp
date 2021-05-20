const mutations = {
  //加入要播放的音乐ID
  pushId(state,id){
    state.playSongId = ''
    state.playSongId = id
  },
  //播放音乐
  startPlayMusic(state){
    state.playState = true
  },
  //暂停音乐
  suspendMusic(state){
    state.playState = false
  },
  //切换播放模式
  modeSwitching(state,modeName){
    state.playMode = modeName
  },
  //添加音乐到播放列表
  addMusicList(state,songDetails){
    //判断列表中有没有该音乐
    let result = state.palySongList.some(item => {
      if (item.id == songDetails.id) {
          return true;
      }
    })
    if(!result){
      state.palySongList.push(songDetails)
    }
  },
  //播放列表删除音乐
  delectMusicList(state,index){
    state.palySongList.splice(index,1)
  },
  //添加音乐到历史记录列表
  addHistoryList(state,songDetails){
    //判断列表中有没有该音乐
    let result = state.songHistoryList.some(item => {
      if (item.id == songDetails.id) {
          return true;
      }
    })
    //判断历史列表有没有该音乐 有就先删掉再从数组最前面添加进去
    if(result){
      let newSong = state.songHistoryList.findIndex(item => item.id === state.playSongId)
      state.songHistoryList.splice(newSong,1)
      state.songHistoryList.unshift(songDetails)
    }else if(!result){
      state.songHistoryList.unshift(songDetails)
    }    
  }

}

export default mutations