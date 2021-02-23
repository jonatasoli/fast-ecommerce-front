<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h2 class="ml-3">Painel</h2>
        <v-card class="row-contained">
          <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="graph"
            aria-labelledby="title"
            role="img"
            viewBox="0 -50 1000 500"
          >
            <title id="title">Ganhos</title>
            <g class="grid x-grid" id="xGrid">
              <line x1="90" x2="90" y1="5" y2="371"></line>
            </g>
            <g class="grid y-grid" id="yGrid">
              <line x1="90" x2="705" y1="370" y2="370"></line>
            </g>
            <g
              class="labels x-labels"
              v-for="(profit, index) in profits"
              :key="`profit-day-${profit.day}`"
            >
              <text :x="labelOffsetX(index)" y="400">
                {{ profit.day }}
              </text>
              <text x="400" y="440" class="label-title">Dias</text>
            </g>
            <g class="labels y-labels">
              <text x="80" y="-26">2000</text>
              <text x="80" y="174">1000</text>
              <text x="80" y="373">0</text>
              <text x="20" y="200" class="label-title">Valor</text>
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
    ...mapGetters("associate", { profits: "getProfits" }),
  },
  methods: {
    labelOffsetY(profit) {
      // chart is 100 unit height
      // we divide 100 by the number of items and multiply by index to get offset
      const offset = 5;
      return profit / offset - 366;
    },
    labelOffsetX(index) {
      // chart is 100 unit height
      // we divide 100 by the number of items and multiply by index to get offset
      const offset = 30;
      return 110 + offset * index;
    },
  },
};
</script>

<style>
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
</style>
