<template>
    <div class="container">
        <div class="form-group my-5">
          <h1 class="lead d-flex align-items-center gap-1">
            <i class="fa-brands fa-node-js"></i>
            <span>Lotteries node API</span>
          </h1>
          <p class="small">@on-innovation/api</p>
        </div>

        <div class="list-group">
          <ul class="list-group">
            <li class="list-group-item active bg-success" aria-current="true">
              <i class="fa-solid fa-layer-group" id="lottery-icon"></i>
              <span>
                {{ data.nome }} 
              </span>
            </li>
            <li class="list-group-item">
              <span class="small">Próx. Concurso: {{ (data.concurso + 1) +' - '+ data.dataProxConcurso }}</span>
            </li>
            <li class="list-group-item">
              <div class="text-muted d-flex gap-1 align-items-center" v-if="data.acumulou == false">
                <i class="fa-solid fa-arrow-down-wide-short"></i>
                <span class="small">Não acumulou</span>
              </div>
              <div class="text-success d-flex gap-1 align-items-center" v-else>
                <i class="fa-solid fa-arrow-up-wide-short"></i>
                <span class="small">Acumulou</span>
              </div>
            </li>
            <li class="list-group-item">
              Estimativa: <span class="medium-font">{{ data.acumuladaProxConcurso }}</span>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
        nome: null,
        concurso: null,
        dataProxConcurso: null,
        dezenas: null,
        acumuladaProxConcurso: null,
        acumulou: null
      }
    }
  },
  methods: {
    getApi() {
      axios.get('https://node-api-ashen.vercel.app/')
      .then(response => {
        this.data.nome = response.data.nome
        this.data.concurso = response.data.concurso
        this.data.dataProxConcurso = response.data.dataProxConcurso
        this.data.dezenas = response.data.dezenas
        this.data.acumuladaProxConcurso = response.data.acumuladaProxConcurso
        this.data.acumulou = response.data.acumulou
      })
    }
  },
  created() {
    this.getApi()
  }
}
</script>

<style scoped>
h1 {
  margin: 0;
}
.gap-1 {
  gap: 10px;
}
p {
  color: rgba(0, 0, 0, .3);
}
i#lottery-icon {
  font-size: 18px;
  margin-right: 10px;
}
li.active {
  color: #FFF;
  font-weight: 500;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.medium-font {
  font-weight: 500;
}
.dz {
  width: 45px;
  height: 25px;
  border-right: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.dz:nth-last-child(1) {
  border: none;
}
i {
  font-style: normal;
  font-size: inherit;
}
</style>