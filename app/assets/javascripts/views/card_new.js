window.Trellino.Views.NewCardForm = Backbone.View.extend({
  //className: "new-card",
  initialize: function (options) {
    this.listenTo(Trellino.Collections.boards,"add change:title", this.render),
    this.list = options.list
  },

  template: JST['cards/new'],

  events: {
    "submit .create-card": "submit"
  },

  render: function() {
    var renderedContent = this.template({
      list: this.list
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var data = {
      title: this.$('#title').val(),
      rank: this.list.cards().length + 1,
      list_id: this.list.id
    };


    var $formData = $(event.currentTarget).serializeJSON();
    this.list.cards().create(data)
  }

})