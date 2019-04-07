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


// Note: Put stimuli key in the first array element
var asianStimuli = ["Asian", "Curry", "Karate", "Beijing", "Sony"],
    americanStimuli = ["American", "Burger", "NFL", "Boston", "Microsoft"],
    // goodStimuli = ["Good", "Paradise", "Pleasure", "Cheer", "Wonderful", "Splendid", "Love"],
    goodStimuli = ["Good", "Paradise", "Pleasure", "Cheer", "Wonderful"],
    // badStimuli = ["Bad", "Bomb", "Abuse", "Sadness", "Pain", "Poison", "Grief"],
    badStimuli = ["Bad", "Bomb", "Abuse", "Sadness", "Pain"],
    target_A = ["Orchid", "Lily", "Violet", "Daisy"],
    target_B = ["Ant", "Locust", "Bee", "Wasp"];


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

var ongoing = false;

// TODO: Post trial pause ?
// TODO: BIAT blocks ?

function prepareWords(localAttributeStimuli1, localAttributeStimuli2, localAttitudeStimuli1, localAttitudeStimuli2) {
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
    var instructions = "In this task, you will be instructed to press the right I for '" + attitudeKey1.toUpperCase() + "'. <br/> words and items from one specific category, either '" + attributeKey1.toUpperCase() + "' or '" + attributeKey2.toUpperCase() + "'. The left E key is used for '" + attitudeKey1.toUpperCase() + "' words and items from the other of those categories. The first couple of blocks help you get used to the task format. Classify items as quickly as you can while making as few mistakes as possible. Going too slow or making too many mistakes will result in an uninterpretable score. It is OK to make an occasional mistake. If you press an incorrect key you will see a red 'X'. Rapidly correct the error by pressing the other key. <br /> <br /> Press the spacebar to continue.";
    $(IAT_instructions).show();
    $(IAT_instructions).html(instructions);
}

function startIAT() {
    $(IAT_explanation).hide();
    $(IAT_test).show();

    prepareWords(goodStimuli, badStimuli, asianStimuli, americanStimuli);

    // Listen for key input
    $(document).keypress(function (e) {
        // console.log("wordListType " + wordListType);
        // check which side is correct
        switch (e.keyCode) {
            case 32:
                // 'Spacebar' pressed - go to next page if on an instruction page
                if (counter < 3) {
                    counter++;
                    nextWord(counter);
                }
                break;

            case 101:
                // 'E'-key pressed - check whether answer is correct
                if (counter >= 3) {
                    if ((wordListType == "attribute" && correctAttribute == "left") || (wordListType == "attitude" && correctAttitude == "left")) {
                        $(".alert").hide();
                        counter++;
                        nextWord(counter);
                    } else {
                        $(".alert").show();
                    }
                    break;
                }
            case 105:
                // 'I'-key pressed - check whether answer is correct
                if (counter >= 3) {
                    if ((wordListType == "attribute" && correctAttribute == "right") || (wordListType == "attitude" && correctAttitude == "right")) {
                        $(".alert").hide();
                        counter++;
                        nextWord(counter);
                    } else {
                        $(".alert").show();
                    }
                    break;
                }
        }
    });

    function isEven(num) {
        return (num % 2) == 0;
    }

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var blockCounter = 1;

    function nextBlock() {
        alert("New block called");
        blockCounter++;
        if (blockCounter < 7) {
            counter = 2; // reset counter to labels stage
            fillArrays();
            nextWord(counter);    
        } else {
            $(IAT_word).hide();
            $(IAT_instructions).show();
            $(IAT_instructions).text("Exercise ended");
        }
    }

    function fillArrays() {
        attributeStimuli = attributeStimuli1.concat(attributeStimuli2);
        attitudeStimuli = attitudeStimuli1.concat(attitudeStimuli2); 
    }

    function nextWord(counter) {
        // 1 show instructions
        // 2 show labels
        var currentAttitudeKey = "";
        var currentAttitudeStimuli = "";
        // var currentAttributeKey = "";
        if (!isEven(blockCounter)) {
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
            $(IAT_word).hide();
            $(attributeStimuliCategory).html(attributeKey1.toUpperCase() + "<br />" + attributeStimuli1.join(' '));
            $(attitudeStimuliCategory).html(currentAttitudeKey.toUpperCase() + "<br />" + currentAttitudeStimuli.join(' '));

            var instructions = "Press the right I key key on your keyboard for " + currentAttitudeKey.toUpperCase() + " or " + attributeKey1.toUpperCase() + ". <br /> Press the left E key on your keyboard for anything else.<br /><br />Go as fast as you can.<br />Press the space bar to begin.";
            $(IAT_instructions).show();
            $(IAT_instructions).html(instructions);
        } else if (counter >= 3 && counter <= 6) {
            $(IAT_instructions).hide();
            // 3,4,5,6 random target A right Target B left
            var random = randomIntFromInterval(0, attitudeStimuli.length - 1);

            $(IAT_word).show();
            $(IAT_word).text(attitudeStimuli[random]);
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
            if (isEven(counter)) {
                // 8,10,12,14,16,18,20,22 = noreplace(targetARight, targetBLeft);
                var random = randomIntFromInterval(0, attitudeStimuli.length - 1);

                $(IAT_word).text(attitudeStimuli[random]);
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

                $(IAT_word).text(attributeStimuli[random]);
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
            // Trail is over.. go to next block. Do something with that info..
            nextBlock();
        }

        $('#IAT_word').removeClass();
        if (wordListType == "attribute") {
            $('#IAT_word').addClass('attributeClass');
        }
        if (wordListType == "attitude") {
            $('#IAT_word').addClass('attitudeClass');
        }
    }
}