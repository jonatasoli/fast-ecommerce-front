import { CURRENCIES, LOCALES, STATUS_ORDER } from "./enums";
import { ref, useRoute } from "#imports";

export function currencyFormat(
  value,
  locale = LOCALES.PT_BR,
  type = ""
): string {
  const currency = CURRENCIES[locale] || LOCALES.PT_BR;

  const { format } = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

  if (!value) {
    return format(0);
  }

  if (type === "freight") {
    return format(value);
  }

  return format(value);
}

export function dateFormat(value, locale = LOCALES.PT_BR): string {
  const date = new Date(value);
  const { format } = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return format(date);
}

export function getPageFromRoute() {
  const page = useRoute().query.p?.toString() || "";
  const intPage = parseInt(page);
  const pageRef = ref(1);

  if (page && !isNaN(intPage) && intPage > 0) {
    pageRef.value = intPage;
  }

  return {
    page: pageRef,
  };
}

export function getMonthYearFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return { month, year };
}

export function getOrderStatus(status) {
  return STATUS_ORDER[status] || status;
}
