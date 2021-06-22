export default {
    methods: {
        getTotalPrice(item) {
            const prices = this.reducePrices(item);
            return prices / 100;
          },
          reducePrices(product) {
            const reducer = (accumulator, currentValue = 0) => {
              return currentValue.price * currentValue.qty + accumulator;
            };
      
            const arrayIndexes = Object.values(product);
      
            const prices = arrayIndexes.reduce(reducer, 0);
      
            return prices;
          },
    }
}