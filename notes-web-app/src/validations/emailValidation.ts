export const validateEmail = (emailValue: string) => {
  if (!emailValue) {
    return 'Email is required'
  }
  const emailRegexValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!emailRegexValidation.test(emailValue)) {
    return 'Email must be valid'
  }
  return true
}
