function traerInformacion(){
    $.ajax({
        url:"http://150.136.106.94:8080/api/Reservation/all",
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
        myTable+="<td>"+respuesta[i].idReservation+"</td>"; 
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td> <button onclick='actualizarInformacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrar("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacion(){
    let var2 = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val()
        };
      
        $.ajax({
        url:"http://150.136.106.94:8080/api/Reservation/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),     
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            traerInformacion();
            alert("se ha guardado correctamente la reserva")
    
        }
        });

}

function actualizarInformacion(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            traerInformacion();
            alert("se ha Actualizado correctamente la reserva")
        }
    });

}

function borrar(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha eliminado la reserva")
        }
    });

}
