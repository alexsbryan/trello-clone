window.Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  initialize: function (options) {
    // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.cards(), "add", this.addCard);
    // this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.model = options.model;

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
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  },

  removeCard: function (card) {
    var cardsShowView =
      _(this.subviews()[".cards"]).find(function (subview) {
        return subview.model == card;
      });

    this.removeSubview(".cards", cardsShowView);
  },

  render: function () {
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