<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h2 class="ml-3">Painel</h2>
        <v-row>
          <v-col
            ><v-card class="fixed-height"
              ><p>Total:</p>
              <p>{{ availableAmount.total }}</p></v-card
            ></v-col
          >
          <v-col
            ><v-card class="fixed-height">
              <p>Reembolsos</p>
              <p>{{ availableAmount.refund }}</p></v-card
            ></v-col
          >
          <v-col
            ><v-card class="fixed-height">
              <p>Porcentagem de reembolsos</p>
              <p>{{ refundPercentage }}</p></v-card
            ></v-col
          >
        </v-row>
        <v-card class="row-contained">
          <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="graph"
            aria-labelledby="title"
            role="img"
            viewBox="-130 -50 1350 500"
          >
            <title id="title">Ganhos últimos 30 dias</title>
            <g class="grid x-grid" id="xGrid">
              <line x1="90" x2="90" y1="-40" y2="371"></line>
            </g>
            <g class="grid y-grid" id="yGrid">
              <line x1="90" x2="1000" y1="370" y2="370"></line>
            </g>
            <g
              class="labels x-labels"
              v-for="index in 30"
              :key="`profit-day-${showDays(index)}`"
            >
              <text :x="labelOffsetX(index)" y="400">
                {{ showDays(index) }}
              </text>
              <text x="400" y="440" class="label-title">Dias</text>
            </g>
            <g class="labels y-labels">
              <text x="50" y="-26">2000</text>
              <text x="50" y="174">1000</text>
              <text x="50" y="373">0</text>
              <text x="-20" y="200" class="label-title">Ganhos</text>
            </g>
            <g class="data" data-setname="Our first data set">
              <circle
                v-for="(profit, index) of profits"
                :key="`day-value-${profit.day}`"
                :cx="labelOffsetX(index) + 4"
                :cy="labelOffsetY(profit.daily_gain - profit.refund)"
                data-value="7.2"
                r="4"
              ></circle>
            </g>
          </svg>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("associate", {
      profits: "getProfits",
      availableAmount: "getAvailableAmount",
    }),
    refundPercentage() {
      return `${
        (this.availableAmount.refund * 100) / this.availableAmount.total
      }%`;
    },
  },
  methods: {
    labelOffsetY(profit) {
      const offset = 5;
      return profit / offset - 370;
    },
    labelOffsetX(index) {
      const offset = 30;
      return 110 + offset * index;
    },
    showDays(index) {
      if (this.profits[index] && this.profits[index].length < index)
        return this.profits[index].day;
      else return null;
    },
  },
};
</script>

<style>
.fixed-height {
  height: 6rem;
  text-align: center;
  font-size: 2rem;
}
.fixed-height > p:first-child {
  font-size: 1.5rem;
}

circle {
  fill: green;
}
text {
  fill: rgba(255, 255, 255, 0.699);
}
.row-contained {
  height: 450px;
  width: 100%;
  overflow-y: auto;
}
.data {
  transform: rotateX(180deg);
}
line {
  stroke: #fff;
}
</style>
