import { useMutation, useQuery, useQueryClient } from 'react-query';

import Api from './api';
import queryClient from '../query';
import queryKeys from './queryKeys';
import Comment from '../models/comment';

export function retrieveCommentsByPostId(postId: number) {
  const comments = queryClient.getQueryData<Comment[]>(queryKeys.comment.retrieveAll());
  if (comments) {
    return comments.filter((comment) => comment.postId === postId);
  }
  return [];
}

export default function useCommentService() {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery(queryKeys.comment.retrieveAll(), Api.comment.fetchComments);

  const { mutate: createComment } = useMutation(Api.comment.createComment, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.comment.retrieveAll()),
  });

  const { mutate: deleteComment } = useMutation(Api.comment.deleteComment, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.comment.retrieveAll()),
  });

  return {
    isLoading,
    comments,
    createComment,
    deleteComment
  };
};
