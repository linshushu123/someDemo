/*
* @Author: miss
* @Date:   2017-05-18 16:27:18
* @Last Modified by:   miss
* @Last Modified time: 2017-05-19 10:14:40
*/
//顶部搜索框透明度
searchScroll();
function searchScroll(){
	var search = document.getElementById('J_search');
	window.onscroll = function(){
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
				if(Math.abs(moveX) > distance){
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
//获取样式
function getStyle(elm,attr){
	if(elm.currentStyle){
		return elm.currentStyle[attr]
	}else {
		return window.getComputedStyle(elm,null)[attr]
	}
}