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