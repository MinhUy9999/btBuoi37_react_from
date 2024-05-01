import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quanLySinhVienActions } from "../store/QuanLySinhVien/slice";

export const ThongTinSVForm = () => {
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [formError, setFormError] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const { studentEdit, studentList } = useSelector((state) => state.quanLySinhVien);

  const checkId = (id) => studentList.some(student => student.id === id);

  const handleFormValue = (name) => (event) => {
    const value = event.target.value;
    const error = validateInput(name, value);
    setFormError({ ...formError, [name]: error });
    setFormValue({ ...formValue, [name]: value });
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "id":
        if (value.trim() === "") return "Vui lòng nhập thông tin";
        if (checkId(value) && !studentEdit) return "Mã sinh viên bị trùng";
        return "";
      case "name":
        if (value.trim() === "") return "Vui lòng nhập thông tin";
        if (!value.match(/^[a-zA-Z\s]+$/)) return "Vui lòng nhập chữ";
        return "";
      case "phoneNumber":
        if (value.trim() === "") return "Vui lòng nhập thông tin";
        if (!value.match(/^[0-9]+$/)) return "Vui lòng nhập số";
        return "";
      case "email":
        if (value.trim() === "") return "Vui lòng nhập thông tin";
        if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) return "Vui lòng nhập đúng định dạng email";
        return "";
      default:
        return "";
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (studentEdit) {
      setFormValue(studentEdit);
    }
  }, [studentEdit]);

  return (
    <div className="container mt-5">
      <h2 className="p-3 bg-dark text-light">Thông tin sinh viên</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const errorValidation = {};
        Object.keys(formValue).forEach(name => {
          const error = validateInput(name, formValue[name]);
          if (error) {
            errorValidation[name] = error;
          }
        });

        if (Object.keys(errorValidation).length === 0) {
          if (studentEdit) {
            dispatch(quanLySinhVienActions.updateStudent(formValue));
          } else {
            dispatch(quanLySinhVienActions.addStudent(formValue));
          }
          setFormValue({ id: "", name: "", phoneNumber: "", email: "" });
        } else {
          setFormError(errorValidation);
        }
      }}>
        {Object.entries(formValue).map(([key, value]) => (
          <div key={key} className="mb-3">
            <label htmlFor={key} className="form-label">{key}</label>
            <input
              type="text"
              className={`form-control ${formError[key] ? 'is-invalid' : value && 'is-valid'}`}
              id={key}
              value={value}
              onChange={handleFormValue(key)}
              disabled={key === "id" && studentEdit}
            />
            <div className="invalid-feedback">{formError[key]}</div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          {studentEdit ? "Cập nhật" : "Thêm sinh viên"}
        </button>
      </form>
    </div>
  );
};
