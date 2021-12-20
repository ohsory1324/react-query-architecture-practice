import { useMutation, useQuery, useQueryClient } from 'react-query';

import Api from './api';
import queryKeys from './queryKeys';

export default function usePostService() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery(queryKeys.post.retrieveAll(), Api.post.fetchPosts);

  const { mutate: createPost } = useMutation(Api.post.createPost, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post.retrieveAll()),
  });

  const { mutate: deletePost } = useMutation(Api.post.deletePost, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.post.retrieveAll()),
  });

  return {
    isLoading,
    posts,
    createPost,
    deletePost,
  };
}
