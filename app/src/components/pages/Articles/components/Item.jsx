import React from "react";

function Item({
  id,
  title,
  short_description,
  article,
  action,
  i,
  onSetActive,
}) {
  return (
    <div>
      <div onClick={() => onSetActive(id)} style={{ cursor: "pointer" }}>
        <h2 style={{ textAlign: "center" }}>Article № {i + 1}</h2>
        <h3>Title: {title}</h3>
      </div>
      {action && (
        <>
          <h4>Short description: {short_description}</h4>
          <p>Article: {article}</p>
        </>
      )}
    </div>
  );
}

export default Item;
