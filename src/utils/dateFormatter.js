// Fixed time zone so server and client render the same day
const TIME_ZONE = 'Europe/Stockholm';

// month: 'short' → "27 Oct 2026", 'long' → "27 October 2026" (localised)
export const formatDate = (date, locale = 'en', month = 'short') =>
	new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, {
		day: 'numeric',
		month,
		year: 'numeric',
		timeZone: TIME_ZONE,
	}).format(new Date(date));
