import React, { useEffect, useState } from "react";

export default function InstagramPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  if (posts.length === 0) return <div>Cargando...</div>;

  return (
    <div>
      {/* Primeras 3 imágenes en fila */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", padding: "10px" }}>
        {posts.slice(0, 3).map((post, i) => (
          <div style={{ textAlign: "center" }} key={i}>
            <img
              src={post.image}
              alt={post.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
            <div>{post.name}</div>
          </div>
        ))}
      </div>
      {/* El resto de imágenes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "10px" }}>
        {posts.slice(3).map((post, i) => (
          <div style={{ textAlign: "center" }} key={i + 3}>
            <img
              src={post.image}
              alt={post.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
            <div>{post.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
