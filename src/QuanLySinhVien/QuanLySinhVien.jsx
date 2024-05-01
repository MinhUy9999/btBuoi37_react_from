import React from 'react'
import { ThongTinSVForm } from './ThongTinSVForm'
import { ThongTinSVTable } from './ThongTinSVTable'

export const QuanLySinhVien = () => {
  return (
    <div className='container mt-3'>
        <h1 className='text-center'>Quản Lý Sinh Viên</h1>
        <ThongTinSVForm/>
        <ThongTinSVTable/>
    </div>
  )
}
