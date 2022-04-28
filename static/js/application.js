let visgraph = null;//定义全局变量-图可视化对象
let currentLayout = null; //当前布局算法类型
let loopName = null; //循环计数器
//示例数据集，用于演示使用
let DemoDataCache;


//1、在指定canvas元素上初始化图对象
visgraph = initVisGraph('graph-panel');

//2、模拟加载服务端数据，可视化显示
var data = loadData();
visgraph.drawData(data);
//自动缩放居中显示
visgraph.setZoom('auto');


function draw_mydata(data) {
    visgraph.drawData(data);
    //自动缩放居中显示
    $("[title='居中']").click()
    runLayout('fastFR')
    setTimeout(function () {
        stopLayout()
    }, 4000)
    $("[title='居中']").click()

}

$("#logout").click(function () {
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

$("#upload").click(function () {
    /*使用Ajax完成文件上传，解决from表单提交的刷新和页面跳转问题*/

    $("#collapsemyTwo .alert").css("display", "none")

    let formData = new FormData(document.querySelector('form'));
    $.ajax({
        url: "/upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res) {
                $("#collapsemyTwo .alert").css("display", "block")
                console.log(res)
                data = res
            }
            console.log(res);
        },
        error: function (err) {
            $("#collapsemyTwo .alert").attr("class", "alert alert-danger");
            $("#collapsemyTwo .alert").css("display", "block")
            $("#collapsemyTwo .alert").text("网络连接失败,稍后重试");
        }
    })
})


$("#huizhi").click(function () {
    draw_mydata(data);
})


function loadmydata() {
    $.ajax({
        url: "/my_data",
        type: "get",
        success: function (res) {
            if (res) {
                $("#my-datas tbody").children().remove();

                if (res.length > 0) {
                    $("#collapsemyThree .alert").css("display", 'none');
                } else {
                    $("#collapsemyThree .alert").text("没有数据")
                }
                for (const re of res) {
                    row = ' <tr>' +
                        '<td>' + re[2] + '</td>' +
                        '<td>' +
                        '<div class="dropdown show">\n' +
                        ' <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
                        '    操作\n' +
                        '  </button>' +
                        '  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">\n' +
                        '    <a class="dropdown-item my-data" value=' + re[1] + ' href = "#" >选择 </a>' +
                        '    <a class="dropdown-item del-my-data" value=' + re[1] + ' href = "#" >删除 </a>' +
                        '  </div>\n' +
                        '</div>' +
                        '</td>' +
                        '</tr>'
                    $("#my-datas tbody").append(row)
                    bind_id()
                }

            }
            console.log(res);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

$(function () {
    loadmydata();
})

$("#lodmydata").click(function () {
    loadmydata();
})


function bind_id() {
    $(".my-data").unbind("click");
    //防止事件叠加
    $(".del-my-data").unbind("click");

    $('.my-data').on('click', function () {
        let vid = $(this).attr('value')
        $.ajax({
            url: "/my_data",
            type: "post",
            data: JSON.stringify({"id": vid}),
            contentType: 'application/json; charset=UTF-8',
            success: function (res) {
                if (res) {
                    data = res;
                    draw_mydata(data)
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    });


    $('.del-my-data').on('click', function () {
        let vid = $(this).attr('value')
        $.ajax({
            url: "/del_data",
            type: "post",
            data: JSON.stringify({"id": vid}),
            contentType: 'application/json; charset=UTF-8',
            success: function (res) {
                if (res) {
                    loadmydata();
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    });

}

