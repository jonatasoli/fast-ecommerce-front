<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="9">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Data"
              hint="DD/MM/AAAA formato"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="pt-br"
            v-model="dates"
            range
            no-title
            @click="enviarDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: (vm) => ({
    dates: [new Date().toISOString().substr(0, 10)],
    dateFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
    menu1: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    enviarDate() {
      return this.$emit(
        "dates",
        this.dates.map((value) => value).sort()
      );
    },
    dateRangeText() {
      return this.dates
        .map((value) => this.formatDate(value))
        .sort()
        .join("-");
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
    },
  },
};
</script>
