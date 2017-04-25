const html2text = require('html-to-text');
const { styles } = require('./styles');

module.exports = () => {
  const names = (guests) => {
    const nameList = guests.map(guest => guest.name);
    return [nameList.slice(0, -1).join(', '), nameList.slice(-1)[0]].join(nameList.length < 2 ? '' : ' and ');
  };

  const foodChoices = (menu, guests) => guests.reduce((first, next) => {
    const getDetails = (course, value, isChild) => {
      const options = menu[isChild ? 'child' : 'adult'][course];
      const details = value ? options.find(option => option.value === value) : options[0];
      return details.description ? `${details.label} ${details.description}` : details.label;
    };

    let nextGuest = '';
    if (next.canCome === 'yes') {
      const starter = getDetails('starter', next.starter, next.childMenu);
      const main = getDetails('main', next.main, next.childMenu);
      const dessert = getDetails('dessert', next.dessert, next.childMenu);
      nextGuest = `<h3>${next.name}</h3>
                    <h4>Starter:</h4>
                    <p>${starter}</p>
                    <h4>Main:</h4>
                    <p>${main}</p>
                    <h4>Dessert:</h4>
                    <p>${dessert}</p>`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}<h4>Dietary requirements</h4><p>${next.dietaryReqs}</p>`;
      }
    }
    return `${first}<br>${nextGuest}`;
  }, []);

  const allGuestsCannotCome = guests => guests.filter(guest => guest.canCome === 'yes').length === 0;
  const guestsThatCannotCome = guests => guests.filter(guest => guest.canCome === 'no');
  const allGuestsCanCome = guests => guestsThatCannotCome(guests).length === 0;

  const htmlResponse = (weddingDetails, guests) => {
    let response = `<html>
          <head>${styles}</head>
          <body>
            <div class="headContent">
              <img class="head-img" src="${weddingDetails.url}/images/db/logo.png"/>
              <h1>Thank you for your RSVP</h1>
          </div>
            <div class="bodyContent">
                <h2>Dear ${names(guests)}</h2>
                <p>Thank you for your RSVP.`;

    if (allGuestsCannotCome(guests)) {
      response = `${response} We are sorry you are unable to attend our wedding.</p>`;
    } else {
      if (allGuestsCanCome(guests)) {
        response = `${response} We are delighted you can attend our wedding.</p>`;
      }
      response = `${response}
                <br>
                <h2>Your food choices</h2>
                ${foodChoices(weddingDetails.menu, guests)}
                <br>
                <p>If you would like to change any of your food choices please let us know.</p>`;
      const cannotCome = guestsThatCannotCome(guests);
      if (cannotCome.length > 0) {
        response = `${response} <p>We are sorry that ${names(cannotCome)} cannot attend.</p>`;
      }
      response = `${response} <p>We look forward to seeing you in October.  Please check the <a href="${weddingDetails.url}" target="_blank">website</a> for any final details.</p>`;
    }
    return `${response}
            <br>
            <p>From,</p>
            <h2>${weddingDetails.brideAndGroom}</h2>
            <a href="${weddingDetails.url}" target="_blank">${weddingDetails.url}</a>
          </div>
        </body>
      </html>`;
  };

  return {
    ownerContent: {
      subject: guests => `Wedding RSVP from ${names(guests)}`,
      text: (weddingDetails, guests) => html2text.fromString(htmlResponse(weddingDetails, guests)),
      html: htmlResponse
    },
    guestContent: {
      subject: () => 'Thanks for your RSVP',
      text: (weddingDetails, guests) => html2text.fromString(htmlResponse(weddingDetails, guests)),
      html: htmlResponse
    }
  };
};
