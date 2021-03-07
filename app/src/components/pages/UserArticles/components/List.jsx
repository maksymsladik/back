import React from "react";
import Item from "./Item";

function List({
  state,
  onSetActive,
  removeThisArticle,
  editThisArticle,
  editArticle,
  updateThisArticle,
  closeThisArticle,
  onChangeFieldsEditArticle,
}) {
  return (
    <div style={{ border: "3px solid black", padding: "10px" }}>
      <h1>Your articles</h1>
      {state.map((item, i) => (
        <Item
          key={item.id}
          {...item}
          i={i}
          onSetActive={onSetActive}
          removeThisArticle={removeThisArticle}
          editThisArticle={editThisArticle}
          editArticle={editArticle}
          updateThisArticle={updateThisArticle}
          closeThisArticle={closeThisArticle}
          onChangeFieldsEditArticle={onChangeFieldsEditArticle}
        />
      ))}
    </div>
  );
}

export default List;
