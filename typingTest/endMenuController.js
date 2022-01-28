function showResultInEndMenu(speed, acc, highscore)
{
    document.querySelector("#typingSpeed").innerHTML = `Typing Speed : ${speed} WPM`;
    document.querySelector("#hscore").innerHTML = `Highscore : ${highscore} WPM`;
    if(isNaN(acc))
        document.querySelector("#acc").innerHTML = `Accuracy : 100%`;
    else
        document.querySelector("#acc").innerHTML = `Accuracy : ${acc}%`;
}
function openEndMenu()
{
    document.querySelector(".main").style.display = "none";
    document.querySelector(".endMenu").style.display = "block";
}
function restart()
{
    document.querySelector(".inputText").value = "";
    document.querySelector(".endMenu").style.display = "none";
    document.querySelector(".main").style.display = "block";
    setInitialtypingInfo();
    main();
}
function setInitialtypingInfo(){
    document.querySelector(".time").innerHTML = "Time : 60s";
    document.querySelector(".cpm").innerHTML = "CPM : 0";
    document.querySelector(".wpm").innerHTML = "WPM : 0";
    document.querySelector(".accuracy").innerHTML = "Accuracy: 0%";
}