$( document ).ready(function( $ ) {
 $("#2sheets").submit(function(event){
                var $form = $(this);
                var $inputs = $form.find("input, select, button, textarea");
                var serializedData = $form.serialize();

                $('#status').text('Actualizando');
				
                request = $.ajax({
                        url: "https://script.google.com/macros/s/AKfycbzqO3v7GmY6xM2XuGVvqOH4R6WkKWXudToa6lzx-kVSzOQD4b8/exec",
						type: "POST",
                        data: serializedData
                });
                request.done(function (response, textStatus, jqXHR){
                        // log a message to the console
                $('#status').text('Actualización exitosa');
                });
        

                request.fail(function (jqXHR, textStatus, errorThrown){
                $('#status').html('Error al actualizar</br>Llamar al 7221 031920');
                        console.error(
                                "The following error occured: "+
                                textStatus, errorThrown
                        );
                });
				
             request.always(function () {
                        // reenable the inputs
                });
                event.preventDefault();
        });
});