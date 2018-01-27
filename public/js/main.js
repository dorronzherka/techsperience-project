$(document).ready(() => {
	$('#addModal').click(e => {
		var file = $('#file')[0].files[0];
		var formData = new FormData();
		formData.append(file);
		console.log(file);
	})
});