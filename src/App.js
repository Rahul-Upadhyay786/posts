import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
      setError("");
      setLoader(false);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      {loader && <h1>Loading...</h1>}
      {error && <h1 style={{ color: "#ff0000" }}>{error}</h1>}
      {!loader && !error && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

function Post({ post }) {
  const { title, body, tags, reactions } = post;
  return (
    <div className="post">
      <h1>{title}</h1>
      <div className="tags">
        <Tags tags={tags} />
      </div>
      <p>{body}</p>
      <div className="reactions">
        <span role="img" aria-labelledby="reaction">
          ❤️
        </span>
        &nbsp; {reactions}
      </div>
    </div>
  );
}

function Tags({ tags }) {
  return tags.map((tag) => (
    <label className="tag" key={tag}>
      {tag}
    </label>
  ));
}