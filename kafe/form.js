//-------------------------------------------
// kafe.form
//-------------------------------------------
kafe.bonify({name:'form', version:'1.1', obj:(function($,K,undefined){

	//-------------------------------------------
	// PUBLIC
	//-------------------------------------------
	var form = {};


	// focus ()
	// add focus styles on input/textarea/select
	//-------------------------------------------
	form.focus = function() {
		$('input[type="text"], textarea, select')
			.bind('focus', function() {
				$(this).prev('label').andSelf().addClass('Focus');
			})
			.bind('blur', function() {
				$(this).prev('label').andSelf().removeClass('Focus');
			}
		);
	};

	// label ()
	// add an inline label on input/textarea with a title attribute
	//-------------------------------------------
	form.label = function() {

		function __isEmpty() {
			 return (arguments[0].replace(/^\s*|\s*$/g, '').replace(/^\t*|\t*$/g, '') == '');
		};

		$('input[title!=""], textarea[title!=""]').each(function() {

			var $this = $(this);

			$this
				.data('Label', $this.attr('title'))
				.attr('title','')
				.bind('focus', function() {
					var $this = $(this);
					if (__isEmpty($this.val()) || $this.val() == $this.data('Label')) {
						$this.removeClass('Label').val('');
					}
				})
				.bind('blur', function() {
					var $this = $(this);
					if (__isEmpty($this.val()) || $this.val() == $this.data('Label')) {
						$this.addClass('Label').val($this.data('Label'));
					}
				})
				.blur()
			;
		});
	};
	
	// onEnter (elements,callback)
	// add onEnter event
	//-------------------------------------------
	form.onEnter = function(elements,callback) {
		$(elements).keypress(function(e) {
			if (((!!e.which) ? e.which : e.keyCode) == 13) {
				callback(this);
			}
	    });
	};

	return form;

})(jQuery,kafe)});
