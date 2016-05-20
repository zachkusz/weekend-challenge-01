//Zach kusz, April 30, 2016. UPDATED May 19, 2016.
$(document).ready(function(){
getEmployees();

  $('#employeeinfo').on('submit', function(event){
    event.preventDefault();

    //loops through entered info to enter it into an object
    var employee = {};
    $.each($('#employeeinfo').serializeArray(), function(i, field){
      employee[field.name] = field.value;
    });
    employee.active = true;

    console.log(employee);

    $.ajax ({
    type: 'POST',
    url: '/employees',
    data: employee,
    success: function (data) {
      getEmployees();//make function to append dom - use it here
      console.log('posted!');
    }
  });

    //clear out inputs
    $('#employeeinfo').find('input[type=text]').val('');

    appendDom(employee);

    i++;
  });

  function getEmployees() {
    $.ajax ({
    type: 'GET',
    url: '/employees',
    //data: employee,
    success: function (data) {
      appendDom(data);
      console.log('posted!');
      }
    });
  }

  function appendDom(data) {
    console.log(data);
    $('#container').empty();

    data.forEach(function(row) { //err data is not a function??? still works tho
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();
      $el.append('<p>First Name: ' + row.first_name + '</p>');
      $el.append('<p>Last Name: ' + row.last_name + '</p>');
      $el.append('<p>ID: ' + row.id_number + '</p>');
      $el.append('<p>Job Title: ' + row.job_title+ '</p>');
      $el.append('<p>Salary: ' + row.salary + '</p>');
      $el.append('<input type="checkbox" id="active" />' +
      '<label for="active">Active</label>')
    });
  }

  //Button to clear out last entry
  $('#container').on('click', '.delete', function(){
    console.log("Delete button is clickable!");

    $(this).parent().remove();

  });

});
