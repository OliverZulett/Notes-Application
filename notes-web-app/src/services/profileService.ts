import type { User } from '@/stores'
import { http } from '.'

const PROFILE_RESOURCE = 'users'

export const getProfileById = (profileId: string, jwtToken: string): Promise<User> =>
  http
    .get(`${PROFILE_RESOURCE}/${profileId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data.data)

export const updateProfileById = (profileId: string, profile: User, jwtToken: string): Promise<void> =>
  http
    .patch(`${PROFILE_RESOURCE}/${profileId}`, JSON.stringify(profile), {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data.data)

export const deleteProfileById = (profileId: string, jwtToken: string): Promise<void> =>
  http
    .delete(`${PROFILE_RESOURCE}/${profileId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data.data)
