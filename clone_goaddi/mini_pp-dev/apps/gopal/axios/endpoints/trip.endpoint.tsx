import $ from "../index";

type ResponseTypes = Promise<{
  data: any;
  code?: any;
  success?: boolean;
  result?: any;
  message?: string;
  error?: any;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function getAllUserTrips(): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/created`,
    method: "post",
  });
}

export function getAllUserAddedTrips(): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/added`,
    method: "post",
  });
}

export function getTimelineVideos(): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/timelineVideos`,
    method: "post",
  });
}

export function createUserTrip(data: any): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/create`,
    method: "post",
    data: data,
  });
}

export function getPlannedTrips(): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/planned`,
    method: "post",
  });
}
export function getDraftedTrips(): ResponseTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/tripsplan/drafted`,
    method: "post",
  });
}
