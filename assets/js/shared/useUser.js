export const useUser = () => {
  const session = localStorage.getItem('session')
  if (session != null) {
    const user = JSON.parse(session).user
    return {
      user,
      isAdmin: user.roles.includes('ROLE_ADMIN'),
      isUser: user != null
    }
  }
  return { user: null, isAdmin: false, isUser: false }
}
