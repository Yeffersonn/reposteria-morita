(function(){
    //debugger;
    var listaEditar = document.querySelectorAll(".editarProducto");
    listaEditar.forEach(item =>{
        item.addEventListener("click", e=>{
            document.getElementById('id').value = item.dataset.id; 
            document.getElementById('cboCategoria').value = item.dataset.categoria;
            document.getElementById('txtNombre').value = item.dataset.nombre;
            document.getElementById('txtPrecio').value = item.dataset.precio;
            new bootstrap.Modal(document.getElementById('modalEditar')).show();
        })
    })
})();