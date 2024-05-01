import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quanLySinhVienActions } from '../store/QuanLySinhVien/slice'

export const ThongTinSVTable = () => {
  const {studentList} = useSelector((state) => state.quanLySinhVien)
  console.log('studentList', studentList);
  const dispatch = useDispatch()
  return (
    <div className='mt-5'>
        <table className='table'>
            <thead>
                <tr className='table-dark'>
                    <th>Mã SV</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {
                studentList.map(student => {
                  return <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.email}</td>
                  <td style={{
                    width: 120,
                  }}>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(quanLySinhVienActions.deleteStudent(student.id))
                      }}><i className="fa-solid fa-trash-can"></i></button>
                    <button className="btn btn-success ms-3" onClick={() => {
                      dispatch(quanLySinhVienActions.setStudentEdit(student))
                    }}><i className="fa-solid fa-pen-to-square"></i></button>
                  </td>
                </tr>
                })
              }
            </tbody>
        </table>
    </div>
  )
}
