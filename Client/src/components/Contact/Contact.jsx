import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useHistory } from "react-router-dom";
import style from "./Contact.module.css";
import swal from "sweetalert";

export default function Contact() {
  const history = useHistory();

  const [input, setInput] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  //VALIDACIONES
  let validateUrl =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validate = (input) => {
    let errors = {};
    if (!input.user_name.length) {
      errors.user_name = "This field cannot be empty";
    }
    if (input.user_email && !validateUrl.test(input.user_email)) {
      errors.user_email = "This is not a valid URL";
    }
    if (!input.user_email.length) {
      errors.user_email = "This field cannot be empty";
    }
    if (!input.user_message.length) {
      errors.user_message = "This field cannot be empty";
    }
    if (input.user_name.length < 3) {
      errors.user_name = "The name must contain at least 3 letters";
    }
    if (input.user_message.length < 10) {
      errors.user_name = "The name must contain at least 10 letters";
    }
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      input.user_name.length &&
      input.user_email.length &&
      input.user_message.length
    ) {
      emailjs
        .sendForm(
          "service_ll5mvu4",
          "template_we4wyb4",
          e.target,
          "ubztnK0ky6QEfP_4O"
        )
        .catch((error) => alert(error));
      swal({
        title: "Message sent succesfull",
        icon: "success",
        button: "Ok",
        timer: 2000,
      });
      history.push("/");
    } else {
      swal({
        title: "All fields must be completed",
        icon: "error",
        button: "Ok",
        timer: 3000,
      });
    }
  };
  function comprobacionInput(input) {
    if (input.user_name && input.user_email && input.user_message) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={sendEmail}>
        <h1 className={style.titleForm}>Contact Us</h1>
        <input
          type="text"
          name="user_name"
          value={input.user_name}
          onChange={(e) => handleChange(e)}
          placeholder="Your name..."
        />

        <input
          type="email"
          name="user_email"
          value={input.user_email}
          onChange={(e) => handleChange(e)}
          placeholder="Your Email..."
        />

        <textarea
          name="user_message"
          cols="30"
          rows="10"
          value={input.user_message}
          onChange={(e) => handleChange(e)}
          className={style.contactTextarea}
          placeholder="Your message to us..."
        ></textarea>

        {Object.keys(errors).length === 0 && comprobacionInput(input) ? (
          <button>Send</button>
        ) : (
          <p className={style.todosCampos}>You must fill all the fields</p>
        )}
      </form>
    </div>
  );
}
