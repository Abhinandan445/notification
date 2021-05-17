//Importing required files
const responseModel = require('../utilities/response_model');
const asyncHandler = require('../middleware/async');
//Required Creds
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Need to generate yours Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Need to generate yours from www.twilio.com/console
//@NPM: twilio
const client = require('twilio')(accountSid, authToken);

/* @Functionality: This function allow to send notification on user whatsapp and can be used to send on normal SMS. 
 * Required Inputs: User number, sender number and message. 
 */

exports.sendNotification = asyncHandler((req, res, next) => {

    //Initializing variables
    let fromDetail = req.body.from_whatsapp_number;
    let toDetail = req.body.to_whatsapp_number;
    let message = req.body.message;

    //Validating the Inputs
    if (!fromDetail || !toDetail || !message) return res.status(400).json(responseModel.show(false, null, 'Please Provid Valid Input Details!'));


    //Build the message object for Whatsapp
    // * NOTE: Same body can be used for normal SMS, just need to trim `whatsapp:` from the input string.
    client.messages.create({
            body: message,
            from: `whatsapp:${fromDetail}`, //for eg: +14155238886
            to: `whatsapp:${toDetail}` //Need to mention reciever number
        })
        .then(result => { //Build result output
            data = {
                messageId: result.sid,
                bodyMessage: result.body,
                createdDate: result.dateCreated,
                updateDate: result.dateUpdated,
                errStatus: result.errorCode
            }
            return res.status(200).json(responseModel.show(true, data, null));
        }) //Handled any exceptions
        .catch((err) => {
            return res.status(400).json(responseModel.show(false, null, 'Failed, Please try again!'));
        });
});