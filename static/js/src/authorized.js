(function(){

	$(document).on("click", "#profile-save", function(){

		$("#alert")
			.empty()
			.removeClass();

		var error = 0;
		error = formValidate(error);

		if(error == 0)
			$.ajax({

				method: "POST",
				url: "/profile/update",
				data: $("form#profile").jsonize(),
				beforeSend:function(){

					$("#alert")
						.empty()
						.removeClass();

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function( msg ) {

				if(msg.update == "successful")
				    $("#alert")
				    	.addClass("alert alert-success")
				    	.html("Success!");
				else 
					if(msg.update == "failed")
						$("#alert")
				    		.addClass("alert alert-danger")
				    		.html("Failed!");
			})
			.error(function(){

				$("#alert")
					.addClass("alert alert-danger")
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

					$("#alert")
						.addClass("alert alert-info")
						.html("changing password...")

					$("form input, form textarea, form select")
						.attr("disabled","true")
				}
			})
			.done(function(msg){

				if(msg.modify == "successful"){

					$("#alert")
						.removeClass()
			    		.addClass("alert alert-success")
			    		.html("Update Successful.");
				}
				else
					if(msg.modify == "failed"){

						$("#alert")
							.removeClass()
					    	.addClass("alert alert-warning")
					    	.html("Update Failed!");
				}
			})
			.error(function(){

				$("#alert")
					.removeClass()
					.addClass("alert alert-danger")
			    	.html("Update Failed!");
			})
			.always(function(){

				$("form input[type=password]").clear();
				$("form input, form textarea, form select")
						.removeAttr("disabled");
			})
	})
	
	$.routr.add("profile", function(){

		$("#alert")
			.empty()
			.removeClass();

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

				$("#alert")
					.addClass("alert alert-info")
					.html("loading...")

				$("form input, form textarea, form select")
					.attr("disabled","true")
			}
		})
		.done(function(msg){

			if(msg.view == "successful"){

				$("#alert")
					.removeClass()
		    		.addClass("alert alert-success")
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

					$("#alert")
						.empty()
						.removeClass();

				}, 1000);
			}
			else
				if(msg.view == "failed"){

				$("#alert")
					.removeClass()
			    	.addClass("alert alert-warning")
			    	.html("Load Failed!");
			}
		})
		.error(function(){

			$("#alert")
				.removeClass()
				.addClass("alert alert-warning")
		    	.html("Load Failed!");
		})
	})

	$.routr.add("change", function(){

		$("#alert")
			.empty()
			.removeClass();		

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

		$("#alert")
			.empty()
			.removeClass();

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