function traerInformacion(){
    $.ajax({
        url:"http://150.136.106.94:8080/api/Message/all",
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
        myTable+="<td>"+respuesta[i].idMessage+"</td>";        
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick='actualizarInformacion("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrar("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacion(){
    let var2 = {
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val()
        };
      
        $.ajax({
        url:"http://150.136.106.94:8080/api/Message/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),     
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            traerInformacion();
            alert("se ha guardado correctamente el mensaje")
    
        }
        });

}

function actualizarInformacion(idElemento){
    let myData={
        idMessage:idElemento,
        
        messageText:$("#messageText").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            
            $("#messageText").val("");
            traerInformacion();
            alert("se ha Actualizado correctamente el mensaje")
        }
    });

}

function borrar(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha Eliminado.")
        }
    });

}
