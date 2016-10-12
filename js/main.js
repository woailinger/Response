$(function (){
	function resize() {
		//获得设备宽度
		var windowWidth = $(window).width();
		//判断大小屏
		var issmallScreen = windowWidth < 768 ;
		//然后设计背景图
		$('#main-ad > .carousel-inner > .item').each(function(i, item){
			//item为 dom 对象 
			//所以要转化为$对象
			var $item = $(item);
			//得到data属性值  并且根据issmallScreen的值 取响应的data值
			var src = issmallScreen ? $item.data('image-xs') :  $item.data('image-lg');
			//然后设置$item的背景图
			// $item.css('backgroundImage','url('+ src +')');
			if(issmallScreen) {
				$item.html('<img src="'+ src +'" alt="">');	
			} else {
				$item.css('backgroundImage','url('+ src +')');
				$item.html('');
			}
		})

	}
	$(window).on('resize', resize).trigger('resize');
	/**
	 * 控制标签页的标签容器宽度
	 */
	var $ulContainer = $('.nav-tabs');
	var width = 20;
	//遍历子元素
	$ulContainer.children().each(function (i, item) {
		// console.log(item.clientWidth)
		width += item.clientWidth;
	})
	//设置ul宽
	// console.log(width);
	// 判断  如果是小屏的时候才给ul设置宽
	if(width > $(window).width()){
		$ulContainer
		.css('width',width)
		.parent().css('overflow-x','scroll');
	}

	var $newsTitle = $('.news-title');
	// 添加a 点击事件
	$('#news .nav-pills li a').on('click', function () {
		//获取元素
		var $this = $(this);
		// 获取data属性值
		var title = $this.data('title');
		console.log(title);

		//设置标题
		$newsTitle.text(title);
	})

	//添加手指轮播事件
	// 1.获取轮播的容器元素
	var $carousels = $('#main-ad');
	// 定义初始、结束、变化量
	var startX,endX;
	var offset = 60;
	// 2.添加手指事件
	$carousels.on('touchstart', function (e) {
		startX = e.originalEvent.touches[0].clientX;
		// console.log(startX);
	})
	$carousels.on('touchmove', function (e) {
		endX = e.originalEvent.touches[0].clientX;
		// console.log(endX)
	})
	$carousels.on('touchend', function (e) {
		//获得手指滑动的距离
		var distance = Math.abs(endX - startX);
		console.log(distance);
		//如果移动距离大于  offset 那就轮播
		if(distance > offset) {
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	})
})