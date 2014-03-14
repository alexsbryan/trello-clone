window.Trellino.Views.BoardIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Trellino.Collections.boards,"sync add", this.render)
  },

  template: JST['boards/board_index'],

  render: function() {
    var renderedContent = this.template({collection:
      Trellino.Collections.boards});

      var newView = new Trellino.Views.NewBoard();

      this.$el.html(renderedContent).append(newView.render().$el);


      // render subviews
      return this
  }


})