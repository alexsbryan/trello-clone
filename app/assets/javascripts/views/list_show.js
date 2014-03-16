window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  attributes: function () {
    return {
      "data-id": this.model.get("id")
    };
  },


  initialize: function (options) {
    // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.cards(), "add", this.addCard);
    // this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.model = options.model;
    var that = this;

    // this.model.each(function (list) {
    //   list.cards().each(that.addCard.bind(that));
    // })

    this.model.cards().each(this.addCard.bind(this));

    // var cardNewView = new Todo.Views.CardsNew({
    //   todo: this.model
    // });
    // this.addSubview(".card-new", cardNewView);
  },

  addCard: function (card) {
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    this.addSubview(".lists", cardsShowView);
    //cardsShowView.render();
  },

  removeCard: function (card) {
    var cardsShowView =
      _(this.subviews()[".lists"]).find(function (subview) {
        return subview.model == card;
      });

    this.removeSubview(".lists", cardsShowView);
  },

  render: function () {
    var that = this;
    // this.model.each( function (list) {
   //    debugger
   //    var renderedContent = that.template({
   //      list: list
   //    });
   //
   //    that.$el.append(renderedContent);
   //  } )
    var renderedContent = this.template({
      list: this.model
    });


    this.$el.html(renderedContent);

    // this.$(".cards").sortable({
    //   "axis": "y",
    //   "update": function (event, ui) { ui.item.trigger("move") }
    // });
    this.renderSubviews();

    return this;
  }
});