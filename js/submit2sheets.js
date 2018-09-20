$( document ).ready(function( $ ) {

});

function updateSheets() {

                var $form = $("#2sheets");
                var $inputs = $form.find("input, select, button, textarea");
                var serializedData = $form.serialize();

                $('#status').text('Actualizando');
				var url = "https://script.google.com/macros/s/AKfycbzqO3v7GmY6xM2XuGVvqOH4R6WkKWXudToa6lzx-kVSzOQD4b8/exec?tipo="
				var param = "2sheets"
				
				
                request = $.ajax({
						crossDomain: true,
                        url: url+encodeURIComponent(param),
						type: "POST",
                        data: serializedData,
						dataType: "json"
                });
                request.done(function (response, textStatus, jqXHR){
                        // log a message to the console
                $('#status').text('Actualización exitosa');
                });
        

                request.fail(function (jqXHR, textStatus, errorThrown){
                $('#status').html('Error: No se guardaron los datos.');
                        console.error(
                                "The following error occured: "+
                                textStatus, errorThrown
                        );
                });
				
             request.always(function () {
                        // reenable the inputs
                });
               
 }