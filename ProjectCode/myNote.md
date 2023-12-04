# 第一个网页

## 注释

<!--注释内容-->

## 元素

1. 超链接：<a href="http://www.intl.zju.edu.cn" target="_blank">ZJUI</a>
2. 嵌套：元素不能相互嵌套

# 语义化

## 元素含义

1. a: 超链接
2. p: 段落, p*6>lorem （乱数假文）
3. h1： 一级标题, h1*6>{title$} (tab)
4. span（无语义）: 添加格式
5. pre：显示包括空白字符

# HTML 实体

1. &单词：&lt; &gt
2. &#数字 

# 超链接

1. <a href="http://www.intl.zju.edu.cn">ZJUI</a>
2. 批量生成：a[href="#chap$"]*6>{章节$}; ((h2[id="chap$"]>{章节$})+p>lorem1000)*6
3. 锚链接：跳转：<a href="#chap2">章节2</a>; <h2 id="chap2">章节2</h2>
4. JavaScript：<a href="javascript:alert('Hello Human!')">Hello AI!</a>
5. 发送邮件：<a href="mailto:qilong2@illinois.edu">Group Leader-Qi Long</a>
6. target: _self：覆盖当前，_blank：新窗口

# 图片

1. <img src="./logo.png" alt="Team TBD">
2. 外可嵌套html
3. map: 图片不同位置不同跳转, <map name="solarMap"> <area shape= coords= href= target=> </map>; <img usemap="#solarMap" src=...>
4. figure: 将图片相关所有元素打包，figcaption

# 列表元素

1. ol: ordered list, type="i"
2. li: each item
3. ul: unordered list
4. 定义列表：dl, dt, dd

# 容器元素

1. 代表一个块区域， 内部放置其他元素 <div></div>
2. header: 页头，有语义的容器
3. footer
4. article
5. section
6. aside

# 元素包含关系

1. 块级可包含行级，行级不可包含块级（旧）

# 为网页添加样式(Style)

1. 元素选择器
```
h1{
    color: red;
    background-color: lightblue;
    text-align: center;
}
```
2. ID选择器
```
#test {
    color: blue;
}
<p id="test">Lorem</p>
```
3. 类选择器
```
.red{
    color: red;
    font-size: 2em;
}
<h1 class="red">
```
4. 声明块
5. CSS: <link rel="stylesheet" href="../static/styles/my.css">

# 常见样式声明

1. color: 元素内部文字颜色
```
淘宝红：#ff4400
黑色：#000000
白色：#ffffff
红：#ff0000
绿: #00ff00
蓝：#0000ff
紫：#f0f
青：#0ff
黄：#ff0
灰：#ccc
宝石绿：#008c8c
```
2. background-color
3. font-size：文字尺寸，px, em（相对于父元素）
4. font-weight
5. font-family：consolas, arial
6. font-style：斜体
7. text-decoration：加线
8. text-indent：首行文本缩进
8. line-height：文本高度
9. width
10. height
11. letter-space：文字间隙
12. text-align：文字水平排列方式

# 盒模型

1. box：每个元素占据一个矩形区域，display默认inline
2. 行盒：display = inline（不换行）, span, a, img, video, audio
3. 块盒：display = block（独占一行），容器, h1~h6, p
4. 内容(content)：width, height
5. 填充(padding)：盒子边框到内容的尺寸, padding-left, padding-right, padding-top, padding-bottom
6. 边框(border): 样式border-style=solid,dashed,dotted， 宽度border-width，颜色border-color（默认字体颜色）
```
border: 4px dashed red;
```
7. 外边距(margin)：跟其他盒的距离, margin-left / right...

# 操作style

1. .pager a:hover{}
2. .pager a:selected{}

# 文本输入框

1. <input type="text">
2. type: number, text, search, checkbox, radio, password, date
3. value：输入框的值
4. placeholder：显示提示文本，没有内容时显示
5. type = reset, button, submit, value = reset
6. select: option
```
<select>
    <option>Chongqin</option>
    <option>...</option>
</select>
```
7. button
8. label

# 表格

1. table:
```
<table>
    <caption>US states</caption>
    <thead></thead>
        <tr>
            <th>row1</th>
            <th>row2</th>
        </tr>
    <tbody></tbody>
    <tfoot></tfoot>
</table>
```

# Javascript

## 语法

1. ;分隔
2. 注释：//  /**/
3. 变量：var i=10;
4. 数组：var arr=[1, 2, 3, 4]; arr[1]=2
        var arr=newArray(); arr[0]=10;
5. 比较符：==只比数值，===要比类型
6. i>10?"i大于10":"i小于10"
7. 函数内声明，没有var是全局变量

## 函数

1. 弹出对话框：alert(sum);
2. 定义：function read(){}
3. 函数调用：
```
<button onclick="read()">
按钮
</button>
```
4. 改写：
```
document.getElementById("pid").innerHTML=demo();
```
5. 获取输入：
```
var e=document.getElementById("txt").value;
```
"txt"为ida

## 异常捕获

1. try{发生异常的代码块}catch(err){错误信息处理}
2. throw
```
if(e==""){
    throw "请输入";
}
```

## 事件

1. onclick
```
<button onclick="demo()">按钮</button>
```
2. onMouseOver：鼠标经过事件
3. onMouseOut: 鼠标移出事件
4. onChange: 文本内容改变事件
5. onSelect: 文本框选中事件
6. onFocus: 光标聚集事件
7. onBlur: 移开光标事件
8. onLoad: 网页加载事件
9. onUnload: 关闭网页事件

## DOM 对象
1. 改变html输出流：会覆盖之前加载的所有内容
```
document.write("hello");
```
2. 寻找元素 + 改变内容：
```
var nv=document.getElementById("pid");
nv.innerHTML = "World";
```
3. 修改属性：
```
document.getElementById("aid").href="xxx.com";
```
```
document.getElementById("imgid").src="2.jpg";
```
4. 修改CSS
```
document.getElementById("div").style.background = "blue";
```

## 句柄

1. addEventListener
```
document.getElementById("pid").addEventListener("click");
```
2. removeEventListener

## DOM 零级事件

1. 
```
var btn1 = document.getElementById("pid");
btn1.onclick = function(){
    alert("Hello World!");
}
```

## 事件对象
1. type
2. target

## 创建对象
1. Object()
```
people = new Object();
people.name = "iwen";
people.age = "30";
```
```
people = {name:"iwen", age:"30"};
```
2. 函数对象
```
function people(name,age){
    this.name = name;
    this.age = age;
}
son = new people("iwen", 30);
document.write("name:"+ son.name + ", age:" + son.age);
```
3. String: str.length, str.indexOf("world"), match(), replace()








