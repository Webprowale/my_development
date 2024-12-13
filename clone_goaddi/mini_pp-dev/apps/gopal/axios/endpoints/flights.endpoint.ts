import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  success?: boolean;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function searchAirports(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/flight/airports`,
    method: "post",
    data: data,
  });
}

export function searchFlights(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/flight/search`,
    method: "post",
    data: data,
  });
}

export function confirmFlightAPI(data: any): ResponsTypes {
  return $({
    url: `gopaddiberlin/gopaddiberlinbkend/web/flight/confirm`,
    method: "post",
    data: data,
  });
}
