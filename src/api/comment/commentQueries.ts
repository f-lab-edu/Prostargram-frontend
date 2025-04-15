import { useQuery } from '@tanstack/react-query';
import { getComments, getDebateComments } from './apis';

export const COMMENT_QUERY_KEYS = {
  comments: ['comments'] as const,
  id: (id: number) => [...COMMENT_QUERY_KEYS.comments, id] as const,
};

export const useGetComments = (
  postId: number,
  optionId?: number,
  options = {},
) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEYS.id(postId),
    queryFn: () =>
      optionId ? getDebateComments(postId, optionId) : getComments(postId),
    ...options,
  });
};
