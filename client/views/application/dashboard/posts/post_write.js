

Template.postWrite.created = function() {
  console.log('Dashboard Created');
  console.log(this.data);

  Session.set('postTypes', []);
  if ( !!this.data && !!this.data.newPostTypes )
    Session.set('postTypes', this.data.newPostTypes);
  else
    Session.set('postTypes', {});


  console.log('session data:')
  console.log(Session.get('postTypes'));

  // initialize as blank
  Session.set('selectedType', '');
}


Template.postWrite.rendered = function() {
  Session.set('postId', ( !!this.data && !!this.data._id ) ? this.data._id : undefined );
};



Template.postWrite.helpers({
  newPostSelect: function() {
      if (Session.get('postTypes').length > 0 && Session.get('selectedType').length == '' )
        return true;
      return false;
  },
  backLink: function() {
    if (typeof Session.get('postId') != 'undefined') {
      return '/novels/'+Session.get('postId');
    } else {
      return '/';
    }
  },
  inactive: function() {
    if (moment().month() != 11) {
      return 'not-yet-nano'; 
    }
  },
  countdown: function() {
    var end = moment().month('November').date(1);
    var start = moment();
    var diff = end.diff(start, 'days');
    console.log('now dayte: ' + start.format('MM-DD-YYYY'))
    console.log('end dayte: ' + end.format('MM-DD-YYYY'))
    console.log('diff: ' + end.diff(start, 'days'))

    if (moment().month() < 11) {
      return "The challenge starts in " + diff + " days";
    } else {
      return "NaNoWriMo has Started!";
    }
  }
});


Template.postWrite.events({
  'click a[data-type="nanowrimo"]': function(e) { 
    console.log('nanowrimo novel init')
    // Session.set('selectedType', 'nanowrimo');
  },
  'click a[data-type="monthly"]': function(e) { 
    console.log('monthly novel init')
    Session.set('selectedType', 'monthly');
  },
  'click a[data-type="weekly"]': function(e) { 
    console.log('weekly novel init')
    Session.set('selectedType', 'weekly');
  },
  'click a[data-type="free"]': function(e) { 
    console.log('free novel init')
    Session.set('selectedType', 'free');
  }
});
