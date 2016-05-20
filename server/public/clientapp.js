//Zach kusz, April 30, 2016. UPDATED May 19, 2016.
$(document).ready(function(){
  var monthlyCost = 0;
  getEmployees();
  getTotal();

  $('#employeeinfo').on('submit', function(event){
    event.preventDefault();

    //loops through entered info to enter it into an object
    var employee = {};
    $.each($('#employeeinfo').serializeArray(), function(i, field){
      employee[field.name] = field.value;
    });
    employee.active = true;

    $.ajax ({
    type: 'POST',
    url: '/employees',
    data: employee,
    success: function (data) {
      getEmployees();//make function to append dom - use it here
      getTotal();
      console.log('posted!');
      }

    });

    //clear out inputs
    $('#employeeinfo').find('input[type=text]').val('');

    appendDom(employee);

  });
  
  //AJAX!
  function getEmployees() {
    $.ajax ({
    type: 'GET',
    url: '/employees',
    success: function (data) {
      appendDom(data);
      console.log('posted!');
      }
    });
  }

  function putEmployees() {
    $.ajax ({
      type: 'PUT',
      url: '/employees',
      data: employee,
      success: function(res) {
        appendDom(res);
      }
    });
  }

  function appendDom(data) {

    var status = '';
    $('#container').empty();

    data.forEach(function(row) {
      //if status in database is active(true), set checkbox to checked
      if (row.active) {
        status = ' checked="checked" ';
      }
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();
      $el.append('<p>First Name: ' + row.first_name + '</p>');
      $el.append('<p>Last Name: ' + row.last_name + '</p>');
      $el.append('<p>ID: ' + row.id_number + '</p>');
      $el.append('<p>Job Title: ' + row.job_title+ '</p>');
      $el.append('<p>Salary: ' + row.salary + '</p>');
      $el.append('<input type="checkbox" id="active" ' + status + ' />' +
      '<label for="active">Active</label>')
    });
  }

  //active switch click event
  $('#container').on('click', '#active', function() {
    console.log('switch clicked');

  });

  function getTotal() {
    $.ajax ({
    type: 'GET',
    url: '/salaries',
    success: function (data) {
      monthlyCost = data[0].totalsalary / 12;
      $('#monthlyCost').text('Total Monthly Cost: ' + monthlyCost);
      console.log('here!');
      }
    });
  }

});
