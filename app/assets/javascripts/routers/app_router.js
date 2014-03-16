window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes:{
    "" : "boardIndex",
    "boards/:id/lists": "boardShow",
    "boards/:id/lists/:id": "listShow"
  },

  boardIndex: function () {
    var that = this;

    Trellino.Collections.boards.fetch({
      success: function () {
        var indexView = new Trellino.Views.BoardIndex({
          collection:  Trellino.Views.boards
        })

        that._swapView('#content', indexView)
      }
    });
  },

  boardShow: function (id) {
    var that = this;
    var board = Trellino.Collections.boards.get(id);
    var lists = board.lists();


    lists.fetch({
      success: function () {
        var boardShow = new Trellino.Views.BoardShow({
          collection: lists,
          board: board
        });
        that._swapView('#content', boardShow);
      }
    })
  },

  boardNew: function () {
    var newView = new Trellino.Views.NewBoard();
    this._swapView('#content', newView);
  },

  listShow: function (id1, id2) {
    var that = this;
    var board = Trellino.Collections.boards.get(id1);
    var lists = board.lists();
    //var cards = lists.get(id2).cards();

    lists.fetch({
      success: function () {
        var listShow = new Trellino.Views.ListShow({
          model: lists.get(id2),
          //board: board
        });
        that._swapView('#content', listShow);
      }
    })
  },

  _swapView: function (domEl, viewToRender) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = viewToRender;
    $(domEl).html(this.currentView.render().$el);

  }

});