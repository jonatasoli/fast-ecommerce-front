<template>
  <v-app>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <SecondaryNavBar />
      </v-row>
    </div>
    <v-container>
      <h1>Gracielle Gatto</h1>
      <p>
        CEO na Empresa Hair School Internacional, a renomada Hair Stylist
        internacional, atua no mercado da beleza há mais de 20 anos. Com vasta
        experiência, já ministrou cursos na América do Sul , Europa e África.
      </p>
      <p>
        Tem formação em mais de 70 cursos nacionais e internacionais em
        academias de referência como: Pivot Point, Vidal Sasson , Tony Guy entre
        outras.
      </p>
      <p>
        A Empresa Hair School Internacional, está entre as 10 melhores academias
        do Brasil.
      </p>
      <p>
        Com mais de 100 mil alunos participantes entre cursos
        profissionalizantes e especializações, surge no mercado como uma
        academia facilitadora no setor da beleza, trazendo conhecimento de forma
        objetiva e clara.
      </p>
    </v-container>
    <v-container class="cards">
      <v-card class="mx-auto" width="244">
        <v-img
          class="img"
          src="./assets/alvo.png"
          max-width="130"
          max-height="200"
        ></v-img>
        <v-card-title>MISSÃO</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="missao = !missao">
            <v-icon>{{
              missao ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="missao">
            <v-divider></v-divider>
            <v-card-text>
              <ul>
                <li>Espírito de equipe</li>
                <li>Lealdade</li>
                <li>Busca de Conhecimento</li>
                <li>Inovação</li>
                <li>Excelência</li>
                <li>Ética</li>
                <li>Respeito</li>
                <li>Unidade</li>
                <li>Qualidade</li>
                <li>Integridade</li>
              </ul>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" width="244">
        <v-img
          class="img"
          src="./assets/visao.png"
          max-width="130"
          max-height="200"
        ></v-img>
        <v-card-title>VISÃO</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="visao = !visao">
            <v-icon>{{ visao ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="visao">
            <v-divider></v-divider>
            <v-card-text>
              Ser um facilitador educacional, instruindo de forma clara,
              objetiva e de maneira rápida seus alunos com qualidade e alto
              desempenho.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card class="mx-auto" width="244">
        <v-img
          class="img"
          src="./assets/valor.png"
          max-width="130"
          max-height="200"
        ></v-img>
        <v-card-title>VALORES</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="valores = !valores">
            <v-icon>{{
              valores ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="valores">
            <v-divider></v-divider>
            <v-card-text>
              Alcançar maior número de alunos jamais visto em todo território
              nacional, seja presencial ou on-line, com imagem forte no mercado,
              respeito e qualidade, garantindo a satisfação e retorno dos
              clientes.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import Footer from "@/components/shared/Footer.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
export default {
  components: {
    NavBar,
    SecondaryNavBar,
    Footer,
  },
  data() {
    return {
      visao: false,
      valores: false,
      missao: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.push({
        name: "About",
      });
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne&display=swap");
h1 {
  font-family: "Syne", sans-serif;
  text-align: center;
  margin: 20px 10px;
}
p {
  font-size: 20px;
  text-align: justify;
  text-indent: 25px;
  font-family: "Syne", sans-serif;
}
.cards {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 100px;
}
.img {
  background-size: cover;
  margin: 10px auto;
}
</style>
