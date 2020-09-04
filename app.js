//constants
const calculateButton = document.getElementById("calculate-button");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("error");
const input = document.getElementById("user-input");
const finalMessage = document.getElementById("message");
const todayTime = new Date().getTime(); // javaScript timestamp
const todayMaxValue = new Date().toISOString().substr(0, 10);
const base = 10;

//initialized
input.setAttribute("max", todayMaxValue);

//functions
const timestampBirthday = (inputElementId) => {
  return document.getElementById(inputElementId).valueAsNumber; // javascript timestamp
};

const timestampDaysLived = (birthday) => {
  return (todayTime - birthday) / (1000 * 60 * 60 * 24);
};

const mathYearsOld = (userDaysLived) => {
  const yearsOld = Math.log(userDaysLived) / Math.log(base);
  return Math.floor(yearsOld);
};

const nextBirthdayDateFnc = (days) => {
  const timestampToNextBirthday = days * (1000 * 60 * 60 * 24);
  const date = new Date(todayTime + timestampToNextBirthday), //milliseconds
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const messageFnc = (
  mathBirthday,
  userDaysLived,
  daysLeftToNextMathBirthday,
  nextBirthdayDate
) => {
  if (mathBirthday < 1) {
    return `You have lived ${Math.floor(
      userDaysLived
    )} day(s). Your next math birthday is in ${numberWithCommas(
      Math.ceil(daysLeftToNextMathBirthday)
    )} day on ${nextBirthdayDate}.`;
  } else {
    return `You are ${mathBirthday} math old, and you have lived ${numberWithCommas(
      Math.floor(userDaysLived)
    )} days. Your next math birthday is in ${numberWithCommas(
      Math.ceil(daysLeftToNextMathBirthday)
    )} days on ${nextBirthdayDate}.`;
  }
};

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//ACTIONS

//calculate
const date = calculateButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const birthday = await timestampBirthday("user-input");
  if (!birthday) {
    errorMessage.classList.remove("hidden");
    return setTimeout(() => {
      errorMessage.classList.add("hidden");
    }, 3000);
  }
  const userDaysLived = await timestampDaysLived(birthday);
  const mathBirthday = await mathYearsOld(userDaysLived);
  const nextMathBirthday = mathBirthday + 1;
  const daysLivedNextMathBirthday = 10 ** nextMathBirthday;
  const daysLeftToNextMathBirthday = daysLivedNextMathBirthday - userDaysLived;
  const nextBirthdayDate = nextBirthdayDateFnc(daysLeftToNextMathBirthday);
  const message = await messageFnc(
    mathBirthday,
    userDaysLived,
    daysLeftToNextMathBirthday,
    nextBirthdayDate
  );
  finalMessage.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  finalMessage.innerHTML = message;
});

//reset button
const reset = resetButton.addEventListener("click", async (event) => {
  event.preventDefault();
  finalMessage.classList.add("hidden");
  resetButton.classList.add("hidden");
  finalMessage.innerHTML = "";
});
