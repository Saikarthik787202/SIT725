const addCards = (items) => {
  items.forEach(item => {
      let itemToAppend = `
          <div class="col s4 center-align">
              <div class="card medium">
                  <div class="card-image waves-effect waves-block waves-light">
                      <img class="activator" src="${item.path}">
                  </div>
                  <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                      <p>${item.subTitle}</p>
                  </div>
                  <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                      <p>${item.description}</p>
                  </div>
              </div>
          </div>`;
      $("#card-section").append(itemToAppend);
  });
};

const getCards = () => {
  $.get('/api/cards', (response) => {
      if (response.statusCode === 200) {
          addCards(response.data);
      }
  });
};

const submitForm = () => {
  let formData = {
      title: $('#title').val(),
      subTitle: $('#subTitle').val(),
      path: $('#path').val(),
      description: $('#description').val()
  };

  $.ajax({
      url: '/api/cards',
      type: 'POST',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: (response) => {
          if (response.statusCode === 200) {
              alert('Card added successfully');
              location.reload();
          }
      }
  });
};

$(document).ready(function(){
  $('.modal').modal();
  getCards();
});