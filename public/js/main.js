$(document).ready(() => {
	$('.uploadImage').submit(function(e){
     e.preventDefault();
     var documentNr = parseInt($('#documentNr').val());
     var title = $('#title').val();
     var physicalLocation = $('#physicalLocation').val();
     var description  = $('#description').val();
     var author = $('#author').val();
     $(this).ajaxSubmit({
       data : {
       		document_number : documentNr,
       		document_title : title,
       		document_description : description,
       		document_physicalLocation : physicalLocation,
       		document_author : author
       },
       contentType: 'application/json',
       success: function(response){
       	 $('#addModal').modal('hide');
         $('#messageModal #message').html("Document has been added");
         $('#messageModal').modal();    
       }
   });
     return false;
});
});