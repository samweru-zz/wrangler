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

	$(document).on("focus", "#surname, #othernames, #phone,"+
		"#email, #password, #confirm, #current, #dob", function(){

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
	
})();