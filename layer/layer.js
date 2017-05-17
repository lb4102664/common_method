;
(function(win, doct) {
  var flag = true;

  function ly() {
    this.layerModel = null;
    this.layerCont = null;
    this.layerWrap = null;
    this.times = null;
    this.init();
  }
  ly.fn = ly.prototype;
  ly.fn.init = function() {
      close();
      clearTimeout(this.times);
      if (flag) {
        var styles = document.createElement("style");
        styles.innerHTML = '.layer-model>.layer-wrap button:first-child{color:#ff5000}.layer-model{width:100%;height:100%;background:rgba(0,0,0,.3);position:fixed;z-index:9999;top:0;left:0}.layer-model.active{background:none}.layer-model>.layer-wrap{position:absolute;top:40%;left:50%;box-shadow:0 0 20px rgba(0,0,0,.7);min-width:2rem;max-width:80%;background:#fff;min-height:auto;transform:translate3d(-50%, -50%,0);-webkit-transform:translate3d(-50%, -50%,0);transform-origin:left;-ms-transform-origin:left;animation:allModel .3s ease-out;-webkit-animation:-webkit-allModel .3s ease-out;border-radius:3px;overflow:hidden}.layer-model>.layer-wrap.active{color:#fff;background:rgba(0,0,0,.7);box-shadow:none}@-webkit-keyframes allModel{0%{-webkit-transform:scale(.2) translate3d(-50%,-50%,0);opacity:0}100%{-webkit-transform:scale(.2) translate3d(-50%,-50%,0);opacity:1}}@keyframes allModel{0%{transform:scale(.2) translate3d(-50%,-50%,0);opacity:0}100%{transform:scale(1) translate3d(-50%,-50%,0);opacity:1}}.layer-model>.layer-wrap .layer-cont{text-align:center;padding:15px 10px;font-size:.28rem}.layer-btn{border-top:1px solid #dfdfdf}.layer-title{padding:.1rem .2rem;color:#ff5000;border-bottom:1px solid #dfdfdf;position:relative}.layer-title .btn-close{width:.5rem;cursor:pointer;position:absolute;top:0;right:0;height:100%}.layer-title .btn-close:after,.layer-title .btn-close:before{position:absolute;content:"";display:block;width:.3rem;height:1px;background:#000;top:.18rem;left:.15rem}.layer-title .btn-close:after{transform:rotate(-45deg)}.layer-title .btn-close:before{transform:rotate(45deg)}.layer-model>.layer-wrap button{border:none;background:#fff;padding:.2rem 0;box-sizing:border-box;cursor:pointer;font-size:.26rem;outline:none;display:inline-block}.layer-model>.layer-wrap button:active{background:#e8e8e8}.layer-model>.layer-wrap button:last-child{border-left:1px solid #dfdfdf}.lay-loading{width:.6rem;height:.6rem;display:inline-block;animation:weuiLoading 1s steps(12,end) infinite;background:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;background-size:100%}@keyframes weuiLoading{0%{-webkit-transform:rotate3d(0, 0, 1, 0 deg)}100%{-webkit-transform:rotate3d(0, 0, 1, 360deg)}}';
        doct.body.insertBefore(styles, null);
        flag = false;
      }


      var div = doct.body.insertAdjacentHTML("beforeend", '<div class="layer-model">\
      <div class="layer-wrap"><div class="layer-cont"></div></div>\
      </div>');
      this.layerModel = getClass("layer-model");
      this.layerWrap = getClass("layer-wrap");
      this.layerCont = getClass("layer-cont");
    }
    //带按钮的提示
  ly.fn.alert = ly.fn.confirm = function(emet, oct, index) {
    if (oct === undefined) {
      oct = {};
      oct.title = "信息";
      if (index) {
        close();
        throw("layer.confirm 第二个参数必须有值");
        return false;
      }
    } else {
      oct.title === undefined && (oct.title = "信息");
    }
    if (oct.btn === undefined && !index) {
      oct.btn = [{
        name: "确认",
        callBack: function() {
          close();
        }
      }];
    }
    if (oct.btn.length === 1 && index) {
      oct.btn.push({
        name: "取消",
        callBack: function() {
          close();
        }
      })
    }

    if (Object.prototype.toString.call(oct) !== "[object Object]") {
      close();
      throw("layer.alert第二个参数必须为对象");
    } else {
      this.layerCont.textContent = emet;
      this.showTitle(oct);
      if (!arguments[1].btn) {
        arguments[1].btn = ["确认"];
      }
      this.showBtn(oct.btn);
    }

  }

  //提示
  ly.fn.msg = function(emet) {
      if (typeof emet !== "string") {
        close();
        throw("layer.msg参数必须为字符串");
      } else {
        this.layerModel.className += " active";
        this.layerWrap.className += " active";
        this.layerCont.textContent = emet;
        this.times = setTimeout(function() {
          close();
        }, 2000);
      }
    }
    //加载
  ly.fn.loading = function(emet) {
      if (typeof emet !== "number") {
        close();
         throw("layer.loading参数必须为数字");
      } else {
        var tims = emet || 2000;
        this.layerModel.className += " active";
        this.layerWrap.className += " active";
        this.layerCont.insertAdjacentHTML("beforeend", '<div class="lay-loading"></div><p>加载中</p>');
        this.times = setTimeout(function() {
          close();
        }, tims);
      }
    }
    //按钮
  ly.fn.showBtn = function(obj) {

      this.layerWrap.insertAdjacentHTML("beforeend", '<div class="layer-btn"></div>');
      var btn = getClass("layer-btn"),
        name = null;
      for (var i = 0; i < obj.length; i++) {
        btn.insertAdjacentHTML("beforeend", '<button type="button" class="btn" style="width:' + (100 / obj.length) + '%">' + obj[i].name + '</button>');
        btn.getElementsByTagName("button")[i].addEventListener("click", function(em) {
          return function() {
            obj[em].callBack();
          }
        }(i));
      }
    }
    //标题
  ly.fn.showTitle = function(obj) {
    this.layerWrap.insertAdjacentHTML("afterBegin", '<div class="layer-title">' + obj.title + '<div class="btn-close"></div></div>');
    getClass("btn-close").addEventListener("click", function() {
      close();
    })
  }

  function getClass(obj) {
    return document.getElementsByClassName(obj)[0];

  }
  //删除信息
  function close() {
    if (getClass("layer-model")) {
      doct.body.removeChild(getClass("layer-model"));
    }
  }
  win.layer = {
    alert: function(emet, oct) {
      new ly().alert(emet, oct, 0);
    },
    confirm: function(emet, oct) {
      new ly().confirm(emet, oct, 1);
    },
    msg: function(emet) {
      new ly().msg(emet);
    },
    loading: function(emet) {
      new ly().loading(emet);
    },
    colse: close
  }

})(window, document);