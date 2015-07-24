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

		$("body")
			.empty()
			.append($("#tpl-top-bar").html().trim())
			.append($("#tpl-profile").html().trim())

		$("body .bar-profile").addClass("inactive");
	})

	$.routr.add("change", function(){			

		$("body")
			.empty()
			.append($("#tpl-top-bar").html().trim())
			.append($("#tpl-change-password").html().trim())

		$("body .bar-change").addClass("inactive");
	})

	$.routr.add("search", function(){

		$("body")
			.empty()
			.append($("#tpl-top-bar").html().trim())
			.append($("#tpl-search").html().trim())

		$("body .bar-search").addClass("inactive");
	})
})();