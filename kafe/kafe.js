/*
              (
                )     (
                 ___...(-------)-....___
             .-""       )    (          ""-.
       .-'``'|-._             )         _.-|
      /  .--.|   `""---...........---""`   |
     /  /    |                             |
     |  |    |                             |
      \  \   |                             |
       `\ `\ |            kafe             |
         `\ `|                             |
         _/ /\                             /
        (__/  \                           /
     _..---""` \                         /`""---.._
  .-'           \                       /          '-.
 :               `-.__             __.-'              :
 :                  ) ""---...---"" (                 :
  '._               `"--...___...--"`              _.'
    \""--..__                              __..--""/
     '._     """----.....______.....----"""     _.'
        `""--..,,_____            _____,,..--""`
                      `"""----"""`
*/

window.kafe = (function(w,d,$,undefined){

	// _exists (name)
	// check if module imported
	function _exists(name) {
		try {
			return eval("("+name+" == undefined) ? false : true;");
		} catch(e) {
			return false;
		}
	};

	// native extensions
	var _Native = {};
	 


	//-------------------------------------------
	// CORE
	//-------------------------------------------
	var core = {};

	//-------------------------------------------
	// FN
	//-------------------------------------------
	core.fn  = (function(){
		var fn = {};
		
		// setReadOnlyProperties (object, properties)
		// force readonly properties if possible
		//-------------------------------------------
		fn.setReadOnlyProperties = function (o,p) {
			eval("var o=arguments[0], p=arguments[1];");
			for (var i in p) {
				try {
					eval("o.__defineGetter__('"+i+"', function(){ return p['"+i+"']; });");
				} catch (e) {
					try {
						eval("Object.defineProperty(o, '"+i+"', {get:function(){ return p['"+i+"']; }});");
					} catch (e) {
						o[i] = p[i];
					}
				}
			}
		};
		
		// lang (dict,[lang])
		// get a existing lang
		//-------------------------------------------
		fn.lang = function(dict,lang) {
			lang = (!!lang) ? lang : _coreEnv('lang');
			return (!!dict[lang]) ? lang : 'en';
		};
	
		return fn;
	})();

	var _coreReadOnly = core.fn.setReadOnlyProperties;

	
	// identification
	var _i = {};
	_coreReadOnly(_i = {}, {
		non:    'kafe',
		vesyon: '1.1-dev',
		griyaj: 'absolunet.com'
	});
	_coreReadOnly(core,{kafe: _i.vesyon});
	_coreReadOnly(core,{idantite:_i});
	_coreReadOnly(core,{vesyon:{}});


	// bonify (name/version/object)
	// add module to core
	//-------------------------------------------
	core.bonify = function(options) {
		
		// if not already extended
		if (!_exists(options.name)) {

			var oname = options.name; 
			var name = 'this.'+oname; 

			// if has Native methods
			if (options.obj.Native != undefined) {
				var 
					type           = oname.split('.')[0].replace(/^\w/, function($0) { return $0.toUpperCase(); }),
					isNativeObject = !!(':Array:Boolean:Date:Number:String:RegExp:'.search(new RegExp('\:'+type+'\:')) != -1),
					isNativeModule = !!(':Math:Window:Navigator:Screen:History:Location:Document:'.search(new RegExp('\:'+type+'\:')) != -1)						
				;
				
				// if object
				if (isNativeObject) {

					var sub = oname.split('.');
					
					// if subclass
					if (sub.length > 1) {
						sub.shift();
						sub = sub.join('_') + '_';
						
					// if not
					} else {
						sub = '';
						_Native[type] = function(o) { this.get = function(){return o;}; };
						w[type].prototype.K = function() { return new _Native[type](this); };
					}

					// push methods
					for (var i in options.obj.Native) {
						_Native[type].prototype[sub+i] = options.obj.Native[i];
					}

				
				
				// if module
				} else if (isNativeModule) {
					var sub = oname.split('.');
					
					// if subclass
					if (sub.length > 1) {
						sub.shift();
						sub = sub.join('_') + '_';
					} else {
						sub = '';
						w[type].K = {};
					}
					
					// push methods
					for (var i in options.obj.Native) {
						w[type].K[sub+i] = obj.Native[i];
					}
				}

				// delete local reference
				delete arguments[0].obj.Native;
			}

			// add version
			var v = {};
			v[oname] = options.version;
			_coreReadOnly(core.vesyon,v);
			
			// extend
			eval(name+' = arguments[0].obj;');
			
		// throw error
		} else {
			throw _coreError(new Error(_coreName+'.'+oname+' already exists'));
		}
	};
	
	// plug (name/version/object)
	// add a plugin
	//-------------------------------------------
	core.plug = function(options) {
		options.name = 'plugin.'+options.name;
		this.bonify(options);
	};

	// extend (name/version/object)
	// add an external plugin extension
	//-------------------------------------------
	core.extend = function(options) {
		options.name = 'ext.'+options.name;
		this.bonify(options);
	};

	// required (name_or_url)
	// check if required module is included
	//-------------------------------------------
	core.required = function(name) {
		if (name.substr(0,2) == '//') {

			var found = false;
			$('script').each(function(){
				if (new RegExp(name).test(this.src)) {
					found = true;
					return false;
				}
			});

			if (!found) {
				throw _coreError(new Error('\'' + name+'\' is required'));
			}

		} else if (!_exists(name)) {
			throw _coreError(new Error(name+' is required'));
		}
	};

	// log (text)
	// traces
	//-------------------------------------------
	core.log = function(t) {
		try {
			var node = d.getElementById('LOG');
			var hr = d.createElement('hr');
			var code = d.createElement('code');
			code.appendChild(d.createTextNode(t))
			node.appendChild(code);
			node.appendChild(hr);
		} catch (e) {
			try {
				console.log(t);
			} catch (e) {
				alert(t);
			}
		}
	};

	// error (error)
	// throw errors - kafe.error(new Error('barf'));
	//-------------------------------------------
	core.error = function(e) {
		var msg = ((e.description) ? e.description : e.message);
		e.description = e.message = '<'+_coreName+':erè> : '+ ((!!msg) ? msg : 'anonim');
		return ($.browser.msie && parseInt($.browser.version) == 8) ? new Error(e) : e;
	};





	//-------------------------------------------
	// ENV
	//-------------------------------------------
	core.env = (function(){

		// base vals
		var _data = {
			culture: '',
			lang:    '',
			page:    '',
			tmpl:    '',
			dtc:     {}
		};

		// ready
		$(function(){
			var 
				$html = $('html'),
				$body = $('body')
			;

			// parse doc
			_data.culture = $html.attr('id') || '';
			_data.lang    = $html.attr('lang').toLowerCase();
			_data.page    = $body.attr('id') || '';
			_data.tmpl    = $body.attr('class') || '';
			_data.tmpl    = _data.tmpl.toString().split(' ')[0];
			
			// parse detections
			var dtc = $html.attr('class') || '';
			dtc = dtc.split(' ');
			if (!!dtc.length) {
				for (var i in dtc) {
					if (dtc[i].substring(0,4) == 'dtc-') {
						_data.dtc[dtc[i].substring(4).replace(/-/g,'_')] = true;
					} 
				}
			}
		});

		// public method (name, [value])
		//-------------------------------------------
		var env = function(name, value) {
			var updatable = ':mobile-orientation:';

			// get
			if (value == undefined) {
				return _data[name];

			// already set 
			} else if (_data[name] != undefined && updatable.search(new RegExp('\:'+name+'\:')) == -1) {
				throw _coreError(new Error(_coreName+'.env > property \''+name+'\' already defined'));

			// set
			} else {
				_data[name] = value;
			}
		};

		return env;
	})();

	// namespace for plugins and extensions
	core.plugin = {};
	core.ext    = {};

	// local vars
	var 
		_coreName  = _i.non,
		_coreEnv   = core.error,
		_coreError = core.env
	;

	return core;

})(window,document,jQuery);





//-------------------------------------------
// patch ie8 and less for HTML5 
//-------------------------------------------
(function($){
	var _patchHTML5 = ($.browser.msie && parseInt($.browser.version) < 9);

	if (_patchHTML5) {
		var html5 = "address|article|aside|audio|canvas|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|mark|meter|menu|nav|progress|ruby|section|time|video".split('|');
		for (var i=0; i<html5.length; ++i){
			document.createElement(html5[i]);
		}
	}

	$.fn.appendHTML5 = function(str) {
		if (_patchHTML5) {
			var d, r;
			function innerShiv (h, u) {
				if (!d) {
					d = document.createElement('div');
					r = document.createDocumentFragment();
					/*@cc_on d.style.display = 'none';@*/
				}

				var e = d.cloneNode(true);
				/*@cc_on document.body.appendChild(e);@*/
				e.innerHTML = h.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				/*@cc_on document.body.removeChild(e);@*/

				if (u === false) return e.childNodes;

				var f = r.cloneNode(true), i = e.childNodes.length;
				while (i--) f.appendChild(e.firstChild);

				return f;
			}
			str = innerShiv(str);
	    }
		$(this[0]).append(str);
	    return this;
	}
})(jQuery);	
