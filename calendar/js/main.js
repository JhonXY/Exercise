(function(){

	var datepicker = window.datepicker

	var monthData;

	var $wrapper;

	datepicker.buildUi = function (year, month){

		monthData = datepicker.getMonthData(year, month);

		var html = 	'<div class="ui-datepicker-header">' +
						'<a class="ui-datepicker-btn ui-datepicker-prev-btn" href="#">&lt;</a>' +
						'<a class="ui-datepicker-btn ui-datepicker-next-btn" href="#">&gt;</a>' +
						'<span class="ui-datepicker-curr-month">' +
						monthData.year +'-' + monthData.month + '</span>' +
					'</div>' +
					'<div class="ui-datepicker-body">' +
						'<table>' +
							'<thead>' +
								'<tr>' +
									'<th>一</th>' +
									'<th>二</th>' +
									'<th>三</th>' +
									'<th>四</th>' +
									'<th>五</th>' +
									'<th>六</th>' +
									'<th>日</th>' +
								'</tr>' +
							'</thead>' +
						'<tbody>';
		for (var i = 0; i < monthData.days.length; i++) {

			var date = monthData.days[i];

			if (i%7 === 0) {
				html += '<tr>';
			}

			html += '<td data-date="' + monthData.days[i].date + '">' + monthData.days[i].showDate + '</td>';

			if (i%7 === 6) {
				html += '</tr>';
			}

		}

		html += '</tbody>' + '</table>' + '</div>';

		return html;
	};

	// 渲染单独拿出来
	datepicker.render = function(direction){
		var year,month
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}

		if(direction === 'prev') month--;
		if(direction === 'next') month++;

		var html = datepicker.buildUi(year, month);
		$wrapper = document.querySelector('.ui-datepicker-wrapper');
		if (!$wrapper) {
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;
	}


	datepicker.init = function(input){
		datepicker.render();

		// 对象不能加引号，这里的$wrapper千万别加引号
		document.body.appendChild($wrapper)

		var $input = document.querySelector(input);
		var isOpen = false;

		$input.addEventListener('click', function(){
			/*// 存在一个延时不知道为什么
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');

				// 设定input框的样式
				// 弹出前就计算位置，更加准确
				var left = $input.offsetleft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}*/
			$wrapper.classList.add('ui-datepicker-wrapper-show');

			// 设定input框的样式
			// 弹出前就计算位置，更加准确
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

	function format (date) {
		var result = '';
		// 在一位数前加0
		var padding = function (num) {
			if (num <= 9) {
				return '0' + num;
			}
			return num;
		}
		result += date.getFullYear() + '-';
		result += padding(date.getMonth() + 1) + '-';
		result += padding(date.getDate());

		return result;
	}

})();
