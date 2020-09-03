//constants
const button = document.getElementById("calculate-button");
const resetButton = document.getElementById("reset-button");
const input = document.getElementById("user-input");
const htmlMessage = document.getElementById("message");
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

//actions

//.calculate
const date = button.addEventListener("click", async (event) => {
  event.preventDefault();
  const birthday = await timestampBirthday("user-input");
  if (!birthday) {
    return alert("Please select a date.");
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
  htmlMessage.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  htmlMessage.innerHTML = message;
});

//reset button
const reset = resetButton.addEventListener("click", async (event) => {
  event.preventDefault();
  htmlMessage.classList.add("hidden");
  resetButton.classList.add("hidden");
  htmlMessage.innerHTML = "";
});
