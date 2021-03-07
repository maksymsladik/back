import React from "react";
import { useForm } from "react-hook-form";

function Form({ onCreateArticle, removeTheseArticles }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div
      style={{
        border: "3px solid black",
        padding: "10px",
        width: "600px",
      }}
    >
      <h1>Create your article</h1>
      <form onSubmit={handleSubmit(onCreateArticle)}>
        <input
          autoComplete="off"
          name="title"
          placeholder="enter the title of your article"
          ref={register({ required: true })}
        />
        {errors.title && (
          <div>
            <span>Title is required</span>
          </div>
        )}

        <input
          autoComplete="off"
          name="short_description"
          placeholder="enter the short description of your article"
          ref={register({ required: true })}
        />
        {errors.short_description && (
          <div>
            <span>Short description is required</span>
          </div>
        )}

        <textarea
          autoComplete="off"
          name="article"
          placeholder="write your article"
          ref={register({ required: true })}
        />
        {errors.article && (
          <div>
            <span>Article is required</span>
          </div>
        )}

        <div className="submit__container">
          <input
            className="btn__register"
            type="submit"
            value="Create"
            style={{
              background: "#6edc6e",
            }}
          />
          <div
            onClick={() => removeTheseArticles()}
            className="btn__register"
            style={{
              fontWeight: "bolder",
              marginBottom: "10px",
              background: "#ec7070",
            }}
          >
            Delete these articles
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
