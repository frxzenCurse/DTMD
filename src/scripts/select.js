import 'select2';

// select
{
  $(() => {
    // const select = $('.select__select');
    $('.select__select').each(function () {
      const select = $(this);
      const selectWrapper = select.closest('.select-wrapper');
      const selectWrapperStyles = getComputedStyle(selectWrapper[0]);
      const selectPlaceholder = $(this).data('select-placeholder')
      const isIcons = $(this).attr('data-icons-select')
      const isBack = $(this).attr('data-select-back')
      
      if (selectWrapperStyles.position === 'static') {
        selectWrapper.css('position', 'relative');
      }

      select.select2({
        dropdownParent: selectWrapper,
        selectOnClose: true,
        minimumResultsForSearch: Infinity,
        placeholder: selectPlaceholder,
      });

      select.on('select2:open', (e) => {
        selectWrapper.css('z-index', '100000');
        const evt = "scroll.select2";
        $(e.target).parents().off(evt);
        $(window).off(evt);

        const selectDropdown = selectWrapper.find('.select2-dropdown');

        selectDropdown.hide();
        const timeout = setTimeout(() => {
          selectDropdown.slideDown({ duration: 500, });

          clearTimeout(timeout);
        }, 0);
      });

      select.on('select2:closing', event => {
        event.preventDefault();

        const selectDropdown = selectWrapper.find('.select2-dropdown');

        const timeout = setTimeout(() => {
          selectWrapper.css('z-index', '');

          const select2 = selectWrapper.find('.select2');

          select2.addClass('closing');
          select2.removeClass('select2-container--open');
          selectDropdown.slideUp(500, () => {
            const timeout2 = setTimeout(() => {
              select.select2('destroy');
              select.select2({
                dropdownParent: selectWrapper,
                selectOnClose: true,
                minimumResultsForSearch: Infinity,
                placeholder: selectPlaceholder,
              });
              select.removeClass('closing');

              selectWrapper.css('z-index', '');

              clearTimeout(timeout2);
            }, 300);
          });
          clearTimeout(timeout);
        }, 0);
      });

      if (isBack) {
        select.on('change', (e) => {
          const value = select[0].value

          if (value === selectPlaceholder) {
            select.val(null).trigger('change')
            select[0][0].setAttribute('value', '')
            select[0][0].setAttribute('disabled', '')
            select[0][0].setAttribute('selected', '')
          } else {
            const option = select[0][0]
            option.textContent = selectPlaceholder
            option.removeAttribute('disabled')
            option.removeAttribute('selected')
            option.setAttribute('value', selectPlaceholder)
          }
        })
      }
    });
  });
}
