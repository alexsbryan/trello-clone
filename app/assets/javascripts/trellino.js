window.Trellino = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {

      Trellino.Collections.boards = new Trellino.Collections.Boards();

      Trellino.Collections.boards.fetch({
        success: function() {
           new Trellino.Routers.AppRouter();
              Backbone.history.start();
        }
      });
    }
};

$(document).ready(function(){
  Trellino.initialize();
});


