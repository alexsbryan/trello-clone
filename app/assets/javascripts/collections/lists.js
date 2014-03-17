window.Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  initialize: function (options, model) {
    this.board = model.board;
    this.sort_key = 'rank';
  },

  url: function () {
    return this.board.url() + "/lists"
  },

  comparator: 'rank'

  // comparator: function(a, b) {
  //
  //     a = a.get(this.sort_key);
  //     b = b.get(this.sort_key);
  //     return a > b ?  1 : a < b ? -1 : 0;
  // },
  //
  // sort_by_rank: function() {
  //     this.sort_key = 'rank';
  //     this.sort();
  // }
});
