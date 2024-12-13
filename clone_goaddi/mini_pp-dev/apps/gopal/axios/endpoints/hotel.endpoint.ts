import $ from "../index";

type ResponseTypes = Promise<{
  data: any;
  code?: any;
  success?: boolean;
  result?: any;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function getHotelDestinations(data: any): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/hotels/destinations`,
    method: "post",
    data: data,
  });
}

export function HotelSearch(data: any) {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/hotels/search`,
    method: "post",
    data: data,
  });
}

export function getCities(data: any): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/fetch/cities`,
    method: "post",
    data: data,
  });
}

export function SingleHotelDetails(data: any): ResponseTypes {
  return $({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/hotels/detail",
    method: "post",
    data: data,
  });
}
