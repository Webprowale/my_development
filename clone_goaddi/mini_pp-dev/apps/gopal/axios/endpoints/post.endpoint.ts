import $ from "../index";
import getUser from "@/lib/get-user";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  status?: boolean;
  success?: boolean;
  result?: any;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function createPost(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/create`,
    method: "post",
    data: data,
  });
}

export function searchUsers(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Api/search_type`,
    method: "post",
    data: data,
  });
}

export function getPost(): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds`,
    method: "post",
    data: {},
  });
}
export function getPostById(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/getpost`,
    method: "post",
    data: data,
  });
}

export function deletePost(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/remove`,
    method: "post",
    data: data,
  });
}

export function likePost(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/actions`,
    method: "post",
    data: data,
  });
}
export function commentPost(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/comment`,
    method: "post",
    data: data,
  });
}

export function commentReaction(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/feeds/comment_reacts`,
    method: "post",
    data: data,
  });
}

export function login(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/userLogin`,
    method: "post",
    data: data,
  });
}

export function reportPost(data: any): ResponsTypes {
  return $({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/reportpost/report",
    method: "post",
    data: data,
  });
}
// export function patchColor(id: any, data: any, otherId: any): ResponsTypes {
//   return $({
//     url: `/api/${id}/colors/${otherId}`,
//     method: "patch",
//     data: data,
//   });
// }

// export function deleteColor(id: any, otherId: any): ResponsTypes {
//   return $({
//     url: `/api/${id}/colors/${otherId}`,
//     method: "delete",
//   });
// }


export const getUserPost = async (data:{userID:string})=>{
  const resp = await $({
    url:'https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/feeds/users',
    method:'post',
    data:{'userId':data.userID},
  })
  return await resp.data
  // 
}