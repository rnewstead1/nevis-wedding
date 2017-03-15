module.exports = () => {
  const names = (guests) => {
    const nameList = guests.map(guest => guest.name);
    return [nameList.slice(0, -1).join(', '), nameList.slice(-1)[0]].join(nameList.length < 2 ? '' : ' and ');
  };

  const htmlGuestSummary = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `<p>${next.name} can come.</p><p>Food choice: ${next.foodChoice}</p>`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}<p>Dietary requirements: ${next.dietaryReqs}</p>`;
      }
    } else {
      nextGuest = `<p>${next.name} cannot come.</p>`;
    }
    return `${first}<hr>${nextGuest}`;
  }, []);

  const textGuestSummary = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `${next.name} can come.\nFood choice: ${next.foodChoice}`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}\nDietary requirements: ${next.dietaryReqs}`;
      } else {
        nextGuest = `${next.name} cannot come`;
      }
    }
    return `${first}\n\n${nextGuest}`;
  }, []);

  const foodChoices = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `<p>${next.name}: ${next.foodChoice}</p>`;
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
      response = `${response}<p>We have received your food choices as detailed below:</p>${foodChoices(guests)}<p>Please contact us if you need to amend your choices.</p>`;
    }
    return `${response}<p>From,</p><p>${weddingDetails.brideAndGroom}</p></body></html>`;
  };

  return {
    ownerContent: {
      subject: guests => `Nevis Wedding RSVP: ${names(guests)}`,
      text: textGuestSummary,
      html: guests => `<html><body>${htmlGuestSummary(guests)}</body></html>`
    },
    guestContent: {
      subject: weddingDetails => `${weddingDetails.brideAndGroom}'s wedding RSVP`,
      text: weddingDetails => `Thank you for RSVPing to our wedding.\nFrom, ${weddingDetails.brideAndGroom}`,
      html: guestResponse
    }
  };
};
