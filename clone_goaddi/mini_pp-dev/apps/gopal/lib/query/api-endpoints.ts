const APP = {
	BERLIN: "/gopaddiberlin/gopaddiberlinbkend",
	TOKYO: "/tokyodevbckend/index.php/user",
};

export const API_ENDPOINTS = {
	BASE: APP.BERLIN,
	POSTS: {
		GET_COLLECTIONS: `${APP.BERLIN}/web/savefeeds/fetch_collections`,
		SAVE_POST: `${APP.BERLIN}/web/savefeeds/save_feeds`,
		CREATE_COLLECTION: `${APP.BERLIN}/web/savefeeds/create_collection`,
	},
	COMMENT: {
		DELETE_COMMENT: `${APP.BERLIN}/web/feeds/comment_delete`,
	},
};
