<template>
    <div v-for="result in results" :key="result.id">
        {{ result.id }}
    </div>
</template>

<script>
import resultsColRef from '@/server/resultscolref';
import { getDocs } from '@firebase/firestore';

export default {
    data() {
        return {
            selectedDoc: {},
            id: null,
            docRef: null,
            results: []
        }
    },
    methods: {
        async getData () {
            const snap = await getDocs(resultsColRef)
            const results = []
            snap.forEach((result) => {
                const resData = result.data()
                resData.id = result.id
                results.push(resData)
            })
            this.results = results
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style scoped>
    
</style>