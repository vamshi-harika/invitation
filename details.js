// EDIT THIS FILE. Every name, date, place and line of copy on the invitation lives here.

window.INVITE = {
  groom: 'Krishna Vamshi',
  bride: 'Harika',
  shortNames: 'Krishna Vamshi & Harika', // used in the sign-off
  city: 'Hyderabad',
  muhurtham: '2026-11-21T10:04:00+05:30', // drives the countdown

  // Optional background song. Put the file in this folder, e.g. './song.mp3'. Blank hides the music button.
  music: 'song.mp3',
  musicStart: 44, // seconds into the song where it begins, and where it loops back to
  // After the letter opens, the page drifts down by itself at this many pixels a second. 0 turns it off.
  // It stops for good the moment a guest touches, scrolls or taps.
  autoScroll: 40,

  places: {
    groom: { name: 'Groom’s Home', detail: 'Flat 212', map: 'https://maps.app.goo.gl/fdZjcuTYxNsHtFoV9' },
    bride: { name: 'Bride’s Home', detail: 'Flat 203', map: 'https://maps.app.goo.gl/wadfD2nu8aisLq6y7' },
    arden: { name: 'Arden Lakefront', detail: '', map: 'https://maps.app.goo.gl/3h37WiJhQoktGzfKA' },
    kbr: { name: 'KBR Convention', detail: '', map: 'https://maps.app.goo.gl/6szL4xWuC4VZwLhQ7' },
  },

  // In date order. Time is 24-hour, India time. Each event shows the map for its own place.
  events: [
    { date: '2026-11-16', time: '10:00', title: 'Pasupu Muhurtham', telugu: 'పసుపు ముహూర్తం', place: 'groom', note: 'Lunch follows', line: 'The first yellow of the wedding.' },
    { date: '2026-11-17', time: '09:30', title: 'Pochamma Panduga', telugu: 'పోచమ్మ పండుగ', place: 'groom', note: 'Breakfast & lunch follows', },
    { date: '2026-11-18', time: '11:00', title: 'Haldi & Mehandi', telugu: 'హల్దీ & మెహందీ', place: 'arden', note: 'Lunch & dinner follows', dress: [['Haldi', 'Shades of Sunshine, wear your brightest yellows'], ['Mehandi', 'Tropical Brights, think bold colours and florals']] },
    { date: '2026-11-19', time: '10:00', title: 'Pellikoduku & Pooja', telugu: 'పెళ్లికొడుకు & పూజ', place: 'groom', note: 'Breakfast & lunch follows', line: 'Vamshi officially becomes the groom. Bring your camera.' },
    { date: '2026-11-21', time: '10:04', title: 'The Marriage', telugu: 'సుముహూర్తం', place: 'kbr', main: true, note: '', line: '10:04 sharp.', wear: 'Let’s celebrate in traditional hues' },
    { date: '2026-11-22', time: '11:30', title: 'Satyanarayana Katha', telugu: 'సత్యనారాయణ కథ', place: 'groom', note: 'Lunch follows', line: 'At the groom’s home, first.' },
    { date: '2026-11-23', time: '11:30', title: 'Satyanarayana Katha', telugu: 'సత్యనారాయణ కథ', place: 'bride', note: 'Lunch follows', line: 'Then the bride’s side takes its turn.' },
  ],

  text: {
    whisper: '',
    addressTo: 'To Dearest Family',
    hint: 'Tap the seal',
    salutation: 'With love, we invite you to the wedding celebrations of',
    letterHello: 'With love,', // on the letter as it slides out of the envelope
    letter: 'You already knew. You probably helped. The big invitation went out to everyone, but this one is just for the people we want beside us from the first pinch of turmeric to the prasadam.',
    scheduleTitle: 'Mark your calendars',
    closingTitle: 'See you on the 16th.',
    signoff: 'With all our love,',
  },
};
