(function(){
    var datepicker = {};

    datepicker.getMonthData = function(year, month){

        var ret = [];

        if(!year || !month){
            var today = new Date();
            year = today.getFullYear();
            // 真实的数字比获取的月份数字是要小1的所以为了获取真实的月份，这里需要加1
            month = today.getMonth() + 1;
        }

        // 真实的数字比获取的月份数字是要小1的
        // 当前月份的第一天，因为输入的是真实日期，所以这里需要-1
        var firstDay = new Date(year, month - 1, 1);
        // 这天是星期几
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay === 0) firstDayWeekDay = 7;

        // 使取出的值不越界
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        //这个月日历需要显示上个月的日期;
        var preMonthDayCount = firstDayWeekDay - 1;

        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        //获取当月每一天的数据(一共6周)；
        for(var i=0; i<7*6; i++){
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            // 上个月
            if(date <= 0){
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if (date > lastDate) {
                // 下个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
            // 十二月的特殊情况
            if(thisMonth === 0) thisMonth = 12;
            // 一月的特殊情况
            if(thisMonth === 13) thisMonth = 1;
            //把对象填入数组
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }
        return {
            year: year,
            month: month,
            days: ret
        }
    }
    //将datepicker对象暴露到全局
    window.datepicker = datepicker;
})();
