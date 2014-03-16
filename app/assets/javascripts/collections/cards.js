window.Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,

  initialize: function (options, model) {
    this.list = model.list;
  },

  // url: function () {
  //   return this.board.url() + "/lists"
  // }

	url: function () {
    return 'lists/' + this.list.id + '/cards';
  },

  comparator: function (card) {
    return card.get('rank');
  }

});
