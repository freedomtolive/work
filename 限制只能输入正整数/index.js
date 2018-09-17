;(function( window ) {
    var G = {
    		
        // 验证码刷新操作
		refreshCaptcha : function (img,captchaUrl){	
			var date = new Date();
			img.src = captchaUrl+"?t=" +date;
			img.style.display = "";
		},
        
        // toast 提示， msg是内容，type是类型，1代表哭脸, 2代表笑脸;
        toast: function(msg, type, fun) {
            $('.toast_wrap').remove();
            $('.toast_wrap_no_icon').remove();
            if (type) {
            	var toastClass = type == 1 ? 'success': 'error';
                var html = '<div class="toast_wrap ' + toastClass + '"><p>'+msg+'</p></div>';
            } else {
            	var toastclass = 'no_icon';
                var html = '<div class="toast_wrap_no_icon"><div class="toast_wrap ' + toastclass + '"><p>'+msg+'</p></div></div>';
            }
            $(html).appendTo('body');
            $('.toast_wrap').delay(4000).fadeOut(1000, function() {
            	if (fun) {
            		fun();
            	}
            });
        },
        
        // 处理中提示
        toast_loading: function() {
	       	 $('.toast_wrap').remove();
	       	 $('.toast_loading_wrap').remove();
	       	 var html = '<div class="toast_loading_wrap"><div class="toast_wrap_loading_content"><div class="toast_wrap toast_wrap_no_icon"><p>处理中</p><ul class="loading"><li></li><li></li><li></li><li></li></ul></div></div></div>';
	       	 $(html).appendTo('body');
	    },
        
        // 处理中隐藏
        toast_loading_close: function() {
	       	 $('.toast_loading_wrap').remove();
	    },
	    
	    // 对话框：有确认和取消按钮
        dialog: function(title, msg, btn, fun1, cancelUrl) {
        	if (!cancelUrl) {
        		cancelUrl = 'javascript:void(0)';
        	}
            var html = '<div class="dialog_wrap">' +
                        '<div class="dialog_main">' +
                        '<div class="dialog_content">' +
                        '<h4>'+title+'</h4>'+
                        '<p>'+msg+'</p>'+
                        '</div>'+
                        '<div class="dialog_btn_wrap btn_2">' +
                        '<a href="'+cancelUrl+'" class="btn btn_close">取消</a>'+
                        '<a href="#" class="btn btn_go">'+btn+'</a>'+
                        '</div>'+
                        '</div>' +
                		'</div>';

            $(html).appendTo('body');
            $('.btn_close').on('click', function() {
                $(this).parents('.dialog_wrap').remove();
            });
            $('.btn_go').on('click', fun1);
        },
        
        // 判断是否数字
		numberOnly: function( e ) {
		    if(window.event) { // Internet Explorer
		        var keyCode = window.event.keyCode;
		        if($(e.target).val().toString() === "0"){
		        	return false;
		        }
		        // if($(this).val() === 0) return;
		        return (keyCode >= 48 && keyCode <= 57);
		    }
		    else { // Mozilla
		        var keyCode = e.which;

		        return (keyCode >= 48 && keyCode <= 57)
		            || keyCode == 0 || keyCode == 8; // allow backspace and delete
		    }
		},
		
		// 转换密码或字体
		togglePassword: function ( icon_dom, element_name ) {
	        var $this = $(icon_dom);
	        if ($this.hasClass('icon_ceye')) {
	            $this.removeClass('icon_ceye');
	            $this.addClass('icon_eye');
	            $(element_name).attr('type','text');
	        } else {
	            $this.removeClass('icon_eye');
	            $this.addClass('icon_ceye');
	            $(element_name).attr('type','password');
	        }
		},
		
		/**
		 * Data validation
		 */
		valid: {
			isPassword: function(target, min, max) {
				min  = min || 8;
				max  = max || 16;
				//var re = RegExp('^(?=.*\\d.*)(?=.*[a-zA-Z].*).{'+min+','+max+'}$');
				//var re = /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,16}$/;//验证密码的正则
				var re = /^(?=.*[a-zA-Z0-9].*).{8,10}$/;
				return re.test( target );
			},
			isEmpty: function(target) {
				target = target ? target.trim(): null;
				return target == null || target.length == 0;
			},
			isPhone: function (target, length) {
				length = length - 2 || 9;
				var re = RegExp('^1[3456789]\\d{'+ length +'}$');
				return typeof target != 'undefined' && re.test( target );
			},
			isRange: function (target, min, max) {
				/**范围验证**/
				return target.length >= min && target.length <= max;
			},
			isEmail: function (target) {
				var re = /^[a-z0-9]+([._-]*[a-z0-9])*@([a-z0-9]+(-*[a-z0-9])*.){1,63}[a-z]{2,}$/i;// 邮箱正则表达式 
				var reDot = /(\.)\1/i;// 连续点判断
				return re.test( target ) && !reDot.test(target);
			},
			isNumber: function (target, min, max) {
				min  = min || 10;
				max  = max || 10;
				var re = RegExp('\\d{'+min+','+max+'}');
				return re.test( target );
			},
			isNumberAndFloat: function (target, decimals) {
				decimals = decimals || 2;
				var re = RegExp('^-?\\d*(\\.\\d{' + decimals + '})?$');
				return re.test( target ) ;
			},
			isNumberAndChar: function (target){
				var re = /([a-zA-Z]\d)|(\d[a-zA-Z])/;
				return re.test( target );
			},
			isNumberOrChar: function (target, min, max){
				min  = min || 1;
				max  = max || 10;
				var re = RegExp('^([a-z0-9]){'+min+','+max+'}$');
				return !G.valid.isEmpty( target ) && re.test( target );
			},
			isChinese: function (target){
				/**中文汉字字符（包含中文标点符号）**/
				var re = /^[\u0391-\uFFE5]+$/;
				return re.test( target );
			},
			isRealName: function (target){
				var re = /^[\u0391-\uFFE5]{2,7}([\.·。][\u0391-\uFFE5]{2,7}){0,3}$/;
				return re.test( target );
			},
			isVerifyCode: function (target){
				/** 1-16 数字，字母，汉字**/
				var re = /^[A-Za-z0-9a-z\u4e00-\u9eff]{1,16}$/i;
				return re.test( target );
			},
			isCaptcha: function( target ) {
				//ajax方法验证 验证码是否正确
				$.ajax({
					async   : false,
					type    : 'POST',
					url     : 'registerCheckCaptcha.htm',
					data    : {captcha : target},
					success : function(data) {
								window['is_valid_captcha'] = data.checkCaptcha == 1;
							},
					error : function(data) {
								window['is_valid_captcha'] = false;
							}
				});
				
				return is_valid_captcha;
			},
			checkLoginname: function( target ) {
				//ajax方法验证 用户名是否正确
				$.ajax({
					async   : false,
					type    : 'POST',
					url     : 'checkLoginName.htm',
					data    : {loginname : target},
					success : function(data) {
								window['data_object'] = data; // object
							},
					error : function(data) {
								window['data_object'] = { exist: false, isChecking: false };
							}
				});
				
				return data_object;
			},
			checkPhone: function( target ) {
				//ajax方法验证 手机号是否正确
				$.ajax({
					async   : false,
					type    : 'POST',
					url     : 'checkPhone.htm',
					data    : {phone : target},
					success : function(data) {
								window['data_object'] = data; // object
							},
					error : function(data) {
								window['data_object'] = { exist: false, isChecking: false };
							}
				});
				
				return data_object;
			},
			revalidate: function(element_name){
				// Prevent multiple validation in short time (防止多个验证在短时间内)
				// 加<span id="loginname-stored"></span>
				var stored_value   = $(element_name + '-stored').data('stored');
				var current_value  = $(element_name).val();
				var re_check_value = ! (stored_value == current_value);

				if(re_check_value){
					$(element_name + '-stored').data( 'stored', $(element_name).val() );
					return true;
				}
				return false;
			}
		} // Data validation END
    };
    // 绑定全局变量
    window.G = G;
})( window );

function clickTips(msg, callback, type) {
	 $('.toast_wrap').remove();
     var toastClass = 'error';
     var toastClass = 'error';
     if (type == 2) {
         toastClass = 'success'
     }

     var html = '<div class="toast_wrap ' + toastClass + '"><p>'+msg+'</p></div>';
     $(html).appendTo('body');
     $(document).click(function(){
    	 $(this).remove();
    	 callback && callback();
     });
}

function openOnlineChat() {
	//var url = location.protocol+'//www.kefu-services.com/k800/chatClient/chatbox.jsp?companyID=263&configID=74';
	var url = 'https://www.k0267.com/chat/chatClient/chatbox.jsp?companyID=8993&configID=23&'+chatCusInfo;
	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(400/2);
	
	if(Constants.IS_APP_MOBILE) {
		appGotoUrl(url, "1");
	} else {
		window.open(url,
			"DescriptiveWindowName",
			"resizable,scrollbars=yes,status=1,width=600, height=400, top="+top+", left="+left
			);
	}
}

function openWindow( url, width, height ) {
	var param = "height=" +  height + ", width=" + width +", scrollbars=no,resizable=yes,toolbar=no,directories=no,menubar=no,locationbar=no,personalbar=no,statusbar=no";		
	window.open( url, "_blank", param );
}

function elementInScroll(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isElementInViewport (el) {
	if (!el) {
		return false;
	}
	
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadImageGame() {
	//图片延迟加载
	var $lazyLoadWrap = $('.lazy-load-wrap')
	if ($lazyLoadWrap.length > 0) {
		$lazyLoadWrap.each(function(index, ele) {
			$lazyLoadWrapItem = $(ele);
			var $image = $lazyLoadWrapItem.find('img');
			$image.attr('src', $image.attr('data-src'));
			$image.on('load', function(event) {
				var $imgWrap = $(this).parents('.image-wrap');
				$imgWrap.find('.swiper-lazy-preloader').remove();
				$imgWrap.removeClass('lazy-load-wrap');
			});
		});
	}
}

// Global ready
$(function(){
    $('select').change(function() {
    	var val = $(this).val();
    	if (val == '') {
    		$(this).removeClass('selected');
   		} else {
   			$(this).addClass('selected');
   		}
    });
    
    $('select').each(function(){
    	if ($(this).val() != '') {
        	$(this).addClass('selected');
        }
    });
    setTimeout(function() {
    	if ($('footer').length > 0) {
    		$('#edit_table_row_bar').css('bottom', $('footer').outerHeight(true)+'px');
    	} else {
    		$('#edit_table_row_bar').css('bottom', '0px');
    	}
   		    	
    }, 300);
    

	/** show and hide header **/
	var lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
       		// scrollspy starts
			$('#scrollme').scrollspy({
				min: 0,
				onEnter: function(element, position) {
					$("#scrollme").removeClass('fixed');
				},
				max:8000000,
				onLeave: function(element, position) {
					$("#scrollme").addClass('fixed');
				}
			});
	   } 
	   else if($(window).scrollTop() == 0){
	   		$("#scrollme").removeClass('fixed');
	   }
	   else {
	      $("#scrollme").addClass('fixed');
	   }
	   lastScrollTop = st;
	});

});