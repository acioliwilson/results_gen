<template>
    <section>
        <div style="font-family: monospace; color: tomato; font-weight: bold;">API: {{ responseData.dataApuracao }}</div>
        <div>
            <h1>DATABASE: {{ dataBase.dataApuracao }}</h1>
            <button @click="updateData()" v-if="dataBase.dataApuracao != responseData.dataApuracao">
                <i class="fa-solid fa-arrows-rotate"></i>
            </button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import testColRef from '@/server/testcolref';
import { doc, getDoc, setDoc } from '@firebase/firestore';
export default {
    data() {
        return {
            id: 'D6JE7iOAMaadbFUSFzzq',
            docRef: null,
            results: [],
            selectedDoc: null,
            responseData: {
                dataApuracao: null
            },
            dataBase: {
                dataApuracao: null
            }
        }
    },
    methods: {
        async getData () {
            const docRef = doc(testColRef, this.id)
            this.docRef = docRef
            const result = await getDoc(this.docRef)
            const resultData = result.data()
            this.dataBase.dataApuracao = resultData.dataApuracao
        },
        async getApiData () {
            axios.get('http://localhost:8080/portaldeloterias/api/megasena', {headers: { 'ContentType': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' }})
            .then(response => this.responseData.dataApuracao = response.data.dataApuracao)
        },
        async updateData () {
            await setDoc(this.docRef, this.responseData)
            this.$router.go()
        }
    },
    created() {
        this.getApiData()
        this.getData()
    }
}
</script>

<style scoped>
    section {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button {
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 500;
        background: orangered;
        color: #FFF;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        display: table;
        margin: 0 auto;
        border: none;
        cursor: pointer;
        transition: .4s ease all;
    }
    button i {
        margin: 0 10px;
    }
    button:hover {
        background: #ee4102;
    }
    a:focus {
        background: #ee622f;
    }
    h1 {
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        color: #464646;
        font-weight: 500;
    }
</style>