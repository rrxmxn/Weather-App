function abrirModal(id) {
    var modal = document.getElementById('dialog-' + id);
    if (modal) {
        modal.showModal();
    }
}

function fecharModal(id) {
    var modal = document.getElementById('dialog-' + id);
    if (modal) {
        modal.close();
    }
}