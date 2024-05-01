import { combineReducers } from "redux";
import { quanLySinhVienReducer } from "./QuanLySinhVien/slice";

export const rootReducer = combineReducers({
  quanLySinhVien: quanLySinhVienReducer,
});
