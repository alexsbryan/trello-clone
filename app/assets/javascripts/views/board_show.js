window.Trellino.Views.BoardShow = Backbone.View.extend({
  initialize: function(options) {
    //for any listenTo actions
    this.collection = options.collection,
    this.board = options.board,
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, 'reset sort', this.render);
  },

  template: JST['boards/board_show'],

  render: function () {
    // this.collection.comparator = 'rank';
    var renderedContent = this.template({
      lists: this.collection,
      board: this.board
    });

    this.$el.html(renderedContent);

    return this;
  }


})