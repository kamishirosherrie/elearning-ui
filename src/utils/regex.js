export const regexRule = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    userName: /^[a-zA-Z](?!.*\.\.)[a-zA-Z0-9._]{3,28}[a-zA-Z0-9_]$/,
    passWord: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    fullName: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,
    gender: /^(Nữ|Nam|Khác)$/i,
    phoneNumber: /^0\d{9}$/,
    birthday: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
}
