"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	调色板
 */

var colPicker = function () {
    function colPicker(opt) {
        _classCallCheck(this, colPicker);

        this.color = "rgba(0,0,0,0)";
        this.changeColorEl = null;
        this.changeColorStyle = 1;
        this.changeColorBtn = null;
        this.x = 1540;
        this.y = 100;
        jQuery.extend(this, opt);
    }

    _createClass(colPicker, [{
        key: "init",
        value: function init(color) {
            this.initColors = [
            // 白
            ["#f8f8f8", "#dddddd", "#999999", "#666666", "#333333"],
            // 青
            ["#bcfffc", "#67fffb", "#00f9ff", "#00a4b2", "#0c474d"],
            // 蓝
            ["#bfb6ff", "#6a55ff", "#1e00fb", "#2716a9", "#0a005d"],
            // 紫
            ["#d7b6ff", "#a65bf4", "#733fa8", "#572f7e", "#321b48"],
            // 粉
            ["#ffb6e4", "#f562a0", "#ed169a", "#9c0060", "#560035"],
            // 红
            ["#f8cecf", "#ff687e", "#fd0025", "#8e1426", "#46151c"],
            // 橙
            ["#ffe8c5", "#ffc265", "#ff9e0a", "#af6900", "#5b3700"],
            // 黄
            ["#fffabe", "#fff377", "#ffea00", "#bb9600", "#4a4017"],
            // 绿
            ["#dcffc2", "#76dc1c", "#76dc1c", "#61951d", "#2e4717"],
            // 青绿
            ["#e1f7eb", "#83deae", "#55d390", "#26a863", "#0e502d"]];
            this.dom = $('#dhcolorPicker');
            this.canvas = $(".colorPickerCanvas")[0];
            this.ctx = this.canvas.getContext("2d");
            this.sInput = $('.controlColorC.color-s', this.dom);
            this.lInput = $('.controlColorC.color-l', this.dom);
            this.aInput = $('.controlColorC.color-a', this.dom);
            this.pannel = $('.dhColorChoiceBox', this.dom);
            this.dragIco = $('.colorIco', this.dom);
            this.inputCol = $('.colorInputWrap input', this.dom);
            this.dragIcoInfor = {
                w: this.dragIco.outerWidth(),
                h: this.dragIco.outerHeight()
            };
            this.iSectors = 360; // in radians -- 决定绘制的起始角度
            this.iSectorAngle = 360 / this.iSectors / 180 * Math.PI; // in radians -- 决定绘制的角度
            this.ringWidth = 30;
            this.radius = this.canvas.width / 2 - this.ringWidth;
            this.ringRadius = this.canvas.width / 2 + 2; //计算圆半径
            this.setColorBox();
            this.setCenter();
            // 拖拽函数
            this.dragFn(".controlColorC", ".colorBarInner", ".colorBarIco", ".controlColorC");
            this.dragColorIco();
            this.boxDrag();
            //输入框的函数
            this.inputVal();
            this.initEvent();
            this.closeBox();
        }
    }, {
        key: "posFn",

        // 组件位置
        value: function posFn() {
            this.dom.css({ "left": this.x, "top": this.y });
            this.setCenter();
        }
    }, {
        key: "setColorBox",
        value: function setColorBox() {
            var that = this,
                dom = "<div class='dhColorChoiceCol'>";
            $.each(this.initColors, function (i, v) {
                var col = "<div class='colColumn'>";
                $.each(v, function (j, s) {
                    col += "<div class='colColumnItem' data-color='" + s + "' style='background-color: " + s + "'></div>";
                });
                col += "</div>";
                dom += col;
            });
            dom += "</div>";
            $(dom).appendTo(this.dom).find('.colColumnItem').on('click', function () {
                that.a = 1;
                that.updata($(this).data('color'));
            });
        }
    }, {
        key: "updata",
        value: function updata(color, isBtn) {
            color = color || 'rgba(100, 130, 20, 0.2)';
            this.resultColor = color || this.hslToRgb(Number(this.h / 360), parseFloat(this.s) / 100, parseFloat(this.l) / 100);
            this.colorRgb(color);
            this.setColorInfor(color);
            // this.changeSliderBar();
            this.drawPicker();
            this.setSelectPos();
            // this.changeNewColor(isBtn);
            this.showColor(color);
            // this.resultColor = color;
        }
    }, {
        key: "drawPicker",

        // 绘制夜色面板
        value: function drawPicker() {
            var canvas = this.canvas;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.drawColorCircl(this.s, this.l, this.a);
            ctx.restore();
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 29, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
            ctx.save();
        }
    }, {
        key: "drawColorCircl",
        value: function drawColorCircl() {
            var canvas = this.canvas;
            var ctx = this.ctx;
            var iSectors = this.iSectors;
            var iSectorAngle = this.iSectorAngle;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            for (var i = 0; i < iSectors; i++) {
                var color = 'hsla(' + i + ', ' + this.s + ', ' + this.l + ', ' + this.a + ')';
                var startAngle = 180;
                var endAngle = startAngle + iSectorAngle;
                var radius = canvas.width / 2 - 1;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, startAngle / 180 * Math.PI, Math.max(startAngle + 2, 180) / 180 * Math.PI, false);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                ctx.rotate(iSectorAngle);
            }
            ctx.restore();
            ctx.save();
        }
    }, {
        key: "setColorInfor",

        // 设置颜色, 修改颜色控制条
        value: function setColorInfor() {
            var _this = this;

            var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgba(100, 130, 20, 0.2)';

            var result = this.hslaStr;
            var reg = /^hsla?\((\d+.?\d*),\s?(\d+.?\d*%),\s?(\d+.?\d*%),?\s?([0|1].?([0-9]+)?)?\)$/,
                s = void 0,
                h = void 0,
                l = void 0,
                a = void 0;
            result.replace(reg, function ($0, $1, $2, $3, $4) {
                _this.h = $1;
                _this.s = $2;
                _this.l = $3;
                _this.a = $4 ? $4 : 1;
            });
            // this.sInput.trigger('initInput', [parseInt(this.s) / 100]);
            // this.lInput.trigger('initInput', [parseInt(this.l) / 100]);
            // this.aInput.trigger('initInput', [1 - this.a]);
            $(".color-s .colorBarInner").css({ "width": parseInt(this.s) + "%", "background": 'linear-gradient(90deg, hsl(' + this.h + ', 0%, ' + this.l + '), hsl(' + this.h + ', 16.666667%, ' + this.l + '), hsl(' + this.h + ', 33.333333%, ' + this.l + '), hsl(' + this.h + ', 50%, ' + this.l + '), hsl(' + this.h + ', 66.666667%, ' + this.l + '), hsl(' + this.h + ', 100%, ' + this.l + '))' });
            $(".color-l .colorBarInner").css({ "width": parseInt(this.l) / 100 * $(".color-l").width() });
            $(".color-a .colorBarInner").css({ "width": (1 - this.a) * 100 + "%", 'background-image': 'linear-gradient(90deg, hsla(' + this.h + ', ' + this.s + ', ' + this.l + ', 1), hsla(' + this.h + ', ' + this.s + ', ' + this.l + ', 0)), url("files/images/opacityBg.png")' });
            this.dom.find(".controlItemCon span").text(100 - parseInt(this.a * 100));
            this.changeCol();
        }
    }, {
        key: "setSelectPos",

        // 通过坐标信息，将选色点放置到制定位置 触发：changeSliderBar；
        value: function setSelectPos(targetPos) {
            targetPos = targetPos || this.h;
            var angle = void 0;
            if ((typeof targetPos === "undefined" ? "undefined" : _typeof(targetPos)) != 'object') {
                angle = +targetPos;
            } else {
                angle = this.getAngle(targetPos, this.center).angle;
            }

            var pos = this.getRPos(angle, this.ringRadius);

            this.dragIco.css({
                top: pos.y,
                left: pos.x
            });
        }
    }, {
        key: "setCenter",

        // 设置圆心
        value: function setCenter() {
            var pannel = this.pannel;
            var pannelInfor = {
                w: pannel.outerWidth(),
                h: pannel.outerHeight(),
                t: pannel[0].getBoundingClientRect().top,
                l: pannel[0].getBoundingClientRect().left
            },
                center = {
                x: pannelInfor.w / 2 + pannelInfor.l,
                y: pannelInfor.h / 2 + pannelInfor.t
            };
            this.pannelInfor = pannelInfor;
            this.center = center;
        }
    }, {
        key: "getRPos",

        // 通过半径和圆角计算点的坐标信息
        value: function getRPos(angle, radius) {
            var pos = {
                x: Math.abs(Math.round(radius * Math.cos(angle * 3.14 / 180))),
                y: Math.abs(Math.round(radius * Math.sin(angle * 3.14 / 180)))
            },
                disInfor = {
                x: (this.pannelInfor.w - this.dragIcoInfor.w) / 2,
                y: (this.pannelInfor.h - this.dragIcoInfor.h) / 2
            };
            if (0 <= angle && angle < 90) {
                pos.x = disInfor.x - pos.x, pos.y = disInfor.y - pos.y;
            }
            if (90 <= angle && angle < 180) {
                pos.x = disInfor.x + pos.x, pos.y = disInfor.y - pos.y;
            }
            if (180 <= angle && angle <= 270) {
                pos.x = disInfor.x + pos.x, pos.y = disInfor.y + pos.y;
            }
            if (270 < angle && angle < 360) {
                pos.x = disInfor.x - pos.x, pos.y = disInfor.y + pos.y;
            }
            return pos;
        }
    }, {
        key: "getAngle",

        // 获取两点之间的圆角
        value: function getAngle(point, center) {
            var dir = void 0,
                angle = Math.round(360 * Math.atan((point.y - center.y) / (point.x - center.x)) / (2 * Math.PI));
            if (point.x < center.x && point.y < center.y) {
                // 0 - 90
                dir = 'lt';
            }

            if (point.x >= center.x && point.y < center.y) {
                dir = 'rt';
                angle += 180;
            }

            if (point.x >= center.x && point.y >= center.y) {
                dir = 'rb';
                angle += 180;
            }

            if (point.x < center.x && point.y > center.y) {
                dir = 'lb';
                angle += 360;
            }
            var obj = {
                angle: angle,
                dir: dir
            };

            this.h = angle;

            return obj;
        }
    }, {
        key: "showColor",
        value: function showColor(color) {
            this.inputCol.val(this.resultColor.slice(1, this.resultColor.length));
        }
    }, {
        key: "dragFn",

        //拖拽函数
        value: function dragFn(a, b, c, d) {
            var opt = this;
            function moveDownSlide(l, w, that, isBtn) {
                var newWidth = w + l;
                if (newWidth < 0) {
                    newWidth = 0;
                } else if (newWidth > $(that).width()) {
                    newWidth = $(that).width();
                }
                if (isBtn) {
                    $(that).find(b).css('width', newWidth);
                } else {
                    $(that).find(b).css('width', newWidth - 8);
                }
                if ($(that).hasClass("color-s")) {
                    opt.s = ($(that).find(b).width() / $(d).width() * 100).toFixed(2) + "%";
                } else if ($(that).hasClass("color-l")) {
                    opt.l = ($(that).find(b).width() / $(d).width() * 100).toFixed(2) + "%";
                } else if ($(that).hasClass("color-a")) {
                    opt.a = 1 - ($(that).find(b).width() / $(that).width()).toFixed(2);
                    $(that).parents(".controlItemCon").find("span").text(100 - parseInt(opt.a * 100));
                }
                if (opt.a != undefined) {
                    var hslaStr = "hsla(" + opt.h + "," + opt.s + "," + opt.l + "," + opt.a + ")";
                } else {
                    var hslaStr = "hsl(" + opt.h + "," + opt.s + "," + opt.l + ")";
                }
                opt.hslaStr = hslaStr;
                opt.drawPicker();
                opt.resultColor = opt.hslToRgb(Number(opt.h / 360), parseFloat(opt.s) / 100, parseFloat(opt.l) / 100);
                opt.inputCol.val(opt.resultColor.slice(1, opt.resultColor.length));

                $(".color-s .colorBarInner").css({ 'background': 'linear-gradient(90deg, hsl(' + opt.h + ', 0%, ' + opt.l + '), hsl(' + opt.h + ', 16.666667%, ' + opt.l + '), hsl(' + opt.h + ', 33.333333%, ' + opt.l + '), hsl(' + opt.h + ', 50%, ' + opt.l + '), hsl(' + opt.h + ', 66.666667%, ' + opt.l + '), hsl(' + opt.h + ', 100%, ' + opt.l + '))' });
                $(".color-a .colorBarInner").css({ 'background-image': 'linear-gradient(90deg, hsla(' + opt.h + ', ' + opt.s + ', ' + opt.l + ', 1), hsla(' + opt.h + ', ' + opt.s + ', ' + opt.l + ', 0)), url("files/images/opacityBg.png")' });
                opt.changeCol();
            };
            //鼠标拖动事件
            $(d).on("mousedown", function (ev) {
                var that = this;
                var ev = ev || window.event;
                ev.preventDefault();
                var disX = ev.clientX;
                var cLeft = $(this).find(c)[0].getBoundingClientRect().left;
                var changeW = ev.clientX - cLeft;
                var scrollWidth = $(this).find(b).width();
                moveDownSlide(changeW, scrollWidth, that, false);
                scrollWidth = $(this).find(b).width();
                $(document).bind("mousemove", fnMove);
                $(document).bind("mouseup", fnUp);
                function fnMove(ev) {
                    var ev = ev || window.event;
                    var l = ev.clientX - disX; //鼠标移动的距离
                    moveDownSlide(l, scrollWidth, that, true);
                    ev.preventDefault();
                }
                function fnUp() {
                    $(document).unbind("mousemove", fnMove);
                    $(document).unbind("mouseup", fnUp);
                }
                ev.stopPropagation();
            });
        }
    }, {
        key: "dragColorIco",
        value: function dragColorIco() {
            var that = this;
            this.pannel.on("mousedown", function (ev) {
                initDrag(ev);
                $(document).bind("mousemove", initDrag);
                $(document).bind("mouseup", fnup);
                ev.stopPropagation();
            });
            function fnup() {
                $(document).unbind("mousemove", initDrag);
                $(document).unbind("mouseup", fnup);
            }
            function initDrag(ev) {
                var ev = ev || window.event;
                var page = { x: ev.clientX, y: ev.clientY };
                that.setSelectPos(page);
                that.hslaStr = "hsla(" + that.h + "," + that.s + "," + that.l + "," + that.a + ")";
                that.h = that.getAngle(page, that.center).angle;
                $(".color-s .colorBarInner").css({ 'background': 'linear-gradient(90deg, hsl(' + that.h + ', 0%, ' + that.l + '), hsl(' + that.h + ', 16.666667%, ' + that.l + '), hsl(' + that.h + ', 33.333333%, ' + that.l + '), hsl(' + that.h + ', 50%, ' + that.l + '), hsl(' + that.h + ', 66.666667%, ' + that.l + '), hsl(' + that.h + ', 100%, ' + that.l + '))' });
                $(".color-a .colorBarInner").css({ 'background-image': 'linear-gradient(90deg, hsla(' + that.h + ', ' + that.s + ', ' + that.l + ', 1), hsla(' + that.h + ', ' + that.s + ', ' + that.l + ', 0)), url("files/images/opacityBg.png")' });
                that.resultColor = that.hslToRgb(Number(that.h / 360), parseFloat(that.s) / 100, parseFloat(that.l) / 100);
                that.inputCol.val(that.resultColor.slice(1, that.resultColor.length));
                that.changeCol();
                ev.preventDefault();
            }
        }
    }, {
        key: "boxDrag",
        value: function boxDrag() {
            var that = this;
            var obj = this.dom.draggable({
                handle: ".dragBox",
                stop: function stop() {
                    var windowW = $(window).innerWidth();
                    var windowH = $(window).innerHeight();
                    var left = that.dom.position().left;
                    var top = that.dom.position().top;
                    var width = that.dom.width() + 60;
                    var height = that.dom.height() + 60;
                    if (left < 0) {
                        that.dom.css("left", 10);
                    } else if (left > windowW - width) {
                        that.dom.css("left", windowW - width - 10);
                    }
                    if (top < 0) {
                        that.dom.css("top", 10);
                    } else if (top > windowH - height) {
                        that.dom.css("top", windowH - height - 10);
                    }
                    that.dom.css("transition", "all .36s ease");
                    setTimeout(function () {
                        that.dom.css("transition", "");
                        that.setCenter();
                    }, 360);
                }
            });
        }
    }, {
        key: "inputVal",

        //输入框的函数
        value: function inputVal() {
            var that = this;
            this.inputCol.keyup(function (ev) {
                var ev = ev || window.event;
                if (ev.keyCode == 13) {
                    var colorStr = "#" + that.inputCol.val();
                    if (colorStr.length === 4) {
                        var sColorNew = "";
                        for (var i = 1; i < 4; i += 1) {
                            sColorNew += colorStr.slice(i, i + 1).concat(colorStr.slice(i, i + 1));
                        }
                    }
                    that.a = 1;
                    that.inputCol.val(sColorNew);
                    that.colorRgb(colorStr);
                    that.setColorInfor();
                    that.drawPicker();
                    that.setSelectPos();
                    that.changeCol();
                }
            });
        }
    }, {
        key: "colorRgb",

        // color转换为rgb
        value: function colorRgb(color) {
            var sColor = color.toLowerCase();
            //十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 如果是16进制颜色
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                if (this.a) {
                    this.rgbToHsl(sColorChange[0], sColorChange[1], sColorChange[2], this.a);
                } else {
                    this.rgbToHsl(sColorChange[0], sColorChange[1], sColorChange[2]);
                }
            } else {
                return false;
            }
            return sColor;
        }
    }, {
        key: "rgbToHsl",

        //rgba转换为hsla
        value: function rgbToHsl(r, g, b, a) {
            r /= 255, g /= 255, b /= 255;

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h,
                s,
                l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);break;
                    case g:
                        h = (b - r) / d + 2;break;
                    case b:
                        h = (r - g) / d + 4;break;
                }
                h /= 6;
            }
            h = (h * 360).toFixed(2);
            s = Number((s * 100).toFixed(2)) + "%";
            l = Number((l * 100).toFixed(2)) + "%";
            if (a !== undefined) {
                var hslaStr = "hsla(" + [h, s, l, a].join(",") + ")";
            } else {
                var hslaStr = "hsl(" + [h, s, l].join(",") + ")";
            }
            this.hslaStr = hslaStr;
        }
    }, {
        key: "hslToRgb",

        //hsl改变为rgb的方法;
        value: function hslToRgb(h, s, l) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            this.rgbStr = "rgb(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + ")";
            return this.tohex(this.rgbStr);
        }
    }, {
        key: "tohex",

        // rgb转化为十六进制
        value: function tohex(rgb) {
            var reg = /(\d{1,3}),(\d{1,3}),(\d{1,3})/;
            var arr = reg.exec(rgb);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            var _hex = "#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
            return _hex.toLowerCase();
        }
    }, {
        key: "rgbOrRgbaToArray",
        value: function rgbOrRgbaToArray(colorString) {
            var rgbOrgbaJudgeTag = /^([^\(]+)\([^\)]+\)$/i;
            var aaa = rgbOrgbaJudgeTag.exec(colorString);
            if (aaa !== null) {
                if (aaa[1].trim() === "rgb") {
                    var str = colorString;
                    var strTag = /^rgb[a]*\s*\(([^,]+),([^,]+),([^\)]+)\)$/i;
                    var result = strTag.exec(str);
                    if (result === null || result[1].trim() === "" || result[2].trim() === "" || result[3].trim() === "") {
                        return null;
                    }
                    var returnArray = [];
                    for (var i = 1; i <= result.length - 1; i++) {
                        returnArray[i - 1] = Number(result[i].trim());
                    }
                    return returnArray;
                } else if (aaa[1].trim() === "rgba") {
                    var str = colorString;
                    var strTag = /^rgb[a]*\s*\(([^,]+),([^,]+),([^,]+),([^\)]+)\)$/i;
                    var result = strTag.exec(str);
                    if (result === null || result[1].trim() === "" || result[2].trim() === "" || result[3].trim() === "") {
                        return null;
                    }
                    var returnArray = [];
                    for (var i = 1; i <= result.length - 1; i++) {
                        returnArray[i - 1] = Number(result[i].trim());
                    }
                    return returnArray;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }, {
        key: "initEvent",

        //初始化调色板
        value: function initEvent() {
            // 组件位置
            this.posFn();

            var arrColor = this.rgbOrRgbaToArray(this.color);

            this.rgbToHsl(arrColor[0], arrColor[1], arrColor[2], arrColor[3]);
            this.setColorInfor();
            this.drawPicker();
            this.setSelectPos();
            this.resultColor = this.hslToRgb(Number(this.h / 360), parseFloat(this.s) / 100, parseFloat(this.l) / 100);
            this.inputCol.val(this.resultColor.slice(1, this.resultColor.length));
        }
    }, {
        key: "changeCol",

        //修改页面;
        value: function changeCol() {
            if (!this.changeColorEl) return;
            if (this.changeColorStyle == 1) {
                this.changeColorEl.find(".comPartMask").css("background-color", this.hslaStr);
                if (this.changeColorEl.hasClass("dhHeaderSet")) {
                    $(window).scroll();
                };
            } else {
                this.changeColorEl.css("color", this.hslaStr);
            }
            if (this.changeColorBtn === ".logoFtSelect .colChange") {
                $(this.changeColorBtn).css("background-color", this.hslaStr);
                $(this.changeColorBtn).attr("data-color", $(this.changeColorBtn).css("background-color"));
            } else {
                this.changeColorEl.find(this.changeColorBtn).css("background-color", this.hslaStr);
                this.changeColorEl.find(this.changeColorBtn).attr("data-color", this.changeColorEl.find(this.changeColorBtn).css("background-color"));
            }
        }
    }, {
        key: "closeBox",

        //关闭调色板
        value: function closeBox() {
            var that = this;
            this.dom.find(".dhCloseL").click(closeWrap);
            $(".popColMask").click(closeWrap);
            function closeWrap() {
                if (!that.changeColorEl) return;
                that.dom.removeClass("show");
                that.changeColorEl.removeClass("changeCol");
                $(".popColMask").fadeOut();
            }
        }
    }]);

    return colPicker;
}();

totalObj.colPicke = new colPicker();
totalObj.colPicke.init();