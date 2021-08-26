import HTTPRequest from "../../js/HTTPRequest/HTTPRequest.js";
export default {
    namespaced: true,
    state: {
        idPostInModifyMode: null,
        idPostToReply: null,
        ActionListVisible : false,
        listPost: null,
    },
    mutations: {
        SET_ACTION_LIST_VISIBLE(state, visibility) {
            state.ActionListVisible = visibility;
        },
        SET_ID_POST_IN_MODIFY_MODE(state, id) {
            state.idPostInModifyMode = id;
        },

        SET_ID_POST_TO_REPLY(state, id) {
            state.idPostToReply = id;
        },

        SET_LIST_POST(state, listPost) {
            state.listPost = listPost;
        },

        ADD_POST(state, data) {
            const listPost = state.idPostToReply
                ? state.listPost.find((e) => e.id == state.idPostToReply).listComment
                : state.listPost;

            listPost.unshift({
                user_id: data.user.id,
                user_avatar: data.user.avatar,
                user_username: data.user.username,
                image_url : data.image_url,
                id: data.id,
                post_id: data.post_id,
                created_at: "Aujourd'hui",
                content: data.content,
                listComment: [],
                listReaction: [],
            });
        },

        REMOVE_POST(state, post) {
            const listPost = post.post_id ? state.listPost.find((e) => e.id == post.post_id).listComment : state.listPost;
            listPost.splice(listPost.findIndex(e => e.id == post.id), 1);
        },

        MODIFY_POST(state, post) {
            const listPost = post.post_id
                ? state.listPost.find((e) => e.id == post.post_id).listComment
                : state.listPost.find((e) => e.id == post.id);
            listPost.content = post.content;
        },
    },
    actions: {
        async getListPost(state, channelId) {
            try {
                state.commit("SET_LIST_POST", await HTTPRequest.get(`channel/${channelId}/post?limit=10&offset=0`));
            } catch (e) {
                console.log(e);
            }
        },

        async addPost({ state, commit, dispatch, rootGetters }, payload) {
            try {
                const typeFormData = payload.file ? true : false;
                let body = { ...payload, postId: state.idPostToReply };
                if(body.file) body = HTTPRequest.convertToFormData(body) ;

                const response = await HTTPRequest.post("post/", body, typeFormData);

                commit("ADD_POST", {
                    id: response.id,
                    image_url: response.imageUrl,
                    content: payload.content,
                    post_id: state.idPostToReply,
                    user: rootGetters["userModule/user"],
                });
                dispatch("setIdPostToReply", null);
            } catch (e) {
                console.log(e);
            }
        },

        async modifyPost(state, post) {
            try {
                if ((await HTTPRequest.put(`post/${post.id}`, { content: post.content })).affectedRows) {
                    state.commit("MODIFY_POST", post);
                    state.commit("SET_ID_POST_IN_MODIFY_MODE", null);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async removePost(state, post) {
            try {
                if ((await HTTPRequest.delete(`post/${post.id}`)).affectedRows) state.commit("REMOVE_POST", post);
            } catch (e) {
                console.log(e);
            }
        },

        setIdPostToReply(state, id) {
            state.commit("SET_ID_POST_IN_MODIFY_MODE", null);
            state.commit("SET_ID_POST_TO_REPLY", id);
        },
    },
};
