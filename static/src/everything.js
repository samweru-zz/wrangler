(function(){

	jQuery.fn.extend({

	  	isEmpty: function() {

	  		var el = $(this).get(0);
	  		if(el instanceof HTMLInputElement)
				return !$(this).val().trim();
			return;
		},
		isValid: function(){

			//HTML5 validation
			var el = $(this).get(0);
	  		if(el instanceof HTMLInputElement)
				return el.checkValidity();
			return;
		},
		equals: function(val){

			var el = $(this).get(0);
			if(el instanceof HTMLInputElement)
				return $(this).val() === val;
		},
		clear: function(el){

			var el = $(this).get(0);
			if(el instanceof HTMLInputElement)
				$(this).val("");
		}
	});

	$("#login").click(function(){

		if($("#email").isEmpty())
			$("#email")
				.css({

					"border":"1px inset red",
					"border-spacing":"2px"
				})
				.focus(function(){

					$(this)
						.css("border","")
				});

		if($("#password").isEmpty())
			$("#password")
				.css({

					"border":"1px inset red",
					"border-spacing":"2px"
				})
				.focus(function(){

					$(this)
						.css("border","")
				});
	})

	$("#surname, #othernames, #phone,"+
		"#email, #password, #confirm").focus(function(){

		$(this)
			.css({

				"border":"",
				"background":""
			});

		$(".alert").hide("1000");
	})

	$("#register-save").click(function(){

		$(".alert").html("")

		$.each(["#othernames",	
					"#surname", 
					"#phone", 
					"#email",
					"#password",
					"#confirm"], function(i,e){

			if($(e).isEmpty())
				$(e).css("border","1px inset red");
			else if(!$(e).isValid())
				$(".alert")
					.html($(e)
							.css("background","pink")
							.data("invalid"))
					.show();
		});

		if(!$("#password").isEmpty() && !$("#confirm").isEmpty())
			if(!$("#password").equals($("#confirm").val())){

				$(".alert")
					.html($(".alert").html().trim().concat(" Passwords do not match!"))
					.show()

				$("#password, #confirm")
					.css("background","pink")
					.clear();
			}
	})
})();