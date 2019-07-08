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
}

$(document).ready(function () {

    /********* validaciones iniciales para que todo este bloqueado **********/
    recargar();

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
                var valor;
                var suma = 0;
                response.forEach(fila => {
                    valor += `<tr>
          <th scope="col">` + fila.codigo + `</th>
          <td class="text-justify">` + fila.descripcion + `</td>
          <td>` + fila.peso + `</td>
          <td id="Tolva_` + fila.codigo + `"></td>
          <td id="Area_` + fila.codigo + `"></td></tr>`;
                    suma += parseFloat(fila.peso);
                });
                $('#CamposTabla').html(valor);
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

    /********* Boton para validar que la receta esta registrada **********/
    $("#rechazar_cambio1").click(function () {
        $("#pt01").val('0');
    });
    $("#rechazar_cambio2").click(function () {
        $("#pt02").val('0');
    });
    $("#rechazar_cambio3").click(function () {
        $("#pt03").val('0');
    });

    /********* Boton para validar que la receta esta registrada **********/
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

    var grasa = parseFloat($('#GrasaPostPellet').val());
    var max = parseFloat($('#maxGrasa').html());

    if (isNaN(max)) {
        $('#deseag_modal').modal('hide');
        $('#resumen_modal').modal('show');
    }else{
        if (grasa <= max) {
            $('#deseag_modal').modal('hide');
            $('#resumen_modal').modal('show');
        } else {
            $('#errorm_modal').modal('show');
        }
    }
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
            noAgregarGrasa();

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