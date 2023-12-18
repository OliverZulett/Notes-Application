export const validatePassword = (passwordValue: string) => {
  if (!passwordValue) {
    return 'Password is required'
  }
  if (passwordValue.length < 8) {
    return 'Password should have at least 8 characters'
  }
  return true
}
