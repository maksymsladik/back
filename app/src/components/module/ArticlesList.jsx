import React from "react";

function ArticlesList({ state, deleteThisArticle }) {
  return (
    <div>
      {state.map(({ id, title, description }, i) => {
        return (
          <div key={id}>
            <h3>
              <span>{i + 1})</span>&nbsp;
              {title}
            </h3>
            <p>{description}</p>
            {deleteThisArticle && (
              <div
                onClick={() => deleteThisArticle(id)}
                style={{ cursor: "pointer" }}
              >
                Delete
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ArticlesList;
