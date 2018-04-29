$(document).ready(function() {

	/* variables */

	var random_pairs,
		data_object,
		counter,
		pairs_length,
		demands = [
			["md", "Mental demand"],
			["pd", "Physical demand"],
			["td", "Temporal demand"],
			["pe", "Performance"],
			["ef", "Effort"],
			["fr", "Frustration"]
		],
		tableoutput = "",
		no_score = "–",
		weighted_tlx = true,
		total_rounds = 2,
		current_round = 1,
		DEBUG = true,
		settings = {},
		enforce_user_input = true;

	/* functions */

	/* randomly shuffle an array */

	function shuffle(array) {
		var top = array.length,
			tmp, current;

		if(top) {
			while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
		}

		return array;
	}

	/* create an array of pairs. formula: n! / ( (n - k)! * k! ) */

	function pair_combinator(array) {

		var length = array.length,
			result = [],
			counter = 0,
			i, j;

		for (i = 0; i < length; i++) {
			for (j = i; j < length - 1; j++) {
				result[counter] = shuffle([ [ array[i][0], array[i][1] ], [ array[j + 1][0], array[j + 1][1] ] ]);
				counter++;
			}
		}

		return shuffle(result);

	}

	/* creates an array with a given length and fills it up with a given value */

	function new_filled_array(length, value) {
		var array = new Array(length);
		while (--length >= 0) {
			array[length] = value;
		}
		return array;
	}

	function update_info() {
		// console.log("updating info");
		$(".info").remove();
		$("<ul class='info'><li><strong>Participant:</strong> " + settings['participant_id'] + "</li><li><strong>Group:</strong> " + settings['experiment_group'] + "</li><li><strong>Round:</strong> " + current_round + "</li></ul>").insertAfter("h2");
	}

	function reset_scales() {

		$(".tlx").slider({
			max: 100,
			min: 0,
			step: 5,
			value: 0
		});

		$(".likert").slider({
			max: 7,
			min: 1,
			step: 1,
			value: 1
		});
	}

	/* hide future steps */

	$(".step_1, .step_2, .step_3, .step_4, .step_5, .step_6, .alert").hide();

	/* initialize sliders */
	reset_scales();

	/* step 0 */

	$(".step_0 button").click(function() {

		settings['age'] = $('#age').val();
		settings['gender'] = $("input[name='gender']:checked").val();
		settings['profession'] = $('#profession').val();

		if (enforce_user_input && (settings['age'] == "" || settings['gender'] == null || settings['profession'] == "")) {
		     // do something 
		     $(".alert").html('ERROR: some data has not been provided!');
		     $(".alert").show();

		} else {

		$(".step_0").hide();
		$(".alert").hide();
		$(".step_1").show();

		}

		if(DEBUG) {
			console.log(settings);
		}
	});

	/* step 1: Experiment SETTINGS */

	$(".step_1 input[type='submit']").live("click", function() {
		$(".alert").hide();

		// remove error paragraphs at first (if proband error is shown and error occurs on task, the proband error disappears)
		$(".step_1 .cf p").remove();

		// value of input[type="text"]
		var value = $.trim($(this).prev().val().replace(/ +(?= )/g,'')),
			// formatted value for "id" and "for" attributes
			formatted_value = value.toLowerCase().split(' ').join('_'),
			// "subject" for error message ("proband" or "task")
			subject = $(this).siblings("input[type='text']").attr("id").split('create_').join(''),
			proband_exists = false,
			error_message = "";

		// check if proband already exists
		$(this).parent().parent().find(".list label").each(function() {
			if( $(this).html().toLowerCase() === value.toLowerCase() ) {
				proband_exists = true;
			}
			return;
		});

		if ( error_message ) {
			$(this).parent().append("<p class='error'>" + error_message + "</p>");
		}
		return false;
	});

	$(".step_1 .go_back a").click(function() {
		$(".step_1 .cf p").remove();
		$(".step_1").hide();
		$(".step_0").show();
		return false;
	});

	$(".step_1 button").live("click", function() {

		settings['participant_id'] = $('#participant_id').val();
		// settings['starting_task'] = $("input[name='starting_task']:checked").val();
		settings['experiment_group'] = $("input[name='experiment_group']:checked").val();

		if (enforce_user_input && (settings['participant_id'] == "" || settings['experiment_group'] == null)) {
		     // do something 
		     $(".alert").html('ERROR: some variables have not been set!');
		     $(".alert").show();

		} else {

			// prepare steps for step 2

			data_object = {
				"button_clicks": {}, 	// tlx weights
				"tlx_value": {},		// tlx raw
				"likert_value": {}		// subjective feedback
			};

			// reset input values and thrown error paragraphs caused by input submits
			$(".step_1 input[type='text']").val("");
			$(".step_1 .cf p").remove();

			// check if proband already completed a task
			var proband_exists = false,
				task_exists = false;

			$(".step_1").hide();
			$(".step_2").show();
			update_info();

		}

		if(DEBUG) {
	     	console.log(settings);
	     }

	});

	/* step 2: NASA TLX */

	$(".step_2 button").live("click", function() {
		$(".alert").hide();

		// save tlx values
		
		data_object["tlx_value"][current_round] = [];

		$(".tlx").each(function(i) {
			data_object["tlx_value"][current_round][i] = $(this).slider("option", "value");
		});

		if(DEBUG) {
			console.log(data_object);
		}

		// prepare stuff for step 3

		counter = 0;
		random_pairs = pair_combinator(demands);
		pairs_length = random_pairs.length;

		$(".step_2").hide();

		if(weighted_tlx) {

			$(".step_3").show();

			// start button for pairs
			if ( $(".step_3").find("div").length ) {
				$(".step_3 div").html("<button>Start</button>");
			} else {
				$(".step_3").append("<div><button>Start</button></div>");
			}

			// remove/reset "to go" counter
			$(".step_3 .to_go").remove();

		} else {
			
			$(".step_4").show();

		}

	});

	/* step 3: TLX Weights */

	$(".step_3 button").live("click", function() {
		$(".alert").hide();

		// if a pair button is clicked (start button hasn't got class attribute)
		if( $(this).attr("class") ) {
			pairs_length--;
			counter++;

			// initalize weight object if non-existent

			if (data_object["button_clicks"][current_round] == null) {
				
				data_object["button_clicks"][current_round] = {}; //new_filled_array(demands.length, 0);

				for ( var i = 0; i < demands.length; i++ ) {
					data_object["button_clicks"][current_round][demands[i][0]] = 0;
				}

			}

			for ( var i = 0; i < demands.length; i++ ) {

				if ( $(this).attr("class") === demands[i][0] ) {
					data_object["button_clicks"][current_round][demands[i][0]] += 1;
					break;
				}
			}
		}

		// continue as long as there are reaming pairs to be clicked
		if ( pairs_length ) {
			// show the next pair
			$(this)
				.parent()
				.html("<button class='" + random_pairs[counter][0][0] + "'>" + random_pairs[counter][0][1] + "</button> or " + "<button class='" + random_pairs[counter][1][0] + "'>" + random_pairs[counter][1][1] + "</button>");
			// "to go" counter
			if ( !$(".step_3").find(".to_go").length ) {
				$(".step_3").append("<p class='highlight to_go'></p>");
			}
			$(".step_3 .to_go").html("<strong>" + pairs_length + "</strong> to go!");
		} else {
			

			$(".step_3").hide();
			$(".step_4").show();

		}

	}); // step 3 button

	/* step 4: subjective feedback */

	$(".step_4 button").live("click", function() {
		$(".alert").hide();

		// save likert values

		data_object["likert_value"][current_round] = [];

		$(".likert").each(function(i) {
			data_object["likert_value"][current_round][i] = $(this).slider("option", "value");
		});

		if(DEBUG) {
			console.log(data_object);
		}

		$(".step_4").hide();

		current_round++;
		if(current_round <= total_rounds) {
			$(".step_5").show();
		} else {
			$(".step_6").show();

			data = {
				'settings': settings,
				'data': data_object
			}

			if(DEBUG) {
				$(".alert").html('<h4>Settings:</h4><p>' + JSON.stringify(settings) + '</p><h4>Data</h4>' + JSON.stringify(data_object) + '</p>');
		     	$(".alert").show();
		     	console.log(data);
			}

			//TODO: send data to server

		}
	});

	/* step 5: NEXT QUESTIONNAIRE */

	$(".step_5 button").live("click", function() {
		$(".alert").hide();
		$(".step_5").hide();
		$(".step_2").show();
		update_info();
		reset_scales();

	}); // step 4 button

});