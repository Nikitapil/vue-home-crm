import { getDatabase, ref, set, onValue, push, child, get, update } from "firebase/database"
import {auth, database} from '../main'

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
               const category = await push(ref(database, `/users/${uid}/categories`), {
                    title,
                    limit
                })
                return {title, limit, id: category.key}
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
      async fetchCategories ({commit, dispatch}) {
        try {
            const uid = await dispatch('getUid')
            const categoriesPath =  ref(database)
            const categoriesRes = []
            const categories = await (await get(child(categoriesPath, `/users/${uid}/categories`))).val()
            Object.keys(categories).forEach(key => {
                categoriesRes.push({
                    ...categories[key],
                    id: key
                })
            })
            return categoriesRes
        } catch (error) {
            return []
        }
      },
      async updateCategory({commit, dispatch, $message}, {title, limit, id}) {
        try {
            const uid = await dispatch('getUid')
            await update(ref(database, `/users/${uid}/categories/${id}`), {
                title,
                limit
            })
            
        } catch (error) {
            commit('setError', error)
            throw error
        }
      },
      async fetchCategoryById ({commit, dispatch}, id) {
        try {
            const uid = await dispatch('getUid')
            const categoriesPath =  ref(database)
            const category = await (await get(child(categoriesPath, `/users/${uid}/categories/${id}`))).val()
            return {...category, id}
        } catch (error) {
            return []
        }
      },
    }
}