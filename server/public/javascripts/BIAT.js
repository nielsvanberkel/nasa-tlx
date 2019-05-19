// Sequence (odd groupnumbers):
// 1. Short Block1 (hypothesis-consistent) 
// 2. Short Block2 (hypothesis-inconsistent)
// 3. Long Block (hypothesis consistent)
// 4. Long Block (hypothesis inconsistent)
// 3. Long Block (hypothesis consistent)* (the last two blocks are skipped if parameters.extended = false)
// 4. Long Block (hypothesis inconsistent)

// In all Test Blocks:
// * attributes and targets alternate
// * attributes as well as targets are randomly selected without replacement
// * short blocks run 14 trials; experimental blocks run 20 trials by default
// * the first 4 trials = prefatory trials that are not included into subsequent analyses

// NOTE: if a participant goes through a sequence of BIATs the short blocks 
// short_a & short_b only need to be run for the very first BIAT in the sequence.
// Short Blocks are simply shorter versions (only 4 prefatory trial + 8 trials) of the longer Experimental Blocks. 
// They are intended as practice blocks as participants tend to be slower 
// during the first two blocks of a BIAT. They are not included into further data analyses.

// ************************************
// Short Blocks
// ************************************

// Note:
// Short Blocks are simply shorter versions (only 4 prefatory trial + 8 trials) of the longer Experimental Blocks. 
// They are intended as practice blocks as participants tend to be slower 
// during the first two blocks of an BIAT. They are not included into further data analyses.

// <block short_a>
// / onblockbegin = [values.currentTarget = item.targetALabel.1; text.topFocusInstruct.1 = item.targetAFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetARight, targetBLeft);
//   8,10,12,14 = noreplace(targetARight, targetBLeft);
//   7,9,11,13 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// <block short_b>
// / onblockbegin = [values.currentTarget = item.targetBLabel.1; text.topFocusInstruct.1 = item.targetBFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetBRight, targetALeft);
//   8,10,12,14 = noreplace(targetBRight, targetALeft);
//   7,9,11,13 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// ************************************
// Experimental Blocks
// ************************************
// Note:
// * experimental blocks run 20 trials by default
// * the first 4 trials = prefatory trials that are not included into subsequent analyses

// <block A>
// / skip = [parameters.extended == false && block.A.totalcount >=1]
// / onblockbegin = [values.currentTarget = item.targetALabel.1; text.topFocusInstruct.1 = item.targetAFocusInstruct.1]
// / trials = [1=testInstructions; 2=showLabels;
//   3-6 = noreplace(targetARight, targetBLeft);
//   8,10,12,14,16,18,20,22 = noreplace(targetARight, targetBLeft);
//   7,9,11,13,15,17,19,21 = noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>

// <block B>
// / skip = [parameters.extended == false && block.B.totalcount >=1]
// / onblockbegin = [values.currentTarget = item.targetBLabel.1; text.topFocusInstruct.1 = item.targetBFocusInstruct.1]
// / trials = [1=testInstructions;2=showLabels;
//   3-6 = noreplace(targetBRight, targetALeft);
//   8,10,12,14,16,18,20,22= noreplace(targetBRight, targetALeft);
//   7,9,11,13,15,17,19,21= noreplace(attributeA, attributeB)]
// / errormessage = true(error,200)
// / responsemode = correct
// </block>


// Block A:
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1sum =  values.A1sum + block.A.latency]
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1n += 1]
// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1ss =  values.A1ss  + (block.A.latency * block.A.latency)]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2sum =  values.A2sum + block.A.latency]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2n += 1]
// / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2ss =  values.A2ss  + (block.A.latency * block.A.latency)]
// / ontrialend = [if (block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.n_correct += block.a.correct]

// Block B:
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1sum =  values.B1sum + block.B.latency]
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1n +=  1]
// / ontrialend = [if (block.B.totalcount == 0 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B1ss =  values.B1ss  + (block.B.latency * block.B.latency)]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2sum =  values.B2sum + block.B.latency]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2n +=  1]
// / ontrialend = [if (block.B.totalcount == 1 && block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.B2ss =  values.B2ss  + (block.B.latency * block.B.latency)]
// / ontrialend = [if (block.B.latency  <= 10000 && block.B.currenttrialnumber >= 7 ) values.n_correct += block.B.correct]

var biatActive = false;

var startTime, endTime;
var completed = 0; // 0 = script was not completed; 1 = script was completed (all conditions run)
var A1sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the first compatible block A1 (excludes prefatory ones)
var A2sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the second compatible block A2 (excludes prefatory ones)
var B1sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the first incompatible block B1 (excludes prefatory ones)
var B2sum = 0; // tracks the sum of the latencies to correct responses (latencies <= 10000ms) for the second incompatible block B2 (excludes prefatory ones)
// Note: by design, all final trial responses are correct (regardless of accuracy of initial response)

var A1n = 0; //	counts the number of trials in first compatible block A1 (excludes prefatory ones)
var A2n = 0; //	counts the number of trials in second compatible block A2 (excludes prefatory ones)
var B1n = 0; //	counts the number of trials in first incompatible block B1 (excludes prefatory ones)
var B2n = 0; //	counts the number of trials in second incompatible block B2 (excludes prefatory ones)

var A1ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the first compatible block A1 (excluding prefatory trials)
var A2ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the second compatible block A1 (excluding prefatory trials)
var B1ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the first incompatible block B1 (excluding prefatory trials)
var B2ss = 0; // tracks the sum of the squared latencies to correct responses (latencies <= 10000ms) in the second incompatible block B2 (excluding prefatory trials)

var magnitude = "";     // stores the magnitude of the implicit preference: "little to no", "a slight", "a moderate", "a strong"
var preferred = "";     // stores the preferred target category
var notpreferred = "";  // stores the non preferred target category
var currentTarget = ""; // stores the current target stimulus
var n_correct = 0;     // counts all initial correct responses of all trials that count towards D score

var A1m = 0;                    // mean latencies of correct responses in first compatible block A1
var A2m = 0;                    // mean latencies of correct responses in second compatible block A2
var B1m = 0;                    // mean latencies of correct responses in first incompatible block B1
var B2m = 0;                    // mean latencies of correct responses in second incompatible block B2
var A1sd = 0;                   // standard deviation of latencies of correct responses in first compatible block A1
var A2sd = 0;                   // standard deviation of latencies of correct responses in second compatible block A2
var B1sd = 0;                   // standard deviation of latencies of correct responses in first incompatible block B1
var B2sd = 0;                   // standard deviation of latencies of correct responses in second incompatible block B2
var sd1 = 0;                    // standarddeviation of latencies in first blocks
var sd2 = 0;                    // standarddeviation of latencies in second blocks
var d1 = 0;                     // D-score for first blocks	
var d2 = 0;                     // D-score for second blocks	
var d = 0;                      // overall D-score
var currentblocknumber = 0;     // stores the current block number
var totalblockcount = 0;        // counts the total blocks run
var percentcorrect = 0;         // the overall percent correct score of initial responses of test trials of D-score qualifying latencies

var settings = {};

// / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.
//     =  values.A1sum + block.A.latency]
//    / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1n += 1]
//    / ontrialend = [if (block.A.totalcount == 0 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A1ss =  values.A1ss  + (block.A.latency * block.A.latency)]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2sum =  values.A2sum + block.A.latency]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2n += 1]
//    / ontrialend = [if (block.A.totalcount == 1 && block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.A2ss =  values.A2ss  + (block.A.latency * block.A.latency)]
//    / ontrialend = [if (block.A.latency  <= 10000 && block.A.currenttrialnumber >= 7 ) values.n_correct += block.a.correct]


// TODO: change order based on group number!
// Note: 
// * counterbalanced by groupnumber
// * if a participant goes through a sequence of BIATs the short blocks 
// short_a & short_b only need to be run for the very first BIAT in the sequence

// <expt>
// / subjects = (1 of 2)
// / groupassignment = groupnumber
// / blocks = [1 = intro; 2= short_a; 3 = short_b; 4=A; 5=B; 6=A; 7=B; 8=summary]
// /onexptend = [values.completed = 1]
// </expt>

// <expt>
// / subjects = (2 of 2)
// / groupassignment = groupnumber
// / blocks = [1 = intro; 2= short_b; 3 = short_a; 4=B; 5=A; 6=B; 7=A; 8=summary]
// /onexptend = [values.completed = 1]
// </expt>


// Note: Put stimuli key (i.e., title) in the first array element.
var stimuli = {
    "Asian": ["Asian", "Curry", "Karate", "Beijing", "Sony"],
    "American": ["American", "Burger", "NFL", "Boston", "Microsoft"],
    // Feminism / anti-feminism stimuli need more work
    "Feminism": ["Feminism", "Empowerment", "Equality", "Quota", "Women's rights", "Pay gap"],
    "Anti-feminism": ["Anti-feminism", "Macho", "Housewife", "Dominant", "Harassment", "Sexist"],
    // Australian / Multiculturalism stimuli need more work. Are not necessarily opposites
    "Australian": ["Australian", "Footie", "Kangaroo", "ANZAC", "BBQ", "Koala"],
    "Multiculturalism": ["Multiculturalism", "Diversity", "Immigration", "Variety", "International", "Ethnicities"],
    "Good": ["Good", "Paradise", "Pleasure", "Cheer", "Wonderful"],
    "Bad": ["Bad", "Bomb", "Abuse", "Sadness", "Pain"],
    "Self": ["I", "Mine", "My", "Myself", "Self"],
    "Other": ["Other", "Their", "Theirs", "Them", "They"]
};

var attributeKey1;
var attributeKey2;

var attributeStimuli1;
var attributeStimuli2;
var attributeStimuli;

var attitudeStimuli1;
var attitudeStimuli2;
var attitudeStimuli;

var BIATBlock = 0;
var counter = 1;
var wordListType = "";
var correctAttribute = "";
var correctAttitude = "";

var prefatoryTrail = true;
var ongoing = false;


// TODO: Post trial pause ?
// TODO: BIAT blocks ?

function prepareWords(localAttributeStimuli1, localAttributeStimuli2, localAttitudeStimuli1, localAttitudeStimuli2) {
    biatActive = true;

    // setAttributeStimuli
    attributeKey1 = localAttributeStimuli1[0];
    attributeKey2 = localAttributeStimuli2[0];
    // remove first element (title) from array
    localAttributeStimuli1.shift();
    localAttributeStimuli2.shift();
    // randomise order
    attributeStimuli1 = shuffle(localAttributeStimuli1);
    attributeStimuli2 = shuffle(localAttributeStimuli2);
    attributeStimuli = attributeStimuli1.concat(attributeStimuli2);

    // setAttitudeStimuli
    attitudeKey1 = localAttitudeStimuli1[0];
    attitudeKey2 = localAttitudeStimuli2[0];
    // remove first element (title) from array

    localAttitudeStimuli1.shift();
    localAttitudeStimuli2.shift();
    // randomise order
    attitudeStimuli1 = shuffle(localAttitudeStimuli1);
    attitudeStimuli2 = shuffle(localAttitudeStimuli2);
    attitudeStimuli = attitudeStimuli1.concat(attitudeStimuli2);

    $(attributeStimuliCategory).text(attributeKey1);
    $(attitudeStimuliCategory).text(attitudeKey1);

    // Set first instructions
    var instructions = "In this task, you will be instructed to press the right I for '" + attitudeKey1.toUpperCase() + "'. <br/> words and items from one specific category, either '" + attributeKey1.toUpperCase() + "' or '" + attributeKey2.toUpperCase() + "'. The left E key is used for '" + attitudeKey2.toUpperCase() + "' words and items from the other of those categories. The first couple of blocks help you get used to the task format. Classify items as quickly as you can while making as few mistakes as possible. Going too slow or making too many mistakes will result in an uninterpretable score. It is OK to make an occasional mistake. If you press an incorrect key you will see a red 'X'. Rapidly correct the error by pressing the other key. <br /> <br /> Press the spacebar to continue.";
    $(BIAT_instructions).show();
    $(BIAT_instructions).html(instructions);
}

const STATUS_COMPLETE = 'complete';			// indicates complete dataset on server
const STATUS_INCOMPLETE = 'incomplete';
const VERSION = '1.0'; 						// to keep track of changes affecting log file format

function create_data_log(settings, data, status) {
    return {
        'settings': settings,
        'data': data_object,
        'version': VERSION,
        'status': status
    }
}

function log_partial_data(settings, data) {
    data = create_data_log(settings, data, STATUS_INCOMPLETE);

    $.ajax({
        type: "POST",
        url: '/',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result, status, xhr) {
            console.log("Partial dataset saved!");
        },
        error: function (xhr, status, error) {
            console.log("Error when transmitting partial data!");
        }
    });
}

function startIAT(settings, stimuliA, stimuliB) {
    settings = settings;
    // $(BIAT_explanation).hide();
    $(BIAT_test).show();

    if (settings['experiment_group'] == 1) {
        prepareWords(stimuli["Good"], stimuli["Bad"], stimuli[stimuliA], stimuli[stimuliB]);
    } else if (settings['experiment_group'] == 2) {
        prepareWords(stimuli["Good"], stimuli["Bad"], stimuli[stimuliB], stimuli[stimuliA]);
    }

    data_object = {
        "attributeStimuli": {},
        "BIAT_value": {}
    };

    if (biatActive == true) {
        // Listen for key input
        $(document).keypress(function (e) {
            // console.log("wordListType " + wordListType);
            // check which side is correct
            switch (e.keyCode) {
                case 32:
                    // 'Spacebar' pressed - go to next page if on an instruction page
                    if (biatActive == true) {
                        if (counter < 3) {
                            counter++;
                            nextWord(counter);
                        }
                    }
                    break;

                case 101:
                    if (biatActive == true) {
                        // 'E'-key pressed - check whether answer is correct
                        if (counter >= 3) {
                            if ((wordListType == "attribute" && correctAttribute == "left") || (wordListType == "attitude" && correctAttitude == "left")) {
                                $(".alert").hide();
                                calculateLatency();
                                counter++;
                                nextWord(counter);
                            } else {
                                $(".alert").show();
                            }
                        }
                    }
                    break;

                case 105:
                    if (biatActive == true) {
                        // 'I'-key pressed - check whether answer is correct
                        if (counter >= 3) {
                            if ((wordListType == "attribute" && correctAttribute == "right") || (wordListType == "attitude" && correctAttitude == "right")) {
                                $(".alert").hide();
                                calculateLatency();
                                counter++;
                                nextWord(counter);
                            } else {
                                $(".alert").show();
                            }
                        }
                    }
                    break;
            }
        });
    }

    function calculateLatency() {
        endTime = new Date();
        var timeDiff = endTime - startTime;

        if (timeDiff < 10000 && prefatoryTrail == false) {
            // TODO: Add condition configuration (if isEven && condA..)
            if (blockCounter == 3) {
                // block A1
                A1sum += timeDiff;
                A1n++;
                A1ss = A1ss + (timeDiff * timeDiff);
            } else if (blockCounter == 4) {
                // block B1
                B1sum += timeDiff;
                B1n++;
                B1ss = B1ss + (timeDiff * timeDiff);
            } else if (blockCounter == 5) {
                // block A2
                A2sum += timeDiff;
                A2n++;
                A2ss = A2ss + (timeDiff * timeDiff);
            } else if (blockCounter == 6) {
                // block B2
                B2sum += timeDiff;
                B2n++;
                B2ss = B2ss + (timeDiff * timeDiff);
            }
        }

        // reset for next round
        startTime = new Date();
    }

    function isEven(num) {
        return (num % 2) == 0;
    }

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var blockCounter = 1;

    function nextBlock() {
        blockCounter++;
        if (blockCounter < 7) {
            counter = 2; // reset counter to labels stage
            fillArrays();
            nextWord(counter);
        } else {
            completed = 1;
            biatActive = false;
            $(BIAT_word).hide();
            $(BIAT_instructions).show();
            $(BIAT_instructions).text("Exercise ended");

            calculateScore();
        }
    }

    function fillArrays() {
        if (settings['experiment_group'] == 1) {
            attributeStimuli = attributeStimuli1.concat(attributeStimuli2);
            attitudeStimuli = attitudeStimuli1.concat(attitudeStimuli2);
        } else if (settings['experiment_group'] == 2) {
            attributeStimuli = attributeStimuli2.concat(attributeStimuli1);
            attitudeStimuli = attitudeStimuli2.concat(attitudeStimuli1);
        } else {
            $(".alert").html('ERROR: some variables have not been set!');
            $(".alert").show();
        }
    }

    function nextWord(counter) {
        // 1 show instructions
        // 2 show labels
        var currentAttitudeKey = "";
        var currentAttitudeStimuli = "";
        // var currentAttributeKey = "";
        if (!isEven(blockCounter)) {
            // (isEven(blockCounter) && settings['experiment_group'] == 2)) {
            // Block A
            // 3,4,5,6 random targetA right targetB left
            // 7,9,11,13,15,17,19,21 attributeA left,attributeB right
            // 8,10,12,14,16,18,20,22 targetA right targetB left
            currentAttitudeKey = attitudeKey1;
            currentAttitudeStimuli = attitudeStimuli1;
            $(attributeStimuliCategory).html(attributeKey1.toUpperCase());
            $(attitudeStimuliCategory).html(currentAttitudeKey.toUpperCase());
        } else {
            // Block B
            // 3,4,5,6 random targetB right targetA left
            // 7,9,11,13,15,17,19,21 attributeA right,attributeB left
            // 8,10,12,14,16,18,20,22 targetB right targetA left
            currentAttitudeKey = attitudeKey2;
            currentAttitudeStimuli = attitudeStimuli2;
            $(attributeStimuliCategory).html(attributeKey1.toUpperCase());
            $(attitudeStimuliCategory).html(currentAttitudeKey.toUpperCase());
        }

        console.log("counter: " + counter);

        if (counter == 3 || counter == 7) {
            fillArrays();
        }

        if (counter == 2) {
            $(BIAT_word).hide();
            $(attributeStimuliCategory).html(attributeKey1.toUpperCase() + "<br />" + attributeStimuli1.join(' '));
            $(attitudeStimuliCategory).html(currentAttitudeKey.toUpperCase() + "<br />" + currentAttitudeStimuli.join(' '));

            var instructions = "Press the right I key key on your keyboard for " + currentAttitudeKey.toUpperCase() + " or " + attributeKey1.toUpperCase() + ". <br /> Press the left E key on your keyboard for anything else.<br /><br />Go as fast as you can.<br />Press the space bar to begin.";
            $(BIAT_instructions).show();
            $(BIAT_instructions).html(instructions);
        } else if (counter >= 3 && counter <= 6) {
            prefatoryTrail = true;
            $("#step_BIAT_header").hide();
            $(BIAT_instructions).hide();
            // 3,4,5,6 random target A right Target B left
            var random = randomIntFromInterval(0, attitudeStimuli.length - 1);

            $(BIAT_word).show();
            $(BIAT_word).text(attitudeStimuli[random]);
            wordListType = "attitude";

            console.log(attitudeStimuli[random]);
            console.log(attitudeStimuli);

            if (jQuery.inArray(attitudeStimuli[random], currentAttitudeStimuli) != -1) {
                // alert("right");
                correctAttitude = "right";
            } else {
                correctAttitude = "left";
            }
            // remove selected element from array to prevent repeating same element
            attitudeStimuli.splice(random, 1);
            // console.log(attitudeStimuli);
        } else if (counter >= 7 && counter <= 22) {
            prefatoryTrail = false;
            if (isEven(counter)) {
                // 8,10,12,14,16,18,20,22 = noreplace(targetARight, targetBLeft);
                var random = randomIntFromInterval(0, attitudeStimuli.length - 1);

                $(BIAT_word).text(attitudeStimuli[random]);
                wordListType = "attitude";

                if (jQuery.inArray(attitudeStimuli[random], currentAttitudeStimuli) != -1) {
                    correctAttitude = "right";
                } else {
                    correctAttitude = "left";
                }
                // remove selected element from array to prevent repeating same element
                attitudeStimuli.splice(random, 1);
                console.log(attitudeStimuli);
            } else {
                // 7,9,11,13,15,17,19,21 = noreplace(attributeA, attributeB)]
                var random = randomIntFromInterval(0, attributeStimuli.length - 1);

                $(BIAT_word).text(attributeStimuli[random]);
                wordListType = "attribute";

                if (jQuery.inArray(attributeStimuli[random], attributeStimuli1) != -1) {
                    correctAttribute = "right";
                } else {
                    correctAttribute = "left";
                }

                attributeStimuli.splice(random, 1);
                console.log(attributeStimuli);
            }
        } else {
            // Trail is over.. go to next block.
            nextBlock();
        }

        $('#BIAT_word').removeClass();
        if (wordListType == "attribute") {
            $('#BIAT_word').addClass('attributeClass');
        }
        if (wordListType == "attitude") {
            $('#BIAT_word').addClass('attitudeClass');
        }
    }


    function calculateScore() {
        A1m = A1sum / A1n;
        A2m = A2sum / A2n;
        B1m = B1sum / B1n;
        B2m = B2sum / B2n;
        A1sd = Math.sqrt((A1ss - (A1n * (A1m * A1m))) / (A1n - 1));
        A2sd = Math.sqrt((A2ss - (A2n * (A2m * A2m))) / (A2n - 1));
        B1sd = Math.sqrt((B1ss - (B1n * (B1m * B1m))) / (B1n - 1));
        B2sd = Math.sqrt((B2ss - (B2n * (B2m * B2m))) / (B2n - 1));

        sd1 = Math.sqrt((((A1n - 1) * (A1sd * A1sd) + (B1n - 1) * (B1sd * B1sd)) + ((A1n + B1n) * ((A1m - B1m) * (A1m - B1m)) / 4)) / (A1n + B1n - 1));
        sd2 = Math.sqrt((((A2n - 1) * (A2sd * A2sd) + (B2n - 1) * (B2sd * B2sd)) + ((A2n + B2n) * ((A2m - B2m) * (A2m - B2m)) / 4)) / (A2n + B2n - 1));
        d1 = (B1m - A1m) / sd1
        d2 = (B2m - A2m) / sd2
        // d = if ( parameters.extended ) { (d1+d2) / 2 } else { d1 }
        d = (d1 + d2) / 2;

        console.log("A1m " + A1m);
        console.log("A2m " + A2m);
        console.log("B1m " + B1m);
        console.log("B2m " + B2m);
        console.log("A1sd " + A1sd);
        console.log("A2sd " + A2sd);
        console.log("B1sd " + B1sd);
        console.log("B2sd " + B2sd);
        console.log("sd1 " + sd1);
        console.log("sd2 " + sd2);
        console.log("d1 " + d1);
        console.log("d2 " + d2);
        console.log("d " + d);

        if (Math.abs(d) > 0.15) {
            magnitude = "a slight";
        } else if (Math.abs(d) > 0.35) {
            magnitude = "a moderate";
        } else if (Math.abs(d) >= 0.65) {
            magnitude = "a strong";
        } else {
            magnitude = "little to no";
        }

        if (d >= 0.0) {
            preferred = attitudeKey1;
            notpreferred = attitudeKey2;
        } else if (d < 0.0) {
            preffered = attitudeKey2;
            notpreferred = attitudeKey1;
        }

        $(BIAT_top).hide();
        $(BIAT_instructions).html("Your BIAT score (D) was " + d + ", which suggests " + magnitude + " automatic preference for " + preferred + " compared to " + notpreferred + ".");
        // / currentblocknumber = max(expt.1.currentblocknumber, expt.2.currentblocknumber)
        // / totalblockcount = if (parameters.extended) {expt.1.blockcount} else {expt.1.blockcount-2}
        // TODO: count correct
        // / percentcorrect = (values.n_correct/ (values.a1n + values.a2n + values.b1n + values.b2n)) * 100

        // save BIAT outcome values
        var biatAttributeStimuli = "";
        if (settings['experiment_group'] == 1) {
            biatAttributeStimuli = attitudeKey1 + "," + attitudeKey2;
        } else if (settings['experiment_group'] == 2) {
            biatAttributeStimuli = attitudeKey2 + "," + attitudeKey1;
        }

        data_object["attributeStimuli"] = biatAttributeStimuli;
        data_object["BIAT_value"] = d;

        log_partial_data(settings, data_object);

        $(BIAT_end).show();
    }
}