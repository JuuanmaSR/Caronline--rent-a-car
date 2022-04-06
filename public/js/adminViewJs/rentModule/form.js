/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/*
function setDateToday() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;
  document.getElementById('startDate').setAttribute('min', today);
  document.getElementById('finishDate').setAttribute('min', today);
}
setDateToday();
*/

function getTotalDays() {
  const STARTDATE = document.getElementById('startDate').value;
  const ENDINGDATE = document.getElementById('finishDate').value;
  let totalDays;

  const startDate = new Date(STARTDATE).getTime();
  const endingDate = new Date(ENDINGDATE).getTime();
  if (startDate === endingDate) {
    totalDays = 1;
  } else {
    const difference = endingDate - startDate;
    totalDays = (difference / (1000 * 60 * 60 * 24));
  }

  return totalDays;
}
function calculateTotalPrice() {
  document.getElementById('calculateTotalPrice').addEventListener('click', () => {
    const $pricePerDay = document.getElementById('pricePerDay').value;
    const $totalPrice = document.getElementById('totalPrice');
    const totalDays = Number(getTotalDays());
    if (Number.isNaN(totalDays)) {
      alert('Please select a start date and ending date!');
      return false;
    }
    $totalPrice.setAttribute('value', (totalDays * $pricePerDay));
  }, false);
}
calculateTotalPrice();
