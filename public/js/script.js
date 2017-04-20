function goToFilter() {
  window.location.href = '/filter';
}

function startPage() {
  window.location.href = '/';
}

function goToTransaction() {
  window.location.href = '/transaction'
}

function moveToRight(id, category_id) {
  window.location.href = '/move_note_to_right/'+id+'/'+category_id;
}

function moveToLeft(id, category_id) {
  window.location.href = '/move_note_to_left/'+id+'/'+category_id;
}

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

  $.ajax({
    url: "/"+id,
    type: "delete",
    success: function(data, status, xhr) {
      window.location.reload();
      return false;
    },
    error: function(xhr, status, error) {
      return false;
    }
  });
}