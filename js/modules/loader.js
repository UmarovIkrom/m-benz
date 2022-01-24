function loader() {
    const loader = document.querySelector(".loader");
    setTimeout(function () {
        loader.style.opacity = "0";
        setTimeout (function () {
            loader.style.display = "none";
        }, 1400);
    }, 1750);
}

export default loader;