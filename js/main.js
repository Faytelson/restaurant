"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //tabs

    (function() {
        const tabParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        contents = document.querySelectorAll('.tabcontent');

        for(let i = 0; i < tabs.length; i ++) {
            tabs[i].dataset.num = i;
        }

        tabParent.addEventListener('click', function(event){
            if(event.target && event.target.classList.contains('tabheader__item')) {
                contents.forEach(function(elem) {
                    elem.classList.remove('tabcontent_active');
                });  
                tabs.forEach(function(elem){
                    elem.classList.remove('tabheader__item_active');
                })                    
                event.target.classList.add('tabheader__item_active');
                contents[event.target.dataset.num].classList.add('tabcontent_active');
            }
        });
    })();

    //timer


    (function() {
        const deadline = "2022-9-29";

        function getTimeLeft(endTime) {
            let t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                mins = Math.floor((t / 1000 / 60) % 60),
                secs = Math.floor((t / 1000) % 60);
    
                return {
                    total: t,
                    days,
                    hours,
                    mins,
                    secs,
                }
        }
    
        function setTimer(selector, endTime) {
            let timer = document.querySelector(selector),
                daysField = timer.querySelector('#days'),
                hoursField = timer.querySelector('#hours'),
                minsField = timer.querySelector('#minutes'),
                secsField = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateTimer, 1000);
    
            updateTimer();
                
            function updateTimer() {
                let {total, days, hours, mins, secs} = getTimeLeft(endTime);
                daysField.innerHTML = addZero(days),
                hoursField.innerHTML = addZero(hours),
                minsField.innerHTML = addZero(mins),
                secsField.innerHTML = addZero(secs);
    
                if(total <= 0) {
                    daysField.innerHTML = addZero(0),
                    hoursField.innerHTML = addZero(0),
                    minsField.innerHTML = addZero(0),
                    secsField.innerHTML = addZero(0);
    
                    clearInterval(timeInterval);
                }
            }
    
            function addZero(num) {
                if(num >= 0 && num < 10) {
                    return `0${num}`;
                } else return num;
            }
        }
        setTimer('.timer', deadline);
    })();

    //modal

    (function(){
        let btns = document.querySelectorAll('[data-modal-open]'),
        modal = document.querySelector('.modal'),
        btnCloseModal = document.querySelector('[data-modal-close]'),
        timeInterval = setTimeout(showModal, 15000);

        function showModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(timeInterval);
            window.removeEventListener('scroll', checkModal);
        }
        btns.forEach(function(btn){
            btn.addEventListener('click', showModal);
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        btnCloseModal.addEventListener('click', closeModal)

        modal.addEventListener('click', function(event) {
            if(event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if(event.code === 'Escape' && modal.style.display == 'block') {
                closeModal();
            }
        })

        function checkModal(){
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                showModal();
                // this.removeEventListener('scroll', checkModal);
            }
        }

        window.addEventListener('scroll', checkModal);
        // window.addEventListener('scroll', function checkModal(event){
        //     if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        //         showModal();
        //         this.removeEventListener('scroll', checkModal);
        //     }
        // })
    })();

});