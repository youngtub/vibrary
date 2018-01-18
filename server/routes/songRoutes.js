const db = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const inthestudio = db.inthestudio;
const Song = require('../db/models/songModel.js');
const Section = require('../db/models/sectionModel.js');
const Segment = require('../db/models/segmentModel.js');
const Artist = require('../db/models/artistModel.js');
const PCA = require('ml-pca');

exports.explore = (req, res) => {
  return Song.findAll({})
  .then((allSongs) => {
    var all = allSongs.reduce((acc, curr) => {acc.push(curr.dataValues); return acc;}, [])
    var allVibes = allSongs.reduce((acc, curr) => {acc.push(curr.dataValues.vibe); return acc;}, [])
    var pca = new PCA(allVibes);
    var pcaVibes = pca.predict(allVibes);
    console.log('PCA: ', pcaVibes);
    all.forEach((s, i) => s['pcaVibe'] = pcaVibes[i])
    var nodes = all;

    var maxDel = 0;
    var dels = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        var totalDev = 0;
        for (let k = 0; k < 12; k++) {
          var currDev = Math.abs(nodes[i].pcaVibe[k] - nodes[j].pcaVibe[k])
          totalDev += currDev;
        }
        if(totalDev > maxDel) maxDel = totalDev
        var delObj = {
          source: nodes[i].title, target: nodes[j].title, del: totalDev
        };
        dels.push(delObj)
      }
    }

    var links = dels.map(obj => {
      obj['value'] = Math.floor((1 - obj.del / maxDel)*100);
      return obj;
    })
    var respObj = {nodes, links}
    res.send(respObj)
  })
}

exports.similarVibePCA = (req, res) => {
  var title = req.query.title;
  var mainSong;
  return Song.findOne({where:{title}})
  .then((theSong) => {
    var selVibe = theSong.dataValues.vibe;
    mainSong = theSong.dataValues;
    return Song.findAll({
      where: {
        title: {
          [Op.not]: title
        }
      }
    })
    .then((allS) => {
      var all = allS.reduce((acc, curr) => {acc.push(curr.dataValues); return acc;}, [])
      var allVibes = allS.reduce((acc, curr) => {acc.push(curr.dataValues.vibe); return acc;}, [])
      var pcaVibes = new PCA(allVibes);
      allVibes.unshift(selVibe);
      var variance = pcaVibes.predict(allVibes);
      console.log('variance: ', variance.length);
      var mainVec = variance.shift();
      mainSong['vec'] = mainVec;
      var maxDel = 0;
      variance.forEach((vec, i) => {
        var totalDev = 0;
        for (let i = 0; i < 12; i++) {
          var currDev = Math.abs(mainVec[i] - vec[i])
          totalDev += currDev;
        }
        all[i]['vec'] = vec;
        all[i]['del'] = totalDev;
        if(totalDev > maxDel) maxDel = totalDev
      })
      all.forEach(s => {
        s['percDev'] = Math.floor((1 - s.del / maxDel)*100);
      })
      all.sort((a, b) => a.del - b.del)
      res.send(all)
    })
  })
}

exports.similarVibe = (req, res) => {
  var title = req.query.title;
  return Song.findOne({where:{title}})
  .then((theSong) => {
    var selVibe = theSong.dataValues.vibe;
    // const pcaSelVibe = new PCA(selVibe);
    return Song.findAll({
      where: {
        title: {
          [Op.not]: title
        }
      }
    })
    .then((allS) => {
      var maxDel = 0;
      var all = allS.reduce((acc, curr) => {acc.push(curr.dataValues); return acc;}, [])
      all.forEach(s => {
        var totalDev = 0;
        for (let i = 0; i < 12; i++) {
          var currDev = Math.abs(selVibe[i] - s.vibe[i])
          totalDev += currDev
          s['del'] = totalDev;
          if(totalDev > maxDel) maxDel = totalDev
        }
      })
      all.forEach(s => {
        s['percDev'] = Math.floor((1 - s.del / maxDel)*100);
      })
      all.sort((a, b) => a.del - b.del)
      // console.log('ALL: ', all)
      res.send(all)
    })
  })
}

exports.allSongs = (req, res) => {
  return Song.findAll({})
  .then((songs) => {
    var titles = songs.reduce((acc, curr) => {acc.push(curr.title); return acc;}, []);
    console.log('Titles ', titles)
    return res.send(songs)
  })
}

exports.addSong = (req, res) => {
  var song = req.body.song;
  var title = song.title;
  // var artists = req.body.data.artists;
  var yid = song.yid;
  var albumName = song.album;
  var albumId = song.albumId;
  var key = song.audioAnalysis.key;
  var tempo = song.audioAnalysis.tempo;
  var duration = song.audioAnalysis.duration;
  var spid = song.id;
  var thumbnail = song.albumDetails.thumbnail;
  var released = song.albumDetails.releaseDate;

  var rg = song.rg;
  var rgid = rg.rgid;
  var collabs = rg.allCollaborators;
  var recording_location = collabs.recording_location;
  var rgPrimary = [collabs.primaryArtist]
  var rgProducers = collabs.producerArtists;
  rgProducers.forEach(p => {p['role'] = 'producer'})
  var rgFeatured = collabs.featuredArtists;
  var initialOther = collabs.otherArtists;
  var rgOther = initialOther.reduce((acc, curr) => {
    var temp = curr.artists.map(a => {a['role'] = curr.label; return a})
    acc = acc.concat(curr.artists);
    return acc;
  }, [])
  var vocals = rgPrimary.concat(rgFeatured);
  vocals.forEach(v => {v['role'] = 'vocals'})
  var vocalNames = vocals.reduce((acc, curr) => {acc.push(curr.name); return acc;},[]);
  var producerNames = rgProducers.reduce((acc, curr) => {acc.push(curr.name); return acc;},[]);
  var otherNames = rgOther.reduce((acc, curr) => {acc.push(curr.name); return acc;},[]);
  var allArtists = vocals.concat(rgProducers).concat(rgOther);
  var allArtistsNames = vocalNames.concat(producerNames).concat(otherNames)

  var allSections = song.audioAnalysis.sections;
  var start = allSections[0];
  var till = start.duration - start.start;
  var allSegs = song.audioAnalysis.segments;
  var segs = allSegs.filter(seg => seg.start < till);
  var timbres = segs.reduce((acc, curr) => {acc.push(curr.timbre); return acc;}, []);
  var vibe = [0,0,0,0,0,0,0,0,0,0,0,0];
  for (let i = 0; i < timbres.length; i++) {
    for (let j = 0; j < 12; j++) {
      vibe[j] += timbres[i][j]
    }
  }
  var avgVibe = vibe.map(vib => vib/timbres.length);
  return Song.findOne({
    where: {title}
  })
  .then((check) => {
    if(!check) {
      return Song.create({
        title,
        vocals: vocalNames,
        producers: producerNames,
        engineers: otherNames,
        artists: allArtistsNames,
        albumName,
        albumId,
        vibe: avgVibe,
        key,
        cutoff: till,
        tempo,
        spid,
        duration,
        thumbnail,
        released,
        yid,
        rgid,
        recording_location
      })
      .then((newSong) => {
        var songId = newSong.dataValues.id;
        return Promise.all(allSections.map(s => addSection(s, songId)))
        .then((addedSections) => {
          return Promise.all(allSegs.map(g => addSegment(g, songId)))
          .then((addedSegs) => {
            return Promise.all(allArtists.map(addArtist))
            .then((addedArts) => {
              res.send(newSong)
            })
          })
        })
      })
    } else {
      res.send(check)
    }
  })
  res.send('ok')
};

const addArtist = (artist) => {
  return Artist.findOne({where:{name: artist.name}})
  .then((art) => {
    if(!art || art === null) {
      // return wiki().search(title)
      //   .then(data => {
      //     // console.log('wiki search: ', data.results)
      //     return wiki().page(data.results[0])
      //     .then(res => {
      //       var resFromWiki = res;
      //       return resFromWiki.summary()
      //       .then((sum) => sum)
      //     })
      //   })
      return Artist.create({
        name: artist.name,
        role: artist.role,
        rgid: artist.rgid
      })
    }
  })
}

const addSection = (sec, songId) => {
  return Section.create({
    start: sec.start,
    end: sec.end,
    duration: sec.duration,
    songId
  })
}

const addSegment = (seg, songId) => {
  return Segment.create({
    start: seg.start,
    duration: seg.duration,
    timbre: seg.timbre,
    pitches: seg.pitches,
    songId
  })
}
