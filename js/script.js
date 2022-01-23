"use strict";

    //LOADER
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
        loader.style.opacity = "0";
        setTimeout (function () {
            loader.style.display = "none";
        }, 1400);
    }, 1750);

    //TABS
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabContent = document.querySelectorAll(".tabcontent"),
        headerParents = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.style.display = "none";
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }    

    function showTabContent(i = 0) {
        tabContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    headerParents.addEventListener("click", (event) => {
        if(event.target && event.target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i ) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    }); 
    
    //MODAL
    const allModalBtn = document.querySelectorAll("[data-modal]"),// [data-modal] bu btnlarga berilgan data hisoblanib bu orqali biz o'sha btnlarni chaqirib olishimiz mumkin
        modal = document.querySelector(".modal");
        // modalClose = document.querySelector(".modal__close");//while adding dynamic content this code dont work

    allModalBtn.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });
        
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }    

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    // modalClose.addEventListener("click", closeModal); //also this code

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == "" ) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 5000);

    function showMyModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showMyModalByScroll);
        }
    }
    window.addEventListener("scroll", showMyModalByScroll);

    //DATA
    const deadline = "2022-03-31";

    function getTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)), 
            hours = Math.floor((total / (1000 * 60 * 60)) %24),  
            minutes = Math.floor((total / 1000 / 60) % 60),             
            seconds = Math.floor((total / 1000) % 60);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };    
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num; 
        } else {
            return num;
        }  
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"), 
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),   
            seconds = timer.querySelector("#seconds"),
            
            timeInterval = setInterval(updateClock, 1000);
       
        function updateClock() {
            const time = getTime(endtime);
            days.innerHTML = getZero(time.days); 
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }    

        updateClock();
    }
    setClock(".timer", deadline);

    //CLASS 

    const getResource = async (url) => {
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    class CarCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classess) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classess = classess
            this.parent = document.querySelector(parentSelector)
            this.transfer = 10.
            this.changeToUSD()
        }
    
        changeToUSD() {
            this.price = this.price * this.transfer
        }
    
        render() {
            const element = document.createElement('div')
            if(this.classess.length === 0) {
              this.classess = 'menu__item'
              element.classList.add(this.classess)
            }else{
              this.classess.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> $</div>
                    </div>
                </div>
            `;
            this.parent.append(element)
        }
    }

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new CarCard(img, altimg, title, descr, price, '.menu .container').render()
    //         })
    //     })

        //AXIOS library
        axios.get("http://localhost:3000/menu")
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new CarCard(img, altimg, title, descr, price, '.menu .container').render()
                })
            })


    // new CarCard(
    //     'img/tabs/1.jpg',
    //     'car',
    //     '2021 Mercedes-Benz C-Class',
    //     `The 2021 Mercedes-Benz C-Class finishes in the top half of our
    //     luxury small car rankings. It's powerful and upscale, but it has
    //     so-so handli...`, 
    //     100,
    //     '.menu .container',
    // ).render();
    // new CarCard(
    //     'img/tabs/2.jpg',
    //     'car',
    //     '2021 Mercedes-Benz CLA-Class',
    //     `The 2021 Mercedes-Benz C-Class finishes in the top half of our
    //     luxury small car rankings. It's powerful and upscale, but it has
    //     so-so handli...`  , 
    //     100,
    //     '.menu .container'
    // ).render()
    // new CarCard(
    //     'img/tabs/3.jpg',
    //     'car',
    //     '2021 Mercedes-Benz SCLA',
    //     `The 2021 Mercedes-Benz C-Class finishes in the top half of our
    //     luxury small car rankings. It's powerful and upscale, but it has
    //     so-so handli...`  , 
    //     100,
    //     '.menu .container'
    // ).render()

    // SLIDES easy way
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total');

    let slideIndex = 1;
    show(slideIndex)
    function show(i) {
        if(i > slides.length){
            slideIndex = 1
        }
        if(i < 1) {
            slideIndex = slides.length
        }
        slides.forEach(item => item.style.cssText = 'display: none')
        slides[slideIndex - 1].style.display = 'block'
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`
        }else{
            current.textContent = slideIndex
        }
    }

    function sliderPlus(i) {
        show(slideIndex += 1)
    }
    prev.addEventListener('click', () => {
        sliderPlus(-1)
    })
    next.addEventListener('click', () => {
        sliderPlus(1)
    })
    
    //ACCORDION
    const accordion = document.querySelectorAll('.accordion')

    accordion.forEach(acc  => {
        acc.addEventListener('click', () => {
            acc.classList.toggle('active')
            const panel = acc.nextElementSibling
            if(panel.style.maxHeight) {
                panel.style.maxHeight = null
            } else{
                panel.style.maxHeight = panel.scrollHeight + 'px'
            }
        })
    })

    //Send Data To The Server
    const forms = document.querySelectorAll('form')
  
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Your Application Has Been Accepted',
        failure: 'Error'
    }
  
    forms.forEach(item => {
        bindPostData(item)
    })
  
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
  
            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
            `
            form.insertAdjacentElement('afterend', statusMessage)
  
            const formData = new FormData(form)
  
            const json = JSON.stringify(Object.fromEntries(formData.entries()))
  
        postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success)
                statusMessage.remove()
            })
            .catch(() => {
                showThanksModal(message.failure)
            })
            .finally(() => {
                form.reset()
            })
        })
    }

    //Improve Modal
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
    
        prevModalDialog.classList.add('hide')
        openModal()
    
        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `
    
        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal()
        }, 4000)
    }
    
    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res))





}); 
    
    






























































