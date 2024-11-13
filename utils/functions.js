import colors from 'colors';

const genOTP = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }
  return otp;
};

const rootServerCalling = () => { 
  fetch(process.env.LIVE_LINK,"/api/v1") 
  .then(response => { 
    console.log(`Reloaded at ${new Date().toLocaleString("en-GB", { hour12: true })}: Status Code ${response.status}`.green); 
  }) 
  .catch(error => { 
    console.error(`Error reloading at ${new Date().toLocaleString("en-GB", { hour12: true })}: ${error.message}`.red); 
  }); 
}

const reloadServer = () => {
  setInterval(rootServerCalling, 600000)
} 

export { genOTP, reloadServer };
