import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL',
	requestPermissions: {
    	github: ['user','read:org']
  	},
});

Accounts.onLogin(function() {
	
  var confirmed = false;
  	var auth = Meteor.user().services.github.accessToken.toString()

  	HTTP.get("https://api.github.com/orgs/piBrain/members",{
  			params: {'access_token': auth}
  		},
  		function(error,response){
  			var c_user_name = Meteor.user()
  				.services.github.username
  			if(error === null) {
  				response.data.map((user) => (
  					confirmed = (confirmed || (user.login === c_user_name))
  				))
  			}
  			else {
  				Meteor.logout()
  			}
  
  			if(confirmed == false ) Meteor.logout()

        
  		}
    ) 
})








