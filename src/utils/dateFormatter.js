const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const dateFormatter = (date) => {
	const formattedDate = {};

	formattedDate.date =
		new Date(date).getDate() < 9
			? "0" + new Date(date).getDate()
			: new Date(date).getDate();

	formattedDate.month =
		new Date(date).getMonth() < 9
			? "0" + (new Date(date).getMonth() + 1)
			: new Date(date).getMonth() + 1;

	formattedDate.monthText = months[new Date(date).getMonth()];
	formattedDate.year = new Date(date).getFullYear();
	formattedDate.day = weekDays[new Date(date).getDay()];

	return formattedDate;
};
