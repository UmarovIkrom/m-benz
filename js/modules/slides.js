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

export default slides;