import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database"
import {auth, database} from '../main'
export default {
    state: {
        user: auth?.currentUser
    },
    mutations: {
        
    },
    actions: {
        async login({dispatch, commit, state}, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                commit('setError', error.code)
                throw error
            }
        },

        async logout({commit}) {
            await signOut(auth)
            commit('clearInfo')

        },
        //TODO добавлять локаль при регистрации, начальный счет
        async register({dispatch, commit}, {email, password, name, bill, locale}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid')
                set(ref(database, `/users/${uid}/info`), {
                    bill,
                    name,
                    locale
                })
            } catch (error) {
                commit('setError', error.code)
                throw error
            }
        },

         getUid() {
           const user = auth.currentUser 
           return user ? user.uid : null
        }
    }
}