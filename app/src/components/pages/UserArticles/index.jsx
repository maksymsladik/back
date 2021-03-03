import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ArticlesList from "../../module/ArticlesList";
import RequestApi from "../../lib/RequestApi";

function UserArticles() {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [state, setState] = useState([]);
  const [updatePage, setUpdstePage] = useState(false);

  useEffect(() => {
    RequestApi.get(
      "/app/my-articles",
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => setState(res))
      .catch((e) => console.log(e));
  }, [updatePage]);

  const onSubmit = (data, e) => {
    RequestApi.post(
      "/app/my-articles",
      data,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        if (!res.status) return setMessage("Что-то пошло не так.");

        setMessage(res.message);
        setTimeout(() => setMessage(""), 1500);
        e.target.reset();
        setUpdstePage(!updatePage);
      })
      .catch((e) => console.log(e));
  };

  const deleteThisArticle = (id) => {
    RequestApi.deleteThis(
      `/app/my-articles/${id}`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1500);
        setUpdstePage(!updatePage);
      })
      .catch((e) => console.log(e));
  };

  const deleteTheseArticles = () => {
    RequestApi.deleteThese(
      `/app/my-articles`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1500);
        setUpdstePage(!updatePage);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Create your article</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          name="title"
          placeholder="Enter your title"
          ref={register({ required: true })}
        />
        {errors.title && (
          <div>
            <span>Title is required</span>
          </div>
        )}

        <input
          autoComplete="off"
          name="description"
          placeholder="Enter your description"
          ref={register({ required: true })}
        />
        {errors.description && (
          <div>
            <span>Description is required</span>
          </div>
        )}

        <div className="submit__container">
          <input className="btn__register" type="submit" value="Create" />
        </div>
      </form>

      {message && <h1 className="message">{message}</h1>}

      <ArticlesList state={state} deleteThisArticle={deleteThisArticle} />

      <div onClick={() => deleteTheseArticles()} style={{ cursor: "pointer" }}>
        Delete all my articles
      </div>
    </div>
  );
}

export default UserArticles;
