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
		},
		jsonize:function(){

			var json = {}
			var el = $(this).get(0);
			if(el instanceof HTMLFormElement)
				$(this).serializeArray().map(function(item){

					json[item.name]=item.value;
				});

			return json;
		}
	});

	$("#btn-login").click(function(){

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
				url: "/login",
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

			    $(".alert")
			    	.css("background-color","light-green")
			    	.html("Success!");

			    if(msg.login=="successful"){

			    	setTimeout(function(){

				    	location.href = "/search";
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

	$("#surname, #othernames, #phone,"+
		"#email, #password, #confirm, #current, #dob").focus(function(){

		$(this)
			.css({

				"border":"1px inset #000",
				"background":""
			});

		$(".alert").hide("1000");
	})

	var formValidate = function(error){

		$.each(["#othernames",	
					"#surname", 
					"#phone", 
					"#email",
					"#password",
					"#confirm",
					"#dob",
					"#current"], function(i,e){

			if($(e).get(0) !== undefined)
				if($(e).isEmpty()){

					$(e).css("border","1px inset red");

					error++;
				}
				else if(!$(e).isValid()){

					$(".alert")
						.html($(e)
								.css("background","pink")
								.data("invalid"))
						.show();

					error++;
				}
		});

		return error;
	}

	var passwordValidate = function(error){

		if(!$("#password").isEmpty() && !$("#confirm").isEmpty())
			if(!$("#password").equals($("#confirm").val())){

				$(".alert")
					.html($(".alert").html().trim().concat(" Passwords do not match!"))
					.show()

				$("#password, #confirm")
					.css("background","pink")
					.clear();

				error++;
			}

		return error;
	}

	$("#register-save").click(function(){

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

			    	location.href = "/";
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

	$("#profile-save").click(function(){

		$(".alert").html("");

		var error = 0;
		error = formValidate(error);

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/profile/update",
				data: $("form#profile").jsonize(),
				beforeSend:function(){

					$(".alert")
						.hide()
						.html("");

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

				if(msg.update == "successful")
				    $(".alert")
				    	.show()
				    	.css("background-color","lightgreen")
				    	.html("Success!");
				else 
					if(msg.update == "failed")
						$(".alert")
				    		.show()
				    		.css("background-color","pink")
				    		.html("Failed!");
			})
			.error(function(){

				$(".alert")
					.show()
			    	.css("background-color","pink")
			    	.html("Failed!");
			})
			.always(function(){

				$("form input, form textarea, form select")
					.removeAttr("disabled");
			});
	});

	$("#change-pass").click(function(){

		var error = 0;
		error = formValidate(error);
		error = passwordValidate(error);

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/change/password",
				data:$("form#change").jsonize(),
				beforeSend:function(){

					$(".alert")
						.show()
						.html("changing password...")
						.css("background-color","orange");

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function(msg){

				if(msg.modify == "successful"){

					$(".alert")
						.show()
			    		.css("background-color","lightgreen")
			    		.html("Update Successful.");
				}
				else
					if(msg.modify == "failed"){

						$(".alert")
							.show()
					    	.css("background-color","pink")
					    	.html("Update Failed!");
				}
			})
			.error(function(){

				$(".alert")
					.show()
			    	.css("background-color","pink")
			    	.html("Update Failed!");
			})
			.always(function(){

				$("form input[type=password]").clear();
				$("form input, form textarea, form select")
						.removeAttr("disabled");
			})
	})

	if($("#profile").get(0) !== undefined)
		$.ajax({

			method: "POST",
			url: "/profile/view",
			beforeSend:function(){

				$(".alert")
					.show()
					.html("loading...")
					.css("background-color","orange");

				$("form input, form textarea, form select")
					.attr("disabled","true")
			}
		})
		.done(function(msg){

			if(msg.view == "successful"){

				$(".alert")
					.show()
		    		.css("background-color","lightgreen")
		    		.html("Load Successful.");

				var user = msg.user;
				var names = user.name.split(",");

				$("#surname").val(names[0]);
				$("#othernames").val(names[1]);
				$("#address").val(user.address);
				$("#gender").val(user.gender);
				$("#dob").val(user.dob);
				$("#company").val(user.company);
				$("#phone").val(user.phone);
				$("#email").val(user.email);
				$("#about").val(user.about);

				$("form input, form textarea, form select")
					.removeAttr("disabled")

				setTimeout(function(){

					$(".alert").hide();

				}, 1000);
			}
			else
				if(msg.view == "failed"){

				$(".alert")
					.show()
			    	.css("background-color","pink")
			    	.html("Load Failed!");
			}
		})
		.error(function(){

			$(".alert")
				.show()
		    	.css("background-color","pink")
		    	.html("Load Failed!");
		})
})();