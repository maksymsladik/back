import React, { useState, useEffect, useContext } from "react";
import List from "./components/List";
import Form from "./components/Form";
import MyProfile from "./components/MyProfile";
import RequestApi from "../../lib/RequestApi";
import { Context } from "../../context";

function UserArticles() {
  const { setAuthorized } = useContext(Context);
  const [message, setMessage] = useState("");
  const [state, setState] = useState([]);
  const [data, setData] = useState({
    id: "",
    email: "",
    roleId: "",
    name: "",
    surname: "",
    age: "",
  });
  const [editArticle, setEditArticle] = useState([]);

  useEffect(() => {
    onGetDataWriter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  /* get all data */
  const onGetDataWriter = () => {
    setState([]);
    RequestApi.get(
      "/auth/writer",
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        const { id, email, roleId, name, surname, age } = res.data[0];
        setData({ ...data, id, email, roleId, name, surname, age });
        if (res.data[0].articles) {
          for (var i in res.data[0].articles) {
            const articleAction = res.data[0].articles[i];
            setState((prev) => [...prev, { ...articleAction, action: false }]);
          }
        }
      })
      .catch((e) => console.log(e));
  };
  /* create article */
  const onCreateArticle = (data, e) => {
    RequestApi.post(
      "/app/my-articles",
      data,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1000);
        setEditArticle([]);
        e.target.reset();
        onGetDataWriter();
      })
      .catch((e) => console.log(e));
  };
  /* get article for edit form */
  const editThisArticle = (id) => {
    RequestApi.get(
      `/app/articles/${id}`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setEditArticle(res[0]);
      })
      .catch((e) => console.log(e));
  };
  /* new field for edit article */
  const onChangeFieldsEditArticle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditArticle({ ...editArticle, [name]: value });
  };
  /* edit article */
  const updateThisArticle = (id) => {
    RequestApi.update(
      `/app/articles/${id}`,
      {
        title: editArticle.title,
        short_description: editArticle.short_description,
        article: editArticle.article,
      },
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1000);
        setEditArticle([]);
        onGetDataWriter();
      })
      .catch((e) => console.log(e));
  };
  /* close edit form */
  const closeThisArticle = () => {
    setEditArticle([]);
  };
  /* delete my profile */
  const removeMyProfile = (id) => {
    const confirm = window.confirm(
      "Вы действительно хотите удалить свой профиль?"
    );
    if (!confirm) return false;
    RequestApi.deleteThis(
      `/auth/writers/${id}`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setAuthorized("");
        localStorage.removeItem("userData");
      })
      .catch((e) => console.log(e));
  };
  /* delete one article */
  const removeThisArticle = (id) => {
    RequestApi.deleteThis(
      `/app/my-articles/${id}`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1000);
        setEditArticle([]);
        onGetDataWriter();
      })
      .catch((e) => console.log(e));
  };
  /* delete all article */
  const removeTheseArticles = () => {
    RequestApi.deleteThese(
      `/app/my-articles`,
      JSON.parse(localStorage.getItem("userData")).userToken
    )
      .then((res) => {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 1000);
        onGetDataWriter();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Form
          onCreateArticle={onCreateArticle}
          removeTheseArticles={removeTheseArticles}
        />

        <MyProfile {...data} removeMyProfile={removeMyProfile} />
      </div>

      {message && <h1 className="message">{message}</h1>}

      <List
        state={state}
        onSetActive={onSetActive}
        removeThisArticle={removeThisArticle}
        editThisArticle={editThisArticle}
        editArticle={editArticle}
        updateThisArticle={updateThisArticle}
        closeThisArticle={closeThisArticle}
        onChangeFieldsEditArticle={onChangeFieldsEditArticle}
      />
    </div>
  );
}

export default UserArticles;
