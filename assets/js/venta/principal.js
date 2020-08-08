$(function() {

    /*$.ajax({
        type:"get",
        headers:{"apikey":"LNGPOEEOHHFRNGVGBJUWFKJJQFRXOPFDWPVYRWMZTIADHDSYNYKXALNJLPMK","codigocomercio":"15221035"},
        
        url:"http://service.grupopalomino.com.pe:8090/restservice/api/busportal/ciudades",
        dataType: 'json',
        success: function (rsp) {
            console.log(rsp);
            /*for (i = 0; i < rsp.listaOrigenCombo.length; i++) {
                $('#cboorigen').append($('<option>', {
                    value: rsp.listaOrigenCombo[i].id,
                    text: rsp.listaOrigenCombo[i].text
                }));
                $('#cboorigen2').append($('<option>', {
                    value: rsp.listaOrigenCombo[i].id,
                    text: rsp.listaOrigenCombo[i].text
                }));
            }
            //$('#cboorigen').refresh();
            //createControlSelection($('#cboorigen'),rsp.listaOrigenCombo.length) 
            //$('#cboorigen').load();
            for (i = 0; i < rsp.listaDestinoCombo.length; i++) {
                $('#cbodestino').append($('<option>', {
                    value: rsp.listaDestinoCombo[i].id,
                    text: rsp.listaDestinoCombo[i].text
                }));
                $('#cbodestino2').append($('<option>', {
                    value: rsp.listaDestinoCombo[i].id,
                    text: rsp.listaDestinoCombo[i].text
                }));
            }
            $('select').niceSelect();
        }

    });*/
    $.ajax({
        type: "get",
        url: "https://ventas.grupopalomino.com.pe:8443/ventas/destinosciudades",
        dataType: 'json',
        //data: { origenCiudad: $('#hidOrigenCiudad').val(), destinoCiudad: $('#hidDestinoCiudad').val() },
        success: function(rsp) {
            console.log(rsp.listaOrigenCombo);
            for (i = 0; i < rsp.listaOrigenCombo.length; i++) {
                $('#cboorigen').append($('<option>', {
                    value: rsp.listaOrigenCombo[i].id,
                    text: rsp.listaOrigenCombo[i].text
                }));
                $('#cboorigen2').append($('<option>', {
                    value: rsp.listaOrigenCombo[i].id,
                    text: rsp.listaOrigenCombo[i].text
                }));
            }
            //$('#cboorigen').refresh();
            //createControlSelection($('#cboorigen'),rsp.listaOrigenCombo.length) 
            //$('#cboorigen').load();
            for (i = 0; i < rsp.listaDestinoCombo.length; i++) {
                $('#cbodestino').append($('<option>', {
                    value: rsp.listaDestinoCombo[i].id,
                    text: rsp.listaDestinoCombo[i].text
                }));
                $('#cbodestino2').append($('<option>', {
                    value: rsp.listaDestinoCombo[i].id,
                    text: rsp.listaDestinoCombo[i].text
                }));
            }
            $('select').niceSelect();
            /*
            $("#cboorigen").select2({
                            data: data.listaOrigenCombo,
                            theme: "bootstrap",
                            placeholder: { id: '-1', text: 'Seleccione Origen' },
                            language: "es"
                        });
                        $("#cbodestino").select2({
                            data: data.listaDestinoCombo,
                            theme: "bootstrap",
                            placeholder: { id: '-1', text: 'Seleccione Destino' },
                            language: "es"
                        });
            
                        var listaCantidadPasajeros = data.listacantidadPasajeros
                        $("#cbopasajero option[value='-1']").remove();
                        $("#cbopasajero").append("<option value='-1'>Pasajeros</option>")
                        $.each(listaCantidadPasajeros, function (k, v) {
                            $("#cbopasajero")
                            .append("<option value=" + v['cbopasajero'] + ">" + v['cbopasajero'] + "</option>")
                        })
             */




        },
        error: function(error) {

        }

    });

    $('input[name="check-in-out"]').daterangepicker({
        autoUpdateInput: false,
        opens: 'left'
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });


});

var soloida = true;
$('.linePreloader').css('display', 'none');

function buscarprogramacion() {
    //event.preventDefault();

    //origenIda=001&destinoIda=003&fechaIda=07%2F05%2F2019&cantidadMaximaPasajeros=1

    $('.load-programaciones').empty();



    if ($('#cbopasajero').val() == '-1') {
        $('#cbopasajero').val('1');
    }
    if ($('#cbopasajero2').val() == '-1') {
        $('#cbopasajero2').val('1');
    }

    if (soloida == true) {
        //CONDICION PARA IDA
        $.ajax({
            type: "post",
            data: $("#frmprogramacion2").serialize(),
            dataType: 'json',
            url: "https://ventas.grupopalomino.com.pe:8443/ventas/verificadisponibilidad",
            beforeSend: function(response) {
                //$('.load-programaciones').css({ "background-image": "url(" + ($('#hidImg').val() == '0' ? "" : "../") + "gif/load.gif)", "background-repeat": "no-repeat", "background-position": "center", "min-width": "40px", "min-height": "40px" });
                console.log($("#frmprogramacion2").serialize());
                $('.load-programaciones').html("");
                $('.linePreloader').css('display', 'block');
            },
            success: function(res) {
                console.log(res);

                if (res.error) {
                    $('.load-programaciones').css({ "background-image": "none" });
                    $('.linePreloader').css('display', 'none');
                    $('.load-programaciones').addClass('load-error');
                    $('.load-programaciones').append('' + res.mensajeServer + '');
                } else {
                    window.location = "https://ventas.grupopalomino.com.pe:8443/ventas/redireccionadisponibilidad" + "?" + res.url
                }

            },
            error: function(error) {
                console.log(error);
                $('.linePreloader').css('display', 'none');
                $('.load-programaciones').css({ "background-image": "none" });
                $('.load-programaciones').addClass('load-error');
                $('.load-programaciones').append('ocurrio un problema en el servidor, por favor intentelo mas tarde.')
            }
        });
    }
    //CONDICION PARA RETORNO
    else {
        $.ajax({
            type: "post",
            data: $("#frmprogramacion").serialize(),
            dataType: 'json',
            url: "https://ventas.grupopalomino.com.pe:8443/ventas/verificadisponibilidad",
            beforeSend: function() {
                $('.load-programaciones').css({ "background-image": "url(" + ($('#hidImg').val() == '0' ? "" : "../") + "gif/load.gif)", "background-repeat": "no-repeat", "background-position": "center", "min-width": "40px", "min-height": "40px" });
                console.log($("#frmprogramacion").serialize());
                $('.load-programaciones').html("<p></p>");
            },
            success: function(res) {
                console.log(res); 
                if (res.error) {
                    $('.load-programaciones').css({ "background-image": "none" });
                    $('.load-programaciones').addClass('load-error');
                    $('.load-programaciones').append('<p>' + res.mensajeServer + '</p>');
                } else {
                    window.location = "https://ventas.grupopalomino.com.pe:8443/ventas/redireccionadisponibilidad" + "?" + res.url
                }

            },
            error: function(error) {
                //alert(error);
                console.log(error);
                $('.load-programaciones').css({ "background-image": "none" });
                $('.load-programaciones').addClass('load-error');
                $('.load-programaciones').append('<p>ocurrio un problema en el servidor, por favor intentelo mas tarde.</p>')
            }
        });
    }
};



function GetFormattedDate(d) {
    var todayTime = d;
    var month = format(todayTime.getMonth() + 1);
    var day = format(todayTime.getDate());
    var year = format(todayTime.getFullYear());
    return day + "/" + month + "/" + year;
}

$('#dateida1').daterangepicker({
    "singleDatePicker": true,
    "timePicker": false,
    "startDate": new Date(),
    "minDate": new Date()
        //"formatDate":"dd-MM-yyyy"
}, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

$('#dateida2').daterangepicker({
    "singleDatePicker": true,
    "timePicker": false,
    "startDate": new Date(),
    "minDate": new Date()
}, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});

$('#datevuelta').daterangepicker({
    "singleDatePicker": true,
    "timePicker": false,
    "startDate": new Date(),
    "minDate": new Date()
}, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});


$("#btnida").on("click", function() {
    soloida = true;
    console.log(soloida);
});

$("#btnvuelta").on("click", function() {
    soloida = false;
    console.log(soloida);
});