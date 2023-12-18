import type { Note } from './types'
import { http } from './http'
import router from '@/router'

const NOTE_RESOURCE = 'notes'

export async function getNotes(): Promise<Array<Note>> {
  const response = await http.get(`${NOTE_RESOURCE}`)
  return response.data
}

export const getNotesByUserId = (userId: string, jwtToken: string): Promise<Array<Note>> =>
  http
    .get(`${NOTE_RESOURCE}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data.data)
    .catch(err => {
      const {status} = err.response;

      if (status && status === 401) {
        localStorage.clear();
        router.push('/login');
      }
    });


export const getNotesById = (noteId: string, jwtToken: string): Promise<Array<Note>> =>
    http
      .get(`${NOTE_RESOURCE}/${noteId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      .then((resp) => resp.data.data)

export const createNote = (note: Note, jwtToken: string) =>
  http
    .post(`${NOTE_RESOURCE}`, JSON.stringify(note), {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data)

export const updateNote = (noteId:string, note: Note, jwtToken: string) =>
  http
    .put(`${NOTE_RESOURCE}/${noteId}`, JSON.stringify(note), {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then((resp) => resp.data)

export const deleteNoteById = (noteId: string, jwtToken: string): Promise<void> =>
    http
      .delete(`${NOTE_RESOURCE}/${noteId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      .then((resp) => resp.data.data)