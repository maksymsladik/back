import React from "react";

function Item({
  id,
  title,
  short_description,
  article,
  action,
  i,
  onSetActive,
  removeThisArticle,
  editThisArticle,
  editArticle,
  updateThisArticle,
  closeThisArticle,
  onChangeFieldsEditArticle,
}) {
  return (
    <div style={{ border: "1px solid red", padding: "5px" }}>
      {editArticle.length !== 0 && editArticle.id === id ? (
        <input
          onChange={onChangeFieldsEditArticle}
          name="title"
          value={editArticle.title}
        />
      ) : (
        <div onClick={() => onSetActive(id)} style={{ cursor: "pointer" }}>
          <h2 style={{ textAlign: "center" }}>Your article № {i + 1}</h2>
          <h3>Title: {title}</h3>
        </div>
      )}

      {action && (
        <>
          {editArticle.length !== 0 && editArticle.id === id ? (
            <input
              onChange={onChangeFieldsEditArticle}
              name="short_description"
              value={editArticle.short_description}
            />
          ) : (
            <h4>Short description: {short_description}</h4>
          )}

          {editArticle.length !== 0 && editArticle.id === id ? (
            <textarea
              onChange={onChangeFieldsEditArticle}
              name="article"
              value={editArticle.article}
            />
          ) : (
            <p>Article: {article}</p>
          )}

          {editArticle.length !== 0 && editArticle.id === id ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "0px",
              }}
            >
              <div
                onClick={() => updateThisArticle(id)}
                className="btn__register"
                type="submit"
                value="Create"
                style={{
                  background: "#6edc6e",
                  marginBottom: "0px",
                }}
              >
                Update
              </div>
              <div
                onClick={() => closeThisArticle(id)}
                className="btn__register"
                style={{
                  fontWeight: "bolder",
                  background: "#ec7070",
                  marginBottom: "0px",
                }}
              >
                Close
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "0px",
              }}
            >
              <div
                onClick={() => editThisArticle(id)}
                className="btn__register"
                type="submit"
                value="Create"
                style={{
                  background: "#6edc6e",
                  marginBottom: "0px",
                }}
              >
                Edit this article
              </div>
              <div
                onClick={() => removeThisArticle(id)}
                className="btn__register"
                style={{
                  fontWeight: "bolder",
                  background: "#ec7070",
                  marginBottom: "0px",
                }}
              >
                Delete this article
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Item;
