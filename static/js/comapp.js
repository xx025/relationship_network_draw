$(function () {
    //3、根据需要自定义显示样式
    definedGraphStyle();

    //以下为 生成右侧操作栏，用于演示各种操作
    initLayoutOptions();//生成右侧的布局算法操作区
    bindLayoutBtnEvent(); //绑定布局算法运行、停止、应用的点击事件
    initClusterOptions();//聚类算法操作下拉

    resetShowStyleEvent();//显示设置事件绑定

    bindLeftBarEvent();//绑定左侧工具栏操作事件

    bindSwitchDataEvent();//切换示例数据的事件绑定

    mockInteractiveData();//演示动态添加数据

    commonOperateEvent();//常用操作的操作事件
});

//初始化图客户端对象，用于操作及调用接口
function initVisGraph(visDomId) {
    //定义节点的右键菜单项，自己组织界面元素，及事件操作，该方法中会注入图客户端及对应操作元素
    //示例如下，必须实现以下三个方法:init,show,hide
    var NodeRightMenu = {
        init: function (_graph) {
            $("#graph-panel-wrapper").append("<menu>...</menu>");
            $("#graph-panel-wrapper").on('click', '#contextMenu .menu-btn', function () {

            });
        },
        show: function (e, _graph) {
            this.init(_graph);
            $("#contextMenu").css({top: e.pageY - 30, left: e.pageX}).show();
        },
        hide: function () {
            $("#contextMenu").hide();
        }
    };

    //连线的右键菜单操作
    var LinkRightMenu = {
        init: function (_graph, link) {
            //自定义右键菜单界面元素
        },
        show: function (e, _graph, link) {
        },
        hide: function () {
        }
    };

    //创建图对象，参数一:图层包裹元素, 参数二:图中元素显示配置项
    var _visGraph = new VisGraph(document.getElementById(visDomId),
        {
            node: { //节点的默认配置
                label: { //标签配置
                    show: true, //是否显示
                    color: '50,50,50',//字体颜色
                    font: 'bold 13px 微软雅黑',//字体大小及类型
                    wrapText: false, //节点包裹文字
                    textPosition: 'Middle_Center',//文字位置 Top_Center,Bottom_Center,Middle_Right
                    //textOffsetX:-24,//文字横向偏移量
                    //textOffsetY:-24,//文字纵向偏移量
                    //backgroud:'255,255,255',//文字背景色
                    //borderWidth:0,//文字边框宽度
                    //borderColor:'250,250,250'//文字边框颜色
                },
                shape: 'circle',//节点形状 circle,rect,square,ellipse,triangle,star,polygon,text
                //image:'images/T1030001.svg',//节点图标(设置后节点显示为圆形图标)
                color: '20,20,200',//节点颜色
                borderColor: '255,255,255',//边框颜色
                borderWidth: 2,//边框宽度,
                borderRadius: 0,//边框圆角大小
                lineDash: [0],//边框虚线间隔,borderWidth>0时生效
                alpha: 1,//节点透明度
                size: 60, //节点默认大小
                width: 80, //节点的长度(shape为rect生效)
                height: 40,//节点的高度(shape为rect生效)
                selected: { //选中时的样式设置
                    borderColor: '50,120,230',//选中时边框颜色
                    borderAlpha: 1,//选中时的边框透明度
                    borderWidth: 8,//选中是的边框宽度
                    showShadow: false,//是否展示阴影
                    shadowColor: '50,100,250'//选中是的阴影颜色
                },
                onClick: function (event, node) { //节点点击事件回调
                    console.log('点击节点----[' + node.id + ':' + node.label + ']');
                },
                ondblClick: function (event, node) {
                    console.log('双击节点');
                },//节点双击事件
                onMouseDown: function (event, node) {
                    console.log('鼠标按下节点');
                },//节点的鼠标按下事件
                onMouseUp: function (event, node) {
                    console.log('鼠标弹起节点');
                },//节点的鼠标弹起事件
                onMouseOver: function (event, node) {
                    console.log('鼠标移入节点');
                },//节点的鼠标划过事件
                onMouseOut: function (event, node) {
                    console.log('鼠标移出节点');
                },//节点的鼠标划出事件
                onMousedrag: function (event, node) {
                    console.log('拖动节点');
                }//节点的拖拽移动事件
            },
            link: { //连线的默认配置
                label: { //连线标签
                    show: true, //是否显示
                    color: '50,50,50', //字体颜色
                    font: 'normal 12px 微软雅黑'//字体大小及类型
                },
                lineType: 'direct',//连线类型,direct,curver,vlink,hlink,bezier,vbezier,hbezier
                //colorType:'defined',//连线颜色类型 source:继承source颜色,target:继承target颜色 both:用双边颜色，defined:自定义
                color: '120,120,120', //连线颜色
                alpha: 0.8,  // 连线透明度
                lineWidth: 2, //连线宽度
                lineDash: [0],//虚线间隔样式如：[5,8]
                showArrow: true,//显示箭头
                selected: { //选中时的样式设置
                    color: '250,50,50',//选中时的颜色
                    alpha: 1,
                    showShadow: false,//是否展示阴影
                    shadowColor: '250,40,30'//选中连线时的阴影颜色
                },
                onClick: function (event, link) { //连线点击事件回调
                    console.log('click link---[' + link.source.id + '-->' + link.target.id + ']');
                },
                ondblClick: function (event, link) {
                }//连线的双击回调事件
            },
            highLightNeiber: false, //相邻节点高度标志
            wheelZoom: 0.8,//滚轮缩放开关，不使用时不设置[0,1]
            noElementClick: function (event) {//画布空白处的点击事件
                console.log('点击了空白区域');
            },
            rightMenu: {
                nodeMenu: NodeRightMenu,  //节点右键菜单配置
                linkMenu: LinkRightMenu   // 连线右键菜单配置
            },
            /* layout:{ //开启内置力导向布局,不配置时不启动
				type:'force',
				options:{
					friction: 0.9,
					linkDistance: 150,
					linkStrength: 0.05,
					charge: -150,
					gravity: 0.01,
					noverlap:false
				}
			} */
        }
    );
    return _visGraph;
};

//加载图数据，可ajax请求服务端返回数据，格式如{nodes:[],links:[]}
function loadData() {
    $.ajax({
        url: "/demo_data",
        type: "post",
        success: function (res) {
            if (res) {
                console.log(res)
                DemoDataCache = res
                return DemoDataCache.data1
            }
            console.log(res);
        },
        error: function (err) {
            alert("网络连接失败,稍后重试", err);
        }
    })
};


//按自己需求重新设置可视化元素（点、边）的样式
function definedGraphStyle() {
    //以下为自定义设置点和边的样式（颜色、大小等等均可自定义）
    var gdata = visgraph.getGraphData();//获取绘图后的图数据
    var nodes = gdata.nodes;//获取所有点，设置点的样式
    var shapes = ['circle', 'rect', 'square', 'ellipse', 'star', 'polygon', 'triangle', 'roundRect'];
    nodes.forEach(function (node) {
        var inDegree = (node.inLinks || []).length; //获取节点的入度
        var outDegree = (node.outLinks || []).length; //获取节点的出度
        //var index = Math.round(Math.random()*6);
        //node.shape = shapes[index]; //随机形状
        //对度大于3的点显示标签，设置为选中样式
        if ((inDegree + outDegree) > 5) {
            //node.showlabel=true;  //显示点的标签
            //node.selected=true;   //显示选中样式
            //node.borderColor=node.fillColor;//边框颜色使用自身颜色
            //node.lineDash=[5,5]; //边框虚线
            //node.setImage('images/T1030001.svg');//设置图片路径
            //node.textPosition='Bottom_Center';//标签位置
            //node.font='bold 18px 微软雅黑';//设置字体格式
            //node.borderWidth=4;//增加边框
            //node.borderColor=randomColor();//随机边框颜色
            node.showShadow = true;
            node.shadowColor = '250,50,20';//显示选中阴影
            //node.showSelected=1;
            node.selectedBorderColor = '250,50,20';
            node.selectedBorderAlpha = 0.8;
            node.selectedBorderWidth = 10;
            /* node.shape='rect';
			node.height=60;
			node.width=160; */
            //node.fillColor='255,255,255';
            //node.alpha=0.1;

            //node.radius=150;//设置节点大小
            //node.scaleX=1;//缩放比例
            //node.scaleY=1;//缩放比例
        }
        //node.textOffsetX=0;
        //node.textOffsetY=-16;
        //node.height=80;
        //node.width=220;
        //node.label = '姓名:'+node.label+'\n出生地:陕西省西安市\n身份证:244655555556644555789X\n生日:2020-10-10';

        //node.font='14px 微软雅黑'; //字体大小 类型
        //node.fontColor='50,50,50'; //点的字体颜色
        //node.textPosition='Middle_Center'; //字体位置（下方居中）
        node.scaleX = 1;//缩放比例
        node.scaleY = 1;//缩放比例
        //node.wrapText = true;//节点大小包裹文字
        //node.fillColor=randomColor();//点填充颜色
        //node.shape='star'; //点形状设置
    });


    //设置边的可视化样式
    var links = gdata.links; //获取所有边
    //console.log('边的条数='+links.length);
    links.forEach(function (link, i) {
        link.showlabel = true; //显示连线的标签
        link.fontColor = '50,50,50';//设置边的标签颜色
        link.font = 'bold 12px 微软雅黑';//设置连线的粗细

        link.alpha = 1;
        link.lineWidth = 2;//设置连线的粗细
        //link.colorType='defined'; //连线的颜色继承源节点
        //link.strokeColor='150,150,150'; //设置边的颜色
        //link.strokeColor='255,255,255';
        //link.visible = false;

        //link.lineType=i%4==0?'curver':'direct';
    });
};

//自定义布局算法
function initLayoutOptions() {
    var layoutTypes = [
        {
            label: '力学模型类',
            childTypes: [
                {type: 'fastFR', label: '快速弹性布局'},
                {type: 'frDirect', label: '弹簧力学布局'},
                {type: 'fruchtermanReingold', label: 'FruchReingold'},
                {type: 'spring2', label: 'SpringLayout'}
            ]
        },
        {
            label: '关系网络类',
            childTypes: [
                {type: 'fr', label: '经典网络布局'},
                {type: 'kk', label: '关系路径布局'},
                {type: 'arf', label: '球面网络布局'},
                {type: 'gather', label: '群组聚类布局'}
            ]
        },
        {
            label: '圆形类',
            childTypes: [
                {type: 'concentric', label: '中心圆形布局'},
                {type: 'singleCirlce', label: '圆形布局'},
                {type: 'dualCirlce', label: '双圆环布局'},
                {type: 'layerCircle', label: '多层圆环布局'},
                {type: 'sphere', label: '球体布局'}
            ]
        },
        {
            label: '树形结构类',
            childTypes: [
                {type: 'hubsize', label: '层级布局'},
                {type: 'tree', label: '树形布局'},
                {type: 'topoCircle', label: '雪花布局'},
                {type: 'radiatree', label: '径向布局'},
                {type: 'balloon', label: '圆形层级布局'}]
        },
        {
            label: '其他布局',
            childTypes: [
                {type: 'hive', label: '放射形布局'},
                {type: 'layered', label: '分层布局'},
                {type: 'grid', label: '矩形布局'},
                {type: 'noverlap', label: '避免节点重叠'}
            ]
        }
    ];

    var htmlTemplates = ['<select id="layoutSelector" class="select">'];
    htmlTemplates.push('<option value="">--请选择布局算法--</option>');
    layoutTypes.forEach(function (layoutType) {
        htmlTemplates.push('<optgroup label="' + layoutType.label + '">');

        layoutType.childTypes.forEach(function (childType) {
            htmlTemplates.push('<option value="' + childType.type + '">' + childType.label + '</option>');
        });

        htmlTemplates.push('</optgroup>');
    });
    htmlTemplates.push('</select>');
    $('#layout-panel').html(htmlTemplates.join(''));

    $('#layoutSelector').on("change", function () {
        var layoutType = $(this).val();
        initLayoutParams(layoutType);
    });
};

//通过选中的布局算法 类型生成对应得
function initLayoutParams(layoutType) {
    //创建空的布局算法，获取算法的参数配置项，来自定义设置参数
    var layout = new LayoutFactory({nodes: [], links: []}).createLayout(layoutType);
    var configs = layout.getConfig(); //获取布局算法的参数配置项

    //console.log(configs); //可打印出来查看每种布局算法参数列表

    //生成算法参数的设置区域
    var html = '';
    configs.forEach(function (config) {
        html += '<tr>';
        for (var param in config) {
            if (param == 'label') {
                html += '<td>' + config['label'] + '</td>'
            } else {
                var paramValue = config[param];
                if (paramValue instanceof Array) {
                    html += '<td>';
                    html += '<select name="' + param + '" class="small-selector param">';
                    paramValue.forEach(function (option) {
                        html += '<option value="' + option['value'] + '">' + option['label'] + '</option>';
                    });
                    html += '</select></td>';
                } else {
                    html += '<td><input class="param" type="number" name="' + param + '" value="' + paramValue + '"></td>';
                }
            }
        }
        html += '</tr>';
    });
    $('#layout-params').html(html);
};

//绑定布局算法执行、停止、重设参数的操作事件
function bindLayoutBtnEvent() {
    $('#runLayotBtn').on('click', function () {
        var btn = $(this);
        var layoutType = $('#layoutSelector').val();
        if (!layoutType) {
            return false;
        }

        if (visgraph.getGraphData().nodes.length == 0) {
            return false;
        }

        if (btn.hasClass('btn-success')) {
            btn.removeClass('btn-success').addClass('btn-danger').html('<i class="fa fa-pause"></i>停止布局');
            ;
            if (layoutType && layoutType.length > 0) {
                runLayout(layoutType); //开始运行布局算法
            }
        } else {
            btn.removeClass('btn-danger').addClass('btn-success').html('<i class="fa fa-play"></i>开始布局');
            stopLayout(); //停止布局
        }
    });

    $('#layoutParam-reset').on('click', function () {
        var config = {};
        $('#layout-params .param').each(function () {
            config[$(this).attr('name')] = $(this).val();
        });
        resetLayoutConfig(config); //重设布局算法参数
    });
};

//运行布局算法过程，循环进行计算
function runLayout(layoutType) {

    console.log(layoutType)
    //1、获取显示的数据可视化图数据（隐藏的不参与计算）
    let _graph = visgraph.getVisibleData();

    //2、创建布局算法对象（通过指定类型创建）
    currentLayout = new LayoutFactory(_graph).createLayout(layoutType);

    if (currentLayout) {
        //visgraph.hideAllLink();//隐藏连线，提高计算性能
        var config = {};
        $('#layout-params .param').each(function () {
            config[$(this).attr('name')] = $(this).val(); //获取参数名及其参数值
        });
        //currentLayout.initAlgo(); //初始化布局算法默认参数
        currentLayout.resetConfig(config); //重新设置布局算法参数

        //循环运行布局算法，有动画效果，也可以使用while或者for循环一次性计算完成
        //var q = quadtree(_graph.nodes);
        function loop() {
            cancelAnimationFrame(loopName);
            visgraph.refresh();
            currentLayout.runLayout();  //运行布局算法
            //nodeCollide(_graph.nodes,q);
            loopName = requestAnimationFrame(loop);
        };
        loopName = requestAnimationFrame(loop);
    }
};

//停止布局算法，保持静止
function stopLayout(layoutType) {
    cancelAnimationFrame(loopName); //取消布局动画
    visgraph.translateToCenter(); //可视化数据居中展示
    //visgraph.showAllLink(); //显示所有连线
};

//重新设置布局算法参数
function resetLayoutConfig(config) {
    if (currentLayout) {
        currentLayout.resetConfig(config);
    }
};

//初始化聚类算法操作区域
function initClusterOptions() {
    let clusterTypes = [
        {label: 'ChineseWhisper', type: 'chinesewisper'},
        {label: 'Louvain', type: 'louvain'},
        {label: 'WeakCommpent', type: 'weakcommpent'},
        {label: 'Bicomponent', type: 'bicomponet'},
        {label: 'Newman', type: 'newman'},
        {label: 'KMeans', type: 'kmeans'}
    ];

    var htmlTemplates = ['<select id="clusterSelector" class="select">'];
    clusterTypes.forEach(function (clusterType) {
        htmlTemplates.push('<option value="' + clusterType.type + '">' + clusterType.label + '</option>');
    });
    htmlTemplates.push('</select>');
    $('#cluster-panel').html(htmlTemplates.join(''));


    $('#clusterBtn').on('click', function () {
        var clusterType = $('#clusterSelector').val();
        var effectType = $('#cluster-effect').val();
        var clusterAvoid = $('#cluster-avoidlap').val();
        clusterAvoid = clusterAvoid == 'true' ? true : false;
        applyCluster(clusterType, effectType, clusterAvoid); //应用聚类算法
    });
};


//执行聚类算法，通过指定算法类型进行初始化操作
function applyCluster(clusterType, effectType, avoidOverlap) {

    visgraph.clearClusters();//清除上一次聚类效果

    const graph = visgraph.getVisibleData();

    //1、创建社区划分算法对象
    const clusterObj = new ClusterFactory(graph).createClutser(clusterType);

    //2、执行社区划分算法，用颜色标识不同社区
    var clusters = clusterObj.applay();

    //3、对社区划分结果添加区域划分（可选择使用）
    if (effectType == '2') {
        visgraph.addClusterContainer(clusters, avoidOverlap);
    }

    visgraph.refresh();
};


//随机颜色工具类
function randomColor() {
    return Math.floor(255 * Math.random()) + ","
        + Math.floor(180 * Math.random()) + ","
        + Math.floor(255 * Math.random());
};

//绑定显示设置中各个下拉框切换事件
function resetShowStyleEvent() {

    $('#node-shape').on('change', function () {
        var type = $(this).val();
        visgraph.setNodeShape(type);
    });

    $('#node-label').on('change', function () {
        var type = $(this).val();
        type = type == 'true' ? true : false;
        visgraph.showNodeLabel(type);
    });

    $('#node-label-wrap').on('change', function () {
        var type = $(this).val();
        type = type == 'true' ? true : false;
        visgraph.nodeWrapText(type);
    });

    $('#node-label-pos').on('change', function () {
        var type = $(this).val();
        visgraph.setTextPosition(type);
    });

    $('#link-type').on('change', function () {
        var type = $(this).val();
        visgraph.setLineType(type);
    });

    $('#link-dashed').on('change', function () {
        var type = $(this).val();
        type = type == 'true' ? true : false;
        visgraph.setLineDashed(type);
    });


    $('#link-label').on('change', function () {
        var type = $(this).val();
        type = type == 'true' ? true : false;
        visgraph.showLinkLabel(type);
    });

    $('#link-arrow').on('change', function () {
        var type = $(this).val();
        type = type == 'true' ? true : false;
        visgraph.setLinkArrowShow(type);
    });

};

//绑定左侧工具栏操作事件
function bindLeftBarEvent() {
    $('#left-tool-btns li').on('click', function (e) {
        var target = $(this);
        var type = target.attr('type');
        var method = target.attr('method');
        if (type == 'zoom') {
            visgraph.setZoom(method);
        } else if (type == 'mode') {
            target.addClass('active').siblings('li[type="mode"]').removeClass('active');
            visgraph.setMouseModel(method);
        } else if (type == 'coordi') {
            if (method == 'east') {
                visgraph.rotateGraph(10);
            } else if (method == 'west') {
                visgraph.rotateGraph(-10);
            } else {
                visgraph.translateOrZoom(method, 100);
            }
        } else if (type == 'saveImage') {
            //visgraph.saveImage(); //png|jpeg
            visgraph.saveImage(5000, 5000, 'png'); //保存图片的宽和高，图片过大时下载需要指定大小
        } else if (type == 'eyeview') {
            if (target.find('.fa-eye').length > 0) {
                target.find("i").addClass('fa-eye-slash').removeClass("fa-eye");
                visgraph.showOverView(true);
            } else {
                target.find("i").addClass('fa-eye').removeClass("fa-eye-slash");
                visgraph.showOverView(false);
            }
        }
    });


    $('#side-bar-btn').on('click', function () {
        if ($(this).hasClass('right')) {
            $(this).removeClass('right').addClass('left');
            $('.right-side').animate({right: '-230px'});
        } else {
            $(this).removeClass('left').addClass('right');
            $('.right-side').animate({right: '0'});
        }
    });
};

//选择示例数据集
function bindSwitchDataEvent() {

    $('.demo-data').on('click', function () {
        var datakey = $(this).data('type');
        visgraph.drawData(DemoDataCache[datakey]);
        visgraph.setZoom('auto');
    });

};

// 模拟动态数据演示加载及添加节点等操作
function mockInteractiveData() {

    $('#interactiveBtn').on('click', function () {
        var nodeCount = Number($('#nodeCount').val());
        var childCount = Number($('#childCount').val());

        genrateGraphData(nodeCount, childCount);
    });

    //随机生成图数据
    function genrateGraphData(nodeCount, childCount) {
        visgraph.clearAll(); //清理画布中所有数据，开始重新绘制

        for (var i = 0; i < nodeCount; i++) {
            var _node = visgraph.addNode({
                id: 'id_' + i,             //节点ID
                label: '点_' + i,        //节点标签
                color: randomColor(),    //节点颜色
                size: 50,                //节点大小
                x: Math.random() * 600,  //x坐标值
                y: Math.random() * 500,  //y坐标值
                fontColor: '220,250,250',  //字体颜色
                textPosition: 'Bottom_Center', //字体位置
                cluster: 'classic_id_' + i,
                properties: {  //peroper标识扩展属性，可以自定义任意信息，自己做可视化过滤或者其他展示操作用
                    type: 'type1',
                    name: '名字',
                    desc: '备注信息'
                }
            });

            //自定义单个节点的样式
            _node.wrapText = true;//节点包裹字体
            _node.font = 'bold 12px 微软雅黑';//节点字体大小

            //给节点添加子节点，并创建关系
            for (var j = 0; j < childCount; j++) {
                var childNodeId = i + '' + j;
                var childNode = visgraph.addNode({
                    id: 'id_' + childNodeId,             //节点ID
                    label: '点_' + childNodeId,        //节点标签
                    color: randomColor(),    //节点颜色
                    size: 50,                //节点大小
                    fontColor: '220,250,250',  //字体颜色
                    textPosition: 'Middle_Center' //字体位置
                });
                childNode.font = 'normal 11px 微软雅黑';
                childNode.tipText = '10'; //节点提示文字

                //绑定双击事件
                childNode.dbclick(function (event) {
                    searchNodeRelations(this);
                    this.tipText = null;//提示消失
                });

                //添加关系连线
                var edge = visgraph.addEdge({
                    source: 'id_' + i, //源点的ID
                    target: 'id_' + childNodeId, //目标点ID
                    label: '关系_' + j, //关系标签
                    properties: {  //peroper标识扩展属性，可以自定义任意信息，自己做可视化过滤或者其他展示操作用
                        type: 'type1',
                        desc: '备注信息'
                    }
                });

                //自定义单个连线的样式
                if (edge != null) {
                    edge.lineType = j % 2 == 0 ? 'direct' : 'vdirect';//连线类型
                    edge.lineWidth = 1; //连线宽度
                    edge.colorType = 's'; //连线颜色使用源点色
                    //edge.strokeColor = '120,120,200'; //连线颜色
                    edge.font = 'bola 12px 微软雅黑'; //连线字体大小
                    edge.fontColor = '100,100,200';//连线字体颜色
                    edge.alpha = 0.8; //连线透明度
                    edge.showArrow = true;//显示箭头
                }
            }
        }

        //模拟关系，把主要节点间增加关系
        for (var k = 0; k < nodeCount; k++) {
            var edge = visgraph.addEdge({
                source: 'id_' + k, //源点的ID
                target: 'id_' + (k + 1), //目标点ID
                label: '关系_' + k  //关系标签
            });

            if (edge != null) {
                edge.lineType = j % 2 == 0 ? 'direct' : 'vdirect';//连线类型
                edge.lineWidth = 1; //连线宽度
                edge.colorType = 's'; //连线颜色使用源点色
                //edge.strokeColor = '120,120,200'; //连线颜色
                edge.font = '10px 微软雅黑'; //连线字体大小
                edge.fontColor = '100,100,200';//连线字体颜色
                edge.alpha = 0.8; //连线透明度
                edge.showArrow = true;//显示箭头
            }
        }

        autoLayout(); //自动布局，调整效果
        visgraph.moveCenter();//移动到可视化中心
    };

    //自动布局
    function autoLayout() {
        var layout = new LayoutFactory(visgraph.getVisibleData()).createLayout("fastFR");
        layout.initAlgo();

        let i = 0;
        while (i++ < 300) {
            layout.runLayout(); //执行300次布局算法，调整显示效果
        }
    };


    //查询节点关联数据，追加到图中
    function searchNodeRelations(node) {
        //模拟服务端查询到的点和边
        var nodes = [], links = [];
        var num = 0;
        while (num++ < 10) {
            nodes.push({
                id: 'c_' + node.id + '_' + num,
                label: '子_' + num,
                color: node.fillColor,
                fontColor: node.fontColor,
                size: 50,
                cluster: 'classic_' + node.id
            });

            links.push({
                source: node.id,
                target: 'c_' + node.id + '_' + num,
                label: 'r' + num,
                weight: 1,
                strokeColor: node.fillColor,
                fontColor: '100,100,220',
                lineWidth: 2,
                font: 'bold 10px 微软雅黑'
            });
        }
        //动态追加到图中
        visgraph.activeAddNodeLinks(nodes, links);
    };
};


//常用操作的事件,演示常用操作接口
function commonOperateEvent() {

    $('#addLink').on('click', function () {
        visgraph.begainAddLine(visgraph.currentNode);//添加连线，选中点后点击开始，可以开启连线
    });

    $('#delnode').on('click', function () {
        visgraph.deleteNode(visgraph.currentNode);//删除指定节点,以当前选中点为例
    });

    $('#dellink').on('click', function () {
        visgraph.deleteLink(visgraph.currentLink);//删除指定连线,以当前选中边为例
    });

    //节点操作的接口
    $('#nodeopts').on('change', function () {
        var operate = $(this).val();
        switch (operate) {
            case 'selectAll':
                visgraph.selectAll(); //全选
                break;
            case 'reverseSelect':
                visgraph.reverseSelect(); //反选
                break;
            case 'showSelected':
                visgraph.showSelected(); //显示选中
                break;
            case 'hideSelected':
                visgraph.hideSelected(); //隐藏选中
                break;
            case 'showNodes':
                visgraph.showNodes(); //显示全部
                break;
            case 'delSelect':
                visgraph.delSelect(); //删除选中
                break;
            case 'selectRelate':
                visgraph.selectRelate(); //选择关联
                break;
            case 'hideIsolatedNodes':
                visgraph.hideIsolatedNodes(); //隐藏孤立点
                break;
            default:
                break;
        }
    });

    //连线操作的接口
    $('#linkopts').on('change', function () {
        var operate = $(this).val();
        switch (operate) {
            case 'showAllLink':
                visgraph.showAllLink(); //显示全部
                break;
            case 'hideAllLink':
                visgraph.hideAllLink(); //隐藏全部
                break;
            default:
                break;
        }
    });

    $('#searchNode').on('click', function () {
        var nodeName = $.trim($('#nodeName').val());
        var node = visgraph.findNode(nodeName);
        $('#nodeInfo').val(JSON.stringify({id: node.id, label: node.label, type: node.type, x: node.x, y: node.y, properties: node.properties}));
    });

    $('#findPath').on('click', function () {
        var soureNode = $.trim($('#soureNode').val());
        var targetNode = $.trim($('#targetNode').val());
        visgraph.pathAnalyze(soureNode, targetNode);
        //visgraph.findShortPath(soureNode,targetNode);
    });
};

