import "./styles/app.scss";

import "./scripts/backend";
import "./scripts/swipers";
import "./scripts/header";
import "./scripts/no-transition";
import "./scripts/accordion";
import "./scripts/custom-select";
import "./scripts/catalog-filters";
import "./scripts/select";
import mask from "inputmask";

// phone mask
{
  Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false }).mask(
    "[data-mask-phone]"
  )
}