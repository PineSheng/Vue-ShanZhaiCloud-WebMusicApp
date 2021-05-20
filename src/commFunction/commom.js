/*
公共函数
*/

//数字转化为分秒格式
const seconds = s => {
  let sTime = parseInt(s);// 秒
	let mTime = 0;// 分
	let hTime = 0;// 时
	if(sTime >= 60) {
	  mTime = parseInt(sTime / 60)
	  sTime = parseInt(sTime % 60)
	  if(mTime >= 60) {
	    hTime = parseInt(mTime / 60)
	    mTime = parseInt(mTime % 60)
	  }
	}
  let result = ''
  if(sTime >=0 && sTime < 10){
    result = "0" + parseInt(sTime) + ""
    }else{
      result = "" + parseInt(sTime) + ""
    }
  if(mTime >= 0 && mTime < 10) {
    result = "0" + parseInt(mTime) + ":" + result
  }else{
    result = "" + parseInt(mTime) + ":" + result
  }
  if(hTime >= 0 && hTime < 10 && parseInt(s) > 3600) {
    result = "0" + parseInt(hTime) + ":" + result
  }else if(parseInt(s) > 3600){
    result = "" + parseInt(hTime) + ":" + result
  }
  return result;    
}

export default seconds
  