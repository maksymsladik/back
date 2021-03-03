import React, { useEffect, useState } from "react";
import ArticlesList from "../../module/ArticlesList";
import RequestApi from "../../lib/RequestApi";

function Articles() {
  const [state, setState] = useState([]);

  useEffect(() => {
    RequestApi.get("/app/articles")
      .then((res) => setState(res))
      .catch((e) => console.log(e));
  }, []);

  return <ArticlesList state={state} />;
}

export default Articles;
