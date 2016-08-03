
/*  基于ajax请求的同步引用其他js
*/

function GetHttpRequest() {
    if (window.XMLHttpRequest) // Gecko
        return new XMLHttpRequest();
    else if (window.ActiveXObject) // IE
        return new ActiveXObject("MsXml2.XmlHttp");
}

function ajaxPage(sId, url) {
    var oXmlHttp = GetHttpRequest();
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            includeJS(sId, url, oXmlHttp.responseText);
        }
    }
    oXmlHttp.open('GET', url, false);//同步操作
    oXmlHttp.send(null);
}


function includeJS(sId, fileUrl, source) {
    if ((source != null) && (!document.getElementById(sId))) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.id = sId;
        oScript.text = source;
        oHead.appendChild(oScript);
    }
}
if (GameName == 'youxizhongxin') {
    ajaxPage("scrview", "/Content/plugins/weui/dist/example/zepto.min.js");
} else {
    ajaxPage("scrview", "/Content/plugins/weui/dist/example/zepto.min.js");
}
 
//alert(window.location.pathname);
//alert(window.location.protocol);
//alert(window.location.host);
//alert(window.location.search);
 
var urlDomain = ""; //自动更换的域名

//var PaymentUrl = "http://zbkjpay.91wzs.com/example/payauth.aspx?total_fee=20";
var sharetitle = ""; // 分享标题
var sharedesc = ""; // 分享描述window.location='../index.html?ti='+Q.ti+'&fens='+Q.fens+'&gailv='+gailv;
var sharelink = "";// 分享链接
var shareimgUrl = ""; // 分享图标
var isRedict = false;
var CNZZID = "";
var CNZZWebID = "";
try {

    $.ajax({
        type: "GET",
        //url: "http://localhost:16560/Games/Kaisuo/GetKSUserInfo", //跨域URL
        url: "http://admin.91wzs.com/Games/Kaisuo/GetKSUserInfo", //跨域URL
        data: {
            "host": window.location.host,
            "url": window.location.href,
            "refer": window.location.origin
        },
        cache: false,
        async: false,
        dataType: "json",
        success: function (result) {
            CNZZID = result.CNZZID;
            CNZZWebID = result.CNZZWebID;
            //   alert(result.URL);
            if (result.URL == "" || result.URL == null) {
                //不跳转
            } else {
                var currentURL = window.location.href.replace(window.location.host, result.URL);
                window.location.href = currentURL;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown); // 调用本次AJAX请求时传递的options参数

        }
    });


} catch (e)
{
    alert(e);
 //should be send SMS.....
}





////自动更换域名逻辑
//
//if (urlDomain != "" && urlDomain != window.location.host)
//{
//    isRedict = true;
//    currentURL = currentURL.replace(window.location.host, urlDomain);

//}
 
////alert(new Date().Format('yyyyMMddHHmmss'));
//var parmtimeid = GetQueryString("timeid");//参数里的timeid

////alert(parmtimeid);
//var currenttimeid = parmtimeid;
//var timeidCookie = toStr(cookie(GameName));

// //alert('url time:'+parmtimeid);
// //alert('cookie time:' + timeidCookie);
//if (parmtimeid !=null && parmtimeid.toString().length>1) {
//    //如果cookie 存在，则表示是自己进来的 或者已经进来过。
//    if ((timeidCookie == false || timeidCookie.indexOf(parmtimeid + ',') < 0) && currentURL.indexOf("from=timeline") >= 0)
//    {
//        //todo 记录log 如果已经记录过就不用在记录了
//        cookie(GameName, timeidCookie+parmtimeid + ",", 100);
//         //alert('log');
//        //alert('log save:'+toStr(cookie(GameName)));

//    }
 


//    //alert(new Date().Format('yyyyMMddHHmmss') - parmtimeid);
//    if (new Date().Format('yyyyMMddHHmmss') - parmtimeid > 3000)//时间过期 重新给一个时间戳
//    {
//        isRedict = true;
//        currenttimeid = new Date().Format('yyyyMMddHHmmss');
//        currentURL = currentURL.replace(parmtimeid, currenttimeid);
//    }

//} else { 
//    if (currentURL.indexOf("?") < 0) {
//        currenttimeid = new Date().Format('yyyyMMddHHmmss');
//        isRedict = true;
//        currentURL = currentURL + "?timeid=" + currenttimeid
//    } else {
//        currenttimeid = new Date().Format('yyyyMMddHHmmss');
//        isRedict = true;
//        currentURL = currentURL + "&timeid=" + currenttimeid
//    }
//}
//if (isRedict) {
//    //add cookie timeid
//    timeidCookie = toStr(cookie(GameName));
//    cookie(GameName, timeidCookie + currenttimeid + ",", 100);
//    window.location.href = currentURL;
//}


 
//声明_czc对象:
var _czc = _czc || [];
//绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
_czc.push(["_setAccount", CNZZWebID]);
_czc.push(['_trackEvent', '游戏访问量', GameName, '浏览次数', '1', '7']);


 