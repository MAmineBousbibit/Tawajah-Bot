// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');


admin.initializeApp({

	credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "chatbot-6cfc6",
  "private_key_id": "d61e815aa1298113b3d49ca4439f3772365e4788",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvDTWvlEHq8n8w\niXaIpsFc/xWlQQDPY+ZvZHzJyBz5AG7yIBW6W49dOl6EcGsaGczeLZhe01UD9OnO\nXQPb3Xu8SFU3MgtFfkWt2bjUO7vGge8Ci6w2ejeVa/dLSYfAO5JoUpw4aYd+LJKN\nLsuxA4Tq9C6MByXAAiT8cfyL5mwC1X1w1a7JEoHzfWn73DdUt6zvUADTB7qwTV79\nFUKwdFc2BbafWAqSVZ6H6ajz0wie2Mjv9kSbUAfguDpskF+rEeEdtFsoaU69UdZa\niVniCHVLXJSF6eqY4E3UrKil8BixVOSIBwsDJmO310vjIEPEzorYRvFLggJK/9GL\n0++w8Md1AgMBAAECggEABFmLLng8JRbugym/SMkAAAwUoR0a5Ixicv0nvqna0nMo\nzppuf8l7qADlzVuvxZ/Df/fZE+4jbCw/TRHxoRqBUx3nBC6ZqhnnqFjDJ37ufRHI\neyM2XcourGdY50WF+ohgbHg1Co/Qvplj8N8rT5Q7Ts1PhMo+rWVAPwekE2Pf5jgW\nVcYBQL8bybcvvrJC+PcwSY9k9ovghFweKT37lfsU0cqx57qBjAe7t5agiv/36Qfs\nm6QI34kGgOj63NSoVVrk1ZxvCy6RDVnOlRllcRmx4lQvMZlj0xzAfRFUQCJIoyiC\nxVHkU6DHb93ctj2wAaV0aL/q1ubAkh3U0e90l3KcEQKBgQDadU1zi0TJYCXDlWEw\ntsCEhfVo1tzaEMfUn3DW7WLLh+cZ9O1WxspvyhVTUDTnn0+0qORTH3p23calkYsR\nomgTHtHrHsIur/5a0hz6Ki7nC8HRzcnOD0sUieOYRZ0O3NeTO+KfkVBVQqLtNgAs\noHFICJQw4ola/fCfkJlA680e+QKBgQDNIk6dDw70GnWub5jeBhXFpqIdsV2Qfhhw\nw6RyrzwtnbCepIkn4aow0CruVr7DEkSs6JIPGtucz8cYOc8fqGvWj/AW9z48cIqX\nc1ylwFEv7L/bMqZLJZd8wl1U//SY5BuM5x2jFx1+XHone5+KZUtAvE+zoHLNXTAP\nWv/Onkd/XQKBgHyB7qqz7Xh4fA2EzefdwMvHLZ+bFjSS69GbLczRb0VhJ637kmmq\n0yXzn0PkqsJ4Yg0tVTSq9DlbHSSwVvqt/XMoVawT08iYNfe9WRabhC/a25SgHSx8\nOuZx0G2w/1rBM3yO3RLk10xAtmtMI71LlETh3tQdyPs7UDEhULdXrYjBAoGBAMFX\nCXM8gyKNYcdkBVeVsqWUlY2Y4w/R2SVHMFKrWPPBgXs0ptUA+5CAU0ZKWgevyyyR\nE0DLVpvotcTej5pN+j3Dck2jAHSkuete3r6Wka6y3G0zwspnBu2en6sChz4nGNRn\n7GYP3kt/y940xT0ClbfRBOnPWwS2RRrj8OCEC+09AoGBAJPcoPhAsMGbfGn5T6ut\nVCjyAUkqOnAzugMe985y+8rgnFslxDq8OktnsiXJcZVhJNX27TUWYESy7DPLJS2y\nuGHhCf1we3FWXFqlhxAvbd3Mr/LHKg5TLe+D3MHIiBn0PSbC1i1ECi/7ihsajk7x\n02PoQkJ+Gjxh356wDK4Nfxdo\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4skvn@chatbot-6cfc6.iam.gserviceaccount.com",
  "client_id": "108459260262194052961",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4skvn%40chatbot-6cfc6.iam.gserviceaccount.com"
}),
  
  databaseURL: "https://chatbot-6cfc6-default-rtdb.firebaseio.com/"


});

 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
function showFaculty(agent) {  
  const Context = agent.getContext('countrys');
  const country = Context.parameters['country'];
  const country1 = Context.parameters['country.original'];
  
  let orderedData = [];
  return admin.database().ref('faculte').once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      const childData = childSnapshot.val();
      if (childData.country.toLowerCase().includes(country.toLowerCase())) {
        orderedData.push(childData.name);
      }
    });

 // Send response with top 10 faculty names in specified country

var facultyList = ""; // Initialize an empty string to store the faculty names

for (var i = 0; i < 10; i++) {
  facultyList += `${(i + 1)} : ${orderedData[i]}\n\n`; // Concatenate each faculty name with a newline character
}
    if(agent.locale === 'en'){
      agent.add(`Here are some universities in ${country1}:\n\n ${facultyList} `); // Send the concatenated string as a single message
    }
    if(agent.locale === 'fr'){
     agent.add(`Voici quelques universités en ${country1}:\n\n ${facultyList} `); // Send the concatenated string as a single message

    }
    if(agent.locale === 'en'){
      agent.add(`please set the number of university that you prefer.`);
    }
    if(agent.locale === 'fr'){
      agent.add(`veuillez saisir le numéro de l'université que vous préférez.`);
    }
    
  });
}
  
  function showFormation(agent){
    const faculty = agent.parameters['faculty'];
    const Context = agent.getContext('countrys');
    const country = Context.parameters['country'];
    const country1 = Context.parameters['country.original'];
    const Context1 = agent.getContext('domaineselect');
    const domaine = Context1.parameters['domaine'];
    const domaine1 = Context1.parameters['domaine.original'];
    
    let orderedData = [];
  return admin.database().ref('formation').once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      const childData = childSnapshot.val();
      if (childData.country.toLowerCase().includes(country.toLowerCase()) && childData.domaine.toLowerCase().includes(domaine.toLowerCase()) && childData.faculty==faculty) {
        orderedData.push(childData.name);
      }
      
      });
    var formationList = "";
    for (var i = 0; i <orderedData.length; i++) {
    formationList += `${orderedData[i]}\n\n`; 
    }
    if(agent.locale === 'en'){
      agent.add(`Here are the formations for ${domaine1} in the selected faculty:\n\n ${formationList} `);
      agent.add(`please set the corresponding letter of formation that you prefer.`);
    }
    if(agent.locale === 'fr'){
      agent.add(`Voici les formations en ${domaine1} pour la faculté sélectionnée:\n\n ${formationList} `);
      agent.add(`Veuillez saisir la lettre correspondante de la formation que vous préférez.`);
    }
    
    
    });
    
  }
  
  function showPrerequis(agent){
    const Context2 = agent.getContext('facultys');
    const faculty = Context2.parameters['faculty'];
    const Context = agent.getContext('countrys');
    const country = Context.parameters['country'];
    const country1 = Context.parameters['country.original'];
    const Context1 = agent.getContext('domaineselect');
    const domaine = Context1.parameters['domaine'];
    const domaine1 = Context1.parameters['domaine.original'];
    const formation=agent.parameters['prerequis'];
    
    let orderedData = [];
  return admin.database().ref('formation').once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      const childData = childSnapshot.val();
      if (childData.country.toLowerCase().includes(country.toLowerCase()) && childData.domaine.toLowerCase().includes(domaine.toLowerCase()) && childData.faculty==faculty && childData.name.toLowerCase().startsWith(formation.toLowerCase())) {
       if(agent.locale === 'fr'){
         orderedData.push(childData.prerequis);
       }
        if(agent.locale === 'en'){
          orderedData.push(childData.prerequis1);
        }
      }
      
      });
    
    if(agent.locale === 'en'){
      agent.add(`Here are the prerequisites for the selected formation:\n\n ${orderedData} `);
    }
    if(agent.locale === 'fr'){
      agent.add(`Voici les prérequis de la formation sélectionnée :\n\n ${orderedData} `);
    }
    
    });
    
  }



  


  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('faculty', showFaculty);
  intentMap.set('formation', showFormation);
  intentMap.set('prerequis', showPrerequis);
  //intentMap.set('domaine', test1);


  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
})