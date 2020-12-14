$(document).on('click','#deletebutton',function(){  
    var prdtid = $(this).attr('dataid');
    $.ajax({  
        type: "POST",
        url: '/deleteuser/'+prdtid,
        dataType: 'json',
        success: function (data) {
            if (data['success'] == true) {
                alert('data deleted');  
                window.location = "http://localhost:3000/";
            }else{  
                alert('data not get deleted');  
            }  
        },  
        error:function(response){  
                 alert('server error')     
        }  
    });  
});  
$(document).on('click','#viewbutton',function(){  
    var prdtid = $(this).attr('dataid');
    window.location = "http://localhost:3000/edituser/"+prdtid;
})

$(".updateSubCategoryModalForm").on("submit", function (e) {
    e.preventDefault();
    var values = {};
    $.each($('#preview_form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    
    //var formData = new FormData($(this)[0]);
    var prdtid = $(this).attr('dataid');
    alert(values)
    $.ajax({
      url: '/updatuser/' + prdtid,
      type: 'POST',
      data:JSON.stringify(values),
      processData: false,
      contentType: 'application/json',
      dataType: "json",
      beforeSend: function () {
        $(".loaderMain").css({
          "display": "block"
        });
      },
      success: function (data) {
          alert(JSON.stringify(data))
        if (data.status == 200) {
            alert("Success")
          swal("Success", data.msg, "success");
          $(".loaderMain").css({
            "display": "none"
          });
          setTimeout(function () {
            location.href = base_url + "saveSubCategory";
          }, 2000);
        } else if (data.status == 201) {
          $(".loaderMain").css({
            "display": "none"
          });
          swal("Error", data.msg, "error");
        } else {
          $(".loaderMain").css({
            "display": "none"
          });
          swal("Error", data.msg, "error");
        }
      }
    });
})
$(document).on('click','#stripepaybtn',function(){  
 
  var amount  = $('#amounts').val();;
  var currency  = $('#volume').val();
  var user_id  = $('#user_ids').val();
  alert('helo'+amount+currency+user_id)
  window.location = 'http://localhost:3000/stripe/'+amount+'/'+currency+'/'+user_id   
});