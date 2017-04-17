const html2text = require('html-to-text');

module.exports = () => {
  const names = (guests) => {
    const nameList = guests.map(guest => guest.name);
    return [nameList.slice(0, -1).join(', '), nameList.slice(-1)[0]].join(nameList.length < 2 ? '' : ' and ');
  };

  const htmlGuestSummary = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `<p>${next.name} can come.</p>`;
    } else {
      nextGuest = `<p>${next.name} cannot come.</p>`;
    }
    return `${first}<hr>${nextGuest}`;
  }, []);

  const foodChoices = (menu, guests) => guests.reduce((first, next) => {
    const details = (course, value) => menu.adult[course].find(option => option.value === value);

    let nextGuest;
    if (next.canCome === 'yes') {
      const starter = details('starter', next.starter);
      const main = details('main', next.main);
      const desert = details('desert', next.desert);
      nextGuest = `<p>${next.name}</p><p>Starter: ${starter.label} ${starter.description}</p><p>Main: ${main.label} ${main.description}</p><p>Desert: ${desert.label} ${desert.description}</p>`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}<p>Dietary requirements: ${next.dietaryReqs}</p>`;
      }
    }
    return `${first}<hr>${nextGuest}`;
  }, []);

  const allGuestsCanCome = guests => guests.filter(guest => guest.canCome === 'no').length === 0;
  const allGuestsCannotCome = guests => guests.filter(guest => guest.canCome === 'yes').length === 0;

  const guestResponse = (weddingDetails, guests) => {
    let response = `<html><body><p>Dear ${names(guests)}</p></p><p>Thank you for RSVPing to our wedding.</p>`;
    if (allGuestsCannotCome(guests)) {
      response = `${response}<p>We are sorry you are unable to attend</p>`;
    } else {
      if (allGuestsCanCome(guests)) {
        response = `${response}<p>We are delighted you can attend.</p>`;
      }
      response = `${response}<p>We have received your food choices as detailed below:</p>${foodChoices(weddingDetails.menu, guests)}<p>Please contact us if you need to amend your choices.</p>`;
    }
    return `${response}<p>From,</p><p>${weddingDetails.brideAndGroom}</p></body></html>`;
  };

  return {
    ownerContent: {
      subject: guests => `Nevis Wedding RSVP: ${names(guests)}`,
      text: (weddingDetails, guests) => html2text.fromString(`<html><body>${htmlGuestSummary(guests)}${foodChoices(weddingDetails.menu, guests)}</body></html>`),
      html: (weddingDetails, guests) => `<html><body>${htmlGuestSummary(guests)}${foodChoices(weddingDetails.menu, guests)}</body></html>`
    },
    guestContent: {
      subject: weddingDetails => `${weddingDetails.brideAndGroom}'s wedding RSVP`,
      text: (weddingDetails, guests) => html2text.fromString(guestResponse(weddingDetails, guests)),
      html: guestResponse
    }
  };
};
