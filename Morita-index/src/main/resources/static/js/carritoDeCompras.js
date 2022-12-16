/* Variables Goblales */
let countProductsBuyshop = 0;
let countTotalBuyshop = 0;
/* Variables Goblales */




const iconBuyshop = document.querySelector('.icon-buyshop')
const buyshopCloseTargets = [...document.querySelectorAll('.buyshop-close')]
const buyshop = document.querySelector('.buyshop')
const ulBuyshop = document.querySelector('.ul-buyshop')
const targetAddedBuyShop = [...document.querySelectorAll('.fh5co-food-pricing')]


/* TARGET COUNTER PRODUCTS */
const counterProducts = document.querySelector('.counter-products')
const counterProducts2 = document.querySelector('.counterProducts2')
const countTotalBuyshopTarget = document.querySelector('.countTotalBuyshop')
/* TARGET COUNTER PRODUCTS */

document.addEventListener('DOMContentLoaded', () => {
    const targetsIcon = cargarCarritos()
    listenerTargetAdded(targetsIcon)


})

function listenerTargetAdded(targets) {
    targets.map(target => {
        target.addEventListener('click', ({ target }) => {
            updateCounters();
            addedProduct(target);
        })
    })
}

function addedProduct(target) {

    const product = document.createRange().createContextualFragment(`
        <li class="productSingle-buyshop">
            <img class="img-buyshop" src=${target.parentElement.previousElementSibling.firstElementChild.firstElementChild.src} alt="">
            <p>${target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.innerText}</p>
            <p>${target.previousElementSibling.innerText}</p>
            <span class="align-content-unit">
                <i>1 ud.</i>
                <i class="bi bi-plus-circle buyshop-plus"></i>
                <i class="bi bi-dash-circle buyshop-minus"></i>
            </span>
            <i class="bi bi-trash3-fill icon-trash-buyshop" title="eliminar del carrito"></i>
        </li>
    `)


    const [_, price] = target.previousElementSibling.innerText.split('/');
    updateTotalProducts(price);
    ulBuyshop.append(product);
    listenerUnitsProducts();
    listenerDeleteProduct();
}

function listenerDeleteProduct(){
    const targetsDeleteIcon = [...document.querySelectorAll('.icon-trash-buyshop')]
    targetsDeleteIcon.map(target => {
        target.removeEventListener('click', actionDeleteProductBuyShop)
    })
    targetsDeleteIcon.map(target => {
        target.addEventListener('click', actionDeleteProductBuyShop)
    })
}

function actionDeleteProductBuyShop({target}){
    target.parentElement.remove();
}

function listenerUnitsProducts() {

    const targetPlus = [...document.querySelectorAll('.buyshop-plus')]
    const targetMinus = [...document.querySelectorAll('.buyshop-minus')]

    targetPlus.map(target => {
        target.removeEventListener('click', actionAddedUnitsBuyShop)
    })
    targetPlus.map(target => {
        target.addEventListener('click', actionAddedUnitsBuyShop)
    })
    targetMinus.map(target => {
        target.removeEventListener('click', actionSubstractUnitsBuyShop)
    })
    targetMinus.map(target => {
        target.addEventListener('click', actionSubstractUnitsBuyShop)
    })

}

function actionAddedUnitsBuyShop({ target }) {
    let [ud, _] = target.previousElementSibling.innerText.split(' ');
    target.previousElementSibling.innerText = `${++ud} uds.`;

    const [__, price] = target.parentElement.previousElementSibling.innerText.split('/')

    updateTotalProductsForUnits(price, '+')
}
function actionSubstractUnitsBuyShop({ target }) {
    let [ud, _] = target.previousElementSibling.previousElementSibling.innerText.split(' ');
    if (ud == 2) {
        target.previousElementSibling.previousElementSibling.innerText = `${--ud} ud.`;
        const [__,price ] = target.parentElement.previousElementSibling.innerText.split('/')
        updateTotalProductsForUnits(price, '-')
    }else if(ud > 1){
        target.previousElementSibling.previousElementSibling.innerText = `${--ud} uds.`;
        const [__,price ] = target.parentElement.previousElementSibling.innerText.split('/')
        updateTotalProductsForUnits(price, '-')
    }

}

function updateTotalProductsForUnits(price, operator) {
    if(operator === '+'){
        countTotalBuyshop += Number(price)
        countTotalBuyshopTarget.innerText = `${countTotalBuyshop}.00`
    }else if(operator === '-'){
        countTotalBuyshop -= Number(price)
        countTotalBuyshopTarget.innerText = `${countTotalBuyshop}.00`
    }
}

function updateTotalProducts(price) {
    countTotalBuyshop += Number(price)
    countTotalBuyshopTarget.innerText = `${countTotalBuyshop}.00`
}

function updateCounters() {
    countProductsBuyshop++;
    counterProducts.innerText = countProductsBuyshop
    counterProducts2.innerText = countProductsBuyshop
}

function cargarCarritos() {
    targetAddedBuyShop.map(target => {
        target.innerHTML += `
        <i class="bi bi-cart-plus-fill added-buyshop" title="Agregar al carrito"></i>
        `
    })

    return [...document.querySelectorAll('.added-buyshop')]
}

iconBuyshop.addEventListener('click', () => {
    buyshop.classList.remove('inactive')
})

buyshopCloseTargets.map(buyshopClose => {
    buyshopClose.addEventListener('click', () => {
        buyshop.classList.add('inactive')
    })
})




/* FORMULARIO BUY SHOP */
const buttonOpenForm = document.querySelector('.button-56')
const buttonCloseForm = document.querySelector('.button-59')
const containerBuyshopForm = document.querySelector('.container-buyshop-form')
const containerBuyshop = document.querySelector('.container-buyshop')
/* FORM RESUMEN */
const formResumenTotal = document.querySelector('.form-resumen-total')
const formResumenTotalProducts = document.querySelector('.form-resumen-totalProducts')
const formBuyshopEntidad = document.querySelector('.form-buyshop-entidad')
const formBuyshopDirection = document.querySelector('.form-buyshop-direction')
const optionDelivery = document.querySelector('.option-delivery')
/* FORM SELECT */
const selectMethod = document.querySelector('.form-select-method')
const selectNaEntidad = document.querySelector('.select-na-entidad')
const formSelectPedido = document.querySelector('.form-select-pedido')
const formInputDireccion = document.querySelector('.form-input-direccion')

/* INPUTS FOR DEFAULT */
const containerInputsDynamic = document.querySelector('.form-inputs-dynamic')
const formInputTotal = document.querySelector('.form-input-total')
const formInputNproducts = document.querySelector('.form-input-nProducts')





buttonOpenForm.addEventListener('click', ({target}) => {
    if(countProductsBuyshop !== 0){
        updateForm();
        const targetsBuyShop = [...containerBuyshop.querySelectorAll('.productSingle-buyshop')];
        updateInputsDefault(targetsBuyShop);
    }
})

function updateInputsDefault(targets){
    formInputTotal.value = `S/${countTotalBuyshop}.00`;
    formInputNproducts.value = countProductsBuyshop;

    targets.map(target => {
        const inputProduct = document.createRange().createContextualFragment(`
            <input id="Products"  
            value="${target.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerText}" 
            name="${target.firstElementChild.nextElementSibling.innerText}" 
            class="form-control" 
            placeholder="N° productos" type="text"  autocomplete="off" >
        `)
        containerInputsDynamic.append(inputProduct)
    })

}

function updateForm(){
        containerBuyshop.classList.add('inactive')
        containerBuyshopForm.classList.remove('inactive')
        formResumenTotal.innerText = `S/${countTotalBuyshop}.00`;
        formResumenTotalProducts.innerText = `${countProductsBuyshop} Producto(s)`;
}


buttonCloseForm.addEventListener('click', ({target}) => {
    containerBuyshopForm.classList.add('inactive')
    containerBuyshop.classList.remove('inactive')
})




selectMethod.addEventListener('input', ({target}) => {
    if(target.value.toLowerCase() === 'transferencia'){
        formBuyshopEntidad.classList.remove('inactive')
        optionDelivery.removeAttribute('disabled')
        selectNaEntidad.removeAttribute('selected')
        selectNaEntidad.setAttribute('disabled', '')
    }else{
        formBuyshopEntidad.classList.add('inactive')
        optionDelivery.setAttribute('disabled', '')
        selectNaEntidad.setAttribute('selected','')

    }
})

formSelectPedido.addEventListener('input', ({target})=>{
    if(target.value.toLowerCase() === 'delivery **'){
        formBuyshopDirection.classList.remove('inactive')
    }else{
        formBuyshopDirection.classList.add('inactive')
        formInputDireccion.value = 'NA'
    }
})


