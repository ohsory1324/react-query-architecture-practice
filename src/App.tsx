import usePostService from './services/post';
import useCommentService from './services/comment';

function App() {
  const { isLoading: isPostsLoading, posts, createPost, deletePost } = usePostService();
  const { isLoading: isCommentsLoading, createComment, deleteComment } = useCommentService();

  return (
    <div className="App">
      {(!isPostsLoading && !isCommentsLoading) ? (posts || []).map((post) => (
        <div key={post.id}>
          <h1>{post.id}, {post.title}, {post.author} <button onClick={() => deletePost(post.id)}>-</button></h1>
          <div>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <h2>{comment.id}, {comment.body} <button onClick={() => deleteComment(comment.id)}>-</button></h2>
              </div>
            ))}
            <button onClick={() => createComment({ body: `Body ${Math.random()}`, postId: post.id })}>
              Create comment
            </button>
          </div>
        </div>
      )) : <p>Loading...</p>}
      <button onClick={() => createPost({ title: `Title ${Math.random()}`, author: 'typicode' })}>
        Create post
      </button>
    </div>
  );
}

export default App;
