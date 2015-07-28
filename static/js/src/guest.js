(function(){

	$(document).on("click", "#btn-login", function(){

		$("#alert")
			.removeClass()
			.empty();

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

					$("#alert")
						.addClass("alert alert-info")
			    		.html("wait...");

					$("form input")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

			    if(msg.login=="successful"){

			    	$("#alert")
			    		.removeClass()
			    		.addClass("alert alert-success")
			    		.html("Success!");

			    	setTimeout(function(){

				    	location.reload();
				    }, 1000);
			    }
			    else if(msg.login=="failed"){

			    	$("form input")
						.removeAttr("disabled");

			    	$("#alert")
			    		.removeClass()
			    		.addClass("alert alert-danger")
			    		.html("Login has failed!")
			    }
			})
			.error(function(){

				$("#alert")
					.removeClass()
			    	.addClass("alert alert-danger")
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

		$("#alert")
			.removeClass()
			.empty();

		var error = 0;
		error = formValidate(error);
		error = passwordValidate(error);

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/register/new",
				data: $("form#register").jsonize(),
				beforeSend:function(){

					$("#alert")
						.empty()
						.removeClass();

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

			    $("#alert")
			    	.removeClass()
			    	.addClass("alert alert-success")
			    	.html("Success!");

			    setTimeout(function(){

			    	location.hash = "#login";
			    }, 1000);
			})
			.error(function(){

				$("#alert")
			    	.addClass("alert alert-danger")
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

		$("#alert")
			.empty()
			.removeClass();

		$("#body-container")
			.empty()
			.attr("align","center")
			.html($("#tpl-login").html());
	})

	$.routr.add("register", function(){

		$("#alert")
			.empty()
			.removeClass();

		$("#body-container")
			.empty()
			.append($.parseHTML($("#tpl-register").html().trim()));
	})
	
})();