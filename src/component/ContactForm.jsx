import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import inputs from "../constants/inputs";

import styles from "./Contacts.module.css";

function ContactForm({ contact, submitHandler, editingId }) {
  const schema = yup.object().shape({
    name: yup.string().required("Name is requiered!"),
    lastName: yup.string().required("Last name is requiered!"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required!"),
    phone: yup
      .string()
      .matches(/^\d{8,}$/, "Phone must contain at least 8 digits")
      .required("Phone is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: contact,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    submitHandler(data);
    reset();
  };
  useEffect(() => {
    reset(contact);
  }, [contact, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {inputs.map((input, index) => (
        <div className={styles.formFiled} key={index}>
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            {...register(input.name)}
          />

          <p className={styles.errorAlert}>
            {errors[input.name]?.message || ""}
          </p>
        </div>
      ))}
      <button type="submit">
        {editingId ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}
export default ContactForm;
