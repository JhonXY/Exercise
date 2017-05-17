$(document).ready(function() {
    var sub = $('#sub')

    // 标识激活的行
    var activeRow
    // 标识激活的子菜单
    var activeMenu

    var timer
    // 返回计时器初始

    var mouseInSub = false
    // 标识鼠标是否在sub子菜单中
    // 为子菜单绑定事件
    sub.on('mouseenter' ,function(e){
        mouseInSub = true
    }).on('mouseleave' ,function(e){
        mouseInSub = false
    })

    // 初始化记录鼠标位置的数组
    var mouseTrack = []

    var moveHandler = function(e){
        mouseTrack.push({
            // 获取当前鼠标相对页面的坐标
            x:e.pageX,
            y:e.pageY
        })

        // 只需要当前位置和前一个位置所以多余的弹出
        if(mouseTrack, length > 3){
            mouseTrack.shift()
        }
    }


    $('#test')
        .on('mouseenter', function(e) {
            // 鼠标移动到显示
            // 包括其子元素
            // mouseover和mouseout则不包括其子元素
            sub.removeClass('none')

            // mousemove事件默认绑定在document上
            $(document).bind('mousemove', moveHandler)
        })
        .on('mouseleave', function(e) {
            // 鼠标离开消失
            sub.addClass('none')

            if (activeRow){
                // 有存在激活样式的行去掉样式，变量置空
                activeRow.removeClass('active')
                activeRow = null
            }

            if(activeMenu){
                // 对应二级菜单内的项目操作一样
                activeMenu.addClass('none')
                activeMenu = null
            }

            // 事件解绑，以防影响到其他组件的生效
            $(document).unbind('mousemove', moveHandler)
        })
        // 事件代理的方式，将li的操作方法绑定在父元素上
        // 该事件就是对于行激活的所有操作
        .on('mouseenter' ,'li' ,function(e){
            if(!activeRow){
                activeRow = $(e.target)
                activeRow.addClass('active')
                activeMenu = $('#' + activeRow.data('id'))
                activeMenu.removeClass('none')
                return
            }

            // 基本的debounce去抖技术
            // 连续的触发只触发一次
            // 多次的mouseenter触发了多个包含延时回调的事件
            // 每个事件都先清理之前的延时回调再执行延时回调
            // 所以最后一次下面的回调被成功执行，并没有被清掉
            // 实现了只触发一次的效果
            if(timer){
                clearTimeout(timer)
            }

            // 当前鼠标的坐标
            var currMousePos = mouseTrack[mouseTrack.length - 1]
            // 鼠标上一次的位置
            var leftCorner = mouseTrack[mouseTrack.length - 2]
            // 判断是否需要延时，引用needDelay函数
            var delay = needDelay(sub, leftCorner, currMousePos)

            // 按照是否需要来执行
            if(delay){

                // 设置一个延迟使事件，
                // 触发有一个缓冲期如果在延迟回调的时间里，如果在缓冲期间鼠标在子菜单中则不触发回调由mouseInSub来判断
                // 从一个li移到另一个li需要清除上一个li的状态
                timer = setTimeout(function(){
                    if(mouseInSub){
                        return
                        // 如果在子菜单中不处理立刻返回
                    }

                    activeRow.removeClass('active')
                    activeMenu.addClass('none')

                    // 选中事件元素
                    activeRow = $(e.target)
                    activeRow.addClass('active')
                    // 选中其对应的sub子菜单
                    activeMenu = $('#' + activeRow.data('id'))
                    activeMenu.removeClass('none')
                    timer = null
                }, 300)
            }else{
                var preActiveRow = activeRow
                var preActiveMenu = activeMenu

                activeRow = $(e.target)
                activeMenu = $('#' + activeRow.data('id'))

                // 移除上一次的二级菜单
                preActiveRow.removeClass('active')
                preActiveMenu.addClass('none')

                // 添加当前的
                activeRow.addClass('active')
                activeMenu.removeClass('none')
            }
        })
})
