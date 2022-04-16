import { getDatabase, ref, set, onValue, push, child, get, update } from "firebase/database"
import {auth, database} from '../main'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
            const uid = await dispatch('getUid')
               return  await push(ref(database, `/users/${uid}/records`), record)
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const recordPath =  ref(database)
                const recoedRes = []
                const records = await (await get(child(recordPath, `/users/${uid}/records`))).val()
                Object.keys(records).forEach(key => {
                    recoedRes.push({
                        ...records[key],
                        id: key
                    })
                })
                return recoedRes
                } catch (error) {
                    return []
                }
        },

        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUid')
                const recordPath =  ref(database)
                const record = await (await get(child(recordPath, `/users/${uid}/records/${id}`))).val()
                return {...record, id}
                } catch (error) {
                }
        }
    }
}