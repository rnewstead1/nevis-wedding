Web app for organising a wedding.

System requirements:
- node 7.1.0
- mongodb (must be running)

To run you will need to set the following environment variables:

- MONGODB_URI
- SECRET (for signing / verifying jwt tokens on login)
- SHOULD_EMAIL (only if you want to turn email sending on)
- EMAIL_RECIPIENTS (comma separated list of recipients to be emailed when an rsvp is submitted)
- EMAIL_USER (email address the rsvp mails will come from)
- EMAIL_PASS (password for email above - see [nodemailer docs for configuring gmail](https://nodemailer.com/using-gmail/))