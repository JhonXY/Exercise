new Vue({
    el:"#app",
    data:{

    },
    mouted:function()}{
        this.$nextTick(function(){
            this.datepicker();
        });
    },
    methods:{
        datepicker : function(input){
		datepicke=.render();

		document.body.appendChild($wrapper)

		var $input = document.querySelector(input);
		var isOpen = false;

		$input.addEventListener('click', function(){

			$wrapper.classList.add('ui-datepicker-wrapper-show');

			var left = $input.offsetleft;
			var top = $input.offsetTop;
			var height = $input.offsetHeight;
			$wrapper.style.top = top + height + 2 + 'px';
			$wrapper.style.left = left + 'px';
			isOpen = true;
		},false);

		// 上月下月翻页
		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn')){
				return ;
			}
			if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');
			}
			else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}

		},false);

		// 选中数据
		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') {
				return;
			}
			// 写入数据
			var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
			// 格式化数据
			$input.value = format(date);

			$wrapper.classList.remove('ui-datepicker-wrapper-show');

		}, false)
	};
    }

})
