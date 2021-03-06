var Registroapto=RegistroUapto='';
var parametroAjax = {
    'token': $('input[name=_token]').val(),
    'tipo': 'POST',
    'data': {},
    'ruta': '',
    'async': false
};
var ManejoRespuesta = function(respuesta){
    if (respuesta.code=200){
        $('#foto-condominio1').attr('src','/img/home.png')+ '?' + Math.random();
        $('#foto-condominio2').attr('src','/img/home.png')+ '?' + Math.random();
        $('#foto-condominio3').attr('src','/img/home.png')+ '?' + Math.random();
        destruirTablaS('tablaApartamentos');
        cargarTablaApartamentos(respuesta.respuesta);         
    }else{
        mensajesAlerta('Error','Ocurrio un error al eliminar las imagenes', 'error');
    }
}

var ManejoRespuestaDelApartamentos = function(respuesta){
    if (respuesta.code=200){
        destruirTablaS('tablaUsuarioApartamentos');
        limpiarTabla();
        cargarTablaApartamentosU(respuesta.respuesta.v_aptosUsuarios);
        cargarTablaApartamentos(respuesta.respuesta.v_usuariosAptos);
    }else{
        mensajesAlerta('Error','Ocurrio un error al eliminar', 'error');   
    }

}

var ManejoRespuestaApartamentos = function(respuesta){
    if (respuesta.code=200){
        $(".divForm").toggle();
        $(".divMostrar").toggle();    
        cargarTablaApartamentosU(respuesta.respuesta);
    }else{
        mensajesAlerta('Error','Ocurrio un error', 'error');   
    }

}
var ManejoRespuestaProcesar = function(respuesta){ 
    if(respuesta.code=200){
    	var res = JSON.parse(respuesta.respuesta.f_registro_apartamento[0].f_registro_apartamento);
    	switch(res.code) {
    	    case '200':
                mensajesAlerta('Procesado!',res.des_code, 'info');
                limpiarTabla();
                cargarTablaApartamentos(respuesta.respuesta.v_usuariosAptos);
                $(".divForm").toggle();
                $('#FormApartamento')[0].reset();
    	        break;
    	    case '-2':
    	        mensajesAlerta('Error',res.des_code, 'error');
    	        break;
    	    default:
    	        mensajesAlerta('Error','Comuniquese con el personal de sopore técnico', 'error');
    	} 
    }else{
        mensajesAlerta('Error','Comuniquese con el personal de sopore técnico', 'error');
    }
}

var cargarTablaApartamentosU = function(data){
    $("#tablaUsuarioApartamentos").dataTable({
        "columnDefs": [
        {
            "targets": -1,
            "data": null,
            "targets": [ 1 ],
            "searchable": true,
        }
        ],
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "data": data,
        "columns":[
        {"title": "Id","data": "id_apartamento",visible:0},
        {"title": "Número de casa / Apto","data": "numero"},
        {"title": "Nombres de casa / Apto","data": "nombre"},
        {"title": "Porcentaje","data": "porcentaje"},
        {"title": "Observaciones","data": "obs"},
        {"title": "Id_sede","data": "id_sede",visible:0}
        ],
    });
    seleccionartablaApartamentosU();
};
var seleccionartablaApartamentosU=function(){
    var tableE = $('#tablaUsuarioApartamentos').dataTable();
    $('#tablaUsuarioApartamentos tbody').on('click', 'tr', function (e){
        tableE.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        RegistroUapto = TablaTraerCampo('tablaUsuarioApartamentos',this);
        editartablaApartamentosU(RegistroUapto);
    });
};
var editartablaApartamentosU=function(data){
    $(function() {
        $.contextMenu({
            selector: '#tablaUsuarioApartamentos',
            callback: function(key, options) {
                switch(key) {
                    case "1": 
                        eliminarApartamento(RegistroUapto);            
                    break;
                }
            },
            items: {
                "1": {name: "Eliminar apartamento", icon: "delete"},
            }
        });
    });
};

var cargarTablaApartamentos = function(data){
    $("#tablaApartamentos").dataTable({
        "columnDefs": [
        {
            "targets": -1,
            "data": null,
            "targets": [ 1 ],
            "searchable": true,
        }
        ],
        "language": {
            "url": "/DataTables-1.10.10/de_DE-all.txt"
        },
        "data": data,
        "columns":[
        {"title": "Id","data": "id_sede",visible:0},
        {"title": "Rut","data": "rut"},
        {"title": "Nombres","data": "name"},
        {"title": "Teléfono","data": "telefonoresidencial"},
        {"title": "Movil","data": "movil"},
        {"title": "Correo","data": "email"},
        {"title": "Apartamento(s)","data": "apartamentos"},
        {"title": "Id_sede","data": "id_sede",visible:0}
        ],
    });
};
var Procesarapartamento = function(){
    parametroAjax.data = $("#FormApartamento").serialize();
    parametroAjax.ruta=ruta;
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaProcesar(respuesta);
};
var cargarForm = function(){
	$('.divCam').hide();
    $(".divForm").toggle();
    $("#id_sede").val("");
    $('#FormApartamento')[0].reset();
    $(".comboclear").val('').trigger("change");
}
var cargarTabla = function(){
    limpiar();
    $(".divForm").toggle();
    $('.divCam').hide();
    $("#cancelar").html(" Cancelar");
}
var mostrarApartamentos = function(){
    parametroAjax.data = {id_usuario:Registroapto.user_id};
    parametroAjax.ruta=rutaU;
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaApartamentos(respuesta);
}
var volverApartamentos = function(){
    $(".divMostrar").toggle();
    $(".divForm").toggle();
    destruirTablaS('tablaUsuarioApartamentos');
}

var eliminarApartamento = function(){
    parametroAjax.data = {id_apartamento:RegistroUapto.id_apartamento,id_usuario:RegistroUapto.id_usuario};
    parametroAjax.ruta=rutaD;
    respuesta=procesarajax(parametroAjax);
    ManejoRespuestaDelApartamentos(respuesta);
}
var limpiar = function(){
	$("#FormApartamento")[0].reset();
    $('.foto-perfil').attr('src','/img/foto.png')+ '?' + Math.random();
    $('#id_apartamento').val("");
    $('#user_id').val("");
}
var pintarDatosActualizar= function(data){
    $(".divForm").toggle();
	$('.divCam').show();
    if(data.name!=null){$("#name").text(data.name);}
    if(data.user_id!=null){$("#user_id").val(data.user_id);}
    if (data.urlimage!=null){
        if (data.urlimage.length>1){
            $('.foto-perfil').attr('src',data.urlimage)+ '?' + Math.random();
        }
    }
    $("#cancelar").html(" Volver");
}

var validarA=function(){$('#FormApartamento').formValidation('validate');};
var limpiarTabla = function(){destruirTablaS('tablaApartamentos');};
$(document).ready(function(){
	$("#tituloPantalla").text("Apartamentos");
	cargarTablaApartamentos(d.v_usuariosAptos);
    $(document).on('click','#guardar',validarA);
    $(document).on('click','#agregar',cargarForm);
    $(document).on('click','#cancelar',cargarTabla);
    $(document).on('click','#volverA',volverApartamentos);
    var tableB = $('#tablaApartamentos').dataTable();
    $('#tablaApartamentos tbody').on('click', 'tr', function (e) {
        tableB.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        Registroapto = TablaTraerCampo('tablaApartamentos',this);
    });
    tableB.on('dblclick', 'tr', function () {
        $('#close').trigger('click');
    });
     $(function() {
        $.contextMenu({
            selector: '#tablaApartamentos',
            callback: function(key, options) {
                switch(key) {
                    case "1":
                        pintarDatosActualizar(Registroapto);
                    break;
                    case "2":
                        mostrarApartamentos(Registroapto);
                    break;
                }
            },
            items: {
                "1": {name: "Asignar", icon: "add"},
                "2": {name: "Ver detalle", icon: "edit"},
            }
        });
    });

    $('#FormApartamento').formValidation({
        // message: 'El módulo le falta un campo para ser completado',
        fields: {
            verbose: false,
            'tipo': {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar casa o apartamento'
                    }
                }
            },
            'numero': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            },
           'porcentaje': {
                verbose: false,
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    },
                }
            },
        }
    }).on('success.form.fv', function(e){
        Procesarapartamento();
    }).on('status.field.fv', function(e, data){
        data.element.parents('.form-group').removeClass('has-success');
    });
});
