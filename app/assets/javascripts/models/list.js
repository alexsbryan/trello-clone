window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: '/boards/:id/lists',

  cards: function () {
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }
    return this._cards
  },

  parse: function (jsonResp) {

    if(jsonResp.cards){
      // this.cards().clear([]);
      var that = this
      // _.each(jsonResp, function (list) {
        that.cards().set(jsonResp.cards);
        delete jsonResp.cards;
      // })
      // this.cards().add(jsonResp.cards);
    //   delete jsonResp.cards;
    }
    return jsonResp
  }

});
