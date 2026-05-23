export interface Event {
	id: string;
	title: string;
	dateTime: string;
	eventType: string;
	venue: Venue;
	rsvps: Rsvps;
	summary: string;
	summary_sv: string;
	speakers: Speaker[];
}

export interface Venue {
	name: string;
	city: string;
}

export interface Rsvps {
	totalCount: number;
}

export interface Speaker {
	name: string;
	title: string;
	company: string;
}
