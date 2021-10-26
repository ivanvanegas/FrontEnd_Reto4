function traerInformacion(){
    $.ajax({
        url:"http://150.136.106.94:8080/api/Client/all",
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
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";

        myTable+="<td> <button onclick='actualizarInformacion("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrar("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacion(){
    let var2 = {
        
        name:$("#name").val(),
        age:$("#age").val(),
        email:$("#email").val(),
        password:$("#password").val()
        };
      
        $.ajax({
        url:"http://150.136.106.94:8080/api/Client/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),     
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#age").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacion();
            alert("se ha guardado correctamente el cliente")
    
        }
        });

}

function actualizarInformacion(idElemento){    
    let myData={
        idClient:idElemento,
        name:$("#name").val(),
        age:$("#age").val(),
        email:$("#email").val(),
        password:$("#password").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#age").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacion();
            alert("se ha actualizado correctamente el cliente")
        }
    });

}

function borrar(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.136.106.94:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha eliminado el cliente.")
        }
    });

}
