import { emailRegex } from './regex'

export function validateName(name) {
  if (!name.length) {
    return {
      status: true,
      value: 'Name is required'
    }
  }
  return {
    status: false,
    value: ''
  }
}

export function validateEmail(email) {
  if (!email.length) {
    return {
      status: true,
      value: 'Email is required'
    }
  } else if (!emailRegex.test(email)) {
    return {
      status: true,
      value: 'Email is invalid'
    }
  }
  return {
    status: false,
    value: ''
  }
}

export function validatePhone(phone) {
  if (!phone.length) {
    return {
      status: true,
      value: 'Mobile number is required'
    }
  } else if (isNaN(phone) || phone.length !== 10) {
    return {
      status: true,
      value: 'Mobile number is invalid'
    }
  }

  return {
    status: false,
    value: ''
  }
}
