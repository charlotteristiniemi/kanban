

function postNote() {
	$.ajax({
		url: "/",
		type: "post",
		data: $("textarea, select").serialize(),
    success: function(data, status, xhr){
    	console.log('data = ' + data);
    	console.log('status = ' + status);
    	console.log('xhr.responseText = ' + xhr.responseText);
      window.location.reload();
      return false;
    },
    error:function(xhr, status, error){
      
      var err = '';
      $.each(JSON.parse(xhr.responseText) , function(i, item) {
         
        err +='<li>'+item.msg+'</li>';
      });
      
      $(".error-list").html(err);
      return false;
    }
	});
}

function deleteNote(id) {
	window.location.href = '/delete_note/'+id;
}

function moveToRight(id, category_id) {
	window.location.href = '/move_note_to_right/'+id+'/'+category_id;
}

function moveToLeft(id, category_id) {
	window.location.href = '/move_note_to_left/'+id+'/'+category_id;
}