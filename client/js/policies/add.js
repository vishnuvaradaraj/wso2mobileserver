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
	
	var policyName = $('#policyName').val();
	var policyType = $('#policyType').val();
	params = {};
	
	$(".policy-input").each(function(index) {
		
		var prefix = $(this).attr("id").split('-')[0];
		var suffix = $(this).attr("id").split('-')[1];		
		
				
		if(!params[prefix]){
			params[prefix] = new Object();
		}
		
		var param = params[prefix];	
		
		if($(this).attr('type') == 'checkbox'){	
			
			if($(this).is(':checked')){
				var checkVal = $(this).data("trueVal");
				if(checkVal !== ""){
					params[prefix]["function"] = checkVal;
				}
			}else{
				var checkVal = $(this).data("falseVal");
				if(checkVal !== ""){
					params[prefix]["function"] = checkVal;
				}
			}	
				
		}else{	
			if($(this).val() !== ""){
				params[prefix][suffix] = $(this).val();
			}			
			
		}
	});
	

	//alert(params.length);
	
	var policyData =  Array();
	
	for (var param in params) {     	
     	policyData.push({code: param, data: params[param]});
	}




	//policy data for blacklisted apps
	var policyDataBlackList = new Array(); 
	$('#inputBlackListApps > option').each(function() { 		
    	policyDataBlackList.push({identity: $(this).text(), os: $(this).data('os'), type: $(this).data('type')});
	});
		
	if(policyDataBlackList.length > 0){
		policyData.push({code: "509A", data: policyDataBlackList});
	}
	
	
	
	
		
	jQuery.ajax({
		url : getServiceURLs("policiesCRUD", ""),
		type : "POST",
		async : "false",
		data: JSON.stringify({policyData: policyData, policyName: policyName, policyType: policyType}),		
		contentType : "application/json",
     	dataType : "json"		
	});
	
	noty({
		text : 'Policies added successfully!',
		'layout' : 'center',
		'modal': false
	});
	
	$( document ).ajaxComplete(function() {
		//window.location.assign("configuration");
	});
	
});








$( "#modalBlackListAppButton" ).click(function() {
		$("#inputBlackListApps").append('<option data-type="'+ $("#modalBlackListType").val() +'" data-os="'+ $("#modalBlackListOS").val() +'" value="'+ $("#modalBlackListPackageName").val()  +'">' + $("#modalBlackListPackageName").val()  + '</option>');
});

$( "#modalBlackListAppRemove" ).click(function() {
	 $("#inputBlackListApps :selected").each(function() {
    		$(this).remove();
	});
});




$(document).ready(function() {
	
	jQuery.ajax({
		url : getServiceURLs("getMAMApps"),
		type : "GET",
		dataType : "json",
		success : function(apps) {			
			
			for(var i = 0; i < apps.length; i++){
				$('select[name="inputInstallApps_helper1"]').append('<option>'+ apps.name + '</option>');
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
	
	
	
	

});