class Move{
	constructor(url){
		this.url = url;
	}
	getMovieData(cb){
		this.cb = cb;
		util.http(this.url,this.processDoubanData.bind(this));
	}
	processDoubanData(data){
		// 拿到数据以后执行的函数

    this.cb(movie);
  }
}

export {Movie}