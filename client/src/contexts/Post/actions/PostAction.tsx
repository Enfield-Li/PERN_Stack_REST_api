import {
  CLEAR_CACHE,
  CREATE_POST,
  DELETE_POST,
  CURRENT_POST,
  FETCH_PAGINATED_POSTS,
  VOTE_POST,
  CONFUSE_POST,
  LAUGHE_POST,
  LIKE_POST,
} from "../../constant";
import axios, { AxiosResponse } from "axios";
import {
  CreatePostType,
  PaginatedPost,
  PostAndInteractions,
  PostActionType,
  VotingTypes,
  PostSorting,
  SortPostWithTop,
} from "../types/PostTypes";
import PostContext from "../PostContext";
import { useContext } from "react";
import {
  interactionNullCheckAndPopulateData,
  populateWithMockData,
} from "../../../utils/populateWithMockData";

export const usePost = () => {
  const { state, dispatch, sortPost, setSortPost } = useContext(PostContext);
  return { postState: state, postDispatch: dispatch, sortPost, setSortPost };
};

export async function interactWithPost(
  dispatch: React.Dispatch<PostActionType>,
  id: number,
  value: boolean,
  field: VotingTypes
) {
  await axios.get<boolean>(
    `http://localhost:3119/interactions/interact/${id}?value=${value}&field=${field}`,
    { withCredentials: true }
  );

  if (field === "vote") {
    dispatch({
      type: VOTE_POST,
      payload: { id, value },
    });
  }

  if (field === "like") {
    dispatch({
      type: LIKE_POST,
      payload: id,
    });
  }

  if (field === "laugh") {
    dispatch({
      type: LAUGHE_POST,
      payload: id,
    });
  }

  if (field === "confused") {
    dispatch({
      type: CONFUSE_POST,
      payload: id,
    });
  }
}

export async function editCurrentPost(
  dispatch: React.Dispatch<PostActionType>,
  id: number,
  post: CreatePostType
) {
  try {
    const res = await axios.patch<PostAndInteractions>(
      `http://localhost:3119/post/edit/${id}`,
      post,
      { withCredentials: true }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function setCurrentPost(
  dispatch: React.Dispatch<PostActionType>,
  currentPost: PostAndInteractions
) {
  dispatch({
    type: CURRENT_POST,
    payload: currentPost,
  });
}

export const fetchPaginatedPosts = async (
  dispatch: React.Dispatch<PostActionType>,
  sortBy: PostSorting = "best",
  cursor?: string, // date string or number string
  time?: SortPostWithTop
) => {
  let res: AxiosResponse<PaginatedPost, any> | null = null;

  if (!cursor) {
    if (sortBy === "top") {
      res = await axios.get<PaginatedPost>(
        `http://localhost:3119/post/paginated-posts/top?time=${time}`,
        { withCredentials: true }
      );
    } else {
      res = await axios.get<PaginatedPost>(
        `http://localhost:3119/post/paginated-posts?sortBy=${sortBy}`,
        { withCredentials: true }
      );
    }

    // Clear cache first when switch sortBy
    dispatch({
      type: CLEAR_CACHE,
    });
  } else {
    if (sortBy === "top") {
      res = await axios.get<PaginatedPost>(
        `http://localhost:3119/post/paginated-posts/top?time=${time}&skipTimes=${cursor}`,
        { withCredentials: true }
      );
    } else {
      res = await axios.get<PaginatedPost>(
        `http://localhost:3119/post/paginated-posts?cursor=${cursor}&sortBy=${sortBy}`,
        { withCredentials: true }
      );
    }
  }
  // initiate interactions
  interactionNullCheckAndPopulateData(res.data.postAndInteractions);

  dispatch({
    type: FETCH_PAGINATED_POSTS,
    payload: res.data,
  });
};

export const clearCache = (dispatch: React.Dispatch<PostActionType>) => {
  dispatch({
    type: CLEAR_CACHE,
  });
};

export const fetchSinglePost = async (
  dispatch: React.Dispatch<PostActionType>,
  id: number
) => {
  const res = await axios.get<PostAndInteractions>(
    `http://localhost:3119/post/single-post/${id}`,
    {
      withCredentials: true,
    }
  );

  if (!res.data.interactions) {
    const postId = res.data.post.id;
    const interactions = res.data.interactions;

    const newInteractions = populateWithMockData(interactions, postId);

    res.data.interactions = newInteractions;
  }

  dispatch({
    type: CURRENT_POST,
    payload: res.data,
  });
};

export async function createPost(
  dispatch: React.Dispatch<PostActionType>,
  post: CreatePostType
) {
  try {
    const res = await axios.post<PostAndInteractions>(
      "http://localhost:3119/post/create-post",
      post,
      { withCredentials: true }
    );

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    // return created post data
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deletePost(
  dispatch: React.Dispatch<PostActionType>,
  id: number
) {
  await axios.delete(`http://localhost:3119/post/delete/${id}`, {
    withCredentials: true,
  });

  dispatch({
    type: DELETE_POST,
    payload: id,
  });
}
