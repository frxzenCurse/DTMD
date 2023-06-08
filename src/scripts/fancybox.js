
// fancybox
$(() => {
  $('[data-modal-button]').on('click', function (event) {
    event.preventDefault();
    const id = $(this).attr('data-modal-button')
    const modal = $(`[data-modal="${id}"]`)

    modal.addClass('active')
    $('body').addClass('body--hidden')
  });
  $('[data-modal-close]').on('click', function (event) {
    const modal = $(this).closest('[data-modal]')

    modal.removeClass('active')
    $('body').removeClass('body--hidden')
  });
});

