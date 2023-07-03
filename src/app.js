import "./styles/app.scss";

import "./scripts/backend";
import "./scripts/swipers";
import "./scripts/header";
import "./scripts/no-transition";
import "./scripts/accordion";
import "./scripts/custom-select";
import "./scripts/catalog-filters";
import "./scripts/select";
import "./scripts/fancybox";
import "./scripts/search";
import "./scripts/form-validation";
import "./scripts/photo-modal";
import mask from "inputmask";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// phone mask
{
  document.addEventListener('DOMContentLoaded', () => {
    Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false }).mask(
      "[data-mask-phone]"
    )

    Fancybox.bind('[data-fancybox="gallery"]', {
      //
    });
  })
}
