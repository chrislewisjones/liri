# liri

Liri is a command line node app that takes in parameters and gives back data. Liri can search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

The below commands should be input along with a query/search:

movie-this
concert-this
spotify-this-song
do-what-it-says

movie-this: searches OMDB for info and ratings data based on the search term. If no search term is provided, it will default to Mr Nobody.

concert-this: searches Bands in Town for event info based on the search term. If no search term is provided, it will default to The Foo Fighters.

spotify-this-song: searches Spotify for song info based on the search term. If no term is provided, it will default to Ace of Base's The Sign.

do-what-it-says: This command reads info from a txt file and uses the text to perform a search.
