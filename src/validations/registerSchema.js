import * as yup from 'yup'
import { regexRule } from '../utils/regex'

export const registerSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Vui lòng nhập họ tên')
        .matches(regexRule.fullName, 'Họ tên chỉ chứa chữ cái và khoảng trắng, tối thiểu 2 ký tự'),
    userName: yup
        .string()
        .required('Vui lòng nhập tên người dùng')
        .matches(regexRule.userName, 'Tên người dùng không hợp lệ'),
    email: yup.string().required('Vui lòng nhập email').matches(regexRule.email, 'Email không hợp lệ'),
    gender: yup.string().required('Vui lòng chọn giới tính').matches(regexRule.gender, 'Giới tính không hợp lệ'),
    passWord: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .matches(regexRule.passWord, 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt'),
    confirmPassWord: yup
        .string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('passWord'), null], 'Mật khẩu không khớp'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh').matches(regexRule.birthday, 'Ngày sinh không hợp lệ'),
})
