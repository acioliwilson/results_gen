<template>
    <h1>Dump</h1>
    <span>Firebase data</span>
    <div v-for="result in results" :key="result.id">
        <code>
            acunulado: <b>{{ result.acumulado }}</b><br />
            dataApuracao: <b>{{ result.dataApuracao }}</b><br />
            listaDezenas: <b>{{ result.listaDezenas }}</b><br />
            listaRateioPremio: <b>{{ result.listaRateioPremio }}</b><br />
            numero: <b>{{ result.numero }}</b><br />
            tipoJogo: <b>{{ result.tipoJogo }}</b><br />
        </code>
        <router-link to="/" class="back-home">BACK</router-link>
    </div>
</template>

<script>
import resultsColRef from '@/server/resultscolref'
import { getDocs } from '@firebase/firestore';

export default {
    data() {
        return {
            docRef: null,
            results: [],
            selectedDoc: null,
        }
    },
    methods: {
        async getData () {
            const resultsSnapShot = await getDocs(resultsColRef)
            const results = []
            resultsSnapShot.forEach((result) => {
                const resultData = result.data()
                resultData.id = result.id
                results.push(resultData)
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
    h1 {
        font-size: 25px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        margin: 0 2rem;
        color: #464646;
    }
    span {
        font-size: 15px;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        margin: 0 2rem;
        color: orange;
    }
    code {
        padding: 10px 2rem;
        width: 100%;
        display: table;
        box-sizing: border-box;
        color: #464646;
    }
    b {
        font-family: 'Poppins', sans-serif;
        color: orangered;
        font-weight: 500;
        font-size: 14px;
    }
    .back-home {
        text-decoration: none;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        padding: 10px 20px;
        border-radius: 5px;
        background: #262626;
        color: #FFF;
        display: table;
        margin: 2rem;
        transition: .4s ease all;
    }
    .back-home:hover {
        background: #000;
    }
</style>