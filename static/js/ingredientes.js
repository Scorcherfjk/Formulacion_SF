
$(document).ready(function () {
    $('#nuevo_habilitado').val('');
    $('#nuevo_codigo').val('');
    $('#nuevo_descripcion').val('');
    $('#nuevo_area').val('');
});

function modalModificar(id) {

    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();

            // Upload progress 
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            // Download progress 
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            return xhr;
        },
        url: '/datos_ingrediente',
        data: {
            'data': id
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);

            $('#tbl_habilitado').val(response.habilitado)
            $('#tbl_codigo').val(response.codigo.trim());
            $('#tbl_descripcion').val(response.descripcion.trim());
            $('#tbl_area').val(response.area);
            $('#id_ingrediente').val(id);
            $('#modificar_modal').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });

}

function nuevoIngrediente() {

    var nuevo_habilitado = $('#nuevo_habilitado').val();
    var nuevo_codigo = $('#nuevo_codigo').val();
    var nuevo_descripcion = $('#nuevo_descripcion').val();
    var nuevo_area = $('#nuevo_area').val();

    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();

            // Upload progress 
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            // Download progress 
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            return xhr;
        },
        url: '/nuevo_ingrediente',
        data: {
            'habilitado' : nuevo_habilitado,
            'codigo' : nuevo_codigo,
            'descripcion' : nuevo_descripcion,
            'area' : nuevo_area
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            console.log(response);
            $('#nuevo_modal').modal('hide');
            $('#exito_modal').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });

}

function modificarIngrediente() {

    var id_ingrediente = $('#id_ingrediente').val();
    var tbl_habilitado = $('#tbl_habilitado').val();
    var tbl_codigo = $('#tbl_codigo').val();
    var tbl_descripcion = $('#tbl_descripcion').val();
    var tbl_area = $('#tbl_area').val();

    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();

            // Upload progress 
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            // Download progress 
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total * 100;
                    $('#progress').css('width', percentComplete + '%');
                }
            }, false);

            return xhr;
        },
        url: '/modificar_ingrediente',
        data: {
            'data': id_ingrediente,
            'habilitado' : tbl_habilitado,
            'codigo' : tbl_codigo,
            'descripcion' : tbl_descripcion,
            'area' : tbl_area
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            console.log(response);
            $('#modificar_modal').modal('hide');
            $('#exito_modal').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });

}