/*
* @Author: miss
* @Date:   2017-05-18 16:27:18
* @Last Modified by:   miss
* @Last Modified time: 2017-05-19 13:50:53
*/
//顶部搜索框透明度

function searchScroll(){
	var search = document.getElementById('J_search');
	if(document.body.scrollTop > 0 ){
		search.className += ' active';
		var opacityVal = document.body.scrollTop / 332 + 0.3;
		opacityVal = opacityVal > 1 ? 1 : opacityVal;
		search.style.opacity = opacityVal;
	}else {
		search.className = 'search';
		search.style.opacity = 1;
	}
	
}

//banner效果
function ScrollX(elm){
	this.target = document.getElementById(elm);
	this.banBox = this.target.children[0];
	this.sportBox = this.target.children[1];
	this._init();
}
ScrollX.prototype = {
	_init : function(){
		this.sportBox.style.marginLeft = -1 * this.sportBox.offsetWidth/2 + 'px';
		this.banWidth = this.banBox.offsetWidth;
		this.screenWidth = this.target.offsetWidth;
		this.len = this.banBox.children.length;
		this.touchEvent(this.banBox);
		this.count = 0;
	},
	touchEvent : function(elm){
		var startX = 0 , moveX = 0 , left = 0;
		var that = this;
		var distance = this.screenWidth / 3;
		elm.addEventListener('touchstart',function(e){
			startX = e.changedTouches[0].clientX;
		})
		elm.addEventListener('touchmove',function(e){
			moveX = e.changedTouches[0].clientX - startX;
			if((moveX + left) < (-1 * that.screenWidth)){
				left = -1 * that.screenWidth;
				moveX = 0;
			}else if((moveX + left ) > 0){
				left = 0;
				moveX = 0;
			}
			elm.style.left = left + moveX + 'px';
		})
		elm.addEventListener('touchend',function(e){
			left+=moveX;

			if(moveX < 0){
				if(moveX <  (-1 * distance)){
					that.count++;
				}
				elm.style.transition = 'left 0.5s linear';
			}else if(moveX > 0){
				if(moveX > distance){
					that.count--
				}
				elm.style.transition = 'left 0.5s linear';
			}
			left = -1 * that.count * that.screenWidth;
			if(left < -1 * that.screenWidth * (that.len-1)){
				left = -1 * that.screenWidth * (that.len-1)
			}
			if(left > 0) {
				left = 0
			}
			elm.style.left = left + 'px';
			for(var i = 0 ; i < that.len ; i++){
				that.sportBox.children[i].className = 'sport';
			}
			that.sportBox.children[that.count].className += ' active';

			elm.addEventListener('webkitTransitionEnd',function(){
				elm.style.transition = null;
			});
		})
	}
}
var banScroll = new ScrollX('J_banner');

//加载更多

function getLoading(elm,infoBox){
	var target = document.getElementById(elm);
	var infoBox = document.getElementById(infoBox);
	var template = '';
	var template_init = '';
	var reg = /{{(\w+)}}/;
	ajax('template.htm','get',function(data){
		template = data;
		template_init = data;
	})
	ajax('info.json','get',function(data){
		var data = JSON.parse(data);
		var result = '';
		var strHtml = '';
		
		for(var i = 0 ; i < data.length ; i++){
			template = template_init;
			while(result = reg.exec(template)){
				var key = result[1];
				var value = data[i][key];
				template = template.replace(result[0],value);
			}
			strHtml +=template;
		}
		infoBox.innerHTML+=strHtml;
	})
}
//滑到底部加载更多
upMoveLoad('J_load');
function upMoveLoad(elm){
	
	var allH = document.body.offsetHeight;
	var clientH = screen.height;
	window.onscroll = function(){
		searchScroll();
		var scrollT = document.body.scrollTop;
		if((scrollT + clientH + 3) > allH){
			elm.innerHTML = '加载中...';
			getLoading('J_load','J_infoBox');
		}else {
			elm.innerHTML = '上拉加载更多';
		}
		allH = document.body.offsetHeight;
	}
	
	
	
}
//底部menu点击
setActive('J_footerMenuBox');
function setActive(elm){
	var lists = document.getElementById(elm).children;
	for(var i = 0 , list ; list = lists[i] ; i++ ){
		list.onclick = function(){
			for(var j = 0 ; j < lists.length ; j++){
				lists[j].className = 'item item' + (j+1);
			}
			this.className += ' active';
		}
	}
}
//ajax封装
function ajax(url,type,callback){
	var xhr = new XMLHttpRequest();
	if(type == 'get'){
		xhr.open('get',url);
	}
	if(type == 'post'){
		xhr.open('post',url);
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	}
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			callback && callback(xhr.responseText);
		}
	}
}
//获取样式
function getStyle(elm,attr){
	if(elm.currentStyle){
		return elm.currentStyle[attr]
	}else {
		return window.getComputedStyle(elm,null)[attr]
	}
}