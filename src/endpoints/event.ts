import type { ServiceCall } from "@/endpoints/types";

export interface AppEvent {
  name: string;
  description: string;
  date: Date;
  time: string;
  poster?: File;
}

export interface ApiEvent {
  name: string;
  date: string;
  description?: string;
  poster?: File;
}
export interface ApiResponseEvent {
  name: string;
  date: string;
  event_id: string;
  on_chain: boolean;
  description?: string;
}

export interface AppSection {
  name: string;
  totalTickets: number;
  price: number;
}

export interface ApiSection {
  name: string;
  total_tickets: number;
  ticket_price: number;
}

export interface Event {
  event_id: string;
  name: string;
  date: Date;
  sections: Section[];
  poster: string;
  description: string;
  pub_bc_address: string;
  status: string;
}

export interface Section {
  event_id: string;
  name: string;
  total_tickets: number;
  price: number;
  on_chain: boolean;
}

export interface ApiResponseSection {
  event_id: string;
  name: string;
  total_tickets: number;
  on_chain: boolean;
}

export const createEvent = (
  organizationID: string,
  eventData: AppEvent
): ServiceCall<ApiResponseEvent, ApiEvent> => ({
  method: "POST",
  endpoint: `/organizations/${organizationID}/events`,
  body: {
    name: eventData.name,
    // create date from date and time
    date: eventData.date.toISOString(),
    description: eventData.description,
    poster: eventData.poster,
  },
  bodyType: "form",
  // mock: {
  //   name: eventData.name,
  //   date: eventData.date.toISOString(),
  //   event_id: "1",
  //   on_chain: false,
  // },
  mergeResponse: (state, res) => {
    state.responses[`organization-events-${organizationID}`].push(res);
  },
});

export const addSection = (
  eventID: string,
  organizationID: string,
  sectionData: AppSection
): ServiceCall<ApiResponseSection, ApiSection> => ({
  method: "PUT",
  body: {
    name: sectionData.name,
    total_tickets: sectionData.totalTickets,
    ticket_price: sectionData.price,
  },
  // mock: {
  //   event_id: "123",
  //   name: "Section name",
  //   total_tickets: 100,
  //   on_chain: false,
  // },
  endpoint: `/organizations/${organizationID}/events/${eventID}/sections`,
});

export const getOrganizationEvents = (
  organizationID: string
): ServiceCall<Event[]> => ({
  method: "GET",
  endpoint: `/organizations/${organizationID}/events`,
  key: `organization-events-${organizationID}`,
  parseResponse: (res) => res.data.data,
  /*   mock: organizationID === "123" ? [
    {
      name: "Event name",
      date: "2021-01-01",
      event_id: "123",
      on_chain: false,
    },
    {
      name: "Event name 2",
      date: "2021-01-01",
      event_id: "456",
      on_chain: false,
    },
    {
      name: "Event name 3",
      date: "2021-01-01",
      event_id: "789",
      on_chain: false,
    },
  ] : [
    {
      name: "Event name 4",
      date: "2021-01-01",
      event_id: "123",
      on_chain: false,
    }
  ],
 */
});
