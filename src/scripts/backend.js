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
  clickEventAjax();
  basketEvent();
  pagen();
  geo();
  selectLocation();
  dataFormAppend();
  cdekDeliveryInfo();
  dependentElem();
  orderRefresh();
  changePayment();
  displayBlock();
  cdekWidget();
  GA4();
});

function GA4() {
  window.dataLayer = window.dataLayer || [];

  function viewItemList () {
    const items = document.querySelector('[data-view-items]');

    if (!items) {
      return;
    }

    const data = [];

    $(items).find('[data-view-item]').each((i, item) => {
      const jqObj = $(item);

      data.push({
        item_name: jqObj.find('[data-name]').text(),
        item_id: jqObj.find('[data-id]').val(),
        price: jqObj.find('[data-price]').text(),
        item_brand: jqObj.find('[data-brand]').val(),
        item_category: jqObj.find('[data-category]').val(),
        item_list_name: 'сatalog',
        index: i + 1,
        quantity: 1
      });
    });

    dataLayer.push({ ecommerce: null });

    console.log(
      ({
      event: 'view_item_list',
      ecommerce: {
        item_list_name: 'сatalog',
        items: data
      }
    }));
  }

  viewItemList();

  $(document).on('click', '[data-ga4-select-item]', function() {
    let item = $(this).closest('[data-container=item]');

    if (!item.length) {
      item = $(this);
    }

    dataLayer.push({ ecommerce: null });

    console.log(dataLayer.push({
      event: 'select_item',
      ecommerce: {
        items: [{
          item_name: item.find('[data-name]').text(),
          item_id: item.find('[data-id]').val(),
          item_brand: item.find('[data-brand]').val(),
          item_category: item.find('[data-category]').val(),
          item_list_name: 'catalog',
          item_list_id: '1',
          index: 1,
          quantity: 1,
          price: item.find('[data-price]').text()
        }]
      }
    }));
  });
}

function cdekWidget() {
  if (!document.querySelector('[data-widjet]')) {
    return;
  }

  window.cdekWidjet = new ISDEKWidjet({
    mode: 'pvz',
    showWarns: true,
    showErrors: true,
    showLogs: true,
    popup: true,
    country: 'Россия',
    defaultCity: document.querySelector('[data-city-val]').value,
    cityFrom: 'Москва',
    hidedress: true,
    hidecash: true,
    hidedelt: true,
    onReady: () => {
      const geo = $('[data-geo]').val();

      if (geo) {
        window.cdekWidjet.city.set(geo);
      }

      window.cdekWidjet.ready = true;
    }
  });

  window.cdekWidjet.binders.add(choosePVZ, 'onChoose');

  function choosePVZ(e) {
    const elem = document.querySelector('[data-type=pvz-addr]');

    elem.setAttribute('data-val', `${e.PVZ.Address} #S${e.id}`);
    elem.textContent = e.PVZ.Address;
  }
}

function displayBlock() {
  $(document).on('click', '[data-type=display-block]', function() {
    const thisObj = $(this),
      elem = $(thisObj.data('selector'));

    if (elem.css('display') === 'none') {
      elem.fadeIn();
    } else {
      elem.fadeOut();
    }
  });
}

function changePayment() {
  $(document).on('change', '[data-type=change-payment]', function() {
    $.ajax({
      type: 'POST',
      url: '/bitrix/components/bitrix/sale.order.payment.change/ajax.php',
      data: {
        accountNumber: $('[data-account-number]').val(),
        paymentNumber: $('[data-payment-number]').val(),
        sessid: $('[data-sessid]').val(),
        paySystemId: $(this).val(),
        inner: 'N',
        refreshPrices: 'Y',
        onlyInnerFull: 'N',
      },
      success: () => {
        $.ajax({
          type: 'get',
          url: window.location.href,
          success: r => {
            replace(r);
          },
        });
      },
    });
  });
}

function dependentElem() {
  $(document).on('change', '[data-type=dependent-elem]', function() {
    const thisObj = $(this),
      id = thisObj.data('id'),
      linkElems = $('[data-link-id]');

    linkElems.css('display', 'none');
    linkElems.find('input').removeAttr('required');

    if (id) {
      const linkElem = $(`[data-link-id=${id}]`);

      linkElem.css('display', 'block');
      linkElem.find('input').attr('required', 'required');
    }
  });
}

function cdekDeliveryInfo() {
  $(document).on('click', '[data-cdek-delivery-info]', function() {
    const thisObj = $(this),
      data = {
        'CITY_TO': thisObj.data('value'),
        'DELIVERY': 30,
        'isdek_action': 'countDelivery',
        'isdek_token': $('[data-type=sdek-token]').val(),
      };

    $.ajax({
      type: 'POST',
      url: '/bitrix/js/ipol.sdek/ajax.php',
      data: data,
      success: r => {
        console.log(r);
      },
    });
  });
}

function dataFormAppend() {
  $(document).on('click', '[data-form-append]', function() {
    const thisObj = $(this),
      form = thisObj.closest('form'),
      field = thisObj.data('field'),
      val = thisObj.data('value'),
      elem = form.find(`input[data-field=${field}]`);

    if (elem.length) {
      elem.val(val);
    } else {
      form.append(`<input type="hidden" data-type="get-field" data-field="${field}" value="${val}">`);
    }
  });
}

function selectLocation() {
  $(document).on('change', '[data-select-location]', function() {
    window.location.href = $(this).val();
  });
}

$(document).on('click', '[data-append-input-val]', function () {
  $('[data-geo]').val($(this).text());
  $('[data-container=geo]').removeClass('active');
});

function closeOutFocus(elem) {
  if (elem.length) {
    const id = elem.data('close-id');

    $(document).on('click', e => {
      if (!e.target.closest(`[data-close-id=${id}]`)) {
        elem.removeClass('active');
      }
    });
  }
}

function orderRefresh() {
  $(document).on('click', '[data-order-refresh-event]', function () {
    const thisObj = $(this),
      data = thisObj.data('order-refresh');

    $.ajax({
      type: 'POST',
      url: window.location.href,
      data: data,
      success: r => {
        replace(r);

        if (window.cdekWidjet.ready) {
          window.cdekWidjet.city.set(thisObj.text());
        }
      },
    });
  });
}

function geo() {
  closeOutFocus($('[data-container=geo]'));

  $(document).on('input', '[data-geo]', function() {
    const thisObj = $(this),
      geoContainer = thisObj.closest('[data-container=geo]'),
      val = thisObj.val();


    if (val) {
      geoContainer.addClass('active');

      const data = {
        version: 2,
        PAGE_SIZE: thisObj.data('page-size'),
        PAGE: 0,
        filter: {
          '=PHRASE': val,
          '=NAME.LANGUAGE_ID': thisObj.data('lang-id'),
          '=SITE_ID': thisObj.data('site-id'),
        },
        select: {
          1: 'CODE',
          2: 'TYPE_ID',
          VALUE: 'ID',
          DISPLAY: 'NAME.NAME',
        },
        additionals: {
          1: 'PATH',
        },
      };

      $.ajax({
        type: 'POST',
        url: '/bitrix/components/bitrix/sale.location.selector.search/get.php',
        data: data,
        success: r => {
          try {
            r = JSON.parse(r.replace(/\'/g,'"'));
          } catch (e) {
            console.log(e.message);
          }

          const container = $('[data-container=geo-list]'),
            items = container.find('[data-container=get-list-items]'),
            empty = container.find('[data-search-not-found]');

          items.empty();

          if (r.data.ITEMS) {
            $.each(r.data.ITEMS, (i, item) => {
              items.append(`<div class="city-drop__item" data-append-input-val data-order-refresh-event data-order-refresh='{"location": "${item.CODE}", "ajax": "delivery"}' data-form-append data-cdek-delivery-info data-field="location" data-value="${item.CODE}">${item.DISPLAY}</div>`);
            });

            empty.addClass('hidden');
          } else {
            empty.removeClass('hidden');
          }
        },
      });
    } else {
      geoContainer.removeClass('active');
    }
  });
}

window.objFormSuccess = {
  redirect: form => {
    window.location.href = form.data('redirect');
  },
  redirectAnswer: (form, r) => {
    window.location.href = form.data('redirect') + r.id + '/';
  },
  redirectServer: (form, r) => {
    window.location.href = r.redirect;
  },
  reload: () => {
    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      success: function(r) {
        replace(r);
      },
    });
  },
}

window.objFormErrors = {
  base: (form, r) => {
    alert(r.message);
  },
  view: (form, r) => {
    const errorElem = form.find('[data-error]');

    if (!errorElem.length) {
      alert(r.message);

      return;
    }

    errorElem.css('display', 'block');
    errorElem.html(r.message);
  },
  order: (form, r) => {
    const errorElem = form.find('[data-container=error]');
    let message = '';

    if (typeof r.message === 'string') {
      message += r.message;
    } else {
      r.message.forEach(item => {
        message += item.message + '<br>';
      });
    }

    errorElem.html(message);
    errorElem.css('display', 'block');
  },
  register: (form, r) => {
    window.objFormErrors.view(form, r);

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: {
        ajax: 'captcha-reload',
      },
      success: function(r) {
        replace(r);
      },
    });
  },
}

window.forms = {
  getData: {
    base: (data, file, elem) => {
      file ? data.append(elem.data('field'), elem.val()) : data[elem.data('field')] = elem.val();
    },
    dependentElem: (data, file, elem) => {
      if (file) {
        data.append(elem.data('field'), elem.val());
      } else {
        data[elem.data('field')] = elem.val();
      }

      elem.closest('form').find(`[data-link-id=${elem.data('id')}]`).find('[data-field]').each((i, item) => {
        const jqObj = $(item);

        let linkVal = jqObj.data('val');

        if (!linkVal) {
          linkVal = jqObj.val();
        }

        if (!linkVal) {
          linkVal = jqObj.text();
        }

        if (file) {
          data.append(jqObj.data('field'), linkVal);
        } else {
          data[jqObj.data('field')] = linkVal;
        }
      });
    }
  }
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

      const getType = $(this).data('get-type');

      window.forms.getData[getType ? getType : 'base'](data, file.length, $(this));
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
      pagenContainer = container.find('[data-container=pagen]');

    $.ajax({
      type: 'GET',
      url: thisObj.data('url'),
      dataType: 'html',
      data: {
        ajax: 'pagen',
      },
      success: function(r) {
        itemsContainer.append($(r).filter('[data-container=items]').children());
        pagenContainer.empty();

        const pagenResponse = $(r).filter('[data-container=pagen]').children();

        if (pagenResponse.length) {
          pagenContainer.append(pagenResponse);
        }
      },
    });
  });
}

function selectEventAjax() {
  $('[data-ajax-event]').on('change', function() {
    const thisObj = $(this),
      url = thisObj.data('url');

    $.ajax({
      type: 'GET',
      url: url ? url : window.location.href,
      dataType: 'html',
      data: JSON.parse($(this).val()),
      success: function(r) {
        replace(r);
        swiperInit();
      },
    });
  });
}

window.basket = {
  eventsCallable: {
    success: {
      add: obj => {
        obj.css({
          background: 'black',
          color: 'white',
        });

        obj.text('Товар в корзине');

        window.ajaxCallable.counter(obj, true);
      },
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
      url = thisObj.data('url');

    $.ajax({
      type: 'POST',
      url: url ? url : `${window.config.path}/include/ajax/basket/${type}.php`,
      data: thisObj.data('params'),
      success: function(r) {
        if (typeof r === 'object') {
          window.basket.eventsCallable[r.success ? 'success' : 'error'][type](thisObj, r);
        } else {
          replace(r);
        }
      },
    });
  });
}

function replace(r) {
  $('[data-replace]').each((i, item) => {
    const jqObj = $(item),
      link = jqObj.data('replace');

    let linkElem = $(r).filter(`[data-replace=${link}]`);

    if (!linkElem.length) {
      linkElem = $(r).find(`[data-replace=${link}]`);
    }

    jqObj.empty();
    jqObj.append(linkElem.html());
  });
}

window.ajaxCallable = {
  active: elem => {
    let activeElem = elem.parents('[data-container=active]'),
      adding = true;

    if (!activeElem.length) {
      activeElem = elem;
    }

    const isActive = activeElem.hasClass('active');

    if (isActive) {
      activeElem.removeClass('active');
      adding = false;
    } else {
      activeElem.addClass('active');
    }

    window.ajaxCallable.counter(elem, adding);
  },
  counter: (elem, adding) => {
    const parent = elem.closest('[data-entity]');

    if (!parent.length) {
      return;
    }

    const counterSelector = parent.data('counter-selector');

    if (!counterSelector.length) {
      return;
    }

    const counterElem = $(counterSelector);

    counterElem.text(adding ? +counterElem.text() + 1 : +counterElem.text() - 1);
  },
  reload: () => {
    location.reload();
  },
  redirect: elem => {
    window.location.href = elem.data('redirect');
  },
  reloadAjax: () => {
    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      success: function(r) {
        replace(r);
      },
    });
  },
}

function clickEventAjax() {
  $(document).on('click', '[data-ajax-event-click]', function(e) {
    e.preventDefault();

    const thisObj = $(this),
      container = thisObj.parents('[data-container]'),
      url = container.data('url');

    $.ajax({
      type: 'POST',
      url: url ? url : window.location.href,
      dataType: 'json',
      data: thisObj.data('ajax'),
      success: function(r) {
        if (!r.success) {
          alert(r.message);

          return;
        }

        window.ajaxCallable[container.data('func')](thisObj, r);
      },
    });
  });
}
