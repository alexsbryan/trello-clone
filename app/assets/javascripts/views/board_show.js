window.Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    //for any listenTo actions

    this.collection = options.collection,
    this.board = options.board,
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, 'reset sort', this.render);
    this.listenTo(this.board, 'all add', this.render);
     this.listenTo(this.board.lists(), 'all add sync', this.render, 50);

    this.board.lists().each(this.addList.bind(this));
    // this.listenTo(this.board.cards(), 'add', this.render);
  },

  template: JST['boards/board_show'],

  events: {
    'click .new-card' : 'newCardForm',
    "click button#new-list": "newListForm",
    "submit form#new-list-form": "createList"
  },

  // newCardForm: function (event) {
//     event.preventDefault();
//     $(event.currentTarget).removeClass('new-card');
//     debugger
//     var view = new Trellino.Views.NewCardForm({
//       list: this.model
//     });
//     $(event.currentTarget).html(view.render().$el);
//   },

  createList: function (event) {
    event.preventDefault();
    var data = {
      title: this.$('#title').val(),
      rank: (this.board.lists().length + 1),
      board_id: this.board.id
    };

    this.board.lists().create(data);
  },


  addList: function (list) {
    var listsShowView = new Trellino.Views.ListShow({
      model: list
    });
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },

  newListForm: function(event){
    event.preventDefault();
    $("#list-form").toggleClass("hidden")
    $("#new-list-button").toggleClass("hidden")
   },

  renderLists: function () {
    var that = this
      this.board.lists().each(function (list) {
        var view = new Trellino.Views.ListShow({
          model: list
        });
        that.addSubview('.lists', view.render());
      });
      this.renderSubviews();
    },

  render: function () {

    var that = this;
    // this.collection.comparator = 'rank';
    var renderedContent = this.template({
      lists: this.collection,
      board: this.board
    });


    this.$el.html(renderedContent);
   // this.renderLists();
    this.renderSubviews();

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