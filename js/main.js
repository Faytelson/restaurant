"use strict";
window.addEventListener('DOMContentLoaded', function(){


    //tabs


    (function() {
        const tabs = document.querySelectorAll('.tabheader__item'),
            tabsParent = document.querySelector('.tabheader__items'),
            contents = document.querySelectorAll('.tabcontent');

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].dataset.open = i;
        }

        tabsParent.addEventListener('click', function(event){
            const target = event.target;
            if(target && target.classList.contains('tabheader__item')) {
                for(let i =0; i < tabs.length; i++) {
                    tabs[i].classList.remove('tabheader__item_active');
                    contents[i].classList.remove('tabcontent_active');
                }
                target.classList.add('tabheader__item_active');
                contents[target.dataset.open].classList.add('tabcontent_active');
            }
        })
    })();


    //timer


    (function(){
        const deadline = '2022-09-01';

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
            let timer = document.querySelector(selector),
                daysField = timer.querySelector('#days'),
                hoursField = timer.querySelector('#hours'),
                minsField = timer.querySelector('#minutes'),
                secsField = timer.querySelector('#seconds'),
                timeInt = setInterval(updateTimer, 1000);

            updateTimer();
            
            function updateTimer() {
                let {days, hours, minutes, seconds, total} = getTimeLeft(endTime);
                daysField.innerHTML = addZero(days);
                hoursField.innerHTML = addZero(hours);
                minsField.innerHTML = addZero(minutes);
                secsField.innerHTML = addZero(seconds);

                if(total && total <= 0) {
                    daysField.innerHTML = addZero(0);
                    hoursField.innerHTML = addZero(0);
                    minsField.innerHTML = addZero(0);
                    secsField.innerHTML = addZero(0);

                    clearInterval(timeInt);
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


    (function() {
        const btns = document.querySelectorAll('[data-modal-open'),
        modal = document.querySelector('.modal'),
        btnCloseModal = document.querySelector('[data-modal-close'),
        timeInt = setTimeout(showModal, 5000);

        function showModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(timeInt);
            window.removeEventListener('scroll', showModalByScroll);
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

    btns.forEach((btn) => {
        btn.addEventListener('click', showModal)
    });

    btnCloseModal.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if(target === modal) {
            closeModal();
        }
    })

    window.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    })
    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    })();


    //Dynamic Cards


    (function() {
        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.changeValue = 22;
                this.changeToHrivna();
                this.parent = document.querySelector(parentSelector);
            }

            changeToHrivna() {
                this.price *= this.changeValue;
            }

            render() {
                const elem = document.createElement('div');
                elem.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>     
                `;
                this.parent.append(elem);
            }
        }

        new MenuCard(
            "img/tabs/elite.jpg", 
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            10,
            '.menu .container'
            ).render();

        new MenuCard(
            "img/tabs/vegy.jpg", 
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            12,
            '.menu .container'
            ).render();

        new MenuCard(
            "img/tabs/post.jpg", 
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            8,
            '.menu .container'
            ).render();
    })();
});