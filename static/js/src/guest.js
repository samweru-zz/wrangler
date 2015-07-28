(function(){

	$(document).on("click", "#btn-login", function(){

		var error = 0;

		if($("#email").isEmpty()){

			error++;

			$("#email")
				.css({

					"border":"1px inset red",
					"border-spacing":"2px"
				})
				.focus(function(){

					$(this)
						.css("border","1px inset #000")
				});
		}

		if($("#password").isEmpty()){

			error++;

			$("#password")
				.css({

					"border":"1px inset red",
					"border-spacing":"2px"
				})
				.focus(function(){

					$(this)
						.css("border","1px inset #000")
				});
		}

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/auth/login",
				data: $("form#login").jsonize(),
				beforeSend:function(){

					$(".alert")
						.hide()
						.html("");

					$("form input")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

			    if(msg.login=="successful"){

			    	$(".alert")
			    		.css("background-color","light-green")
			    		.html("Success!");

			    	setTimeout(function(){

				    	location.reload();
				    }, 1000);
			    }
			    else if(msg.login=="failed"){

			    	$("form input")
						.removeAttr("disabled");

			    	$(".alert")
			    		.show()
			    		.html("Login has failed!")
			    }
			})
			.error(function(){

				$(".alert")
			    	.css("background-color","pink")
			    	.html("Failed!");

			    $("form input")
			    	.removeAttr("disabled")
			})
			.always(function(){

				$("form input[type=text], form input[type=password]")
						.removeAttr("disabled");
			});
	})

	$(document).on("click", "#register-save", function(){

		$(".alert").html("");

		var error = 0;
		error = formValidate(error);
		error = passwordValidate(error);

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/register/new",
				data: $("form#register").jsonize(),
				beforeSend:function(){

					$(".alert")
						.hide()
						.html("");

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

			    $(".alert")
			    	.show()
			    	.css("background-color","lightgreen")
			    	.html("Success!");

			    setTimeout(function(){

			    	location.hash = "#login";
			    }, 1000);
			})
			.error(function(){

				$(".alert")
					.show()
			    	.css("background-color","pink")
			    	.html("Failed!");

			    $("form input[type=button]")
			    	.removeAttr("disabled")
			})
			.always(function(){

				$("form input[type=text], form input[type=date],"+ 
					"form input[type=date], form input[type=text],"+
					"form input[type=password], form textarea, form select")
						.removeAttr("disabled");
			});
	})

	$.routr.add("login", function(){

		$("body")
			.empty()
			.attr("align","center")
			.html($("#tpl-login").html());
	})

	$.routr.add("register", function(){

		$("body")
			.empty()
			.append($.parseHTML($("#tpl-register").html().trim()));
	})
	
})();