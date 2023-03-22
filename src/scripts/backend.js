function init() {
  const path = $('[data-type=templ-path]');

  window.config = {
    path: path.length ? path.val() : '/local/templates/main',
  };
}

$(() => {
  init();
  forms();
});

window.objFormSuccess = {
  redirect: form => {
    window.location.href = form.data('redirect');
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
