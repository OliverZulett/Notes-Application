import VueJwtDecode from 'vue-jwt-decode'

export const decodeJWT = (jwt: string) => VueJwtDecode.decode(jwt)
