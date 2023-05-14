<template>
    <div class="container mt-3">
      {{ responseData }}
    </div>
    <hr class="my-3">
    <div class="container">
      <div class="alert alert-danger" role="alert" v-if="dataBase.dataApuracao != responseData.dataApuracao || dataBase.valorEstimadoProximoConcurso != responseData.valorEstimadoProximoConcurso">
        New update pending. Please update!
      </div>
      <div class="alert alert-info" role="alert" v-else>
        Data updated successfully!
      </div>
      <button class="btn btn-info text-light" @click="updateData()" v-if="dataBase.dataApuracao != responseData.dataApuracao || dataBase.valorEstimadoProximoConcurso != responseData.valorEstimadoProximoConcurso">
        <i class="fa-solid fa-retweet"></i>
        Update
      </button>
    </div>
</template>

<script>
import axios from 'axios'
import resultsColRef from '@/server/resultscolref';
import { doc, getDoc, setDoc } from '@firebase/firestore';

export default {
  data() {
    return {
      id: 'E3utpvBEWu4dPzYKoPTI',
      docRef: null,
      results: [],
      selectedDoc: null,
      responseData: {
        acumulado: null,
        dataApuracao: null,
        listaDezenas: null,
        listaRateioPremio: null,
        numero: null,
        tipoJogo: null,
        dataProximoConcurso: null,
        numeroConcursoProximo: null,
        valorEstimadoProximoConcurso: null,
      },
      dataBase: {
        acumulado: null,
        dataApuracao: null,
        listaDezenas: null,
        listaRateioPremio: null,
        numero: null,
        tipoJogo: null,
        dataProximoConcurso: null,
        numeroConcursoProximo: null,
        valorEstimadoProximoConcurso: null,
      }
    }
  },
  methods: {
    async getData () {
        const docRef = doc(resultsColRef, this.id)
        this.docRef = docRef
        const result = await getDoc(this.docRef)
        const resultData = result.data()
        this.dataBase.acumulado = resultData.acumulado
        this.dataBase.dataApuracao = resultData.dataApuracao
        this.dataBase.listaDezenas = resultData.listaDezenas
        this.dataBase.listaRateioPremio = resultData.listaRateioPremio
        this.dataBase.numero = resultData.numero
        this.dataBase.tipoJogo = resultData.tipoJogo
        this.dataBase.dataProximoConcurso = resultData.dataProximoConcurso
        this.dataBase.numeroConcursoProximo = resultData.numeroConcursoProximo
        this.dataBase.valorEstimadoProximoConcurso = resultData.valorEstimadoProximoConcurso
    },
    async getApiData () {
        axios.get('http://localhost:8080/portaldeloterias/api/megasena', {headers: { 'ContentType': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*' }})
        .then(response => (
          this.responseData.acumulado = response.data.acumulado,
          this.responseData.dataApuracao = response.data.dataApuracao,
          this.responseData.listaDezenas = response.data.listaDezenas,
          this.responseData.listaRateioPremio = response.data.listaRateioPremio,
          this.responseData.numero = response.data.numero,
          this.responseData.tipoJogo = response.data.tipoJogo,
          this.responseData.dataProximoConcurso = response.data.dataProximoConcurso,
          this.responseData.numeroConcursoProximo = response.data.numeroConcursoProximo,
          this.responseData.valorEstimadoProximoConcurso = response.data.valorEstimadoProximoConcurso
        ))
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
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap');

button {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
  animation: 1s fadeInDown ease forwards;
  animation-delay: 1.5s;
  opacity: 0;
}
.alert {
  animation: 1s fadeInDown ease forwards;
  animation-delay: 1s;
  opacity: 0;
}
@keyframes fadeInDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>