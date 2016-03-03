<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '28867595-2UvqeDLeXERQspoMfvhjD7q2fTe9fm6Z7g41cAsUj',
    'oauth_access_token_secret' => 'AiSuoazADAm2PcxJZRL6JEdRfYg3AtKBLrwvEF2zLVC9W',
    'consumer_key' => 'kBSDn1HUeFuvY1ctFQkAVJNrE',
    'consumer_secret' => 'iFJuYBiMdX0E7xhdYDJm4XfMKx9XH5L3aupjGCUVT6BBU8K6ou'
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>
