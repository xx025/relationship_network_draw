//定义关系数据，包含节点（nodes）和 关系（links），可自定义属性，颜色、坐标，文字等
var graphData = {
    nodes: [
        {
            id: '1',
            label: '刘备',
            type: '兄',
            x: 100,
            y: 200,
            properties: {name: '刘玄德'}
        },
        {
            id: '2',
            label: '关羽',
            type: '弟',
            x: 300,
            y: 200,
            properties: {name: '关云长'}
        },
        {
            id: '3',
            label: '张飞',
            type: '弟',
            x: 500,
            y: 200,
            properties: {name: '张翼德'}
        }
    ],
    links: [
        {source: '1', target: '2', label: '兄弟', properties: {desc: '结拜'}},
        {source: '1', target: '3', label: '兄弟'}
    ]
};


//创建GraphVis对象，进行方法调用
let visGraph = new VisGraph(document.getElementById('graph-panel'));

// {#//调用绘图方法，绘制关系图#}
// {#visGraph.drawData(graphData);#}


$("#login_out").mouseover(function () {
    $("#login_out").text("退出登录");
});
$("#login_out").mouseout(function () {
    $("#login_out").text("已经登录");
});
$("#login_out").click(function () {
    $.ajax({
        url: "/logout",
        type: "post",
        data: JSON.stringify({}),
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            // console.log(data)
            code = data["code"]
            msg = data['msg']
            if (code === 1) {
                alert(msg)
                location.reload(true)
            }
        },
        error: function () {
            console.log("检查连接");
        }
    });

})


$("#upload_file").click(function () {
    $("#btn_file").click()
})


$("#upload").click(function () {
    /*
    * 使用Ajax完成文件上传，解决from表单提交的刷新和页面跳转问题*/

    let formData = new FormData(document.querySelector('form'));
    $.ajax({
        url: "/upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res) {
                alert("上传成功！");
            }
            console.log(res);
        },
        error: function (err) {
            alert("网络连接失败,稍后重试", err);
        }

    })

})


$("#drawing").click(function () {
    //调用绘图方法，绘制关系图
    visGraph.drawData(graphData);
})