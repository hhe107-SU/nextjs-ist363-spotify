import { getAccessToken } from "../../../lib/spotify";

export async function GET() {
 const token = await getAccessToken();

 //const taylorSwift = "06HL4z0CvFAxyc27GXpf02";

 const artists = [
  {
   name: "Taylor Swift",
   spotify_id: "06HL4z0CvFAxyc27GXpf02",
  },
  {
   name: "Beyoncé",
   spotify_id: "6vWDO969PvNqNYHIOW5v0m",
  },
  {
   name: "Ariana Grande",
   spotify_id: "66CXWjxzNUsdJxJ2JdwvnR",
  },
  {
   name: "Thelonius Monk",
   spotify_id: "4PDpGtF16XpqvXxsrFwQnN",
  },
  {
   name: "Dizzy Gillespie",
   spotify_id: "5RzjqfPS0Bu4bUMkyNNDpn",
  },
  {
   name: "Charlie Parker",
   spotify_id: "4Ww5mwS7BWYjoZTUIrMHfC",
  },
  {
   name: "Sonny Rollins",
   spotify_id: "1VEzN9lxvG6KPR3QQGsebR",
  },
  {
   name: "Dexter Gordon",
   spotify_id: "3NUsiT2JSyaWAnWaXxDzhQ",
  },
  {
   name: "Kenny Burrell",
   spotify_id: "1sdyFmN4bVOcuFDpTVsxBB",
  },
  {
   name: "Wes Montgomery",
   spotify_id: "03YhcM6fxypfwckPCQV8pQ",
  },
 ];

 // Extract the artist IDs
 // example: ["06HL4z0CvFAxyc27GXpf02", "6vWDO969PvNqNYHIOW5v0m", "66CXWjxzNUsdJxJ2JdwvnR"]
 const artistsIds = artists.map((artist) => artist.spotify_id);

 // Convert the artist IDs to a string
 // example: "06HL4z0CvFAxyc27GXpf02,6vWDO969PvNqNYHIOW5v0m,66CXWjxzNUsdJxJ2JdwvnR"
 const artistsString = artistsIds.join(",");

 const apiResponse = await fetch(
  `https://api.spotify.com/v1/artists?ids=${artistsString}`,
  {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  }
 );

 const artistsData = await apiResponse.json();

 return new Response(JSON.stringify(artistsData));
}