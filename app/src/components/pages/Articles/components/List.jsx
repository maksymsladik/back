import React from "react";
import Item from "./Item";

function List({ state, onSetActive }) {
  return (
    <div>
      <h1>Articles</h1>
      {state.map((item, i) => (
        <Item key={item.id} {...item} i={i} onSetActive={onSetActive} />
      ))}
    </div>
  );
}

export default List;
