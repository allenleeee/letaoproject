window.addEventListener('load', function () {
    // 获取左侧栏的数据
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (backData) {
            // console.log(backData);
            $('#category-left ul').html(template('cate-left', backData));
            $('#category-left ul li').eq(0).attr('class', 'active');
        }
    })
    getright(1);
    // 点击获取右边栏的数据
    $('#category-left ul').on('click', 'li', function () {
        $(this).siblings().removeClass('active');
        $(this).attr('class', 'active');
        var id = $(this).data('id');
        // console.log(id);
        getright(id);
    })

    // ajax获取右边数据
    function getright(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (backDate) {
                // console.log(backDate);
                var html=template('cate-right', backDate);
                if(html){
                    $('#category-right .mui-row').html(html); 
                }else{
                    $('#category-right .mui-row').html("没有数据");
                }
            }
        })
    }

    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
})