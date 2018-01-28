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
}) 

  getDocuments();
  $('.table').on('click','tbody tr td .open',e => {
        e.preventDefault();
        var clickedDocument = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        getDocumentWithId(clickedDocument);
  });
   $('.table').on('click','tbody tr td .remove',e => {
        e.preventDefault();
        clickedDocument = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        modalConfirmBox(result => {
        	if(result){
        		deleteImages(clickedDocument);
        		$(e.currentTarget.parentElement.parentElement).remove();
        	}
        })
  }); 

  $('.table').on('click','tbody tr td .edit',e => {
        e.preventDefault();
        clickedDocumentId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        documenti = e.currentTarget.parentElement.parentElement;
        console.log(documenti);
        getDocumentWithIdForEdit(clickedDocumentId);
  });

  $('#submit').click(() => {
  	var updatedDocument = {
			document_number : $('#editModal #documentNr').val(),
			document_title : $('#editModal #title').val(),
			document_description : $('#editModal #description').val(),
			document_physicalLocation : $('#editModal #physicalLocation').val(),
			document_author : $('#editModal #author').val()
		}
		editDocument(clickedDocumentId,updatedDocument);
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
		clean();
		doc.document_scannedImages.map(image => {
			 $('.images').append(
			 	"<a  href='images/"+image+"' data-fancybox='group' data-caption='"+image+"'>"+
			 	"<img  class='img-thumbnail img-responisve' src='images/"+image+"' alt='' /></a>"
			 	
			 );
		});
		$('#DocumentModal').modal();
	});

}

function clean(){
	 $('.images').html("");
}

function deleteDocument(id){
	$.ajax({
	 	type : "delete",
	 	url : "/documents/delete/"+id,
	 	success : result => {
	 		$('#addModal').modal('hide');
	 		  $('#messageModal #message').html("Document has been deleted");
	 		  $('#messageModal').modal();
	 	}
	});
}

function deleteImages(id){
	$.ajax({
	 	type : "get",
	 	url : "/deleteImages/"+id,
	 	success : result => {
	 		var res = result;
	 		if(res.msg == "deleted"){
	 			deleteDocument(id);
	 		}
	 	}
	});
}

var modalConfirmBox = callback => {
	$('#confirmationModal').modal();

	$('#yes').on('click', () => {
		callback(true);
		$('#confirmationModal').modal('hide');
	});

	$('#no').on('click' , () => {
		callback(false);
		$('#confirmationModal').modal('hide');

	})
}


function getDocumentWithIdForEdit(id){
	$.get('/documents/'+id,result => {
		var doc = result;
		$('#editModal .modal-content #title').val(doc.document_title);
		$('#editModal .modal-content #author').val(doc.document_author);
		$('#editModal .modal-content #description').val(doc.document_description);
		$('#editModal .modal-content #physicalLocation').val(doc.document_physicalLocation);
		$('#editModal .modal-content #documentNr').val(doc.document_number);
		$('#editModal').modal();
	});

}

function editDocument(id,editedDocument){
	$.ajax({
		url : '/documents/update/'+id,
		type :'put',
		data : editedDocument,
		success : result =>{
			  $('#editModal').modal('hide');
			  documenti.children[1].innerHTML = result.document_number;
			  documenti.children[2].innerHTML = result.document_title;
			  documenti.children[3].innerHTML = result.document_physicalLocation;
			  documenti.children[4].innerHTML = result.document_author;
			  $('#messageModal #message').html("Document has been added");
			  $('#messageModal').modal();
		}
	})
}




