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

    new CarCard(
        'img/tabs/1.jpg',
        'car',
        '2021 Mercedes-Benz C-Class',
        `The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`, 
        100,
        '.menu .container',
    ).render();
    new CarCard(
        'img/tabs/2.jpg',
        'car',
        '2021 Mercedes-Benz CLA-Class',
        `The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`  , 
        100,
        '.menu .container'
    ).render()
    new CarCard(
        'img/tabs/3.jpg',
        'car',
        '2021 Mercedes-Benz SCLA',
        `The 2021 Mercedes-Benz C-Class finishes in the top half of our
        luxury small car rankings. It's powerful and upscale, but it has
        so-so handli...`  , 
        100,
        '.menu .container'
    ).render()

    //     //AXIOS library
    // axios.get("http://localhost:3000/menu")
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new CarCard(img, altimg, title, descr, price, '.menu .container').render()
    //         })
    //     })

}

export default classes;