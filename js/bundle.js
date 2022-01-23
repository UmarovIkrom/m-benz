/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/accordion.js":
/*!*********************************!*\
  !*** ./js/modules/accordion.js ***!
  \*********************************/
/***/ ((module) => {

function accordion() {
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
}

module.exports = accordion;

/***/ }),

/***/ "./js/modules/classes.js":
/*!*******************************!*\
  !*** ./js/modules/classes.js ***!
  \*******************************/
/***/ ((module) => {

function classes() {
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

        //AXIOS library
    axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new CarCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

}

module.exports = classes;

/***/ }),

/***/ "./js/modules/data.js":
/*!****************************!*\
  !*** ./js/modules/data.js ***!
  \****************************/
/***/ ((module) => {

function data() {
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
}

module.exports = data;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {
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

}

module.exports = form;

/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((module) => {

function loader() {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
        loader.style.opacity = "0";
        setTimeout (function () {
            loader.style.display = "none";
        }, 1400);
    }, 1750);
}

module.exports = loader;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
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
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((module) => {

function slides() {
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
}

module.exports = slides;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
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
}

module.exports = tabs;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


document.addEventListener("DOMContentLoaded", () => {
   const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
         slides = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js"),
         modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
         loader = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js"),
         form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
         data = __webpack_require__(/*! ./modules/data */ "./js/modules/data.js"),
         classes = __webpack_require__(/*! ./modules/classes */ "./js/modules/classes.js"),
         accordion = __webpack_require__(/*! ./modules/accordion */ "./js/modules/accordion.js");

    tabs();
    slides();
    modal();    
    loader();    
    form();
    data();
    classes();    
    accordion();
}); 
    
    































































})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map