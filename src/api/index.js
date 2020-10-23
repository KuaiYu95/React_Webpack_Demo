import request from '@utils/request';
import {
  stringify
} from 'qs';

export default {
  // 博客
  queryGetBlog: params => {
    return request(`/api/get-blog?${stringify(params)}`);
  },

  queryGetBlogDetail: params => {
    return request(`/api/get-blog-detail?${stringify(params)}`);
  },

  queryAddBlogView: params => {
    return request(`/api/add-blog-viewCount?${stringify(params)}`);
  },

  queryAddBlogLike: params => {
    return request(`/api/add-blog-likeCount?${stringify(params)}`);
  },

  queryDecBlogLike: params => {
    return request(`/api/dec-blog-likeCount?${stringify(params)}`);
  },

  queryBlogDownload: params => {
    return request(`/api/download-blog?${stringify(params)}`);
  },

  queryDelBlog: params => {
    return request(`/api/del-blog?${stringify(params)}`);
  },

  queryUpdateBlog: params => {
    return request('/api/update-blog', {
      method: 'POST',
      data: {
        ...params
      }
    });
  },

  queryAddBlog: params => {
    return request('/api/add-blog', {
      method: 'POST',
      data: {
        ...params
      }
    });
  },

  // 足迹
  queryGetAtlas: () => {
    return request(`/api/get-atlas`);
  },

  queryAddAtlas: params => {
    return request(`/api/add-atlas`, {
      method: 'POST',
      data: {
        ...params
      }
    });
  },

  // 评论
  queryAddComment: params => {
    return request('/api/add-comment', {
      method: 'POST',
      data: {
        ...params
      }
    });
  },

  queryGetComment: params => {
    return request(`/api/get-comment?${stringify(params)}`);
  },

}