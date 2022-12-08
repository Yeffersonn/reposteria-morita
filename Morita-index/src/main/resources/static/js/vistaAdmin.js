
const namesProducts = [...document.querySelectorAll('.fh5co-food-desc div')]
const pricesProducts = [...document.querySelectorAll('.fh5co-food-pricing')]


document.addEventListener('DOMContentLoaded', () => {

    namesProducts.map( (container) => {
        container.innerHTML += `
        <i class="icon-admin edit bi bi-pen-fill" title="Editar Nombre" ></i>
        <i class="icon-admin save bi bi-save-fill" title="Guardar"></i>
        <input class="input-admin inactive" type="text">
        `
    })
    
    pricesProducts.map( (container) => {

        container.innerHTML += `
        <i class="icon-admin edit bi bi-pen-fill" title="Editar Precio" ></i>
        <i class="icon-admin save bi bi-save-fill" title="Guardar"></i>
        <input class="input-admin inactive" type="text">
        `
    })

    const editTargets = [...document.querySelectorAll('.edit')]
    const saveTargets = [...document.querySelectorAll('.save')]

    editTargets.forEach( edit => {
        edit.addEventListener('click', ({target}) => {
            target.nextElementSibling.nextElementSibling.classList.toggle('active')
            const textName = target.previousElementSibling.innerText
            target.nextElementSibling.nextElementSibling.setAttribute('value', textName) 
        })
    })

    saveTargets.forEach( save => {
        save.addEventListener('click', ({target}) => {
            if(target.nextElementSibling.value !== ''){
                const newText = target.nextElementSibling.value
                target.previousElementSibling.previousElementSibling.innerText = newText;
                target.nextElementSibling.classList.remove('active')
            }
        })
    })
})