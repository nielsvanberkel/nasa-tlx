function startIAT() {

    $(IAT_explanation).hide();
    $(IAT_test).show();

    var images = ["1", "2", "3", "4", "5"],
        category_one = ["hand", "foot", "hand", "hand", "foot"],
        category_two = ["nice", "heaven", "happy", "pleasure"]

    counter = 0;

    images = shuffle(images);

    nextImage(0);

    // Listen for key input
    $(document).keypress(function (e) {

        switch (e.keyCode) {
            case 101:
                // 'E'-key pressed
                if (answerCorrect("e")) {
                    $(".alert").hide();
                    counter++;
                    nextImage(counter);
                } else {
                    $(".alert").show();
                }
                break;

            case 105:
                // 'I'-key pressed (text / image matches category)
                if (answerCorrect("i")) {
                    $(".alert").hide();
                    counter++;
                    nextImage(counter);
                } else {
                    $(".alert").show();
                }
                break;
        }
    });

    function nextImage(counter) {
        if (counter < images.length) {
            $(IAT_image).attr("src", "images/" + images[counter] + ".jpg");
            $(IAT_category_one).text(category_one[counter]);
            $(IAT_category_two).text(category_two[counter]);
        } else {
            $(IAT_test).hide();
            $(IAT_end).show();
        }
    }

    function answerCorrect(answer) {
        // TODO: Keep track of (in)correct combinations
        if (counter == 2 && answer == "e" ||
            counter == 4 && answer == "e") {
            return false;
        }
        return true;
    }
}