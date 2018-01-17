const db = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const inthestudio = db.inthestudio;
const Song = require('../db/models/songModel.js');
const Section = require('../db/models/sectionModel.js');
const Segment = require('../db/models/segmentModel.js');

exports.similarVibe = (req, res) => {
  var title = req.query.title;
  return Song.findOne({where:{title}})
  .then((theSong) => {
    var selVibe = theSong.dataValues.vibe;
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
  .then((songs) => res.send(songs))
}

exports.addSong = (req, res) => {
  console.log('body: ', req.body)
  var song = req.body.song;
  var title = song.title;
  var artists = req.body.artists;
  var albumName = song.album;
  var albumId = song.albumId;
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
        artists,
        albumName,
        albumId,
        vibe: avgVibe
      })
      .then((newSong) => {
        var songId = newSong.dataValues.id;
        return Promise.all(allSections.map(s => addSection(s, songId)))
        .then((addedSections) => {
          return Promise.all(allSegs.map(g => addSegment(g, songId)))
          .then((addedSegs) => {
            res.send(newSong)
          })
        })
        res.send('ok')
      })
    } else {
      res.send(check)
    }
  })
  res.send('ok')
};

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
