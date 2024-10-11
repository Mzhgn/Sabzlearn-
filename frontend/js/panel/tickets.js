import {
  showAllTickets,
  showTicketBody,
  answerToTicket,
} from "./funcs/tickets.js";

window.showTicketBody = showTicketBody;
window.answerToTicket = answerToTicket;

window.addEventListener("load", () => {
  showAllTickets();
});
