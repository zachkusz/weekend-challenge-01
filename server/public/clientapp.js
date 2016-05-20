//Zach kusz, April 30, 2016. UPDATED May 19, 2016.
$(document).ready(function(){

  //initializes variables used to calulate salary
  var array = [];
  var yearlyCost = 0;
  var monthlyCost = 0;
  var i = 0;

  $('#employeeinfo').on('submit', function(event){
    event.preventDefault();

    //loops through entered info to enter it into an object
    var employee = {};
    $.each($('#employeeinfo').serializeArray(), function(i, field){
      employee[field.name] = field.value;
    })

    console.log(employee);

    $.ajax ({
    type: 'POST',
    url: '/employees',
    data: employee,
    success: function (data) {
      //make function to append dom - use it here
      console.log('posted!');
    }
  });

    //clear out inputs
    $('#employeeinfo').find('input[type=text]').val('');

    //Calculates salary at yearly and monthly costszach.kusz
    yearlyCost += Number(employee.employeesalary);
    monthlyCost = (yearlyCost / 12);

    //calculate monthly sal that is appended to each .person
    //one at a time

    console.log(monthlyCost);
    appendDom(employee);

    i++;
  });

  function appendDom(empInfo) {
    //makes a div to "store" the object info
    $('#container').append('<div class="person"></div>');
    //sets the last made object to a variable for ease of reference
    var $el = $('#container').children().last();
    //adds the employee info to the new div to make it visible to user
    $el.append('<p>First Name: ' + empInfo.employeefirstname + '</p>');
    $el.append('<p>Last Name: ' + empInfo.employeelastname + '</p>');
    $el.append('<p>ID: ' + empInfo.employeeID + '</p>');
    $el.append('<p>Job Title: ' + empInfo.employeejobtitle+ '</p>');
    $el.append('<p>Salary: ' + empInfo.employeesalary + '</p>');
    $el.append('<p>New Total Monthly Cost: ' + monthlyCost + '</p>');
    $el.data("monthlysalary", monthlyCost);
  }

  //Button to clear out last entry
  $('#delete').on('click', function(){
    console.log("Delete button is clickable!");
    $('#container > .person').last().remove();
    i--;
    yearlyCost = yearlyCost - Number(array[i]);
    monthlyCost = (yearlyCost / 12);
    array.pop();
    i++;
    console.log(monthlyCost);
    $('#container').append('<div class="updatedCost"></div>');
    $('#container').children().last().append('<p>New Total Monthly Cost: '+
    monthlyCost + '</p>');

  });

});
