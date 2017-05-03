;
(function(win) {
    var cDoc = document;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var cWid = cDoc.documentElement.clientWidth || cDoc.body.clientWidth;
    //滑动模块
    function silder(obj) {
        this.nSilder = cDoc.querySelector(obj);
        this.nsilder_list = this.nSilder.children[0];
        this.nsilder_item = this.nsilder_list.getElementsByTagName("li");
        this.zLen = this.nsilder_item.length;
        this.flag = true;
        this.ZX = 0; //触摸开始
        this.ZXend = 0; //触摸结束
        this.zIndex = 1; //当前滑动模块
        this.zTimeOut = null; //自动轮播时间
        this.zTime = 5000; //自动轮播时间
        this.ele = this.nsilder_list.style;
    }
    silder.prototype = {
        init: function() { //初始化

            var _this = this;
            _this.start();
            //屏幕改变宽度改变
            win.addEventListener(resizeEvt, function(params) {
                for (var i = 0; i < _this.zLen + 2; i++) {
                    _this.nsilder_item[i].style.width = cWid + "px";
                };
                _this.nsilder_list.style["width"] = (_this.zLen + 2) * cWid + "px";
                var zd = -_this.zIndex * cWid;
                _this.translate(zd, 0);
            }, false);
            //触摸事件绑定
            _this.nsilder_list.addEventListener("touchstart", function(event) {

                _this.touchEvent(event);
            }, false);
            _this.nsilder_list.addEventListener("touchmove", function(event) {
                _this.touchEvent(event);
            }, false);
            _this.nsilder_list.addEventListener("touchend", function(event) {
                _this.touchEvent(event);
            }, false);
            //自动轮播
            _this.zTimeOut = setInterval(function name(params) {
                _this.zIndex += 1;
                _this.silderTime(_this.zIndex, 300);
                _this.silderIcon();
            }, _this.zTime);
        },
        start: function() {
            var _this = this;
            //添加ol标签
            var ul = cDoc.createElement("ol"),
                sItems = [];
            ul.className = "silder-icon";
            for (var i = 0; i < _this.zLen; i++) {
                _this.nsilder_item[i].style.width = cWid + "px";
                i === 0 ? sItems.push('<li class="on">' + i + '</li>') : sItems.push('<li>' + i + '</li>');
            }
            ul.innerHTML = sItems.join("");
            _this.nSilder.appendChild(ul);
            //在结尾追加标签
            _this.nsilder_list.innerHTML += _this.nsilder_list.children[0].outerHTML;
            //在开始追加标签
            var li = cDoc.createElement("li");
            li.innerHTML = _this.nsilder_list.children[_this.zLen - 1].innerHTML;
            li.style.width = cWid + "px";
            _this.nsilder_list.insertBefore(li, _this.nsilder_list.children[0]);
            //创建标签
            _this.nsilder_list.style["width"] = (_this.zLen + 2) * cWid + "px";
            var zd = -cWid;
            _this.translate(zd, 0);
        },
        touchEvent: function(e) {
            var _this = this;
            if (_this.flag) {
                clearInterval(_this.zTimeOut);
                switch (e.type) {
                    //开始滑动
                    case "touchstart":
                        var tch = e.targetTouches[0];
                        _this.ZX = Math.floor(tch.pageX);
                        _this.ZXend = 0;
                        break;
                        //滑动中
                    case "touchmove":
                        var tch = e.targetTouches[0];
                        _this.ZXend = tch.pageX - _this.ZX;
                        var zd = (-_this.zIndex * cWid + _this.ZXend);
                        _this.translate(zd, -1);
                        break;
                        //结束滑动
                    case "touchend":
                        if (_this.ZXend > 100) {
                            _this.zIndex -= 1;
                        } else if (_this.ZXend < -100) {
                            _this.zIndex += 1;
                        }
                        _this.silderTime(_this.zIndex, 300);
                        //判断滑动是否完成
                        _this.silderIcon();

                        //自动轮播
                        _this.zTimeOut = setInterval(function name(params) {
                            _this.zIndex += 1;
                            _this.silderTime(_this.zIndex, 300);
                            _this.silderIcon();
                        }, _this.zTime);
                        break;
                }

            }






        },
        silderTime: function(zIndex, time) {
            var _this = this;
            var zd = -zIndex * cWid;
            _this.translate(zd, time);
        },
        silderMove: function() {
            var _this = this;

            if (_this.zIndex >= _this.zLen + 1) {
                _this.zIndex = 1;
            } else if (_this.zIndex == 0) {
                _this.zIndex = _this.zLen;
            }
            _this.silderTime(_this.zIndex, 0);
            //添加图标
            var silder_icon = _this.nSilder.getElementsByClassName("silder-icon")[0];
            for (var i = 0; i < _this.zLen; i++) {
                silder_icon.children[i].className = "";
            }
            silder_icon.children[_this.zIndex - 1].className = "on";
            _this.flag = true;
        },
        //判断滑动是否完成
        silderIcon: function() {

            var _this = this;
            _this.flag = false;
            var eventArr = ["transitionend", "webkitTransitionEnd", "msTransitionEnd", "MozTransitionEnd"];
            eventArr.forEach(function(element, index) {
                _this.nsilder_list.addEventListener(element, function(event) {
                    _this.silderMove();
                }, false);
            });
        },
        //滑动效果
        translate: function(speed, time) {
            var _this = this;
            if (time >= 0) {
                _this.ele.webkitTransitionDuration = _this.ele.MozTransitionDuration = _this.ele.msTransitionDuration = _this.ele.OTransitionDuration = _this.ele.transitionDuration = time + "ms";
            }
            _this.ele.webkitTransform = 'translate(' + speed + 'px,0)' + 'translateZ(0)';
            _this.ele.msTransform = _this.ele.MozTransform = _this.ele.OTransform = 'translateX(' + speed + 'px)';
        }
    }

    //调用滑动模块
    win.silder = function(params) {
        var sdr = new silder(params);
        sdr.init();
    };

})(window);
