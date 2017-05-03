;
(function(win) {
    var cDoc = document;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var cWid = cDoc.documentElement.clientWidth || cDoc.body.clientWidth;
    //����ģ��
    function silder(obj) {
        this.nSilder = cDoc.querySelector(obj);
        this.nsilder_list = this.nSilder.children[0];
        this.nsilder_item = this.nsilder_list.getElementsByTagName("li");
        this.zLen = this.nsilder_item.length;
        this.flag = true;
        this.ZX = 0; //������ʼ
        this.ZXend = 0; //��������
        this.zIndex = 1; //��ǰ����ģ��
        this.zTimeOut = null; //�Զ��ֲ�ʱ��
        this.zTime = 5000; //�Զ��ֲ�ʱ��
        this.ele = this.nsilder_list.style;
    }
    silder.prototype = {
        init: function() { //��ʼ��

            var _this = this;
            _this.start();
            //��Ļ�ı��ȸı�
            win.addEventListener(resizeEvt, function(params) {
                for (var i = 0; i < _this.zLen + 2; i++) {
                    _this.nsilder_item[i].style.width = cWid + "px";
                };
                _this.nsilder_list.style["width"] = (_this.zLen + 2) * cWid + "px";
                var zd = -_this.zIndex * cWid;
                _this.translate(zd, 0);
            }, false);
            //�����¼���
            _this.nsilder_list.addEventListener("touchstart", function(event) {

                _this.touchEvent(event);
            }, false);
            _this.nsilder_list.addEventListener("touchmove", function(event) {
                _this.touchEvent(event);
            }, false);
            _this.nsilder_list.addEventListener("touchend", function(event) {
                _this.touchEvent(event);
            }, false);
            //�Զ��ֲ�
            _this.zTimeOut = setInterval(function name(params) {
                _this.zIndex += 1;
                _this.silderTime(_this.zIndex, 300);
                _this.silderIcon();
            }, _this.zTime);
        },
        start: function() {
            var _this = this;
            //���ol��ǩ
            var ul = cDoc.createElement("ol"),
                sItems = [];
            ul.className = "silder-icon";
            for (var i = 0; i < _this.zLen; i++) {
                _this.nsilder_item[i].style.width = cWid + "px";
                i === 0 ? sItems.push('<li class="on">' + i + '</li>') : sItems.push('<li>' + i + '</li>');
            }
            ul.innerHTML = sItems.join("");
            _this.nSilder.appendChild(ul);
            //�ڽ�β׷�ӱ�ǩ
            _this.nsilder_list.innerHTML += _this.nsilder_list.children[0].outerHTML;
            //�ڿ�ʼ׷�ӱ�ǩ
            var li = cDoc.createElement("li");
            li.innerHTML = _this.nsilder_list.children[_this.zLen - 1].innerHTML;
            li.style.width = cWid + "px";
            _this.nsilder_list.insertBefore(li, _this.nsilder_list.children[0]);
            //������ǩ
            _this.nsilder_list.style["width"] = (_this.zLen + 2) * cWid + "px";
            var zd = -cWid;
            _this.translate(zd, 0);
        },
        touchEvent: function(e) {
            var _this = this;
            if (_this.flag) {
                clearInterval(_this.zTimeOut);
                switch (e.type) {
                    //��ʼ����
                    case "touchstart":
                        var tch = e.targetTouches[0];
                        _this.ZX = Math.floor(tch.pageX);
                        _this.ZXend = 0;
                        break;
                        //������
                    case "touchmove":
                        var tch = e.targetTouches[0];
                        _this.ZXend = tch.pageX - _this.ZX;
                        var zd = (-_this.zIndex * cWid + _this.ZXend);
                        _this.translate(zd, -1);
                        break;
                        //��������
                    case "touchend":
                        if (_this.ZXend > 100) {
                            _this.zIndex -= 1;
                        } else if (_this.ZXend < -100) {
                            _this.zIndex += 1;
                        }
                        _this.silderTime(_this.zIndex, 300);
                        //�жϻ����Ƿ����
                        _this.silderIcon();

                        //�Զ��ֲ�
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
            //���ͼ��
            var silder_icon = _this.nSilder.getElementsByClassName("silder-icon")[0];
            for (var i = 0; i < _this.zLen; i++) {
                silder_icon.children[i].className = "";
            }
            silder_icon.children[_this.zIndex - 1].className = "on";
            _this.flag = true;
        },
        //�жϻ����Ƿ����
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
        //����Ч��
        translate: function(speed, time) {
            var _this = this;
            if (time >= 0) {
                _this.ele.webkitTransitionDuration = _this.ele.MozTransitionDuration = _this.ele.msTransitionDuration = _this.ele.OTransitionDuration = _this.ele.transitionDuration = time + "ms";
            }
            _this.ele.webkitTransform = 'translate(' + speed + 'px,0)' + 'translateZ(0)';
            _this.ele.msTransform = _this.ele.MozTransform = _this.ele.OTransform = 'translateX(' + speed + 'px)';
        }
    }

    //���û���ģ��
    win.silder = function(params) {
        var sdr = new silder(params);
        sdr.init();
    };

})(window);
