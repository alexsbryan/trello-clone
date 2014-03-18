window.Trellino.Views.CardsShow = Backbone.View.extend({
  attributes: function () {
    return {
      "data-id": this.model.get("id")
    };
  },

  template: JST['cards/show'],

  // function () {
//     return this.open ? JST["cards/edit"] : JST["cards/show"];
//   },
//   //
  // events: {
  //   "click button.destroy": "destroy",
  //   "dblclick div.content": "beginEditing",
  //   "submit form.list": "endEditing",
  //   "move": "moveComment"
  // },
  //
  initialize: function (options) {
    this.open = false;
    this.card = options.model;
    this.listenTo(this.model, "add", this.render);
  },

  // beginEditing: function () {
  //   this.open = true;
  //   this.render();
  // },
  //
  // endEditing: function (event) {
  //   event.preventDefault();
  //
  //   this.open = false;
  //
  //   var content = this.$("textarea.list_content").val();
  //   this.model.save({ content: content });
  //
  //   this.render();
  // },

  // moveComment: function () {
  //   var list =
  //     Trellino.Collections.lists.get(this.model.get("list_id"));
  //
  //   var prevId = this.$el.prev().data("id");
  //   var nextId = this.$el.next().data("id");
  //
  //   var prevModel = list.cards().get(prevId);
  //   var nextModel = list.cards().get(nextId);
  //
  //   var newOrderNum;
  //   if (prevModel == null) {
  //     // moved to the first position
  //     newOrderNum = nextModel.get("order_num") - 1;
  //   } else if (nextModel == null) {
  //     // moved to the last position
  //     newOrderNum = prevModel.get("order_num") + 1;
  //   } else {
  //     newOrderNum =
  //       (prevModel.get("order_num") + nextModel.get("order_num")) / 2;
  //   }
  //
  //   this.model.save({ order_num: newOrderNum });
  // },

  render: function () {
    var renderedContent = this.template({
      card: this.card
    });

    this.$el.html(renderedContent);


    return this;
  },

  // destroy: function () {
  //   this.model.destroy();
  // }
});