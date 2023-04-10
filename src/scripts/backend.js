import {swiperInit} from "./swipers";

function init() {
  const path = $('[data-type=templ-path]');

  window.config = {
    path: path.length ? path.val() : '/local/templates/main',
  };
}

$(() => {
  init();
  forms();
  selectEventAjax();
  basketEvent();
});

window.objFormSuccess = {
  redirect: (form, r) => {
    window.location.href = form.data('redirect') + r.id + '/';
  },
}

window.objFormErrors = {
  base: (form, r) => {
    alert(r.message);
  },
  view: (form, r) => {
    form.find('[data-error]').html(r.message);
  },
}

function forms() {
  $(document).on('submit', '[data-type=form-backend]', function(e) {
    e.preventDefault();

    const form = $(this),
      method = form.attr('method'),
      action = form.attr('action'),
      dataType = form.data('r-type'),
      fileElem = form[0].querySelector('[data-file-input]'),
      file = fileElem ? fileElem.appFile.files : [],
      data = file.length ? new FormData() : {};

    form.find('[data-type=get-field], input:checked[data-field]').each(function () {
      const val = $(this).val();

      if (!val) {
        return;
      }

      const field = $(this).attr('data-field');

      file.length ? data.append(field, val) : data[field] = val;
    });

    $.each(file, (i, item) => {
      data.append(`files[]`, item);
    });

    $.ajax({
      type: method ? method : 'POST',
      url: action ? action : `${window.config.path}/include/ajax/forms/index.php`,
      dataType: dataType ? dataType : 'json',
      data: data,
      contentType: file.length ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: !file.length,
      success: function (r) {
        switch (this.dataType) {
          case 'json':
            if (r.success) {
              const func = form.data('func');

              if (typeof func === 'object') {
                $.each(func, (i, item) => {
                  window.objFormSuccess[item](form, r);
                });
              } else {
                window.objFormSuccess[func](form, r);
              }
            } else {
              const errorFuncInit = form.data('func-error');

              errorFuncInit ? window.objFormErrors[errorFuncInit](form, r) : alert(r.message);
            }
            break;
          default:
            window.objFormSuccess[form.data('func')](form, r);
        }
      },
    });
  });
}

function pagen() {
  $(document).on('click', '[data-type=pagen]', function() {
    const thisObj = $(this),
      container = thisObj.parents('[data-container=entity]'),
      itemsContainer = container.find('[data-container=items]'),
      pagenContainer = container.find('[data-container=pagen]'),
      pagen = pagenContainer.find('[data-type=pagen]');

    $.ajax({
      type: 'GET',
      url: thisObj.data('url'),
      dataType: 'html',
      data: {
        ajax: 'pagen',
      },
      success: function(r) {
        itemsContainer.append($(r).find('[data-container=items]').children());
        pagen.remove();

        const pagenResponse = $(r).find('[data-type=pagen]');

        if (pagenResponse.length) {
          pagenContainer.append(pagenResponse);
        }
      },
    });
  });
}

function selectEventAjax() {
  $('[data-ajax-event]').on('change', function() {
    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: JSON.parse($(this).val()),
      success: function(r) {
        $('[data-replace]').each((i, item) => {
          const jqObj = $(item),
            selector = jqObj.data('replace');

          let response = $(r).filter(`[data-replace=${selector}]`);

          if (!response.length) {
            response = $(r).find(`[data-replace=${selector}]`);
          }

          jqObj.empty();
          jqObj.append(response.html());

          swiperInit();
        });
      },
    });
  });
}

window.basket = {
  eventsCallable: {
    success: {
      json: {
        add: obj => {
          obj.css({
            background: 'black',
            color: 'white',
          });

          obj.text('Товар в корзине');
        },
      },
      html: {
        replace: (obj, r) => {
          $('[data-replace]').each((i, item) => {
            const jqObj = $(item),
              link = jqObj.data('replace');

            let linkElem = $(r).filter(`[data-replace=${link}]`);

            if (!linkElem.length) {
              linkElem = $(r).find(`[data-replace=${link}]`);
            }

            jqObj.empty();
            jqObj.append(linkElem.children());
          });
        },
      }
    },
    error: {
      add: (obj, r) => {
        alert(r.message);
      },
      update: (obj, r) => {
        alert(r.message);
      },
      delete: (obj, r) => {
        alert(r.message);
      },
    },
  }
}

function basketEvent() {
  $(document).on('click', '[data-type=basket]', function() {
    const thisObj = $(this),
      type = thisObj.data('event-type'),
      dataType = thisObj.data('format-type'),
      url = thisObj.data('url');

    $.ajax({
      type: 'POST',
      url: url ? url : `${window.config.path}/include/ajax/basket/${type}.php`,
      dataType: dataType ? dataType : 'json',
      data: thisObj.data('params'),
      success: function(r) {
        switch (this.dataType) {
          case 'html':
            window.basket.eventsCallable.success.html.replace(thisObj, r);
            break;
          case 'json':
            window.basket.eventsCallable[r.success ? 'success' : 'error'].json[type](thisObj, r);
            break;
        }
      },
    });
  });
}
