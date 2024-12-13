import $ from "../index";
import getUser from "@/lib/get-user";

type ResponseTypes = any;

export function sendPaddiMessage(data: any): ResponseTypes {
  // @ts-ignore
  return $({
    url: `https://us-central1-travel-chatbot-409605.cloudfunctions.net/apiendpoint-1`,
    method: "post",
    data: data,
    headers: {
      projectId: "travel-chatbot-409605",
      locationId: "us-central1",
      agentId: "ad7caede-bce6-4562-ae2f-8dacfb73bddf",
      "Content-Type": "application/json",
    },
  });
}

export function sendPaddiLocation(data: any): ResponseTypes {
  // @ts-ignore
  return $({
    url: `https://us-central1-travel-chatbot-409605.cloudfunctions.net/apiendpoint-withoutHeaders`,
    method: "post",
    data: data,
    headers: {
      projectId: "travel-chatbot-409605",
      locationId: "us-central1",
      agentId: "ad7caede-bce6-4562-ae2f-8dacfb73bddf",
      "Content-Type": "application/json",
    },
  });
}

export function getLocationDetails(data: any): ResponseTypes {
  // @ts-ignore
  return $({
    url: `https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/travelhistory/get_location_info`,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
