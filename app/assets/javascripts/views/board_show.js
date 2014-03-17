window.Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    // this.collection = options.collection,
    this.board = options.board,
    this.listenTo(this.collection, "sync", this.renderSubviews()),
    // this.listenTo(this.collection, "sync", this.render),
    this.listenTo(this.collection, "add reset sort", this.render),
     this.listenTo(this.collection, "add reset sort", this.renderSubviews()),
    this.collection.each(this.addList.bind(this))
    // this.listenTo(this.board.cards(), 'add', this.render);
    // this.listenTo(this.board, "all add", this.render);
    // this.listenTo(this.board.lists(), "add create sync", this.render);
  },

  template: JST['boards/board_show'],

  events: {
    'click .new-card' : 'newCardForm',
    "click button#new-list": "newListForm",
    "submit form#new-list-form": "createList"
  },

  createList: function (event) {
    event.preventDefault();
    var data = {
      title: this.$('#title').val(),
      rank: (this.board.lists().length + 1),
      board_id: this.board.id
    };
    var newList = new Trellino.Models.List();
    newList.save(data);
    this.collection.add(newList);
    this.addList(newList);
    //this.collection.create(data);
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

    // newCardForm: function (event) {
  //     event.preventDefault();
  //     $(event.currentTarget).removeClass('new-card');
  //     debugger
  //     var view = new Trellino.Views.NewCardForm({
  //       list: this.model
  //     });
  //     $(event.currentTarget).html(view.render().$el);
  //   },


  render: function () {

    var that = this;
    // this.collection.comparator = 'rank';
    var renderedContent = this.template({
      lists: this.collection,
      board: this.board
    });


    this.$el.html(renderedContent);

   // this.renderLists();

   //makes cards sortable
   //todo: break into separate method
    this.renderSubviews();

    $(this.$el).find(".list-group").sortable({
      cursor: "move",
      opacity: .3,
      stop: function (event, ui) {
        var $card = $(ui.item);
        var nextLiOrder = $card.next().data("card-order");
        var prevLiOrder = $card.prev().data("card-order");
        var updatedAttr;
        if(nextLiOrder && prevLiOrder){
          updatedAttr = (nextLiOrder+prevLiOrder)/2;
        } else if(nextLiOrder){
          updatedAttr = nextLiOrder/2
        } else {
          updatedAttr = prevLiOrder + 100
        }
        $card.attr('data-card-order',updatedAttr);

        var listToUpdate = that.collection.get(parseInt($card.data('list-id')));
        var cardToUpdate = listToUpdate.cards().get(parseInt($card.data('id')));


        cardToUpdate.save({
          rank: updatedAttr
        }, {patch:true})

      }
    });


    //makes lists sortable
    //todo: break into separate method
    $(this.$el).find(".lists").sortable({
      cursor: "move",
      opacity: .3,
      stop: function (event, ui) {
        var $list = $(ui.item);
        var nextLiOrder = $list.next().data("list-rank");
        var prevLiOrder = $list.prev().data("list-rank");
        var updatedAttr;
        if(nextLiOrder && prevLiOrder){
          updatedAttr = (nextLiOrder+prevLiOrder)/2;
        } else if(nextLiOrder){
          updatedAttr = nextLiOrder/2
        } else {
          updatedAttr = prevLiOrder*1.01
        }
        $list.attr('data-list-rank',updatedAttr);

        var listToUpdate = that.collection.get(parseInt($list.data('id')));
        listToUpdate.save({
          rank: updatedAttr
        }, {patch:true})

      }
    })

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