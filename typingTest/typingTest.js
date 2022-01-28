let prevLetterParent, currLetterParent;
main();
function main() {
    //paragraphs related starts
    const paragraphs = [
        "Mathematics is an indispenesable in many fields. It is essential in the field of engineering.",
        "A hyperbola is the plane curve consisting of all points whose distances from two fixed points in plane have a constant difference.",
        "The arrangement of objects taken some or all of them at a time in a definite order is permutation.",
        "In the afternoon, Iqbal stetched himself on the coarse string charpoy and tried to get some sleep.",
        "He had spent the night sitting on his bedroll in a crowded third class compartment.",
        "Every time he had dozen off, the train had come to halt ar some wayside station and the door was force open.",
        "Some child sleeping in its mother's lap would start howling till its wails were smothered by a breast thrust into its mouth.",
        "The shouting and clamour would continue until long after the train had left the station.",
        "The same thing was repeated again and again, till the compartment meant for 55 had almost 200 people in it.",
        "There were several people on roof. Most of people were on floor, on seats, on luggage racks, on trunks.",
        "Tempers were frayed and every few minutes an argument would start because someone had spread himself out too much.",
        "Mrs. Baroda was a little provoked to learn that her husband expected his friend, Gouvernail, upto spend a week on plantation.",
    ]
    let paragraphContainer = document.querySelector(".paragraphContainer");
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    for (let i = 0; i < 5; i++) {
        generateRandomParagraph();
    }
    //paragraphs related ends

    //Main
    let margin = getComputedStyle(document.querySelector(":root")).getPropertyValue("--spacing");
    let charIndex = 0, writtencharArr;
    let time = document.querySelector(".time");
    let timeLeft = 60;
    let timeTaken = -1;
    let inputText = document.querySelector(".inputText");
    let paraLetterArr = document.querySelectorAll("span");
    paraLetterArr[charIndex].classList.add("active");
    prevLetterParent = document.querySelector(".active").parentElement;
    currLetterParent = prevLetterParent;
    writtencharArr = inputText.value.split("");
    paragraphContainer.scrollTo(0, 0);
    document.addEventListener("keydown", () => inputText.focus());
    inputText.addEventListener("input", startTyping);
    const interval = setInterval(showResult, 1000);
    //Functions
    function generateRandomParagraph() {
        let randParagraph = paragraphs[randIndex];
        let paraDiv = document.createElement("div");
        paraDiv.classList.add("paragraphs");
        paragraphContainer.append(paraDiv);
        randParagraph.split("").forEach(character => {
            let span = document.createElement("span");
            span.innerHTML = character;
            paraDiv.appendChild(span);
        });
        if (randIndex >= paragraphs.length - 1)
            randIndex = 0;
        else
            randIndex++;
    }
    function startTyping() {
        let indexForScroll = charIndex;
        if (timeLeft > 0) {
            writtencharArr = inputText.value.split("");
            if (writtencharArr[charIndex] == null) {
                correctAudio();
                if (charIndex > 0) charIndex--;
                paraLetterArr[charIndex + 1].classList.remove("active");
                paraLetterArr[charIndex].classList.remove("correct", "incorrect", "spaceIncorrect");
                paraLetterArr[charIndex].classList.add("active");
            }
            else {
                if (isCorrect()) {
                    correctAudio();
                    paraLetterArr[charIndex].classList.add("correct");
                }
                else if (isSpaceIncorrect()) {
                    mistakeAudio();
                    paraLetterArr[charIndex].classList.add("spaceIncorrect");
                }
                else {
                    mistakeAudio();
                    paraLetterArr[charIndex].classList.add("incorrect");
                }
                paraLetterArr[charIndex].classList.remove("active");
                charIndex++;
                paraLetterArr[charIndex].classList.add("active");
            }
        }
        if (isParagraphSwitched()) {
            let height = prevLetterParent.clientHeight;
            if (writtencharArr[indexForScroll] == null)
                paragraphContainer.scrollBy(0, -(height + parseInt(margin)));
            else
                paragraphContainer.scrollBy(0, height + parseInt(margin));
        }
    }
    function showResult() {
        timeTaken++;
        timeLeft--;
        time.innerHTML = `Time : ${timeLeft}s`;
        let cpm = document.querySelector(".cpm");
        let wpm = document.querySelector(".wpm");
        let accuracy = document.querySelector(".accuracy");
        let calculatedWPM = getWPM(timeTaken);
        if (timeTaken != 0) {
            cpm.innerHTML = `CPM : ${getCPM(timeTaken)}`;
            wpm.innerHTML = `WPM : ${calculatedWPM}`;
        }
        if (!isNaN(getAccuracy())) {
            accuracy.innerHTML = `Accuracy : ${getAccuracy()}%`;
        }
        if (isTimeFinished()) {
            openEndMenu();
            showResultInEndMenu(calculatedWPM, getAccuracy(), getHighScore(calculatedWPM));
            clearParagrahs();
            clearInterval(interval);
        }
    }
    function isCorrect() {
        if (paraLetterArr[charIndex].innerHTML == writtencharArr[charIndex])
            return true;
    }
    function isSpaceIncorrect() {
        if (paraLetterArr[charIndex].innerHTML != writtencharArr[charIndex] && paraLetterArr[charIndex].innerHTML == " ")
            return true
    }
    function correctAudio() {
        let audio = document.createElement("audio");
        audio.src = "correct.mp3";
        audio.play();
    }
    function mistakeAudio() {
        let audio = document.createElement("audio");
        audio.src = "incorrect.mp3";
        audio.play();
    }
    function getCPM(timeTaken) {
        let correctCharLength = document.querySelectorAll(".correct").length;
        return Math.floor(correctCharLength / timeTaken * 60);
    }
    function getWPM(timeTaken) {
        let correctCharLength = document.querySelectorAll(".correct").length;
        let wordLength = correctCharLength / 5;
        return Math.floor(wordLength / timeTaken * 60)
    }
    function getAccuracy() {
        let correctCharLength = document.querySelectorAll(".correct").length;
        return Math.floor(correctCharLength / writtencharArr.length * 100);
    }
    function isParagraphSwitched() {
        prevLetterParent = currLetterParent;
        currLetterParent = document.querySelector(".active").parentElement;
        if (prevLetterParent != currLetterParent) {
            return true;
        }
    }
    function isTimeFinished() {
        if (timeLeft <= 0)
            return true;
    }
    function clearParagrahs() {
        document.querySelectorAll(".paragraphs").forEach(el => {
            el.remove();
        })
    }
    //setHighscore and getHighScore
    function getHighScore(currentScore) {
        let highscore = parseInt(localStorage.getItem("highscore"));
        if (currentScore > highscore) {
            localStorage.setItem("highscore", currentScore.toString());
            return currentScore;
        }
        else {
            return highscore;
        }

    }
}