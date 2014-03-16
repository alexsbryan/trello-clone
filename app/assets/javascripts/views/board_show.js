window.Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    //for any listenTo actions
    this.collection = options.collection,
    this.board = options.board,
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, 'reset sort', this.render);
    this.board.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var listsShowView = new Trellino.Views.ListShow({
      model: list
    });
    this.addSubview(".lists", listsShowView);
    //listsShowView.render();
  },



  renderLists: function () {
      this.board.lists().each(function (list) {
        var view = new Trellino.Views.ListShow({
          model: list
        });
        this.addSubView('.lists', view.render());
      }, this);
    },


  template: JST['boards/board_show'],

  render: function () {
    var that = this;
    // this.collection.comparator = 'rank';
    var renderedContent = this.template({
      lists: this.collection,
      board: this.board
    });


    this.$el.html(renderedContent);
    //this.renderLists();
    // this.renderSubviews();

    return this;
  }


})






//
//   template: JST["lists/show"],
//
//   initialize: function (options) {
//     // this.listenTo(this.model, "sync", this.render);
//     // this.listenTo(this.model.cards(), "add", this.addCard);
//     // this.listenTo(this.model.cards(), "remove", this.removeCard);
//     this.model = options.model;
//     var that = this;
//
//     // this.model.each(function (list) {
//     //   list.cards().each(that.addCard.bind(that));
//     // })
//
//     this.model.cards().each(this.addCard.bind(this));
//
//
//   },
//
//   addCard: function (card) {
//     var cardsShowView = new Trellino.Views.CardsShow({
//       model: card
//     });
//     this.addSubview(".cards", cardsShowView);
//     cardsShowView.render();
//   },
//
//   removeCard: function (card) {
//     var cardsShowView =
//       _(this.subviews()[".cards"]).find(function (subview) {
//         return subview.model == card;
//       });
//
//     this.removeSubview(".cards", cardsShowView);
//   },
//
//   render: function () {
//     var that = this;
//
//     var renderedContent = this.template({
//       list: this.model
//     });
//
//     this.$el.html(renderedContent);
//
//     this.renderSubviews();
//
//     return this;
//   }
// });