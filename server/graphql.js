const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');

// const RGSongType = new GraphQLObjectType({
//   name: 'Song',
//   description: 'Rap Genius',
//   fields: {
//     title_with_featured: { type: GraphQLString },
//     header_image_thumbnail_url: { type: GraphQLString },
//     url: { type: GraphQLString },
//     // album: { type: GraphQLString },
//     primary_artist: { type: GraphQLString },
//     writer_artists: { type: new GraphQLList(GraphQLString) },
//     producer_artists: { type: new GraphQLList(GraphQLString) }
//   }
// });

const BarsType = new GraphQLObjectType({
  name: 'bars',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    }
  })
});

const SectionsType = new GraphQLObjectType({
  name: 'songSections',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    }
  })
})

const SegmentsType = new GraphQLObjectType({
  name: 'songSegments',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    },
    pitches: {
      type: new GraphQLList(GraphQLFloat),
      resolve: res => res.pitches
    },
    timbre: {
      type: new GraphQLList(GraphQLFloat),
      resolve: res => res.timbre
    }
  })
})

const AudioAnalysisType = new GraphQLObjectType({
  name: 'songanalysis',
  description: 'fromSpotify',
  fields: () => ({
    duration: {
      type: GraphQLFloat,
      resolve: res => res.track.duration
    },
    endOfFadeIn: {
      type: GraphQLFloat,
      resolve: res => res.track.end_of_fade_in
    },
    startOfFadeOut: {
      type: GraphQLFloat,
      resolve: res => res.track.start_of_fade_out
    },
    loudness: {
      type: GraphQLFloat,
      resolve: res => res.track.loudness
    },
    tempo: {
      type: GraphQLFloat,
      resolve: res => res.track.tempo
    },
    key: {
      type: GraphQLInt,
      resolve: res => res.track.key
    },
    mode: {
      type: GraphQLInt,
      resolve: res => res.track.mode
    },
    bars: {
      type: new GraphQLList(BarsType),
      resolve: res => res.bars
    },
    sections: {
      type: new GraphQLList(SectionsType),
      resolve: res => res.sections
    },
    segments: {
      type: new GraphQLList(SegmentsType),
      resolve: res => res.segments
    }
  })
});

const SPAudioFeatures = new GraphQLObjectType({
  name: 'QualitativeFeatures',
  description: '...',
  fields: {
    danceability: {
      type: GraphQLFloat,
      resolve: track => track.danceability
    },
    energy: {
      type: GraphQLFloat,
      resolve: track => track.energy
    },
    loudness: {
      type: GraphQLFloat,
      resolve: track => track.loudness
    },
    key: {
      type: GraphQLFloat,
      resolve: track => track.key
    },
    mode: {
      type: GraphQLFloat,
      resolve: track => track.mode
    },
    speechiness: {
      type: GraphQLFloat,
      resolve: track => track.speechiness
    },
    acousticness: {
      type: GraphQLFloat,
      resolve: track => track.acousticness
    },
    instrumentalness: {
      type: GraphQLFloat,
      resolve: track => track.instrumentalness
    },
    liveness: {
      type: GraphQLFloat,
      resolve: track => track.liveness
    },
    valence: {
      type: GraphQLFloat,
      resolve: track => track.valence
    },
    tempo: {
      type: GraphQLFloat,
      resolve: track => track.tempo
    },
    duration: {
      type: GraphQLFloat,
      resolve: track => track.duration_ms
    },
    timeSignature: {
      type: GraphQLFloat,
      resolve: track => track.time_signature
    }
  }
});

const AlbumArtistsType = new GraphQLObjectType({
  name: 'albumArtists',
  description: '...',
  fields: {
    name: {
      type: GraphQLString,
      resolve: data => data.name
    },
    spid: {
      type: GraphQLString,
      resolve: data => data.id
    }
  }
})

const LimitedSongType = new GraphQLObjectType({
  name: 'ltdSong',
  description: 'noAlbum',
  fields: {
    title: {
      type: GraphQLString,
      resolve: track => track.name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: track => track.id
    },
    audioFeatures: {
      type: SPAudioFeatures,
      resolve: track => {
        var trackId = track.id;
        return axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, config)
        .then((track) => track.data)
      }
    },
    audioAnalysis: {
      type: AudioAnalysisType,
      resolve: track => {return axios.get(`https://api.spotify.com/v1/audio-analysis/${track.id}`, config)
      .then((res) => res.data)
      .catch((err) => console.log('ERROR', err))}
    }
  }
})

const LimitedAlbumDetailsType = new GraphQLObjectType({
  name: 'ltdalbumdetails',
  description: '...',
  fields: {
    releaseDate: {
      type: GraphQLString,
      resolve: album => album.release_date
    },
    thumbnail: {
      type: GraphQLString,
      resolve: album => album.images[0].url
    }
  }
});


const RGSongType = new GraphQLObjectType({
  name: 'AlbumSong',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: res => res.title
    },
    rgid: {
      type: GraphQLString,
      resolve: res => res.id
    },
    url: {
      type: GraphQLString,
      resolve: res => {
        // console.log('rg res1: ', res)
        return res.url
      }
    },
    allCollaborators: {
      type: ArtistDetailsType,
      resolve: res => {
        var songId = res.id;
        return axios.get(`http://api.genius.com/songs/${songId}`, axiosConfigForRapGenius)
        .then((response) => response.data.response.song)
      }
    }
  })
});

const SingleArtistType = new GraphQLObjectType({
  name: 'singleartist',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: data => data.name
    },
    rgid: {
      type: GraphQLInt,
      resolve: data => data.id
    }
  })
})

const CustomPerformancesType = new GraphQLObjectType({
  name: 'custom',
  description: '...',
  fields: () => ({
    label: {
      type: GraphQLString,
      resolve: data => data.label
    },
    artists: {
      type: new GraphQLList(SingleArtistType),
      resolve: res => res.artists
    }
  })
})

const ArtistDetailsType = new GraphQLObjectType({
  name: 'artistDetails',
  description: 'allCollaborators',
  fields: () => ({
    primaryArtist: {
      type: SingleArtistType,
      resolve: data => {
        // console.log('rg res2: ', data)
        return data.primary_artist
      }
    },
    recording_location: {
      type: GraphQLString,
      resolve: res => res.recording_location
    },
    thumbnail: {
      type: GraphQLString,
      resolve: res => res.song_art_image_thumbnail_url
    },
    producerArtists: {
      type: new GraphQLList(SingleArtistType),
      resolve: data => data.producer_artists
    },
    featuredArtists: {
      type: new GraphQLList(SingleArtistType),
      resolve: data => data.featured_artists
    },
    otherArtists: {
      type: new GraphQLList(CustomPerformancesType),
      resolve: data => data.custom_performances
    }
  })
})
//**************
const SPSongType = new GraphQLObjectType({
  name: 'Song',
  description: 'Spotify',
  fields: {
    title: {
      type: GraphQLString,
      resolve: track => {
        console.log('sp data: ', track)
        return track.name
      }
    },
    id: {
      type: GraphQLString,
      resolve: track => track.id
    },
    album: {
      type: GraphQLString,
      resolve: track => track.album.name
    },
    albumId: {
      type: GraphQLString,
      resolve: track => track.album.id
    },
    albumDetails: {
      type: LimitedAlbumDetailsType,
      resolve: track => {
        return axios.get(`https://api.spotify.com/v1/albums/${track.album.id}`, config)
        .then((res) => {
          return res.data
        })
      }
    },
    audioFeatures: {
      type: SPAudioFeatures,
      resolve: track => {
        var trackId = track.id;
        return axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, config)
        .then((track) => track.data)
      }
    },
    audioAnalysis: {
      type: AudioAnalysisType,
      resolve: track => {return axios.get(`https://api.spotify.com/v1/audio-analysis/${track.id}`, config)
      .then((res) => res.data)
      .catch((err) => console.log('ERROR', err))}
    },
    yid: {
      type: GraphQLString,
      resolve: res => {
        var title = res.name;
        var artists = res.artists.reduce((acc, curr) => {acc.push(curr.name); return acc}, []);
        var artistNames = artists.join(' ')
        var body = {
          'maxResults': '5',
          'part': 'snippet',
          'q': title + ' ' + artistNames,
          'type': 'video',
          'key': 'AIzaSyBNwLGlCtldxu1pTmgX-9U5Q-TmqMNpnd8',
          'relevanceLanguage': 'en',
          'order': 'relevance'
        }
        return axios.get(`https://www.googleapis.com/youtube/v3/search`, {params: body})
        .then((res) => {
          var output = res.data.items[0].id.videoId;
          // console.log('output: ', output)
          return output;
        })
      }
    },
    artists: {
      type: new GraphQLList(AlbumArtistsType),
      resolve: res => res.artists
    },
    rg: {
      type: RGSongType,
      resolve: res => {
        var songName = res.name.replace(/ /g, '+');
        return axios.get(`http://api.genius.com/search/songs?q=${songName}`, axiosConfigForRapGenius)
        .then((res) => {
          // console.log('DATA', res.data.response.sections[0].hits[0].result)
          return res.data.response.sections[0].hits[0].result
        })
        .catch((err) => console.log('ERROR', err))
      }
    }
  }
});

const AlbumTracksType = new GraphQLObjectType({
  name: 'songsOnAlbum',
  description: '...',
  fields: {
    tracks: {
      type: new GraphQLList(LimitedSongType),
      resolve: data => data.tracks.items
    }
  }
})

const AlbumDetailsType = new GraphQLObjectType({
  name: 'albumdetails',
  description: '...',
  fields: {
    releaseDate: {
      type: GraphQLString,
      resolve: album => album.release_date
    },
    image: {
      type: GraphQLString,
      resolve: album => album.images[0].url
    },
    tracks: {
      type: new GraphQLList(LimitedSongType),
      resolve: album => album.tracks.items
    }
  }
})

const SPAlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'Spotify',
  fields: {
    title: {
      type: GraphQLString,
      resolve: album => album.name
    },
    spotifyId: {
      type: GraphQLString,
      resolve: album => album.id
    },
    albumArtists: {
      type: new GraphQLList(AlbumArtistsType),
      resolve: album => album.artists
    },
    albumDetails: {
      type: AlbumDetailsType,
      resolve: album => {
        return axios.get(`https://api.spotify.com/v1/albums/${album.id}`, config)
        .then((res) => {
          return res.data
        })
      }
    }
  }
})

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: response => response.data.artists.items[0].name
      },
    spotifyId: {
      type: GraphQLString,
      resolve: response => response.data.artists.items[0].id
    },
    topTracks: {
      type: new GraphQLList(SPSongType),
      resolve: response => {
        var artistId = response.data.artists.items[0].id;
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, config)
        .then((tt) => {
          return tt.data.tracks
        })
      }
    },
    albums: {
      type: new GraphQLList(SPAlbumType),
      resolve: response => {
        var artistId = response.data.artists.items[0].id;
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?country=US`, config)
        .then((res) => {
          return res.data.items
        })
      }

     }
  })
});

const AutocompleteType = new GraphQLObjectType({
  name: 'ac',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: res => res.name
    },
    id: {
      type: GraphQLString,
      resolve: res => res.id
    },
    attr: {
      type: GraphQLString,
      resolve: res => res.attr
    },
    artists: {
      type: new GraphQLList(GraphQLString),
      resolve: res => {
        if (res.attr === 'artist') return [res.name]
        else return res.artists.reduce((acc, curr) => {acc.push(curr.name); return acc;}, [])
      }
    }
  })
})

const axiosConfigForRapGenius = {
  headers: {
    'Authorization' : 'Bearer CY7DUGhn8enS_FHK4LxT-fZPUt2QCCNvg346ZLH_86nbzYIoqmxO6o19MrAIpJiO'
  }
}

const config = {
  headers: {
    'Authorization' : 'Bearer BQCYREEepndxq0xhSRB8KKFCpfvMoHMt-jKxTRig6xkooNs054A101XmpvM4hLDNYuI4FcEn6R4OwkBWFjY'
  }
}

const authConfig = {
  "grant_type": "client_credentials",
  "headers": {
    "Authorization": "Basic MGIzNzNkY2ZmOGZmNGRiMDllYTkwOWE2YWY0NWZjNzM6YWYyOTYxZThjZjU1NGMxYWI3ZTEwYWRlZWZkOGI4ZjM="
  }
}

const getAccessToken = () => {
  return axios.post(`https://accounts.spotify.com/api/token`, authConfig)
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'SpotifyArtist',
    description: '...',
    fields: () => ({
      artist: {
        type: ArtistType,
        args: {
          name: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/search?q=${args.name}&type=artist`, config)
        }
      },
      album: {
        type: SPAlbumType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/albums/${args.id}`, config)
          .then((res) => {
            return res.data
          })
        }
      },
      song: {
        type: SPSongType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/tracks/${args.id}`, config)
          .then((res) => {
            // console.log('song data: ', res.data)
            return res.data
          })
        }
      },
      autocomplete: {
        type: new GraphQLList(AutocompleteType),
        args: {
          q: {
            type: GraphQLString
          }
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/search?q=${args.q}&type=track,artist&limit=15`, config)
          .then((res) => {
            var songs = res.data.tracks.items;
            // var albums = res.data.albums.items;
            var artists = res.data.artists.items;
            songs.forEach(song => song['attr'] = 'song');
            // albums.forEach(alb => alb['attr'] = 'album')
            artists.forEach(art => art['attr'] = 'artist')
            var output = songs.concat(artists)
            // .concat(albums);
            return output
          })
        }
      }
    })
  })
});

/*

query {
  artist(name: "Future") {
    name
    spotifyId
    topTracks {
      title
      spotifyId
      album
      audioFeatures {
        danceability
        energy
        key
        loudness
        mode
        speechiness
        acousticness
        instrumentalness
        liveness
        valence
        tempo
        duration
        timeSignature
      }
      audioAnalysis {
        duration
        endOfFadeIn
        startOfFadeOut
        loudness
        tempo
        key
        mode
        sections {
          start
          duration
          confidence
        }
        segments {
          start
          duration
          confidence
          pitches
          timbre
        }
      }
    }
    albums {
      title
      spotifyId
    }
  }
}

*/
