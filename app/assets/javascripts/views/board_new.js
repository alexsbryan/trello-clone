window.Trellino.Views.NewBoard = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Trellino.Collections.boards,"add change:title", this.render)
  },

  template: JST['boards/board_new'],

  events: {
    "submit .create-board": "submit"
  },

  render: function() {
    var renderedContent = this.template;
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var $formData = $(event.currentTarget).serializeJSON();
    Trellino.Collections.boards.create($formData)
  }


});


// events: {
//   "submit #NewFeedForm": "submit",
//   "mouseover input": "hoverSubmit",
//   "mouseover img" : "hoverCat"
// },
//
// render: function () {
//   var renderedContent = this.template();
//
//   this.$el.html(renderedContent);
//   this.delegateEvents()
//   return this
// },
//
// submit: function (event) {
//   event.preventDefault();
//   $formData = $(event.currentTarget).serializeJSON();
//   console.log($formData)
//   NewReader.feeds.create($formData);
// },