(function(){

	$(document).on("click", "#profile-save", function(){

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

	$(document).on("click", "#change-pass", function(){

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
	
	$.routr.add("profile", function(){

		$("#body-container")
			.empty()
			.append($("#tpl-profile").html().trim())

		$(".bar-profile")
			.addClass("inactive")
			.parent()
			.addClass("active")
			.siblings()
			.removeClass("active")
			.children()
			.removeClass("inactive");

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
	})

	$.routr.add("change", function(){			

		$("#body-container")
			.empty()
			.append($("#tpl-change-password").html().trim())

		$(".bar-change")
			.addClass("inactive")
			.parent()
			.addClass("active")
			.siblings()
			.removeClass("active")
			.children()
			.removeClass("inactive");
	})

	$.routr.add("search", function(){

		$("#body-container")
			.empty()
			.append($("#tpl-search").html().trim())

		$(".bar-search")
			.addClass("inactive")
			.parent()
			.addClass("active")
			.siblings()
			.removeClass("active")
			.children()
			.removeClass("inactive");
	})
})();