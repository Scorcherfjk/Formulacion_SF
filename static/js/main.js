$(window).on('load', function () {
    setTimeout(function () {
        $(".loader-page").css({
            visibility: "hidden",
            opacity: "0"
        })
    }, 1000);


});

function recargar() {
    $('#seleccion').val('0');
    $('#pt01').val('0');
    $('#pt02').val('0');
    $('#pt03').val('0');
    $('#especificaciones').hide();
    $('#boton_validar').attr('disabled', true);
    $('#boton_transferir').attr('disabled', true);
    $('#CantidadIngredientes').val('');
    $('#PesoTotalFormula').val('');
    $('#OrdenProd').val('');
    $('#batches').val('');
    $('#Agua').val('');
    $('#GrasaPostPellet').val('');
    $('#ing_manual').val('0');
    $('#dosificacion_ingManual').val('');
    $('#Zona_ing_manual').val('0');
}

function cambiar() {
    $('#pt01').val('0');
    $('#pt02').val('0');
    $('#pt03').val('0');
    $('#especificaciones').hide();
    $('#boton_validar').attr('disabled', true);
    $('#boton_transferir').attr('disabled', true);
    $('#CantidadIngredientes').val('');
    $('#PesoTotalFormula').val('');
    $('#OrdenProd').val('');
    $('#batches').val('');
    $('#Agua').val('');
    $('#GrasaPostPellet').val('');
    $('#ing_manual').val('0');
    $('#dosificacion_ingManual').val('');
    $('#Zona_ing_manual').val('0');
}

/********* validaciones iniciales para que todo este bloqueado **********/
$(document).ready(function () {
    recargar();
});

/********* Dropdowns **********/
/********* Dropdown de seleccion de recetas **********/
$("#seleccion").change(function () {
    cambiar();
    $('#progress').css('width', '0%');
    var seleccion = $(this).val()
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
        url: '/cargar_receta',
        data: {
            'data': seleccion
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var MyDate = new Date();
            var MyDateString = ('0' + MyDate.getDate()).slice(-2) + ('0' + (MyDate.getMonth() + 1)).slice(-2);
            var sel = seleccion.trim();
            var response = JSON.parse(response);
            var tabla, select;
            var suma = 0;
            response.forEach(fila => {
                tabla += `<tr>
          <th scope="col">` + fila.codigo + `</th>
          <td class="text-justify">` + fila.descripcion + `</td>
          <td class="text-right">` + fila.peso + `</td>
          <td id="Tolva_` + fila.codigo + `"></td>
          <td id="Area_` + fila.codigo + `"></td></tr>`;
                suma += parseFloat(fila.peso);
                select += `<option value="` + fila.codigo + `">` + fila.codigo + ` - ` + fila.descripcion + `</option>`;
            });
            $('#CamposTabla').html(tabla);
            $('#ing_manual').html(select);
            $('#CantidadIngredientes').val(response.length);
            $('#PesoTotalFormula').val(Math.round(suma * 100) / 100);
            $('#OrdenProd').val(sel + MyDateString);
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
        $('#boton_validar').attr('disabled', false);
    });
});

/********* Dropdown de producto terminado pt01 **********/
$("#pt01").change(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $(this).val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/validar_tolva',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                $('#tolvao_modal1').modal('show');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

/********* Dropdown de producto terminado pt02 **********/
$("#pt02").change(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $(this).val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/validar_tolva',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                $('#tolvao_modal2').modal('show');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

/********* Dropdown de producto terminado pt03 **********/
$("#pt03").change(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $(this).val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/validar_tolva',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                $('#tolvao_modal3').modal('show');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

/********* Botones **********/
/********* Boton para validar que la receta esta registrada **********/
$("#boton_validar").click(function () {
    $('#progress').css('width', '0%');
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
        url: '/validar_receta',
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            var vacios_tolva = [];
            var vacios_area = [];

            response.forEach(fila => {
                if (!fila.tolva) vacios_tolva.push(fila);
                if (!fila.area) vacios_area.push(fila);

                let tolva = "#Tolva_" + fila.codigo;
                let area = "#Area_" + fila.codigo;
                $(tolva).html(fila.tolva);
                $(area).html(fila.area);
            });

            if (vacios_tolva.length < 1 && vacios_area.length < 1) {
                $('#boton_transferir').attr('disabled', false);
                $('#exito_modal').modal('show');
                $('#especificaciones').show();
            } else {
                if (vacios_tolva.length > 0) {
                    let valor_tolva = "<ul>";
                    vacios_tolva.forEach(fila => {
                        valor_tolva += "<li>" + fila.codigo + " - " + fila.descripcion + "</li>";
                    });
                    valor_tolva += "</ul>";
                    $('#error_tolva').html(valor_tolva);
                    $('#errort_modal').modal('show');
                }

                if (vacios_area.length > 0) {
                    let valor_area = "<ul>";
                    vacios_area.forEach(fila => {
                        valor_area += "<li>" + fila.codigo + " - " + fila.descripcion + "</li>";
                    });
                    valor_area += "</ul>";
                    $('#error_area').html(valor_area);
                    $('#errora_modal').modal('show');
                }
            }

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

/********* Boton para transferir los datos al PLC **********/
$("#boton_transferir").click(function () {
    var val_a = false,
        val_b = false;

    var pt01_val = $('#pt01').val(),
        pt02_val = $('#pt02').val(),
        pt03_val = $('#pt03').val();

    var noBatch = $('#batches').val();
    $('#progress').css('width', '0%');

    if (noBatch != '') {
        val_a = true
    } else {
        $('#errorb_modal').modal('show');
    }

    if (pt01_val != null || pt02_val != null || pt03_val != null) {
        val_b = true
    } else {
        $('#errorpt_modal').modal('show');
    }

    if (val_a && val_b) {
        $('#deseaa_modal').modal('show');
    }

});

/********* Boton para rechazar cambio de receta en tolva PT **********/
$("#rechazar_cambio1").click(function () {
    $("#pt01").val('0');
});
$("#rechazar_cambio2").click(function () {
    $("#pt02").val('0');
});
$("#rechazar_cambio3").click(function () {
    $("#pt03").val('0');
});

/********* Boton para aceptar cambio de receta en tolva PT **********/
$("#aceptar_cambio1").click(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $("#pt01").val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/reemplazar_tolva',
        type: 'POST',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                console.log('cambiada');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

$("#aceptar_cambio2").click(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $("#pt02").val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/reemplazar_tolva',
        type: 'POST',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                console.log('cambiada');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

$("#aceptar_cambio3").click(function () {
    $('#progress').css('width', '0%');
    var seleccion_pt = $("#pt03").val();
    var seleccion_receta = $("#seleccion").val();
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
        url: '/reemplazar_tolva',
        type: 'POST',
        data: {
            'data': seleccion_pt,
            'receta': seleccion_receta
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {
            var response = JSON.parse(response);
            if (response) {
                console.log('cambiada');
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
});

/********* inputs **********/
/********* input de cantidad de grasa no mayor al maximo **********/
$('#GrasaPostPellet').on('keyup', function (){
    var grasa = parseFloat($(this).val());
    var maxGrasa = parseFloat($('#maxGrasa').html());
    if (grasa <= maxGrasa) {
        $('#btn_cambiarGrasa').attr('disabled', false);
    }else{
        $('#btn_cambiarGrasa').attr('disabled', true);
    }
});

/********* input de cantidad de agua no mayor al maximo **********/
$('#Agua').on('keyup',function (){
    var agua = parseFloat($(this).val());
    if (agua <= 10) {
        $('#btn_cambiarAgua').attr('disabled', false);
    }else{
        $('#btn_cambiarAgua').attr('disabled', true);
    }
});

function agregarAgua() {
    $('#deseaa_modal').modal('hide');
    $('#agregara_modal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $('#agregara_modal').modal('show');
};

function noAgregarAgua() {
    $('#deseaa_modal').modal('hide');
    $('#deseag_modal').modal('show');
};

function agregarGrasa() {
    $('#deseag_modal').modal('hide');

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
        url: '/consultar_grasa',
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            console.log(response);
            $('#nombreGrasa').val(response.nombre);
            $('#maxGrasa').html(response.cantidad);
            $('#agregarg_modal').modal({
                backdrop: 'static',
                keyboard: false
            })
            $('#agregarg_modal').modal('show');

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });


};

function noAgregarGrasa() {

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
        url: '/no_postpellet',
        type: 'POST',
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            console.log(response);
            $('#deseag_modal').modal('hide');
            validarTotal()

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });
   
};

function cambiarAgua() {
    $('#agregara_modal').modal('hide');
    noAgregarAgua();
};

function cambiarGrasa() {
    $('#agregarg_modal').modal('hide');
    var grasa = $('#GrasaPostPellet').val();
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
        url: '/cambiar_grasa',
        type: 'POST',
        data: {
            'data': grasa
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            console.log(response);
            $('#deseag_modal').modal('hide');
            validarTotal()

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });


};

function transferirReceta() {
    $('#resumen_modal').modal('hide');
    var agua = $('#Agua').val();
    var nombre = $('#seleccion').val();
    var noOrdenProd = $('#OrdenProd').val();
    var batches = $('#batches').val();
    var pt01 = $('#pt01').val();
    var pt02 = $('#pt02').val();
    var pt03 = $('#pt03').val();

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
        url: '/transferir_receta',
        type: 'POST',
        data: {
            'data': agua,
            'noOrdenProd': noOrdenProd,
            'nombre': nombre,
            'batch': batches,
            'pt01': pt01,
            'pt02': pt02,
            'pt03': pt03,
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            console.log(response);
            $('#exitot_modal').modal('show');

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });

};

function resumen_modal() {
    $('#tbl_agua').html($('#Agua').val());
    var receta = $('#seleccion').find('option:selected');
    $('#tbl_formula').html(receta.text());
    $('#tbl_factor').html($('#factorBalanza').val());
    $('#tbl_grasa').html($('#GrasaPostPellet').val());
    $('#tbl_noOrdenProd').html($('#OrdenProd').val());
    $('#tbl_noBatch').html($('#batches').val());
    var pt01 = $('#pt01').val() ? $('#pt01').val() : '';
    var pt02 = $('#pt02').val() ? $('#pt02').val() : '';
    var pt03 = $('#pt03').val() ? $('#pt03').val() : '';
    $('#tbl_tolvaspt').html(pt01 + " " + pt02 + " " + pt03);
    $('#resumen_modal').modal('show');
};

function validarTotal() {  
    if (parseInt($('#PesoTotalFormula').val()) < 999 ) {
        $('#agregarim_modal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $('#agregarim_modal').modal('show');
    }else{
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
            url: '/no_ing_manual',
            type: 'POST',
            beforeSend: function () {
                console.log('Enviada');
            },
            success: function (response) {
    
                var response = JSON.parse(response);
                console.log(response);
                $('#agregarim_modal').modal('hide');
                resumen_modal()
    
            },
            error: function (error) {
                console.log(error);
            }
        }).done(function (data) {
            $('#progress').removeClass('progress-bar-animated');
        });
    }
};

function cambiarIngManual(){
    
    var ingrediente = $('#ing_manual').val();
    var valor = $('#dosificacion_ingManual').val();
    var zona = $('#Zona_ing_manual').val();

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
        url: '/ing_manual',
        type: 'POST',
        data: {
            'data': valor,
            'ingrediente': ingrediente,
            'zona': zona
        },
        beforeSend: function () {
            console.log('Enviada');
        },
        success: function (response) {

            var response = JSON.parse(response);
            console.log(response);
            $('#agregarim_modal').modal('hide');
            resumen_modal()

        },
        error: function (error) {
            console.log(error);
        }
    }).done(function (data) {
        $('#progress').removeClass('progress-bar-animated');
    });

};