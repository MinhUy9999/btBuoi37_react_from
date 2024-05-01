import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [
    {
      id: "123",
      name: "Nguyen Van A",
      phoneNumber: "012345678",
      email: "abc@gmail.com",
    },
    {
      id: "124",
      name: "Nguyen Van B",
      phoneNumber: "098765432",
      email: "cdef@gmail.com",
    },
    {
      id: "125",
      name: "Nguyen Van C",
      phoneNumber: "023487659",
      email: "asdfg@gmail.com",
    },
  ],
  studentEdit: undefined,
};

const QuanLySinhVienSlice = createSlice({
  name: "QuanLySinhVien",
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      //console.log("payload: ", payload);
      state.studentList.push(payload);
    },

    deleteStudent: (state, { payload }) => {
      state.studentList = state.studentList.filter(
        (value) => value.id !== payload
      );
    },

    setStudentEdit: (state, { payload }) => {
      state.studentEdit = payload;
    },

    updateStudent: (state, { payload }) => {
      //console.log("payload: ", payload);
      const studentIndex = state.studentList.findIndex(
        (item) => item.id === payload.id
      );

      if (studentIndex !== -1) {
        //console.log("student found", productIndex);
        state.studentList[studentIndex] = payload;
        state.studentEdit = undefined;
      }
    },
  },
});

export const {
  reducer: quanLySinhVienReducer,
  actions: quanLySinhVienActions,
} = QuanLySinhVienSlice;
