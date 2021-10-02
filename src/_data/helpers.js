module.exports = {
  /**
   * Takes an array of objects and groups its items by a given key. Ex:
   * [
   *  { number: "one", group: "first"},
   *  { number: "two", group: "first"}
   * ]
   *
   * becomes
   *
   * [
   *  "first": [
   *    { number: "one", group: "first"},
   *    { number: "two", group: "first"}
   *  ]
   * ]
   *
   *
   * @param {Array} arr
   * @param {String} key
   */
  groupBy(arr, key) {
    return arr.reduce((obj, item) => {
      const groupKey = item[key];
      !obj[groupKey] ? (obj[groupKey] = [item]) : obj[groupKey].push(item);
      return obj;
    }, {});
  },
};
