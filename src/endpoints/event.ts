import type { ServiceCall } from "@/endpoints/types";

export interface AppEvent {
  name: string;
  description: string;
  date: Date;
  time: string;
  poster?: File;
}

export interface ApiCallEvent {
  name: string;
  date: string;
  description?: string;
  poster?: File;
}

export interface AppSection {
  name: string;
  totalTickets: number;
  price: number;
}

export interface ApiCallSection {
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
  status: EventStatus;
}

export enum EventStatus {
  DRAFT = "draft",
  ON_SALE = "on_sale",
  RUNNING = "running",
  FINISHED = "finished",
}

export interface Section {
  event_id: string;
  name: string;
  total_tickets: number;
  price: number;
  on_chain: boolean;
}

export const createEvent = (
  organizationID: string,
  eventData: AppEvent
): ServiceCall<Event, ApiCallEvent> => ({
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
  mergeResponse: (state, res) => {
    state.responses[`organization-events-${organizationID}`].push(res.data);
  },
});

export const addSection = (
  eventID: string,
  organizationID: string,
  sectionData: AppSection
): ServiceCall<Section, ApiCallSection> => ({
  method: "PUT",
  body: {
    name: sectionData.name,
    total_tickets: sectionData.totalTickets,
    ticket_price: sectionData.price,
  },
  endpoint: `/organizations/${organizationID}/events/${eventID}/sections`,
  mergeResponse: (state, res) => {
    state.responses[`organization-events-${organizationID}`].forEach(
      (event: Event) => {
        if (event.event_id === eventID) {
          event.sections.push(res.data);
        }
      }
    );
  },
});

export const getOrganizationEvents = (
  organizationID: string
): ServiceCall<Event[]> => ({
  method: "GET",
  endpoint: `/organizations/${organizationID}/events`,
  key: `organization-events-${organizationID}`,
  parseResponse: (res) => res.data,
});

export const setEventOnSale = (
  eventID: string,
  organizationID: string
): ServiceCall<Event> => ({
  method: "PATCH",
  endpoint: `/organizations/${organizationID}/events/${eventID}/on_sale`,
  mergeResponse: (state, res) => {
    state.responses[`organization-events-${organizationID}`].forEach(
      (event: Event) => {
        if (event.event_id === eventID) {
          event.status = res.data.status;
        }
      }
    );
  },
});
