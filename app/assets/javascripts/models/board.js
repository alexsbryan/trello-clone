window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',

  lists: function () {
    if(!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }
    return this._lists;
  }


});
