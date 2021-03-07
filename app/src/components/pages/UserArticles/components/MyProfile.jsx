import React from "react";

function MyProfile({ id, email, roleId, name, surname, age, removeMyProfile }) {
  return (
    <div
      style={{
        border: "3px solid black",
        padding: "10px",
        width: "400px",
      }}
    >
      <h1>Your profile</h1>
      <h3>Id: {id}</h3>
      <h3>Name: {name}</h3>
      <h3>Surname: {surname}</h3>
      <h3>Age: {age}</h3>
      <h3>E-mail: {email}</h3>
      <h3>Role: {roleId}</h3>
      <input
        type="submit"
        onClick={() => removeMyProfile(id)}
        value="Удалить мой профиль"
      />
    </div>
  );
}

export default MyProfile;
