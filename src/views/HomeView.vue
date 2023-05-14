<template>
  <div>
    <h1>Dump</h1>
    <span>(Axios) API HTTP GET Response: <em>https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena</em></span>
    <code>
      acumulado: <b>{{ responseData.acumulado }}</b><br />
      dataApuracao: <b>{{ responseData.dataApuracao }}</b><br />
      listaDezenas: <b>{{ responseData.listaDezenas }}</b><br />
      listaRateioPremio: <b>{{ responseData.listaRateioPremio }}</b><br />
      numero: <b>{{ responseData.numero }}</b><br />
      tipoJogo: <b>{{ responseData.tipoJogo }}</b><br />
      <h4>👉 NEXT_CONTEST</h4>
      dataProximoConcurso: <b>{{ responseData.dataProximoConcurso }}</b><br />
      numeroConcursoProximo: <b>{{ responseData.numeroConcursoProximo }}</b><br />
      valorEstimadoProximoConcurso: <b>{{ responseData.valorEstimadoProximoConcurso }}</b>
    </code>
    <div class="flex" v-if="dataBase.dataApuracao != responseData.dataApuracao || dataBase.valorEstimadoProximoConcurso != responseData.valorEstimadoProximoConcurso">
      <button @click="updateData()">
          <i class="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
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
  code {
    color: #464646;
  }
  button {
    padding: 1rem 1.4rem;
    border: none;
    border-radius: 5px;
    background: #1bc771;
    color: #FFF;
    cursor: pointer;
    transition: .4s ease all;
    display: table;
    margin-top: 1rem;
    margin-left: 2rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
  }
  button:hover {
    background: #18a35d;
  }
  .next {
    padding: 10px 25px;
    border: none;
    border-radius: 5px;
    background: #c6c6c6;
    color: #464646;
    cursor: pointer;
    transition: .4s ease all;
    display: table;
    margin-top: 2rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
  }
  .next:hover {
    background: #999999;
  }

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
      padding: 20px 2rem;
      width: calc(100% - 4rem);
      display: table;
      box-sizing: border-box;
      color: lime;
      background: rgb(5, 41, 30);
      border-radius: 10px;
      margin: 10px 2rem 0 2rem;
      line-height: 1.5;
  }
  b {
      font-family: monospace;
      color: rgb(219, 255, 219);
      font-weight: 400;
      font-size: 14px;
  }
  .flex {
    display: flex;
    gap: 20px;
  }
  em {
    font-style: normal !important;
    font-family: monospace;
    font-weight: 500;
    color: rgb(26, 139, 96);
  }
  code h4 {
    font-size: 15px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 10px 0;
    border-top: 1px solid #1bc771;
    margin-top: 20px;
  }
</style>
