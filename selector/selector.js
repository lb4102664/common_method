(function(win,doc){
     	function packer(params){
     		this.flag=true;
     		this.dataArr=params.dataArr || this.defDataArr.call(this); //滚动对象,默认为日期
     		this.evEle=params.evEle; //绑定的元素
     		this.title=params.title || "标题"; //标题
     		this.color=params.color || "#fda626";  //主体颜色
     		this.fromatSplit=params.fromatSplit || ""; //截取格式
     		this.dfvalue=params.dfvalue || this.defValueParm.call(this); //默认选中参数
     		this.eventAction=params.eventAction; //回调
     		this.value=isType(this.dfvalue)==="Array"?this.dfvalue:[this.dfvalue];
     		this.num=0;
     		this.init();
     	}
     	packer.prototype={
     		constructor:packer,
     		init:function(){//初始化
     			this.createStyle();
     			this.createData();

     		},
     		getClassName:function(obj){
     			return  doc.getElementsByClassName(obj)[0];

     		},
     		createData:function(){
     			var _this=this;
     			
     			if(!this.getClassName("select-drop")){
     				doc.body.insertAdjacentHTML('beforeend','<div class="select-drop"><div class="select-bg"></div><div class="select-box"><div class="select-b-top"><button class="select-b-close"></button><div class="select-b-tit"><span>标题</span></div><button class="select-b-ok"></button></div><div class="select-b-cont"><div class="select-b-border"></div><div class="select-b-wrap"></div></div></div></div>');
     			  }
     			  var selectOK=this.getClassName("select-b-ok"),selectClose=this.getClassName("select-b-close");
     			  doc.querySelector(this.evEle).addEventListener("click",function(){

     			  	if(_this.num>0&&this.value.trim()){
     			  		_this.dfvalue=this.value.split(_this.fromatSplit);	
     			  	}


     			  selectOK.onClick=null;
     			  	_this.getClassName("select-drop").classList.add("in");
     			  	_this.clickBind.call(_this);
     			     selectOK.onclick=function(){
     			  		_this.clickOk();
     			  	} 
     			  	_this.num++;

     			  	_this.getClassName("select-b-top").style.background=selectOK.style.background=selectClose.style.background=_this.getClassName("select-b-border").style.borderColor=_this.color;
     			  _this.getClassName("select-b-tit").textContent=_this.title;


     			  });
     			 this.getClassName("select-bg").addEventListener("click",this.close.bind(this));
     			 selectClose.addEventListener("click",this.close.bind(this));
     			 
     			

     		},
     		clickOk:function(){
     			this.close();
     			this.eventAction(this.value);

     		},
     		appendHtml:function(){
     			var select_b_cont=this.getClassName("select-b-wrap"),len=this.dataArr.length;
     			  select_b_cont.innerHTML="";
     			   var str="";
     			  for(var i=0;i<len;i++){
     			  	str="";
     			  	 for(j=0;j<this.dataArr[i].length;j++){
     			  	 	var cont=this.dataArr[i][j]<10?'0'+this.dataArr[i][j]:this.dataArr[i][j];
     			  	 	str+="<div class='select-b-item'>"+cont+"</div>";
     			  	 
     			  	 }
     			  	 select_b_cont.insertAdjacentHTML('beforeend','<div class="select-b-scroll"><div class="select-b-list">'+str+'</div></div>');

     			 	}

     		},
     		appendHtmlDay:function(){
     			var list=doc.getElementsByClassName("select-b-list")[2],len=this.dataArr[2].length;
     			var str="";
     			list.innerHTML="";
     			for(var i=1;i<=len;i++){
     				var cont=i<10?'0'+i:i;
     				str+="<div class='select-b-item'>"+cont+"</div>";
     			}
     			 list.insertAdjacentHTML('beforeend',str);

     		},
     		clickBind:function(){
     			

     			var _this=this;
     			this.appendHtml.call(this);
     			 

     			 	 var selectList=doc.getElementsByClassName("select-b-list");
     			 var timer=0;
     			 for(var z=0;z<selectList.length;z++){
     			 	selectList[z].scrollTop=this.dataArr[z].indexOf(+this.dfvalue[z])*36; 

     			 	selectList[z].addEventListener("scroll",(function(z){
     			 		return function(){
     			 			 clearTimeout(timer);
		     			 		var _this2=this;
		     			 	timer=setTimeout(function(){
		     			 		var snum=Math.round(_this2.scrollTop/36);
		     			 			_this2.scrollTop=snum*36;
		     			 			_this.value[z]=_this.dataArr[z][snum];
		     			 			if(!_this.flag&&z<2){
		     			 				console.log(1)
		     			 				_this.dataArr[2]=[];
		     			 				console.log(_this.dataArr[2])
		     			 				var days=getDaysByMonthNYear.call(win,_this.value[1],_this.value[0]).length;
		     			 				for(var t=1;t<=days;t++){
		     			 					_this.dataArr[2].push(t);
		     			 				}
		     			 				_this.appendHtmlDay();


		     			 			}
		     			 	
		     			 		},300);

     			 		}

     			 	})(z));

     			 }


     		},
     		close:function(){
     			this.getClassName("select-drop").classList.remove("in");

     		},
     		createStyle:function(){
     			if(!doc.getElementById("styleSelect")){
     				var style=doc.createElement("style");
     			    style.setAttribute("id","styleSelect");
     			    style.textContent='.select-drop { display: none; } .select-drop.in { display: block; } .select-bg, .select-box { position: fixed; width: 100%; height: 100%; left: 0; } .select-box {} .select-drop.in .select-box { animation: anfix .5s ease-out; } @keyframes anfix { 0% { transform: translateY(244px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } } .select-bg { background: rgba(0, 0, 0, .6); top: 0; z-index: 98; } .select-box { height: 224px; bottom: 0; z-index: 98; background: #fff; } .select-b-top { height: 44px; background: #fda626; display: flex; align-items: center } .select-b-close, .select-b-ok { width: 22px; height: 22px; background: #fda626; border: 1px solid #fff; border-radius: 50%; margin: 0 12px; position: relative; outline: none; } .select-b-close:after, .select-b-close:before, .select-b-ok:after { content: ""; position: absolute } .select-b-close:after, .select-b-close:before { width: 1px; height: 14px; background: #fff; top: 3px; } .select-b-close:after { transform: rotate(45deg); } .select-b-close:before { transform: rotate(-45deg); } .select-b-ok:after { width: 5px; height: 12px; border: 1px solid #fff; border-left: none; border-top: none; top: 2px; left: 8px; transform: rotate(45deg); } .select-b-tit { flex: 1; text-align: center; font-size: 18px; color: #fff; } .select-b-cont {  vertical-align: middle; text-align: center; position: relative }.select-b-wrap{width: 100%; display: flex;} .select-b-scroll { flex: 1; overflow: hidden; } .select-b-border { width: 100%; height: 36px; border-top: 1px solid #fda626; border-bottom: 1px solid #fda626; position: absolute; background: none; top: 50%; left: 0; transform: translateY(-50%); } .select-b-list { height: 180px; overflow: auto; box-sizing: border-box; padding: 72px 0; width: 200%; padding-right: 100%; } .select-b-item { height: 36px; line-height: 36px; font-size: 16px; color: #b2b2b2;.select-b-list{transition:all .3s ease-out} }';
     			    doc.getElementsByTagName("head")[0].append(style);
     			}
     		},
            defValueParm:function(){//默认值
            	var len=this.dataArr.length;
            	var val=null;
            	if(len>1){
            		val=[];
            		for(var i=0;i<len;i++){
            			val.push(this.dataArr[i][0]);
            	   }
            	}else{
            		 val=this.dataArr[0][0];
            	}
            	return val;
            },
            defDataArr:function(){//默认值取日期
            	this.flag=false;
            	var dateArr=[[],[1,2,3,4,5,6,7,8,9,10,11,12],[]];
            	var date=new Date();
            	var year=date.getFullYear();
            	var month=date.getMonth();
            	var day=date.getDate();
            	for(var i=1970;i<2099;i++){
            		dateArr[0].push(i);
            	}
            	for(var i=1;i<=31;i++){
            		dateArr[2].push(i);
            	}
            	return dateArr;
            }
     	}
     	//判断类型
     	function isType(params){
     	  return Object.prototype.toString.call(params).slice(8).replace(/]$/,"");

     	}
        /**
     * 通过年和月计算出当月所有的日
     *
     * @param {Number} month
     * @param {Number} year
     * @return {Array}
     */
      function	getDaysByMonthNYear(month, year) {
        var count = [31,null,31,30,31,30,31,31,30,31,30,31][month-1]||(isLeapYear.call(win,year)?29:28),
            days = [];
        for(var i=1;i<=count;i++){
        	days.push(i);
        }
        return days;
        }
         /**
     * 计算是否为闰年
     *
     * @param {Number} year
     * @return {Boolean}
     */
       function  isLeapYear(Year) {
    	return ((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0);
       }


     	window.selectors=function(params){
     		if(isType.call(win,params)!="Object"){
     			throw "该参数不是对象";
     			return;
     		}
     		new packer(params);
     	} 

     })(window,document);