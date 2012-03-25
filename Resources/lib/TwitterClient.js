
Ti.include('/lib/oauth_adapter.js');
Ti.include('/config/config.js');

var TwitterClient = function(secret, key)
{
    var oAuthAdapter = new OAuthAdapter(key, secret, 'HMAC-SHA1');
	
    // load the access token for the service (if previously saved)
    oAuthAdapter.loadAccessToken('twitter');

	this.checkIfAuthorized = function() {
		// if the client is not authorized, ask for authorization. the previous tweet will be sent automatically after authorization
		if (oAuthAdapter.isAuthorized() == false)
		{
			// this function will be called as soon as the application is authorized
			var receivePin = function() {
			    // get the access token with the provided pin/oauth_verifier
			    oAuthAdapter.getAccessToken('https://api.twitter.com/oauth/access_token');
			    // save the access token
			    oAuthAdapter.saveAccessToken('twitter');
			};
			// show the authorization UI and call back the receive PIN function
			oAuthAdapter.showAuthorizeUI('https://api.twitter.com/oauth/authorize?' + oAuthAdapter.getRequestToken('https://api.twitter.com/oauth/request_token'), receivePin);
	    }
    };
	
  /**
    Twitter APIs
    We can use same parameter of Twitter API. 
    see http://dev.twitter.com/doc
    Additional params for all APIs.
     params.onSuccess(response)
      callback function when API returns successfully.
     params.onError(error)
      callback function for illegal situation.
  */
	this.callApi = function(params){
		this.checkIfAuthorized();
		
	    if (!params){
	      	Ti.API.error('twitter api params error. no params.');
	      	return;
	    }
    	if (!params.resource){
	    	if (!params.url){
	      		Ti.API.error('twitter api params error. no params.url.');
	      		return;
	      	}
      	}else{
      		params.url = 'http://api.twitter.com/1/' + params.resource;
      	}
      	
		if(params.parameters == undefined) params.parameters = [];
	    
		return oAuthAdapter.send(params);
	}
	//Timelines
  //statuses.home_timeline
  this.statuses_home_timeline = function(params){
    params.resource = 'statuses/home_timeline.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.mentions
  this.statuses_mentions = function(params){
    params.resource = 'statuses/mentions.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.public_timeline
  this.statuses_public_timeline = function(params){
    params.resource = 'statuses/public_timeline.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweeted_by_me
  this.statuses_retweeted_by_me = function(params){
    params.resource = 'statuses/retweeted_by_me.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweeted_to_me
  this.statuses_retweeted_to_me = function(params){
    params.resource = 'statuses/retweeted_to_me.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweets_of_me
  this.statuses_retweeted_of_me = function(params){
    params.resource = 'statuses/retweeted_of_me.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.user_timeline
  this.statuses_user_timeline = function(params){
    params.resource = 'statuses/user_timeline.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweeted_to_user
  this.statuses_retweeted_to_user = function(params){
    params.resource = 'statuses/retweeted_to_user.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweeted_by_user
  this.statuses_retweeted_by_user = function(params){
    params.resource = 'statuses/retweeted_by_user.json';
    params.method = 'GET';
    return this.callApi(params);
  };
 	//Tweets
  //statuses.retweeted_by
  this.statuses_retweeted_by = function(params){
    params.resource = 'statuses/:id/retweeted_by.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweeted_by_ids
  this.statuses_retweeted_by_ids = function(params){
    params.resource = 'statuses/:id/retweeted_by/ids.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.retweets
  this.statuses_retweets = function(params){
    params.resource = 'statuses/retweets/:id.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.show
  this.statuses_show = function(params){
    params.resource = 'statuses/show/:id.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.destroy
  this.statuses_destroy = function(params){
    params.resource = 'statuses/destroy/:id.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //statuses.retweet
  this.statuses_retweet = function(params){
    params.resource = 'statuses/retweet/:id.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //statuses.update
  this.statuses_update = function(params){
    params.resource = 'statuses/update.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //statuses.update
  this.statuses_update_with_media = function(params){
    params.resource = 'statuses/update_with_media.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //statuses.oembed
  this.statuses_oembed = function(params){
    params.resource = 'statuses/oembed.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Search
  //search
  this.search = function(params){
    params.resource = 'search.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Direct Messages
  //direct_messages
  this.direct_messages = function(params){
    params.resource = 'direct_messages.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //direct_messages.sent
  this.direct_messages_sent = function(params){
    params.resource = 'direct_messages/sent.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //direct_messages.destroy
  this.direct_messages_destroy = function(params){
    params.resource = 'direct_messages/destroy/:id.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //direct_messages.new
  this.direct_messages_new = function(params){
    params.resource = 'direct_messages/new.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //direct_messages.show.id
  this.direct_messages_show_id = function(params){
    params.resource = 'direct_messages/show/:id.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Friends & Followers
  //followers.ids
  this.followers_ids = function(params){
    params.resource = 'followers/ids.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friends.ids
  this.friends_ids = function(params){
    params.resource = 'friends/ids.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.exists
  this.friendships_exists = function(params){
    params.resource = 'friendships/exists.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.incoming
  this.friendships_incoming = function(params){
    params.resource = 'friendships/incoming.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.outgoing
  this.friendships_outgoing = function(params){
    params.resource = 'friendships/outgoing.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.show
  this.friendships_show = function(params){
    params.resource = 'friendships/show.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.create
  this.friendships_create = function(params){
    params.resource = 'friendships/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //friendships.destroy
  this.friendships_destroy = function(params){
    params.resource = 'friendships/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //friendships.lookup
  this.friendships_lookup = function(params){
    params.resource = 'friendships/lookup.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //friendships.update
  this.friendships_update = function(params){
    params.resource = 'friendships/update.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //friendships.no_retweet_ids
  this.friendships_no_retweet_ids = function(params){
    params.resource = 'friendships/no_retweet_ids.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Users
  //users.lookup
  this.users_lookup = function(params){
    params.resource = 'users/lookup.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.profile_image
  this.users_profile_image = function(params){
    params.resource = 'users/profile_image/:screen_name.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.search
  this.users_search = function(params){
    params.resource = 'users/search.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.show
  this.users_show = function(params){
    params.resource = 'users/show.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //users.contributees
  this.users_contributees = function(params){
    params.resource = 'users/contributees.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.contributors
  this.users_contributors = function(params){
    params.resource = 'users/contributors.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Suggested Users
  //users.suggestions
  this.users_suggestions = function(params){
    params.resource = 'users/suggestions.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.suggestions.twitter
  this.users_suggestions_twitter = function(params){
    params.resource = 'users/suggestions/:slug.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //users.suggestions.twitter.members
  this.users_suggestions_twitter_members = function(params){
    params.resource = 'users/suggestions/:slug/members.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Favorites
  //favorites
  this.favorites = function(params){
    params.resource = 'favorites.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //favorites.create
  this.favorites_create = function(params){
    params.resource = 'favorites/create/:id.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //favorites.destroy
  this.favorites_destroy = function(params){
    params.resource = 'favorites/destroy:id.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Lists
  // lists.all
  this.lists_all = function(params){
    params.resource = 'lists/all.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.statuses
  this.lists_statuses = function(params){
    params.resource = 'lists/statuses.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.members.destroy
  this.lists_members_destroy = function(params){
    params.resource = 'lists/members/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.memberships
  this.lists_memberships = function(params){
    params.resource = 'lists/memberships.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.subscribers
  this.lists_subscribers = function(params){
    params.resource = 'lists/subscribers.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.subscribers.create
  this.lists_subscribers_create = function(params){
    params.resource = 'lists/subscribers/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.subscribers.show
  this.lists_subscribers_show = function(params){
    params.resource = 'lists/subscribers/show.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.subscribers.destroy
  this.lists_subscribers_destroy = function(params){
    params.resource = 'lists/subscribers/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.members.create_all
  this.lists_members_create_all = function(params){
    params.resource = 'lists/members./create_alljson';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.members.show
  this.lists_members_show = function(params){
    params.resource = 'lists/members/show.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.members
  this.lists_members = function(params){
    params.resource = 'lists/members.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists.members.create
  this.lists_members_create = function(params){
    params.resource = 'lists/members/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.destroy
  this.lists_destroy = function(params){
    params.resource = 'lists/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  // lists.update
  this.lists_update = function(params){
    params.resource = 'lists/update.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //lists.create 
  this.lists_create = function(params){
    params.resource = 'lists/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //lists 
  this.lists = function(params){
    params.resource = 'lists.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists/show
  this.lists_show = function(params){
    params.resource = 'lists/show.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  // lists/subscriptions
  this.lists_subscriptions = function(params){
    params.resource = 'lists/subscriptions.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Accounts
  //account.rate_limit_status
  this.account_rate_limit_status = function(params){
    params.resource = 'account/rate_limit_status.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //account/verify_credentials
  this.account_verify_credentials = function(params){
    params.resource = 'account/verify_credentials.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //account.end_session
  this.account_end_session = function(params){
    params.resource = 'account/end_session.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //account.update_profile
  this.account_update_profile = function(params){
    params.resource = 'account/update_profile.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //account.update_profile_background_image
  this.account_update_profile_background_image = function(params){
    params.resource = 'account/update_profile_background_image.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //account.update_profile_colors
  this.account_update_profile_colors = function(params){
    params.resource = 'account/update_profile_colors.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //account.update_profile_image
  this.account_update_profile_image = function(params){
    params.resource = 'account/update_profile_image.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //account.totals
  this.account_totals = function(params){
    params.resource = 'account/totals.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //get.account.setting
  this.get_account_setting = function(params){
    params.resource = 'account/setting.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //set.account.setting
  this.set_account_setting = function(params){
    params.resource = 'account/setting.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Notification
  //notifications.follow
  this.notifications_follow = function(params){
    params.resource = 'notifications/follow.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //notifications.leave
  this.notifications_leave = function(params){
    params.resource = 'notifications/leave.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Saved Searches
  //saved_searches
  this.saved_searches = function(params){
    params.resource = 'saved_searches.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //saved_searches.show
  this.saved_searches_show = function(params){
    params.resource = 'saved_searches/show.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //saved_searches.create
  this.saved_searches_create = function(params){
    params.resource = 'saved_searches/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //saved_searches.destroy
  this.saved_searches_destroy = function(params){
    params.resource = 'saved_searches/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Local Trends
  //trends.woeid
  this.trends_woeid = function(params){
    params.resource = 'trends/:woeid.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //trends.available
  this.trends_available = function(params){
    params.resource = 'trends/available.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Places & Geo
  //geo.id.place
  this.geo_id_place = function(params){
    params.resource = 'geo/id/:place_id.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //geo.reverse_geocode
  this.geo_reverse_geocode = function(params){
    params.resource = 'geo/reverse_geocode.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //geo.search
  this.geo_search = function(params){
    params.resource = 'geo/search.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //geo.similar_places
  this.geo_similar_places = function(params){
    params.resource = 'geo/similar_places.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //geo.place
  this.geo_place = function(params){
    params.resource = 'geo/place.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Trends
  //trends.daily
  this.trends_daily = function(params){
    params.resource = 'trends/daily.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //trends.weekly
  this.trends_weekly = function(params){
    params.resource = 'trends/weekly.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Block
  //blocks.blocking
  this.blocks_blocking = function(params){
    params.resource = 'blocks/blocking.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //blocks.blocking_ids
  this.blocks_blocking = function(params){
    params.resource = 'blocks/blocking/:ids.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //blocks.exists
  this.blocks_exists = function(params){
    params.resource = 'blocks/exists.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //blocks.create
  this.blocks_create = function(params){
    params.resource = 'blocks/create.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //blocks.destroy
  this.blocks_destroy = function(params){
    params.resource = 'blocks/destroy.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Spam Reporting
  // report_spam
  this.report_spam = function(params){
    params.resource = 'report_spam.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//OAuth
  //oauth.authenticate
  this.oauth_authenticate = function(params){
    params.resource = 'oauth/authenticate.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //oauth.authorize
  this.oauth_authorize = function(params){
    params.resource = 'oauth/authorize.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //oauth.access_token
  this.oauth_access_token = function(params){
    params.resource = 'oauth/access_token.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  //oauth.request_token
  this.oauth_request_token = function(params){
    params.resource = 'oauth/request_token.json';
    params.method = 'POST';
    return this.callApi(params);
  };
  	//Help
  //help.test
  this.help_test = function(params){
    params.resource = 'help/test.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //help.configuration
  this.help_configuration = function(params){
    params.resource = 'help/configuration.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //help.languages
  this.help_languages = function(params){
    params.resource = 'help/languages.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Legal
  //legal.privacy
  this.legal_privacy = function(params){
    params.resource = 'legal/privacy.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //legal/tos
  this.legal_tos = function(params){
    params.resource = 'legal/tos.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  	//Deprecated
  //statuses.followers
  this.statuses_followers = function(params){
    params.resource = 'statuses/followers.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.friends
  this.statuses_friends = function(params){
    params.resource = 'statuses/friends.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //statuses.friends_timeline
  this.statuses_friends_timeline = function(params){
    params.resource = 'statuses/friends_timeline.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //trends
  this.trends = function(params){
    params.resource = 'trends.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //trends.current
  this.trends_current = function(params){
    params.resource = 'trends/current.json';
    params.method = 'GET';
    return this.callApi(params);
  };
  //account.update_delivery_device
  this.account_update_delivery_device = function(params){
    params.resource = 'account/update_delivery_device.json';
    params.method = 'POST';
    return this.callApi(params);
  };
};

var tc = new TwitterClient(config.consumer_key,config.consumer_secret);

exports = tc;