import React, { useEffect, useState } from "react";
import List from "./components/List";
import RequestApi from "../../lib/RequestApi";

function Articles() {
  const [state, setState] = useState([]);

  useEffect(() => {
    onGetArticles();
  }, []);

  const onGetArticles = () => {
    RequestApi.get("/app/articles")
      .then((res) => {
        for (var i in res) {
          const articleAction = res[i];
          setState((prev) => [...prev, { ...articleAction, action: false }]);
        }
      })
      .catch((e) => console.log(e));
  };

  const onSetActive = (id) => {
    const newState = state.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          action: !item.action,
        };
      }
      return item;
    });

    setState(newState);
  };

  return <List state={state} onSetActive={onSetActive} />;
}

export default Articles;
