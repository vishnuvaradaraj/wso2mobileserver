$("#btn-add").click(function() {
	
	$( 'form').parsley( 'validate' );	
	if(!$('form').parsley('isValid')){
		noty({
				text : 'Input validation failed!',
				'layout' : 'center',
				'type' : 'error'
		});		
		return;
	}

	var firstname = $('#inputFirstName').val();
	var lastname = $('#inputLastName').val();
	var type = $('#inputType').val();
	var username = $('#inputEmail').val();
	var password = $('#inputPassword').val();
	var mobileNo = $('#inputMobile').val();
	var userGroups = $('#inputGroups').val();
	var tenantId = $('#tenantId').val();
	
	var userGroupsArray = []
	if (userGroups != null) {
		userGroupsArray = userGroups.toString().split(",");
	}
	// alert(JSON.stringify(userGroupsArray));
	jso = {
		"tenant_id" : tenantId,
		"username" : username,
		"password" : password,
		"first_name" : firstname,
		"last_name" : lastname,
		"mobile_no" : mobileNo,
		"type": type,
		"groups" : userGroupsArray
	};	
	
	noty({
				text : 'User Added successfully!',
				'layout' : 'center'
	});
	
	jQuery.ajax({
		url : getServiceURLs("usersCRUD", ""),
		type : "PUT",
		async : "false",
		data : JSON.stringify(jso),		
		contentType : "application/json",
     	dataType : "json"				
	});
	
	$( document ).ajaxComplete(function() {
		window.location.assign("configuration");
	});

});


$( ".radioUserType" ).change(function() {
	var value = $(this).val();	
	$(".box1 .filter").val(value);	
	$(".box1 .filter" ).change();
});


$( document ).ready(function() {
	var value = 'user';	
	$(".box1 .filter").val(value);	
	$(".box1 .filter" ).change();
});