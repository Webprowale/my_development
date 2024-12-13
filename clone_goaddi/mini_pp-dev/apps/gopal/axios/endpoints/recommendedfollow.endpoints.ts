import $ from "../index";
import getUser from "@/lib/get-user";

type ResponseTypes = any;

const userId = getUser();

export function getRecommendedPeople(): ResponseTypes {
  // @ts-ignore
  return $({
    url: `https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/Api/get_fetch_suggestion`,
    method: "post",
    headers: {
      Token: "gopaddi@v1",
      Userid: userId,
    },
  });
}
