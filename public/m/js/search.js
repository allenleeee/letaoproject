window.addEventListener('load',function(){
    getSearch();
    queryHistory();
    delone();
    delAll();
})

// 点击搜索
function getSearch(){
    $('.searchbar .search').on('click',function(){
        var historySearch =  window.localStorage.getItem('historySearch') // 先从本地取historySearch的值,如果有值就将字符串转换成数组,没有值就是空数组.
        if(historySearch){
            historySearch=JSON.parse(historySearch);
        }else{
            historySearch=[];
        }
        var searchInfo=$('.searchbar .search-text').val(); // 获取输入框的数据,在historySearch数组内判断是否存在相同的值,没有就放入数组内.
        console.log(searchInfo);
        if(historySearch.indexOf(searchInfo)==-1){
            historySearch.push(searchInfo);            
        }
        window.localStorage.setItem('historySearch',JSON.stringify(historySearch));   // 将新的historySearch转换成字符串放入本地.              
        queryHistory(); // 调用渲染的方法.
        $('.searchbar .search-text').val('');
    })
}
// 渲染页面
function queryHistory(){
    var historySearch = window.localStorage.getItem('historySearch'); // 取本地数据,有值就转换成数组,没值就转换为空数组.
    if(historySearch){
        historySearch=JSON.parse(historySearch);
        // console.log({'rows':historySearch});
    }else{
        historySearch=[];
    }
        var html=template('searchTmp', {'rows':historySearch}); // template模板只能识别对象类型,所以要讲historySearch转换成对象
        // console.log(html);
        $('.search-content ul').html(html);        
}

// 点击叉叉删除
function delone(){
    $('.search-content ul').on('click','li a',function(){
        var searchDel=$(this).data('history');
        console.log(searchDel);
        var historySearch = localStorage.getItem('historySearch');
        if(historySearch){
            historySearch=JSON.parse(historySearch);
        }else{
            historySearch=[];
        }
        var delIndex = historySearch.indexOf(searchDel+'');
        historySearch.splice(delIndex, 1);
        localStorage.setItem('historySearch',JSON.stringify(historySearch));
        queryHistory();
    })
}

// 清除全部
function delAll(){
    $('.delAll').on('click',function(){
        var historySearch = localStorage.getItem('historySearch');
        historySearch = JSON.parse(historySearch);
        historySearch=[];
        localStorage.setItem('historySearch',JSON.stringify(historySearch));
        queryHistory();
    })
}