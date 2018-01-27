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
        var doc = response;
       	 $('#addModal').modal('hide');
         $('#messageModal #message').html("Document has been added");
         $('#messageModal').modal();
         $('.table tbody').append(
          "<tr>"+
            "<td class='hide id'>"+doc['_id']+"</td>"+
            "<td>"+doc['document_number']+"</td>"+
            "<td>"+doc['document_title']+"</td>"+
            "<td>"+doc['document_physicalLocation']+"</td>"+
            "<td>"+doc['document_author']+"</td>"+
            "<td>"+
              "<a href='#' class='open'><i class='fas fa-search'></i></a>"+
              "<a href='#' class='edit'><i class='fas fa-pencil-alt'></i></a>"+
              "<a href='#' class='remove'><i class='fas fa-trash-alt'></i></a>"+
          "</td>"+
        "</tr>"
          );
       }
   });
     return false;
});
  getDocuments();
  $('.table').on('click','tbody tr td .open',e => {
        e.preventDefault();
        var clickedDocument = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        getDocumentWithId(clickedDocument);
  }); 
});

function getDocuments(){
  $.get("/documents/",data => {
      var docs = data;
      docs.map(doc => {
        $('.table tbody').append(
          "<tr>"+
            "<td class='hide id'>"+doc['_id']+"</td>"+
            "<td>"+doc['document_number']+"</td>"+
            "<td>"+doc['document_title']+"</td>"+
            "<td>"+doc['document_physicalLocation']+"</td>"+
            "<td>"+doc['document_author']+"</td>"+
            "<td>"+
              "<a href='#' class='open'><i class='fas fa-search'></i></a>"+
              "<a href='#' class='edit'><i class='fas fa-pencil-alt'></i></a>"+
              "<a href='#' class='remove'><i class='fas fa-trash-alt'></i></a>"+
          "</td>"+
        "</tr>"
          );
      })
  });
}

function getDocumentWithId(id){
	$.get('/documents/'+id,result => {
		var doc = result;
		$('#DocumentModal .modal-header .modal-title').html(doc.document_title);
		$('#DocumentModal .modal-content .authorData .data').html(doc.document_author);
		$('#DocumentModal .modal-content .descriptionData .data').html(doc.document_description);
		$('#DocumentModal .modal-content .physicalLocationData .data').html(doc.document_physicalLocation);
		$('#DocumentModal .modal-content .DocumentNrData .data').html(doc.document_number);
		$('#DocumentModal').modal();
	});
}

