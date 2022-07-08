"use strict";

window.addEventListener("DOMContentLoaded", function(){
    //tabs

    //timer

    // const deadline = "2022-8-1";
    
    // function getTimeLeft(endTime) {
    //     let t = Date.parse(endTime) - Date.parse(new Date());
    //     return  t;
    // }
    // console.log(getTimeLeft(deadline));

    const deadline = '2022-07-09';


    function getTimeLeft(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

            return {
                total: t,
                days,
                hours,
                minutes,
                seconds,
            }
    }

    function setTimer(selector, endTime) {
        const timer = document.querySelector(selector),
            daysField = timer.querySelector('#days'),
            hoursField = timer.querySelector('#hours'),
            minutesField = timer.querySelector('#minutes'),
            secondsField = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            let {total, days, hours, minutes, seconds} = getTimeLeft(deadline);

            daysField.innerHTML = addZero(days);
            hoursField.innerHTML = addZero(hours);
            minutesField.innerHTML = addZero(minutes);
            secondsField.innerHTML = addZero(seconds);

            if(total <= 0) {
                clearInterval(timeInterval);

                daysField.innerHTML = addZero(0);
                hoursField.innerHTML = addZero(0);
                minutesField.innerHTML = addZero(0);
                secondsField.innerHTML = addZero(0);
            }
        }

        function addZero(num) {
            if(num >= 0 && num < 10) {
                return num = '0' + num;
            } else return num;
        }

    }
    setTimer('.timer', deadline)
});