function traerInformacion(){
    $.ajax({
        url:"http://150.136.106.94:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].developer+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='actualizarInformacion("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrar("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacion(){
    let var2 = {
        name:$("#name").val(),
        developer:$("#developer").val(),
        year:$("#year").val(),
        description:$("#description").val()
        };
      
        $.ajax({
        url:"http://150.136.106.94:8080/api/Game/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),     
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#developer").val("");
            $("#year").val("");
            $("#description").val("");
            traerInformacion();
            alert("se ha guardado correctamente el juego")
    
        }
        });

}

function actualizarInformacion(idElemento){
    let myData={
        id:idElemento,
        name:$("#name").val(),
        developer:$("#developer").val(),
        year:$("#year").val(),
        description:$("#description").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Game/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#developer").val("");
            $("#year").val("");
            $("#description").val("");
            traerInformacion();
            alert("se ha Actualizado correctamente el juego")
        }
    });

}

function borrar(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Game/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha Eliminado el juego")
        }
    });

}
